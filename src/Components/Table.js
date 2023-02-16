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
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DataGrid } from "@mui/x-data-grid";
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
  fontSize: "16px",
});

const ChartDiv = styled("div")({
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.3)",
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
  const mainColumns = [
    {
      field: "oppName",
      headerName: "Opp Name",
      width: 280,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "stage",
      headerName: "Opp Stage",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "repProbability",
      headerName: "Rep Probability",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "pilytixProbability",
      headerName: "PX Probability",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "pilytixTier",
      headerName: "PX Tier",
      width: 70,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 80,
      headerAlign: "center",
      headerClassName: "headers",
    },
    {
      field: "product",
      headerName: "Product",
      width: 90,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "salesRepName",
      headerName: "Sales Rep",
      width: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
  ];

  const cardColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 105,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "message",
      headerName: "Message",
      width: 213,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
    },
    {
      field: "weight.value",
      headerName: "Weight Value",
      width: 105,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
      valueGetter: (params) => {
        return params.row.weight.value;
      },
    },
    {
      field: "weight.description",
      headerName: "Weight Description",
      width: 135,
      headerAlign: "center",
      align: "center",
      headerClassName: "headers",
      valueGetter: (params) => {
        return params.row.weight.description;
      },
    },
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
      probChartData(newRow);
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
  const [theProbChartData, setProbChartData] = useState([]);

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
        { label: "PX Probability", data: pilytixProb, borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5' },
        { label: "Rep Probability", data: repProb, borderColor: 'rgb(16, 207, 140)',
        backgroundColor: 'rgb(95, 245, 215)' },
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
        sx={{
          borderRadius: "20px",
          height: 620,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        className="theCard"
      >
        <div style={{ height: 530, width: "90%" }}>
          <DataGrid
            sx={{ height: 530, textAlign: "center", borderRadius: "20px" }}
            rows={rowData}
            columns={mainColumns}
            getRowId={(rowData) => rowData.oppId}
            density="comfortable"
            disableColumnSelector={true}
            hideFooter={true}
            disableSelectionOnClick={true}
            onRowClick={(params, event) => handleRowClick(params, event)}
            key={rowData.oppId}
          />
        </div>
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
            <h3 style={{ textAlign: "center", backgroundColor: "rgba(245, 245, 245, 0.6)",
                width: "24%", borderRadius: "20px", margin: 0, padding: 8 }}>{theRow.oppName}</h3>
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
                      height: "280px",
                      width: "550px",
                      background: "rgba(255, 255, 255, .0)",
                      marginRight: 10,
                      marginBottom: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <h4 style={{ textAlign: "center", backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "32%", borderRadius: "20px", padding: 4  }}>Probability History</h4>
                    <ChartDiv>
                      <Line
                        height="270px"
                        width="550px"
                        options={probOptions}
                        data={theProbChartData}
                      />
                    </ChartDiv>
                  </div>
                ) : (
                  <h4 style={{ textAlign: "center", marginTop: "40px", backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "32%", borderRadius: "20px", padding: 4 }}>
                    No Probability Chart Data
                  </h4>
                )}
                {theRow.pilytixFactorsDecreasingWin ? (
                  <div style={{ marginTop: 10, marginRight: 10, display: "flex",
                  flexDirection: "column",
                  alignItems: "center"}}>
                    <h4 style={{ textAlign: "center", backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "38%", borderRadius: "20px", padding: 4 }}>
                      PX Factors Decreasing Win
                    </h4>
                    <Box
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                        maxHeight: 260,
                        width: 560,
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    >
                      <DataGrid
                        sx={{
                          height: 260,
                          textAlign: "center",
                          borderRadius: "20px",
                          width: "100%",
                        }}
                        rows={theRow.pilytixFactorsDecreasingWin}
                        columns={cardColumns}
                        getRowId={(row) => row.name}
                        density="comfortable"
                        disableColumnSelector={true}
                        hideFooter={true}
                        disableSelectionOnClick={true}
                        key={theRow.oppId}
                      />
                    </Box>
                  </div>
                ) : (
                  <h4 style={{ textAlign: "center", marginTop: "40px", backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "32%", borderRadius: "20px", padding: 4 }}>
                    No PX Factors Decreasing Win
                  </h4>
                )}
              </div>
              {theRow.pilytixFactorsIncreasingWin ? (
                <div style={{display: "flex",
                flexDirection: "column",
                alignItems: "center"}}>
                  <h4 style={{ textAlign: "center", backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "38%", borderRadius: "20px", padding: 4 }}>
                    PX Factors Increasing Win
                  </h4>

                  <Box
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "20px",
                      maxHeight: 260,
                      width: 560,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <DataGrid
                      sx={{
                        height: 260,
                        textAlign: "center",
                        borderRadius: "20px",
                        width: "100%",
                      }}
                      rows={theRow.pilytixFactorsIncreasingWin}
                      columns={cardColumns}
                      getRowId={(row) => row.name}
                      density="comfortable"
                      disableColumnSelector={true}
                      hideFooter={true}
                      disableSelectionOnClick={true}
                      key={theRow.oppId}
                    />
                  </Box>
                </div>
              ) : (
                <h4 style={{ textAlign: "center", marginTop: "40px", backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "32%", borderRadius: "20px", padding: 4 }}>
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
