import { useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

const Login = ({ click }: { click: () => void }) => {
  const navigate = useNavigate();
  const [login, { loading }] = useLoginMutation();
  const [formError, setFormError] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email: form.email,
      password: form.password,
    };
    try {
      const response = await login({
        variables: user,
      });
      if (response.data?.login.user) {
        click();
        navigate("/home");
      } else if (response.data?.login.errors) {
        const errorsObject: { [key: string]: string } = {};
        response.data.login.errors.forEach((err) => {
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
            <div className="text-sky-400 text-xl font-bold mb-6">Log in</div>
            <div className="w-2/3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-start my-3 gap-4"
              >
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
                      className="w-full border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                  {formError.Email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formError.Email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full text-slate-500">
                  <div className="flex justify-between">
                    <label className="w-full">Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                  {formError.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formError.password}
                    </p>
                  )}
                </div>
                <div className="flex self-center gap-3 mt-4">
                  <button type="submit" className="bg-amber-100 p-3 rounded-lg">
                    Login
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

export default Login;
