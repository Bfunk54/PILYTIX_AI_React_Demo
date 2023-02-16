import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from "@mui/material/Tooltip";
import "./Table/Table.css";
import { styled } from "@mui/system";

// Data JSON Import
import * as opportunities from "./Table/opportunities.json";

// Chart Js Imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart Js Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

// MUI Styled Components

const NextButtons = styled(Button)({
  borderRadius: "40px",
  backgroundColor: "rgba(23, 185, 255, 0.35)",
  border: "1px solid",
  borderColor: "rgb(23, 129, 221)",
  color: "rgb(2, 47, 41)",
  backdropFilter: "blur(10px)",
  textTransform: "none",
  fontSize: "14px",
  ":hover": { backgroundColor: "rgb(23, 162, 221)", fontSize: "14.2px" },
});

const HeadersText = styled(Typography)({
  backgroundColor: "rgba(245, 245, 245, 0.6)",
  backdropFilter: "blur(10px)",
  width: "86%",
  borderRadius: "20px",
  textAlign: "center",
  padding: "6px",
});

const HeaderCell = styled(TableCell)({
  backgroundColor: "rgba(23, 185, 255, 0.85)",
  fontSize: "16px"
});

const ChartDiv = styled("div")({
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.45)",
  backdropFilter: "blur(10px)",
  height: "280px",
  width: "550px",
});

export const probOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export const pxIncreaseOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Probability History",
    },
  },
};

export default function BasicTable() {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;
  const mainColumns = [{ field: 'oppName', headerName: 'Opp Name', width: 280, headerAlign: "center" },
  { field: 'stage', headerName: 'Opp Stage', width: 180, headerAlign: "center" },
  { field: 'repProbability', headerName: 'Rep Probability', width: 120, headerAlign: "center" },
  { field: 'pilytixProbability', headerName: 'PX Probability', width: 120, headerAlign: "center" },
  { field: 'pilytixTier', headerName: 'PX Tier', width: 70, headerAlign: "center" },
  { field: 'amount', headerName: 'Amount', width: 80, headerAlign: "center" },
  { field: 'product', headerName: 'Product', width: 90, headerAlign: "center" },
  { field: 'salesRepName', headerName: 'Sales Rep', width: 95, headerAlign: "center" },
];

  function handleRowClick(params, event) {
    const row = params.row;
    setTheRow(row);
    setIncreaseData(row.pilytixFactorsIncreasingWin);
    setDecreaseData(row.pilytixFactorsDecreasingWin);
    setAnchorEl(event.currentTarget);
    console.log(event, params);
    probChartData(row);
  }

  function handleNextClick(event, row) {
    if (row.oppId < 10) {
      const newRowId = row.oppId + 1;
      const newRow = data.find(({ oppId }) => oppId === newRowId);
      setTheRow(newRow);
    } else {
      return;
    }
  }

  function handlePreviousClick(event, row) {
    if (row.oppId > 1) {
      const newRowId = row.oppId - 1;
      const newRow = data.find(({ oppId }) => oppId === newRowId);
      setTheRow(newRow);
    } else {
      return;
    }
  }

  const [theRow, setTheRow] = React.useState([]);
  const [increaseData, setIncreaseData] = React.useState([]);
  const [decreaseData, setDecreaseData] = React.useState([]);

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
  const [incWeightData, setIncWeightData] = useState();
  const [amountOrderDirection, setAmountOrderDirection] = useState("asc");
  const [pxProbOrderDirection, setPxProbOrderDirection] = useState("asc");
  const [pxTierOrderDirection, setPxTierOrderDirection] = useState("asc");
  const [repProbOrderDirection, setRepProbOrderDirection] = useState("asc");
  const [incWeightValDirection, setIncWeightValDirection] = useState("asc");
  const [decWeightValDirection, setDecWeightValDirection] = useState("asc");
  const [theProbChartData, setProbChartData] = useState([]);

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

  const sortIncWeightVal = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.weight.value > b.weight.value
            ? 1
            : b.weight.value > a.weight.value
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.weight.value < b.weight.value
            ? 1
            : b.weight.value < a.weight.value
            ? -1
            : 0
        );
    }
  };

  const handleIncWeightValSort = (event) => {
    setIncreaseData(sortIncWeightVal(increaseData, incWeightValDirection));
    setIncWeightValDirection(incWeightValDirection === "asc" ? "desc" : "asc");
  };

  const sortDecWeightVal = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.weight.value > b.weight.value
            ? 1
            : b.weight.value > a.weight.value
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.weight.value < b.weight.value
            ? 1
            : b.weight.value < a.weight.value
            ? -1
            : 0
        );
    }
  };

  const handleDecWeightValSort = (event) => {
    setDecreaseData(sortDecWeightVal(decreaseData, decWeightValDirection));
    setDecWeightValDirection(decWeightValDirection === "asc" ? "desc" : "asc");
  };

  let probHistoryData = [];

  const probChartData = (row) => {
    let daysAgo = (row.probabilityHistory || []).map(({ daysAgo }) => daysAgo);
    let pilytixProb = (row.probabilityHistory || []).map(
      ({ pilytixProb }) => pilytixProb
    );
    let repProb = (row.probabilityHistory || []).map(({ repProb }) => repProb);
    daysAgo.sort(function (a, b) {
      return a - b;
    });
    probHistoryData = {
      labels: daysAgo,
      datasets: [
        { label: "PX Probability", data: pilytixProb },
        { label: "Rep Probability", data: repProb },
      ],
    };
    setProbChartData(probHistoryData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 18,
      }}
    >
      <Typography
        sx={{
          marginBottom: "20px",
          backgroundColor: "rgba(245, 245, 245, 0.65)",
          backdropFilter: "blur(10px)",
          width: "48%",
          borderRadius: "20px",
          "@media (max-width: 525px)": {
            width: "82%",
          },
        }}
        variant="h4"
        component="h2"
      >
        PILYTIX Scored Opportunities
      </Typography>
      <Container
        sx={{ borderRadius: "20px", height: 620, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
        className="theCard"
      >
        <div style={{ height: 530, width: "90%" }}>
        <DataGrid
        sx={{height: 530, textAlign: "center", borderRadius: "20px"}}
rows={rowData}
columns={mainColumns}
getRowId={(rowData) => rowData.oppId}
// autoHeight
density= "comfortable"
disableColumnSelector= {true}
hideFooter= {true}
onRowClick={(params, event) => handleRowClick(params, event)}
key={rowData.oppId}
        />
        </div>
        {/* <Table
        options={{
          responsive: "scroll",
        }}
         stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <HeaderCell sx={{ borderTopLeftRadius: "20px" }} align="left">
                {" "}
                <HeadersText sx={{ width: "60%" }}>Opp Name</HeadersText>
              </HeaderCell>
              <HeaderCell align="left">
                <HeadersText sx={{ width: "60%" }}>Opp Stage</HeadersText>
              </HeaderCell>
              <HeaderCell align="right" onClick={handleRepProbSortRequest}>
                <TableSortLabel active={true} direction={repProbOrderDirection}>
                  <HeadersText>Rep Probability</HeadersText>
                </TableSortLabel>
              </HeaderCell>
              <HeaderCell align="right" onClick={handlePxProbSortRequest}>
                <TableSortLabel active={true} direction={pxProbOrderDirection}>
                  <HeadersText>PX Probability</HeadersText>
                </TableSortLabel>
              </HeaderCell>
              <HeaderCell align="left" onClick={handlePxTierSortRequest}>
                <TableSortLabel active={true} direction={pxTierOrderDirection}>
                  <HeadersText>PX Tier</HeadersText>
                </TableSortLabel>
              </HeaderCell>
              <HeaderCell align="right" onClick={handleAmountSortRequest}>
                <TableSortLabel active={true} direction={amountOrderDirection}>
                  <HeadersText>Amount</HeadersText>
                </TableSortLabel>
              </HeaderCell>
              <HeaderCell align="left">
                <HeadersText>Product</HeadersText>
              </HeaderCell>
              <HeaderCell
                sx={{
                  borderTopRightRadius: "20px",
                }}
                align="left"
              >
                <HeadersText>Sales Rep</HeadersText>
              </HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ borderBottomLeftRadius: "20px" }}>
            {rowData.map((row) => (
              <TableRow
                onClick={(event) => handleRowClick(event, row)}
                key={row.oppId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  // ":hover": { backgroundColor: "#2ecdb0" },
                  "&:last-child th": { borderBottomLeftRadius: "20px" },
                  "&tr td": { fontSize: "14px" },
                }}
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
                <TableCell style={{ color: "black" }} align="left">
                  {row.salesRepName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </Container>
      <Popover
        id={theRow.oppId}
        key={theRow.oppId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference={"none"}
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(10px)",
            marginBottom: "-40px",
          }}
        >
          <CardContent className="theCard">
            <h3 style={{ textAlign: "center", margin: 0 }}>{theRow.oppName}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                maxWidth: 1260,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {theRow.probabilityHistory ? (
                  <div
                    style={{
                      height: "320px",
                      width: "550px",
                      background: "rgba(255, 255, 255, .0)",
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                  >
                    <h4 style={{ textAlign: "center" }}>Probability History</h4>
                    <ChartDiv>
                      <Line
                        height="280px"
                        width="550px"
                        options={probOptions}
                        data={theProbChartData}
                      />
                    </ChartDiv>
                  </div>
                ) : (
                  <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                    No Probability Chart Data
                  </h4>
                )}
                {theRow.pilytixFactorsDecreasingWin ? (
                  <div style={{ marginTop: 10, marginRight: 10 }}>
                    <h4 style={{ textAlign: "center" }}>
                      PX Factors Decreasing Win
                    </h4>
                    <TableContainer
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                        maxHeight: 260,
                      }}
                    >
                      <Table
                        size="small"
                        style={{ maxWidth: "540px" }}
                        stickyHeader
                        aria-label="sticky table"
                      >
                        <TableHead>
                          <TableRow>
                            <HeaderCell
                              sx={{
                                borderTopLeftRadius: "20px",
                                width: "12%",
                              }}
                              align="left"
                            >
                              <HeadersText>Name</HeadersText>
                            </HeaderCell>
                            <HeaderCell sx={{ width: "38%" }} align="left">
                              <HeadersText>Message</HeadersText>
                            </HeaderCell>
                            <HeaderCell
                              sx={{ width: "8%" }}
                              align="left"
                              onClick={handleDecWeightValSort}
                            >
                              <TableSortLabel
                                active={true}
                                direction={decWeightValDirection}
                              >
                                <HeadersText>Weight Value</HeadersText>
                              </TableSortLabel>
                            </HeaderCell>
                            <HeaderCell
                              sx={{
                                borderTopRightRadius: "20px",
                                width: "12%",
                              }}
                              align="left"
                            >
                              <HeadersText>Weight Description</HeadersText>
                            </HeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(theRow.pilytixFactorsDecreasingWin || []).map(
                            (row, i) => (
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell sx={{ height: "8%" }}>
                                  {row.name}
                                </TableCell>
                                <TableCell sx={{ height: "8%" }}>
                                  {row.message}
                                </TableCell>
                                <TableCell sx={{ height: "8%" }}>
                                  {row.weight.value}
                                </TableCell>
                                <TableCell sx={{ height: "8%" }}>
                                  {row.weight.description}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                    No PX Factors Decreasing Win
                  </h4>
                )}
              </div>
              {theRow.pilytixFactorsIncreasingWin ? (
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    PX Factors Increasing Win
                  </h4>
                  <TableContainer
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "20px",
                      maxHeight: 300,
                    }}
                  >
                    <Table
                      size="small"
                      style={{ maxWidth: "550px" }}
                      stickyHeader
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          <HeaderCell
                            sx={{
                              borderTopLeftRadius: "20px",
                              width: "12%",
                            }}
                            align="left"
                          >
                            <HeadersText>Name</HeadersText>
                          </HeaderCell>
                          <HeaderCell sx={{ width: "38%" }} align="left">
                            <HeadersText>Message</HeadersText>
                          </HeaderCell>
                          <HeaderCell
                            sx={{ width: "8%" }}
                            align="left"
                            onClick={handleIncWeightValSort}
                          >
                            <TableSortLabel
                              active={true}
                              direction={incWeightValDirection}
                            >
                              <HeadersText>Weight Value</HeadersText>
                            </TableSortLabel>
                          </HeaderCell>
                          <HeaderCell
                            sx={{
                              borderTopRightRadius: "20px",
                              width: "12%",
                            }}
                            align="left"
                          >
                            <HeadersText>Weight Description</HeadersText>
                          </HeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(theRow.pilytixFactorsIncreasingWin || []).map(
                          (row, i) => (
                            <TableRow
                              key={i}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell sx={{ height: "10%" }}>
                                {row.name}
                              </TableCell>
                              <TableCell sx={{ height: "10%" }}>
                                {row.message}
                              </TableCell>
                              <TableCell sx={{ height: "10%" }}>
                                {row.weight.value}
                              </TableCell>
                              <TableCell sx={{ height: "10%" }}>
                                {row.weight.description}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                  No PX Factors Increasing Win
                </h4>
              )}
            </div>
            <div
              className="nextButtonContainer"
              style={{ marginTop: 20, marginBottom: 26 }}
            >
              <NextButtons
                sx={{ marginRight: 5 }}
                onClick={(event) => handlePreviousClick(event, theRow)}
              >
                <ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
                Previous
              </NextButtons>
              <NextButtons onClick={(event) => handleNextClick(event, theRow)}>
                Next<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
              </NextButtons>
            </div>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}
