import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./Table/Table.css";

import * as opportunities from "./Table/opportunities.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export default function BasicTable() {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  function handleRowClick(event, row) {
    setTheRow(row);
    setAnchorEl(event.currentTarget);
    setProbChartData(row);
    setHaveData(true);
  }

  const [theRow, setTheRow] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [rowData, setRowData] = useState(data);
  const [amountOrderDirection, setAmountOrderDirection] = useState("asc");
  const [pxProbOrderDirection, setPxProbOrderDirection] = useState("asc");
  const [pxTierOrderDirection, setPxTierOrderDirection] = useState("asc");
  const [repProbOrderDirection, setRepProbOrderDirection] = useState("asc");
  const [chartData, setChartData] = useState([]);
  const [haveData, setHaveData] = useState(false);

  const sortAmountArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.amount > b.amount ? 1 : b.amount > a.amount ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0
        );
    }
  };

  const handleAmountSortRequest = () => {
    setRowData(sortAmountArray(data, amountOrderDirection));
    setAmountOrderDirection(amountOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortPxProbArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.pilytixProbability > b.pilytixProbability
            ? 1
            : b.pilytixProbability > a.pilytixProbability
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.pilytixProbability < b.pilytixProbability
            ? 1
            : b.pilytixProbability < a.pilytixProbability
            ? -1
            : 0
        );
    }
  };

  const handlePxProbSortRequest = () => {
    setRowData(sortPxProbArray(data, pxProbOrderDirection));
    setPxProbOrderDirection(pxProbOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortPxTierArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.pilytixTier > b.pilytixTier
            ? 1
            : b.pilytixTier > a.pilytixTier
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.pilytixTier < b.pilytixTier
            ? 1
            : b.pilytixTier < a.pilytixTier
            ? -1
            : 0
        );
    }
  };

  const handlePxTierSortRequest = () => {
    setRowData(sortPxTierArray(data, pxTierOrderDirection));
    setPxTierOrderDirection(pxTierOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortRepProbArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.repProbability > b.repProbability
            ? 1
            : b.repProbability > a.repProbability
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.repProbability < b.repProbability
            ? 1
            : b.repProbability < a.repProbability
            ? -1
            : 0
        );
    }
  };

  const handleRepProbSortRequest = () => {
    setRowData(sortRepProbArray(data, repProbOrderDirection));
    setRepProbOrderDirection(repProbOrderDirection === "asc" ? "desc" : "asc");
  };

  let probHistoryData = [];
  let probHistoryDatasets = []; 

  const setProbChartData = (row) => {
    console.log(row.probabilityHistory || []);
    let daysAgo = (row.probabilityHistory || []).map(({daysAgo}) => daysAgo);
    let pilytixProb = (row.probabilityHistory || []).map(({pilytixProb}) => pilytixProb);
    let repProb = (row.probabilityHistory || []).map(({repProb}) => repProb);
    // daysAgo.push([(row.daysAgo)])
    // ))};
    
    probHistoryDatasets.push(daysAgo, pilytixProb, repProb)
    console.log(repProb);
//   {(row.probabilityHistory || []).map((row, i) => (
//     probHistoryDatasets.push({ datasets: [(row.daysAgo, row.pilytixProb, row.repProb)]})
  probHistoryData = {labels: "label", datasets: [{label: 'Days Ago', data: daysAgo}, {label: 'PX Prob', data: pilytixProb}, {label: 'Rep Prob', data: repProb}]};
    // ))};
    setChartData(probHistoryData);
    console.log(chartData);
  }
  return (
    /*  */
    <div>
      <Typography className="scored" variant="h4" component="h2">
        PILYTIX Scored Opportunities
      </Typography>
      <TableContainer
        sx={{ overflowX: "initial", borderRadius: "20px" }}
        component={Paper}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead sx={{ position: "sticky", top: "83.5px" }}>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#3abaff", borderTopLeftRadius: "20px" }}
                align="left"
              >
                Opp Name
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3abaff" }} align="left">
                Opp Stage
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#3abaff" }}
                align="right"
                onClick={handleRepProbSortRequest}
              >
                <TableSortLabel active={true} direction={repProbOrderDirection}>
                  Rep Probability
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#3abaff" }}
                align="right"
                onClick={handlePxProbSortRequest}
              >
                <TableSortLabel active={true} direction={pxProbOrderDirection}>
                  PX Probability
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#3abaff" }}
                align="left"
                onClick={handlePxTierSortRequest}
              >
                <TableSortLabel active={true} direction={pxTierOrderDirection}>
                  PX Tier
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#3abaff" }}
                align="right"
                onClick={handleAmountSortRequest}
              >
                <TableSortLabel active={true} direction={amountOrderDirection}>
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3abaff" }} align="left">
                Product
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#3abaff",
                  borderTopRightRadius: "20px",
                }}
                align="left"
              >
                Sales Rep
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow
                onClick={(event) => handleRowClick(event, row)}
                key={row.oppId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.oppName}
                </TableCell>
                <TableCell align="left">{row.stage}</TableCell>
                <TableCell align="right">{row.repProbability}</TableCell>
                <TableCell align="right">{row.pilytixProbability}</TableCell>
                <TableCell align="left">{row.pilytixTier}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="left">{row.product}</TableCell>
                <TableCell align="left">{row.salesRepName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={theRow.oppId}
        key={theRow.oppId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          background: "rgba(255, 255, 255, .55)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* <div className="card snake" >
          <div className="inner"> */}
        <Card className="popCard">
          <CardContent className="popCard">
            The content of the Popover.{theRow.oppName}
            <h2>Probability History</h2>
            {/* {(theRow.probabilityHistory || []).map((row, i) => ( */}
              <div >
                <Line options={options} data={chartData} />
                {console.log(chartData)}
                {/* <Typography>Days Ago: {row.daysAgo}</Typography>
                <Typography>PX Probability: {row.pilytixProb}</Typography>
                <Typography>Rep Probability: {row.repProb}</Typography> */}
              </div>
            {/* ))}  */}
            <h2>PX Factors Increasing Win</h2>
            {(theRow.pilytixFactorsIncreasingWin || []).map((row, i) => (
              <div key={i}>
                <Typography>Name: {row.name}</Typography>
                <Typography>Message: {row.message}</Typography>
                <Typography>Weight Value: {row.weight.value}</Typography>
                <Typography>
                  Weight Description: {row.weight.description}
                </Typography>
              </div>
            ))}
            <h2>PX Factors Decreasing Win</h2>
            {(theRow.pilytixFactorsDecreasingWin || []).map((row, i) => (
              <div key={i}>
                <Typography>Name: {row.name}</Typography>
                <Typography>Message: {row.message}</Typography>
                <Typography>Weight Value: {row.weight.value}</Typography>
                <Typography>
                  Weight Description: {row.weight.description}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* </div>
        </div> */}
      </Popover>
    </div>
  );
}
