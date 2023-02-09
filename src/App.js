import "./styles.css";
import BasicTable from "./Components/Table";
import NavBar from "./Components/Header"

export default function App() {
  return (
    <div className="App">
      <NavBar/>
      <h2>PILYTIX Scored Opportunities</h2>
      <BasicTable></BasicTable>
    </div>
  );
}
