import { useState } from "react";
import { createPortal } from "react-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
const UserComp = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  return (
    <>
      {login &&
        createPortal(<Login click={() => setLogin(!login)} />, document.body)}
      {signUp &&
        createPortal(
          <SignUp click={() => setSignUp(!signUp)} />,
          document.body,
        )}
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-10 text-3xl font-bold text-sky-400">Post & Help</h1>
        <div className="flex gap-4">
          <button
            className="bg-amber-100 p-3 rounded-lg"
            onClick={() => setLogin(!login)}
          >
            Log in
          </button>
          <button
            className="bg-amber-300 p-3 rounded-lg"
            onClick={() => setSignUp(!signUp)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default UserComp;
