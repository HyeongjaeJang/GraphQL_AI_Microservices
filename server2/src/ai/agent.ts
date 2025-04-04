import "dotenv/config";
import { plainToInstance } from "class-transformer";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Post, PostModel } from "../models/Post";
import { Help, HelpModel } from "../models/Help";
import { InteractionModel, storeInteraction } from "../models/Interaction";
import mongoose from "mongoose";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { PromptTemplate } from "@langchain/core/prompts";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function communityAIQuery(input: string, userId: string) {
  const posts = await PostModel.find().lean();

  const docs = posts.map(
    (post) =>
      new Document({
        pageContent: `${post.Title}\n${post.Content}`,
        metadata: {
          _id: post._id.toString(),
          Author: post.Author,
          title: post.Title,
          category: post.Category,
          type: "Post",
        },
      }),
  );
  const helps = await HelpModel.find().lean();

  const helpDocs = helps.map(
    (help) =>
      new Document({
        pageContent: `${help.Description}\n${help.Location}`,
        metadata: {
          _id: help._id.toString(),
          Author: help.Author,
          description: help.Description,
          location: help.Location,
          type: "Help",
        },
      }),
  );

  const allDocs = [...docs, ...helpDocs];

  const vectorStore = await MemoryVectorStore.fromDocuments(
    allDocs,
    new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GEMINI_API_KEY }),
  );

  const retriever = vectorStore.asRetriever();

  const pastInteractions = await InteractionModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const previousTopics = pastInteractions.map((i) => i.input).join("\n");
  const userHistoryContext = `User previously asked about:\n${previousTopics}`;

  const k = 10;
  const results = await vectorStore.similaritySearchWithScore(input, k);

  const previouslySeenIds = new Set([
    ...pastInteractions.flatMap(
      (i) => i.retrievedPosts?.map((p) => p._id) || [],
    ),
    ...pastInteractions.flatMap(
      (i) => i.retrievedHelps?.map((h) => h._id) || [],
    ),
  ]);

  const prompt = PromptTemplate.fromTemplate(
    `You are an AI assistant. Given the following context, answer the user's question accurately.

  Context:
  {context}

  Question:
  {input}`,
  );

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt,
  });

  const chain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });

  const relevantDocs = results
    .filter(([doc, score]) => {
      const boost = previouslySeenIds.has(doc.metadata._id) ? 0.1 : 0;
      return score + boost > 0.8;
    })
    .map(([doc]) => doc);

  let cleanRetrievedPost: Post[] = [];
  let cleanRetrievedHelp: Help[] = [];

  await Promise.all(
    relevantDocs.map(async (doc) => {
      const { _id, type } = doc.metadata;
      if (type === "Post") {
        const post = await PostModel.findById(_id).lean();
        if (post) cleanRetrievedPost.push(post);
      } else if (type === "Help") {
        const help = await HelpModel.findById(_id).lean();
        if (help) cleanRetrievedHelp.push(help);
      }
    }),
  );

  let responseText: string;
  let suggestedQuestions: string[] = [];

  if (relevantDocs.length > 0) {
    const result = await chain.invoke({
      input: `${userHistoryContext}\n\nNow answer: ${input}`,
      chat_history: userHistoryContext,
    });
    responseText = result.answer;
  } else {
    const fallback = await llm.invoke(
      `The user asked: "${input}". If it's ambiguous, ask a clarifying question.`,
    );
    if (fallback && fallback.content && typeof fallback.content === "string") {
      responseText = fallback.content;
    } else if (
      fallback &&
      fallback.content &&
      Array.isArray(fallback.content)
    ) {
      responseText = fallback.content.map((item) => item).join(" ");
    } else {
      responseText = "Sorry, I couldn't understand that request.";
    }

    suggestedQuestions = [
      "Can you clarify what you're looking for?",
      "Are you asking about a specific topic?",
      "Would you like help with community events or discussions?",
    ];
  }

  console.log("Response Text:", responseText);
  console.log("Suggested Questions:", suggestedQuestions);
  console.log(cleanRetrievedPost);
  console.log(cleanRetrievedHelp);

  await storeInteraction({
    _id: new mongoose.Types.ObjectId(),
    userId,
    input,
    response: responseText,
    retrievedPosts: cleanRetrievedPost.map((post) => ({
      _id: post._id.toString(),
      title: post.Title,
      category: post.Category,
    })),
    retrievedHelps: cleanRetrievedHelp.map((help) => ({
      _id: help._id.toString(),
      description: help.Description,
      location: help.Location,
    })),
  });

  return {
    text: responseText,
    suggestedQuestions,
    retrievedPosts: plainToInstance(Post, cleanRetrievedPost),
    retrievedHelps: plainToInstance(Help, cleanRetrievedHelp),
  };
}
