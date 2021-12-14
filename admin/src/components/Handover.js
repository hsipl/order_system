import React from "react";
import styled from "styled-components";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Navbar from "../components/Navbar";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";

const HandoverCon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    首頁
  </Link>,
  <Typography underline="hover" key="2" color="text.primary" href="/handover">
    交班紀錄
  </Typography>,
];

const Handover = () => {
  const [value, setValue] = React.useState(null);
  return (
    <>
      <Navbar />
      <HandoverCon id="handover">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="選擇日期"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br /> <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                    width: "25%",
                  }}
                >
                  交班人
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                    width: "25%",
                  }}
                >
                  系統金額
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                    width: "25%",
                  }}
                >
                  實際金額
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                    width: "25%",
                  }}
                >
                  交班時間
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableCell align="center" style={{ width: "25%" }}>
              A
            </TableCell>
            <TableCell align="center" style={{ width: "25%" }}>
              30000
            </TableCell>
            <TableCell align="center" style={{ width: "25%" }}>
              30000
            </TableCell>
            <TableCell align="center" style={{ width: "25%" }}>
              2020.12.13
            </TableCell>
          </Table>
        </TableContainer>
      </HandoverCon>
    </>
  );
};

export default Handover;
