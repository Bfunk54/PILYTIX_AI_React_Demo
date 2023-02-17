// React router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import DataTable from "./Components/Table";
import NavBar from "./Components/Header";

// Background image
import background from "./images/textureBackground.WebP";

// External CSS
import "./styles.css";

// Create background style
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
    // Return the router with all components
    <Router>
      <div style={backgroundStyle} className="App">
        <NavBar />
        <main style={{ padding: 18, paddingTop: 85 }}>
          <Routes>
            <Route path="/" element={<DataTable />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
