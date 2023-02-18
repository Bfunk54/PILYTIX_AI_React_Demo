//  React components
import * as React from "react";
import { useState } from "react";

// MUI components
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DataGrid } from "@mui/x-data-grid";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

// External CSS
import "./Table/Table.css";

// Data JSON
import * as opportunities from "./Table/opportunities.json";

// Chart Js components
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

// MUI styled components

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

const PopRowDiv = styled("div")({
  marginTop: 20,
  height: 100,
  width: "998px",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  "@media (max-width: 1042px)": { width: "700px" },
  "@media (max-width: 740px)": { width: "330px" },
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

const HeadersText = styled(Typography)({
  backgroundColor: "rgba(245, 245, 245, 0.65)",
  width: "86%",
  borderRadius: "18px",
  textAlign: "center",
  padding: "6px",
});

const HeaderCell = styled(TableCell)({
  backgroundColor: "rgba(23, 185, 255, 0.85)",
  fontSize: "16px",
});

// Export ChartJs options
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

export default function BasicTable() {
  //  Data from opportunities.json
  const data = opportunities.default;

  // React Use States
  const [rowData, setRowData] = useState(data);
  const [theRow, setTheRow] = React.useState([]);
  const [theDataRow, setTheDataRow] = React.useState([theRow]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [theProbChartData, setProbChartData] = useState([]);
  const [amountOrderDirection, setAmountOrderDirection] = useState("asc");
  const [pxProbOrderDirection, setPxProbOrderDirection] = useState("asc");
  const [pxTierOrderDirection, setPxTierOrderDirection] = useState("asc");
  const [repProbOrderDirection, setRepProbOrderDirection] = useState("asc");
  const [nextBtn, setNextBtn] = useState();
  const [prevBtn, setPrevBtn] = useState();

  // MUI DataGrid Column Props
  const mainColumns = [
    {
      field: "oppName",
      headerName: "Opp Name",
      width: 240,
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
  function handleRowClick(event, row) {
    if (data.indexOf(row) === 9) {
      setTheRow(row);
      setTheDataRow([row]);
      setAnchorEl(event.currentTarget);
      probChartData(row);
      setNextBtn("none");
      setPrevBtn("visible");
    } else if (data.indexOf(row) === 0) {
      setTheRow(row);
      setTheDataRow([row]);
      setAnchorEl(event.currentTarget);
      probChartData(row);
      setPrevBtn("none");
      setNextBtn("visible");
    } else {
      setTheRow(row);
      setTheDataRow([row]);
      setAnchorEl(event.currentTarget);
      probChartData(row);
      setNextBtn("visible");
      setPrevBtn("visible");
    }
  }
  const open = Boolean(anchorEl);

  // Handle the Next and Previous button clicks in the Popover
  function handleNextClick(event, row) {
    console.log(data.indexOf(row));
    if (data.indexOf(row) === 0) {
      setPrevBtn("visible");
    }
    if (data.indexOf(row) === 8) {
      setNextBtn("none");
    }
    if (data.indexOf(row) < 9) {
      const newRowIndex = data.indexOf(row) + 1;
      const newRow = data[newRowIndex];
      setTheRow(newRow);
      setTheDataRow([newRow]);
      probChartData(newRow);
    }
  }

  function handlePreviousClick(event, row) {
    if (data.indexOf(row) === 1) {
      setPrevBtn("none");
    }
    if (data.indexOf(row) === 9) {
      setNextBtn("visible");
    }
    if (data.indexOf(row) > 0) {
      const newRowIndex = data.indexOf(row) - 1;
      const newRow = data[newRowIndex];
      setTheRow(newRow);
      setTheDataRow([newRow]);
      probChartData(newRow);
    }
  }

  // Handle closing the Popover
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  // Format Probability History data to work with ChartJs
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

  // Set media query to check if the user is on mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    // Main Table
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
        <div style={{ height: 530, width: "86.58%" }}>
          <TableContainer
            sx={{ height: 530, width: "auto", borderRadius: "20px" }}
          >
            <Table
              options={{
                responsive: "scroll",
              }}
              stickyHeader
              aria-label="sticky table"
              sx={{ tableLayout: "fixed" }}
            >
              <colgroup>
                <col width="240px" />
                <col width="120px" />
                <col width="140px" />
                <col width="140px" />
                <col width="100px" />
                <col width="120px" />
                <col width="120px" />
                <col width="140px" />
              </colgroup>
              <TableHead>
                <TableRow>
                  <HeaderCell sx={{ borderTopLeftRadius: "20px" }} align="left">
                    <HeadersText>Opp Name</HeadersText>
                  </HeaderCell>
                  <HeaderCell align="left">
                    <HeadersText>Opp Stage</HeadersText>
                  </HeaderCell>
                  <HeaderCell align="right" onClick={handleRepProbSortRequest}>
                    <TableSortLabel
                      active={true}
                      direction={repProbOrderDirection}
                    >
                      <HeadersText>Rep Probability</HeadersText>
                    </TableSortLabel>
                  </HeaderCell>
                  <HeaderCell align="right" onClick={handlePxProbSortRequest}>
                    <TableSortLabel
                      active={true}
                      direction={pxProbOrderDirection}
                    >
                      <HeadersText>PX Probability</HeadersText>
                    </TableSortLabel>
                  </HeaderCell>
                  <HeaderCell align="left" onClick={handlePxTierSortRequest}>
                    <TableSortLabel
                      active={true}
                      direction={pxTierOrderDirection}
                    >
                      <HeadersText>PX Tier</HeadersText>
                    </TableSortLabel>
                  </HeaderCell>
                  <HeaderCell align="right" onClick={handleAmountSortRequest}>
                    <TableSortLabel
                      active={true}
                      direction={amountOrderDirection}
                    >
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
              <TableBody sx={{ borderBottomLeftRadius: "20px", cursor: "pointer" }}>
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
                    <TableCell align="right">
                      {row.pilytixProbability}
                    </TableCell>
                    <TableCell align="left">{row.pilytixTier}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="left">{row.product}</TableCell>
                    <TableCell style={{ color: "black" }} align="left">
                      {row.salesRepName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Popover on row click */}
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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "auto",
          height: "100vh",
        }}
      >
        <div style={{ height: "90vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "fit-content",
              paddingBottom: "20px",
              width: "94vw",
            }}
          >
            {/* Close Icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                sx={{ padding: 0, maxWidth: "36px", minWidth: "36px" }}
                onClick={handleClose}
              >
                <CloseIcon sx={{ fontSize: 36 }} />
              </Button>
            </div>

            {/* Next and Previous Buttons and Popover row name */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!isMobile ? (
                <NextButtons
                  sx={{ marginRight: 3, height: 38.5, display: prevBtn }}
                  onClick={(event) => handlePreviousClick(event, theRow)}
                >
                  <ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
                  Previous
                </NextButtons>
              ) : (
                <NextButtons
                  sx={{ marginRight: 3, height: 38.5, display: prevBtn }}
                  onClick={(event) => handlePreviousClick(event, theRow)}
                >
                  <ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
                  Prev
                </NextButtons>
              )}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  backgroundColor: "rgba(245, 245, 245, 0.4)",
                  width: "420px",
                  borderRadius: "20px",
                  margin: 0,
                  padding: 2,
                  "@media (max-width: 770px)": {
                    width: "180px",
                  },
                  "@media (max-width: 525px)": {
                    width: "140px",
                  },
                }}
              >
                {theRow.oppName}
              </Typography>
              <NextButtons
                sx={{ marginLeft: 3, height: 38.5, display: nextBtn }}
                onClick={(event) => handleNextClick(event, theRow)}
              >
                Next<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
              </NextButtons>
            </div>

            {/* Original row data */}
            <PopRowDiv>
              <DataGrid
                sx={{
                  height: 100,
                  textAlign: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                }}
                rows={theDataRow}
                columns={mainColumns}
                getRowId={(theDataRow) => theDataRow.oppId}
                density="comfortable"
                disableColumnSelector={true}
                hideFooter={true}
                disableSelectionOnClick={true}
                headerHeight={32}
                onRowClick={(params, event) => handleRowClick(params, event)}
                key={theRow.oppId}
              />
            </PopRowDiv>

            {/* New data, originally not visible */}
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
                {/* Check if there is Probability History data, render chart if true */}
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
                {/* Check if there is Decreasing data, render chart if true */}
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

              {/* Check if there is Increasing Win data, render chart if true */}
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
          </div>
        </div>
      </Popover>
    </div>
  );
}
