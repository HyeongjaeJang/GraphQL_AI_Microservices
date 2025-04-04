import { useEffect, useRef, useState } from "react";
import { useCommunityAiQueryLazyQuery, Post, Help } from "../generated/graphql";

//Find me posts about projects looking for a developer. Do not include any post related to AI or artificial intelligence.

type ChatLogType = {
  role: "user" | "ai";
  text: string;
  posts?: Post[];
  helps?: Help[];
};

interface AIChatProps {
  close: () => void;
  chatLog: ChatLogType[];
  setChatLog: React.Dispatch<React.SetStateAction<ChatLogType[]>>;
  setDetailPost: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<
    React.SetStateAction<Post | null | undefined>
  >;
}

const AIChat: React.FC<AIChatProps> = ({
  close,
  chatLog,
  setChatLog,
  setDetailPost,
  setSelectedPost,
}) => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const [getAIResponse] = useCommunityAiQueryLazyQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const chat = message.toLowerCase();
    setMessage("");

    setChatLog((prev) => [...prev, { role: "user", text: chat }]);

    const res = await getAIResponse({
      variables: {
        input: chat,
      },
    });

    const ai = res.data?.communityAIQuery;
    if (ai) {
      setChatLog((prev) => [
        ...prev,
        {
          role: "ai",
          text: ai.text,
          posts: ai.retrievedPosts as Post[],
          helps: ai.retrievedHelps as Help[],
        },
      ]);
    }
  };

  return (
    <div className="absolute bottom-10 right-20 bg-white p-2 rounded-lg w-1/3 h-2/3 border-2 border-gray-200 flex flex-col justify-between items-center z-10 shadow-lg">
      <button className="self-end" onClick={() => close()}>
        ✖️
      </button>
      <div className="w-full h-full overflow-y-auto p-2 space-y-4">
        {chatLog.map((entry, index) => (
          <div key={index} className="flex flex-col space-y-2">
            {entry.role === "user" && (
              <div className="bg-yellow-300 text-white p-3 rounded-lg self-end max-w-[75%] whitespace-pre-wrap">
                {entry.text}
              </div>
            )}

            {entry.role === "ai" && (
              <>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg self-start max-w-[75%] whitespace-pre-wrap">
                  💬 <strong>AI:</strong> {entry.text}
                </div>

                {entry.posts && entry.posts.length > 0 && (
                  <div className="self-start w-full">
                    <h2 className="text-sm font-semibold text-gray-700 mb-1">
                      📦 Retrieved Posts:
                    </h2>
                    {entry.posts.map((post) => (
                      <div
                        key={post._id}
                        className="border border-gray-300 rounded p-2 mb-2 bg-white"
                        onClick={() => {
                          setSelectedPost(post);
                          setDetailPost(true);
                          close();
                        }}
                      >
                        <div className="text-sm text-gray-600">
                          🧑 Author: {post.Author}
                        </div>
                        <div className="font-bold">{post.Title}</div>
                        <div>{post.Content}</div>
                        <div className="text-xs text-gray-500">
                          Category: {post.Category}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {entry.helps && entry.helps.length > 0 && (
                  <div className="self-start w-full">
                    <h2 className="text-sm font-semibold text-gray-700 mb-1">
                      🆘 Retrieved Helps:
                    </h2>
                    {entry.helps.map((help) => (
                      <div
                        key={help._id}
                        className="border border-gray-300 rounded p-2 mb-2 bg-white"
                      >
                        <div className="text-sm text-gray-600">
                          🧑 Author: {help.Author}
                        </div>
                        <div className="font-bold">{help.Description}</div>
                        <div>{help.Location}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            <div ref={bottomRef} />
          </div>
        ))}
      </div>

      <div className="w-full flex items-center border-t border-amber-200 pt-2 px-2">
        <input
          type="text"
          onChange={handleChange}
          value={message}
          placeholder="Ask something..."
          className="flex-1 border border-gray-300 p-2 rounded-l outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-amber-300 hover:bg-amber-400 text-white font-semibold px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
