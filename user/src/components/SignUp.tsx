import { useState } from "react";
import { useSignUpMutation } from "../generated/graphql";

const SignUp = ({ click }: { click: () => void }) => {
  const [signUp, { loading }] = useSignUpMutation();
  const [formError, setFormError] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    try {
      const response = await signUp({
        variables: { input: newUser },
      });
      if (response.data?.signUp.errors === null) {
        click();
      } else if (response.data?.signUp.errors) {
        console.log(response.data.signUp.errors);
        const errorsObject: { [key: string]: string } = {};
        response.data.signUp.errors.forEach((err) => {
          errorsObject[err.field] = err.message;
        });

        setFormError(errorsObject);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="relative bg-white p-10 rounded-lg shadow-md w-1/3">
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <div className="text-sky-400 text-xl font-bold mb-6">Sign Up</div>
            <div className="w-2/3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-start my-3 gap-4"
              >
                <div className="flex flex-col gap-2 text-slate-500 w-full">
                  <div className="flex justify-between">
                    <label className="w-full">User Name:</label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      placeholder="User Name"
                      id="username"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-1 w-full"
                    />
                  </div>
                  {formError.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {formError.username}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-slate-500 w-full">
                  <div className="flex justify-between">
                    <label className="w-full">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={form.email}
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      className="border w-full border-gray-300 rounded-lg p-1"
                    />
                  </div>
                  {formError.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formError.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-slate-500 w-full">
                  <div className="flex justify-between">
                    <label className="w-full">Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      className="border w-full border-gray-300 rounded-lg p-1"
                    />
                  </div>
                  {formError.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formError.password}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 justify-between w-full flex-wrap">
                  <div className="flex gap-4 text-slate-500 w-full">
                    <div className="flex justify-center items-center gap-2">
                      <label className="text-sm">Resident:</label>
                      <input
                        type="radio"
                        name="role"
                        value="resident"
                        placeholder="resident"
                        id="resident"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-slate-500 w-full">
                    <div className="flex justify-center items-center gap-2">
                      <label className="text-sm">Business Owner:</label>
                      <input
                        type="radio"
                        name="role"
                        value="business-owner"
                        placeholder="business-owner"
                        id="business-owner"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-slate-500 w-full">
                    <div className="flex justify-center items-center gap-2">
                      <label className="text-sm">Community Organizer:</label>
                      <input
                        type="radio"
                        name="role"
                        value="community_organizer"
                        placeholder="community_organizer"
                        id="community_organizer"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex self-center gap-3 mt-4">
                  <button type="submit" className="bg-amber-100 p-3 rounded-lg">
                    Submit
                  </button>
                  <button onClick={click} className="bg-red-200 p-3 rounded-lg">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
