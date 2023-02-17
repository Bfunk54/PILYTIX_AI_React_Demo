import * as React from "react";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DataGrid } from "@mui/x-data-grid";
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

const ChartDiv = styled("div")({
  height: "280px",
  width: "550px",
  background: "rgba(255, 255, 255, .0)",
  marginRight: 10,
  marginBottom: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 1196px)": {
    margin: 0,
  },
  "@media (max-width: 640px)": {
    width: "320px",
  },
});

const PopTableDiv = styled("div")({
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  maxHeight: 260,
  width: 560,
  paddingLeft: 0,
  paddingRight: 0,
  "@media (max-width: 640px)": {
    width: "320px",
    marginTop: "10px",
  },
});

const DecreaseDiv = styled("div")({
  marginTop: 10,
  marginRight: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 1196px)": {
    margin: 0,
  },
  "@media (max-width: 640px)": {
    width: "320px",
  },
});

const InnerChartDiv = styled("div")({
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.3)",
  height: "280px",
  width: "520px",
  "@media (max-width: 640px)": {
    width: "320px",
    marginBottom: "5px",
  },
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
  // React Use States
  const [theRow, setTheRow] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [theProbChartData, setProbChartData] = useState([]);
  const [nextBtn, setNextBtn] = useState();
  const [prevBtn, setPrevBtn] = useState();

  //  Data from opportunities.json
  const data = opportunities.default;

  // MUI DataGrid Column Props
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

  // Handle a row click
  function handleRowClick(params, event) {
    const row = params.row;
    if (row.oppId === 10) {
      setTheRow(row);
      setAnchorEl(event.currentTarget);
      probChartData(row);
      setNextBtn("none");
    }
    if (row.oppId === 1) {
      setTheRow(row);
      setAnchorEl(event.currentTarget);
      probChartData(row);
      setPrevBtn("none");
    } else {
      setTheRow(row);
      setAnchorEl(event.currentTarget);
      probChartData(row);
      setNextBtn("visible");
      setPrevBtn("visible");
    }
  }
  const open = Boolean(anchorEl);

  // Handle the Next and Previous button clicks in the Popover
  function handleNextClick(event, row) {
    if (row.oppId == 1) {
      setPrevBtn("visible");
    }
    if (row.oppId == 9) {
      setNextBtn("none");
    }
    if (row.oppId < 10) {
      const newRowId = row.oppId + 1;
      const newRow = data.find(({ oppId }) => oppId === newRowId);
      setTheRow(newRow);
      probChartData(newRow);
    }
  }

  function handlePreviousClick(event, row) {
    if (row.oppId == 2) {
      setPrevBtn("none");
    }
    if (row.oppId == 10) {
      setNextBtn("visible");
    }
    if (row.oppId > 1) {
      const newRowId = row.oppId - 1;
      const newRow = data.find(({ oppId }) => oppId === newRowId);
      setTheRow(newRow);
    } else {
      return;
    }
  }

  // Handle closing the Popover
  const handleClose = () => {
    setAnchorEl(null);
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
        {
          label: "PX Probability",
          data: pilytixProb,
          borderColor: "#36A2EB",
          backgroundColor: "#9BD0F5",
        },
        {
          label: "Rep Probability",
          data: repProb,
          borderColor: "rgb(16, 207, 140)",
          backgroundColor: "rgb(95, 245, 215)",
        },
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
      <div
        style={{
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
            rows={data}
            columns={mainColumns}
            getRowId={(data) => data.oppId}
            density="comfortable"
            disableColumnSelector={true}
            hideFooter={true}
            disableSelectionOnClick={true}
            onRowClick={(params, event) => handleRowClick(params, event)}
            key={data.oppId}
          />
        </div>
      </div>
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
          <CardContent
            style={{ background: "rgba(255, 255, 255, 0.4)" }}
            className="theCard"
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                backgroundColor: "rgba(245, 245, 245, 0.4)",
                width: "34%",
                borderRadius: "20px",
                margin: 0,
                padding: 2,
                "@media (max-width: 770px)": {
                  width: "68%",
                },
                "@media (max-width: 525px)": {
                  width: "98%",
                },
              }}
            >
              {theRow.oppName}
            </Typography>
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
                  <ChartDiv>
                    <h4
                      style={{
                        textAlign: "center",
                        backgroundColor: "rgba(245, 245, 245, 0.4)",
                        width: "32%",
                        borderRadius: "20px",
                        padding: 4,
                      }}
                    >
                      Probability History
                    </h4>
                    <InnerChartDiv className="lineChart">
                      <Line
                        // height="240px"
                        // width="550px"
                        options={probOptions}
                        data={theProbChartData}
                        // className="lineChart"
                      />
                    </InnerChartDiv>
                  </ChartDiv>
                ) : (
                  <h4
                    style={{
                      textAlign: "center",
                      marginTop: "40px",
                      backgroundColor: "rgba(245, 245, 245, 0.4)",
                      width: "32%",
                      borderRadius: "20px",
                      padding: 4,
                    }}
                  >
                    No Probability Chart Data
                  </h4>
                )}
                {theRow.pilytixFactorsDecreasingWin ? (
                  <DecreaseDiv>
                    <h4
                      style={{
                        textAlign: "center",
                        backgroundColor: "rgba(245, 245, 245, 0.4)",
                        width: "38%",
                        borderRadius: "20px",
                        padding: 4,
                      }}
                    >
                      PX Factors Decreasing Win
                    </h4>
                    <PopTableDiv>
                      <DataGrid
                        sx={{
                          height: 240,
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
                    </PopTableDiv>
                  </DecreaseDiv>
                ) : (
                  <h4
                    style={{
                      textAlign: "center",
                      marginTop: "40px",
                      backgroundColor: "rgba(245, 245, 245, 0.4)",
                      width: "32%",
                      borderRadius: "20px",
                      padding: 4,
                    }}
                  >
                    No PX Factors Decreasing Win
                  </h4>
                )}
              </div>
              {theRow.pilytixFactorsIncreasingWin ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgba(245, 245, 245, 0.4)",
                      width: "38%",
                      borderRadius: "20px",
                      padding: 4,
                    }}
                  >
                    PX Factors Increasing Win
                  </h4>

                  <PopTableDiv>
                    <DataGrid
                      sx={{
                        height: 240,
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
                  </PopTableDiv>
                </div>
              ) : (
                <div
                  style={{
                    borderRadius: "20px",
                    maxHeight: 260,
                    width: 560,
                    paddingLeft: 0,
                    paddingRight: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      marginTop: "40px",
                      backgroundColor: "rgba(245, 245, 245, 0.4)",
                      width: "42%",
                      borderRadius: "20px",
                      padding: 4,
                    }}
                  >
                    No PX Factors Increasing Win
                  </h4>
                </div>
              )}
            </div>
            <div
              className="nextButtonContainer"
              style={{ marginTop: 20, marginBottom: 26 }}
            >
              <NextButtons
                sx={{ marginRight: 5 }}
                onClick={(event) => handlePreviousClick(event, theRow)}
                style={{ display: prevBtn }}
              >
                <ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
                Previous
              </NextButtons>
              <NextButtons
                style={{ display: nextBtn }}
                onClick={(event) => handleNextClick(event, theRow)}
              >
                Next<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
              </NextButtons>
            </div>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}
