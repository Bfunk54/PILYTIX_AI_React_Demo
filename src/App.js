import "./styles.css";
import BasicTable from "./Components/Table";
import NavBar from "./Components/Header"
import Typography from "@mui/material/Typography"

export default function App() {
  return (
    <div className="App">
      <NavBar/>
      <Typography className="scored" variant="h4" component="h2">PILYTIX Scored Opportunities</Typography>
      <BasicTable></BasicTable>
    </div>
  );
}
