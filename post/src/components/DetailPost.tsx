import { useState, useEffect } from "react";
import { Post } from "../generated/graphql";
import {
  useGetAuthorQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../generated/graphql";
const DetailPost = ({ action, post }: { action: () => void; post: Post }) => {
  const { data } = useGetAuthorQuery();
  const [update] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [form, setForm] = useState({
    Author: "",
    Title: "",
    Content: "",
    Category: "",
    AiSummary: "",
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (data?.getAuthor?.userId) {
      setForm({ ...form, Author: data?.getAuthor?.userId });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setEdit(false);
    setForm({
      Author: data!.getAuthor!.userId,
      Title: post.Title,
      Content: post.Content,
      Category: post.Category,
      AiSummary: post.AiSummary || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await update({
        variables: {
          input: {
            ...form,
          },
          id: post._id,
        },
        update: (cache) => {
          cache.evict({ fieldName: "posts" });
          cache.gc();
        },
      });
      if (!res.errors) {
        action();
      }
    } catch (err) {
      console.error("❌ Error updating post:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-lg shadow-md w-1/2"
      >
        <div className="flex flex-col justify-center items-center w-full">
          <div className="text-3xl text-sky-400 font-bold">Detail Post</div>
          <div className="flex justify-center items-center w-full gap-4 my-3">
            <label>Title:</label>
            <input
              type="text"
              name="Title"
              value={edit ? form.Title : post.Title}
              placeholder={post.Title}
              id="title"
              disabled={!edit}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center w-full gap-4 my-3">
            <label>Content:</label>
            <input
              type="text"
              name="Content"
              value={edit ? form.Content : post.Content}
              placeholder={post.Content}
              id="content"
              className="border-2 border-gray-200 rounded-lg"
              disabled={!edit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4 text-slate-500 w-full justify-center my-4">
          <div className="flex justify-center items-center gap-2">
            <label className="text-sm">News:</label>
            <input
              type="radio"
              name="Category"
              value="news"
              placeholder="news"
              id="news"
              onChange={handleChange}
              disabled={!edit}
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <label className="text-sm">Discussion:</label>
            <input
              type="radio"
              name="Category"
              value="discussion"
              placeholder="discussion"
              id="discussion"
              disabled={!edit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full gap-4">
          <label>Ai Summary:</label>
          <input
            type="text"
            name="AiSummary"
            value={edit ? form.AiSummary : post.AiSummary || "Ai Summary"}
            placeholder={post.AiSummary ? post.AiSummary : "Ai Summary"}
            id="aiSummary"
            disabled={!edit}
            className="border-2 border-gray-200 rounded-lg"
            onChange={handleChange}
          />
        </div>
        {!edit ? (
          <>
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="bg-amber-100 p-3 rounded-lg mr-3 mt-4"
            >
              Edit
            </button>
            {post.Author === data?.getAuthor?.userName && (
              <button
                onClick={() => {
                  deletePost({
                    variables: {
                      id: post._id,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "posts" });
                      cache.gc();
                    },
                  });
                  action();
                }}
                className="bg-red-200 p-3 rounded-lg"
              >
                Delete
              </button>
            )}
          </>
        ) : (
          <div className="flex self-center gap-3 mt-4">
            <button type="submit" className="bg-amber-100 p-3 rounded-lg">
              Update
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-200 p-3 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </form>
      <button
        onClick={() => {
          handleCancel();
          action();
        }}
        className="relative bottom-24 right-10 text-gray-500 text-xl"
      >
        ✖
      </button>
    </div>
  );
};

export default DetailPost;
