import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { DashBoard } from "./components/pages/DashBoard/DashBoard";
import { Login } from "./components/pages/Login/Login";
import { CreateQuote } from "./components/pages/CreateQuote/CreateQuote";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create-new" element={<CreateQuote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
