import { useState, useEffect } from "react";
import { useCreatePostMutation, useGetAuthorQuery } from "../generated/graphql";

const CreatePost = ({ click }: { click: () => void }) => {
  const [createPost] = useCreatePostMutation();
  const { data } = useGetAuthorQuery();
  const [form, setForm] = useState({
    Author: "",
    Title: "",
    Content: "",
    Category: "",
    AiSummary: "",
  });
  useEffect(() => {
    if (data?.getAuthor?.userId) {
      setForm({ ...form, Author: data?.getAuthor?.userId });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createPost({
        variables: {
          input: {
            ...form,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: "posts" });
          cache.gc();
        },
      });

      if (!res.errors) {
        click();
      }
    } catch (err) {
      console.error("❌ Error creating post:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="relative bg-white p-10 rounded-lg shadow-md w-1/3">
        <div className="flex justify-center items-center flex-col">
          <div className="text-3xl text-sky-400 font-bold">Create Post</div>
          <div className="w-2/3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-start my-3 gap-4"
            >
              <div className="flex flex-col gap-2 text-slate-500 w-full">
                <div className="flex justify-between">
                  <label className="w-full">Title:</label>
                  <input
                    type="text"
                    name="Title"
                    value={form.Title}
                    placeholder="Title"
                    id="title"
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-between">
                  <label className="w-full">Content:</label>
                  <input
                    type="text"
                    name="Content"
                    value={form.Content}
                    placeholder="Content?"
                    id="content"
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex gap-3 justify-around w-full mt-2">
                  <div className="flex gap-4 text-slate-500 w-full">
                    <div className="flex justify-center items-center gap-2">
                      <label className="text-sm">News:</label>
                      <input
                        type="radio"
                        name="Category"
                        value="news"
                        placeholder="news"
                        id="news"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-slate-500 w-full">
                    <div className="flex justify-center items-center gap-2">
                      <label className="text-sm">Discussion:</label>
                      <input
                        type="radio"
                        name="Category"
                        value="discussion"
                        placeholder="discussion"
                        id="discussion"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex self-center gap-3 mt-4">
                <button type="submit" className="bg-amber-100 p-3 rounded-lg">
                  Create
                </button>
                <button onClick={click} className="bg-red-200 p-3 rounded-lg">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
