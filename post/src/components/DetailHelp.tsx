import { useState, useEffect } from "react";
import { Help } from "../generated/graphql";
import {
  useGetAuthorQuery,
  useUpdateHelpMutation,
  useDeleteHelpMutation,
  useAddVolunteerMutation,
} from "../generated/graphql";
const DetailHelp = ({ action, help }: { action: () => void; help: Help }) => {
  const { data } = useGetAuthorQuery();
  const [update] = useUpdateHelpMutation();
  const [deleteHelp] = useDeleteHelpMutation();
  const [addVolunteer] = useAddVolunteerMutation();
  const [form, setForm] = useState({
    Author: "",
    Description: "",
    Location: "",
    isResolved: false,
    volunteers: help.volunteersIds,
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (data?.getAuthor?.userId) {
      setForm({ ...form, Author: data?.getAuthor?.userId });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "isResolved" ? value === "true" : value,
    }));
  };

  const handleCancel = () => {
    setEdit(false);
    setForm({
      Author: data!.getAuthor!.userId,
      Description: help.Description,
      Location: help.Location,
      isResolved: help.isResolved,
      volunteers: help.volunteersIds,
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
          id: help._id,
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

  const handleAddVolunteer = async (helpId: string) => {
    try {
      await addVolunteer({
        variables: {
          id: helpId,
          volunteerId: data!.getAuthor!.userId,
        },
        update: (cache) => {
          cache.evict({ fieldName: "helps" });
          cache.gc();
        },
      });
    } catch (err) {
      console.error("❌ Error adding volunteer:", err);
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
          <div className="text-3xl text-sky-400 font-bold">Detail Help</div>
          <div className="flex justify-center items-center w-full gap-4 my-3">
            <label>Description:</label>
            <input
              type="text"
              name="Description"
              value={edit ? form.Description : help.Description}
              placeholder={help.Description}
              id="Description"
              disabled={!edit}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center w-full gap-4 my-3">
            <label>Location:</label>
            <input
              type="text"
              name="Location"
              value={edit ? form.Location : help.Location}
              placeholder={help.Location}
              id="location"
              className="border-2 border-gray-200 rounded-lg"
              disabled={!edit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4 text-slate-500 w-full justify-center my-4">
          <div className="flex justify-center items-center gap-2">
            <label className="text-sm">Is Resolved:</label>
            <input
              type="radio"
              name="isResolved"
              value="true"
              placeholder="true"
              id="true"
              onChange={handleChange}
              disabled={!edit}
            />
            <input
              type="radio"
              name="isResolved"
              value="false"
              placeholder="false"
              id="false"
              disabled={!edit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full gap-4">
          <label>Volunteers:</label>
          <div>{help.volunteers?.length}</div>
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
            {help.Author === data?.getAuthor?.userName && (
              <button
                onClick={() => {
                  deleteHelp({
                    variables: {
                      id: help._id,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "helps" });
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
      <button
        onClick={() => {
          handleAddVolunteer(help._id);
          action();
        }}
        className="relative bottom-24 right-24 text-gray-500 text-xl"
      >
        ❤️
      </button>
    </div>
  );
};

export default DetailHelp;
