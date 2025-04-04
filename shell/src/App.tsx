import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" key={"main"} element={<Main />} />
        <Route path="/home" key={"home"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
