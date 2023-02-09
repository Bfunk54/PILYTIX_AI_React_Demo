import "./styles.css";
import BasicTable from "./Components/Table";
import NavBar from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<BasicTable />} />
        </Routes>
      </div>
    </Router>
  );
}
