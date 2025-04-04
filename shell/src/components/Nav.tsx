import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { isServer } from "../utils/isServer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
    fetchPolicy: "network-only",
  });
  const apollo = useApolloClient();
  const [name, setName] = useState<string | undefined>("");

  useEffect(() => {
    if (!loading) {
      setName(data?.me?.Username);
    }
  }, [data, loading]);

  return (
    <div className="bg-amber-100 w-full flex justify-between items-center p-3">
      <h1
        onClick={() => navigate("/home")}
        className="text-amber-500 text-2xl font-bold"
      >
        Post Manager
      </h1>
      <div className="flex justify-center items-center gap-3">
        <div className="text-xl text-amber-300">{name}</div>
        <button
          onClick={async () => {
            await logout();
            await apollo.resetStore();
            navigate("/");
          }}
          className="text-amber-500 text-xl font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
