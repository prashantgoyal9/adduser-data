import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route element={<Home />} path="/Home"></Route>
    <Route element={<Login />} path="/login"></Route>
    <Route element={<Registration />} path="/"></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
