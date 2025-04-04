import { useEffect, useState } from "react";
import { useCreateHelpMutation, useGetAuthorQuery } from "../generated/graphql";

const CreateHelp = ({ click }: { click: () => void }) => {
  const [createHelp] = useCreateHelpMutation();
  const { data } = useGetAuthorQuery();
  const [form, setForm] = useState({
    Author: "",
    Description: "",
    Location: "",
    isResolved: false,
    volunteers: [],
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
      const res = await createHelp({
        variables: {
          input: {
            ...form,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: "helps" });
          cache.gc();
        },
      });
      if (!res.errors) {
        click();
      }
    } catch (err) {
      console.error("❌ Error creating help:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="relative bg-white p-10 rounded-lg shadow-md w-1/3">
        <div className="flex justify-center items-center flex-col">
          <div className="text-3xl text-sky-400 font-bold">Create Help</div>
          <div className="w-2/3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-start my-3 gap-4"
            >
              <div className="flex flex-col gap-2 text-slate-500 w-full">
                <div className="flex justify-between">
                  <label className="w-full">Description:</label>
                  <input
                    type="text"
                    name="Description"
                    value={form.Description}
                    placeholder="Help?"
                    id="desc"
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-between">
                  <label className="w-full">Location:</label>
                  <input
                    type="text"
                    name="Location"
                    value={form.Location}
                    placeholder="Location?"
                    id="location"
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg"
                  />
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

export default CreateHelp;
