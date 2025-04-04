import { useState } from "react";
import { createPortal } from "react-dom";
import { usePostsQuery, useHelpsQuery, Post, Help } from "./generated/graphql";
import CreatePost from "./components/CreatePost";
import CreateHelp from "./components/CreateHelp";
import DetailPost from "./components/DetailPost";
import DetailHelp from "./components/DetailHelp";
import AIChat from "./components/AIChat";

const PostComp = () => {
  const { data } = usePostsQuery();
  const { data: HelpData } = useHelpsQuery();

  const [chatLog, setChatLog] = useState<
    {
      role: "user" | "ai";
      text: string;
      posts?: Post[];
      helps?: Help[];
    }[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState("news");
  const [post, setPost] = useState(false);
  const [help, setHelp] = useState(false);
  const [detailPost, setDetailPost] = useState(false);
  const [detailHelp, setDetailHelp] = useState(false);
  const [aiChat, setAiChat] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>();
  const [selectedHelp, setSelectedHelp] = useState<Help | null>();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {post &&
        createPortal(
          <CreatePost click={() => setPost(!post)} />,
          document.body,
        )}
      {help &&
        createPortal(
          <CreateHelp click={() => setHelp(!help)} />,
          document.body,
        )}
      {detailPost &&
        selectedPost &&
        createPortal(
          <DetailPost
            action={() => setDetailPost(false)}
            post={selectedPost}
          />,
          document.body,
        )}
      {detailHelp &&
        selectedHelp &&
        createPortal(
          <DetailHelp
            action={() => setDetailHelp(false)}
            help={selectedHelp}
          />,
          document.body,
        )}
      {aiChat &&
        createPortal(
          <AIChat
            close={() => setAiChat(false)}
            chatLog={chatLog}
            setChatLog={setChatLog}
            setDetailPost={setDetailPost}
            setSelectedPost={(post) => {
              setSelectedPost(post);
            }}
          />,
          document.body,
        )}
      <div className="flex justify-end w-2/3 gap-4 mb-3">
        <button
          onClick={() => setPost(!post)}
          className="text-lg font-semibold text-white bg-amber-200 p-2 rounded-lg"
        >
          createPost
        </button>
        <button
          onClick={() => setHelp(!help)}
          className="text-lg font-semibold text-white bg-amber-300 p-2 rounded-lg"
        >
          createHelp
        </button>
      </div>
      <div className="flex justify-around w-2/3 bg-amber-100 p-2">
        <button
          onClick={() => handleCategoryChange("discussion")}
          className={`text-lg font-bold rounded-lg p-1 transition ${
            selectedCategory === "discussion"
              ? "bg-amber-400 text-white"
              : "text-amber-300 hover:bg-amber-400 focus:bg-amber-400 active:bg-amber-500"
          }`}
        >
          Discussion
        </button>
        <button
          onClick={() => handleCategoryChange("news")}
          className={`text-lg font-bold rounded-lg p-1 transition ${
            selectedCategory === "news"
              ? "bg-amber-400 text-white"
              : "text-amber-300 hover:bg-amber-400 focus:bg-amber-400 active:bg-amber-500"
          }`}
        >
          News
        </button>
        <button
          onClick={() => handleCategoryChange("help")}
          className={`text-lg font-bold rounded-lg p-1 transition ${
            selectedCategory === "help"
              ? "bg-amber-400 text-white"
              : "text-amber-300 hover:bg-amber-400 focus:bg-amber-400 active:bg-amber-500"
          }`}
        >
          Help
        </button>
      </div>

      <div className="flex flex-col w-2/3">
        {selectedCategory === "news" || selectedCategory === "discussion"
          ? data?.posts
              ?.filter((post) => post.Category === selectedCategory)
              .map((post) => (
                <div
                  onClick={() => {
                    setSelectedPost(post);
                    setDetailPost(true);
                  }}
                  key={post._id}
                  className="flex w-full justify-between bg-amber-200 py-2 px-4 text-white text-xl font-semibold border-b-2 border-gray-200"
                >
                  <div>
                    {post.Author.length > 5
                      ? post.Author.slice(0, 5) + ".."
                      : post.Author}
                  </div>
                  <div>
                    {post.Title.length > 6
                      ? post.Title.slice(0, 6) + ".."
                      : post.Title}
                  </div>
                  <div>
                    {post.Content.length > 8
                      ? post.Content.slice(0, 7) + ".."
                      : post.Content}
                  </div>
                  <div>
                    <div>
                      {!post.AiSummary
                        ? "None"
                        : post.AiSummary.length > 10
                          ? post.AiSummary.slice(0, 10) + "..."
                          : post.AiSummary}
                    </div>
                  </div>
                </div>
              ))
          : HelpData?.helps?.map((help) => (
              <div
                key={help._id}
                className="flex w-full bg-amber-200 p-2 text-white text-xl font-semibold border-b-2 border-gray-200"
                onClick={() => {
                  setSelectedHelp(help);
                  setDetailHelp(true);
                }}
              >
                <div className="w-1/5">{help.Author}</div>
                <div className="w-1/5">
                  {help.Description.length > 8
                    ? help.Description.slice(0, 6) + ".."
                    : help.Description}
                </div>
                <div className="w-1/5">{help.Location}</div>
                <div className="w-1/4">
                  {help.isResolved === false ? "Not yet" : "Completed"}
                </div>
                <div className="w-fit">
                  {help.volunteers!.length >= 1
                    ? help.volunteers?.length
                    : "None"}
                </div>
              </div>
            ))}
      </div>
      <button
        onClick={() => setAiChat(true)}
        className="bg-amber-200 p-3 rounded-2xl text-white text-lg font-semibold absolute bottom-20 right-20"
      >
        AI
      </button>
    </div>
  );
};

export default PostComp;
