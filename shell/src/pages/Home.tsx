import { lazy, Suspense } from "react";
import Nav from "../components/Nav";

const PostComponent = lazy(() => import("post/PostComp"));

const Home = () => {
  return (
    <div>
      <Nav />
      <div>
        <Suspense fallback={"loading"}>
          <PostComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
