import { lazy, Suspense, useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useNavigate } from "react-router-dom";

const UserComponent = lazy(() => import("user/UserComp"));

const Main = () => {
  const navigate = useNavigate();
  const { data, refetch } = useMeQuery({ skip: isServer() });
  useEffect(() => {
    if (data?.me) {
      refetch();
      navigate("/home");
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Suspense fallback={"loading"}>
        <UserComponent />
      </Suspense>
    </div>
  );
};

export default Main;
