import "./styles.css";
import BasicTable from "./Components/Table";
import NavBar from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import background from "./images/textureBackground.jpg"

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  repeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  height: "100%",
  width: "100vw",
  zIndex: "-1",
};

export default function App() {
  return (
    <Router>
      <div style={backgroundStyle} className="App">
        <NavBar />
        <main style={{ padding: 18, paddingTop: 85 }}>
        <Routes>
          <Route path="/" element={<BasicTable />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}
