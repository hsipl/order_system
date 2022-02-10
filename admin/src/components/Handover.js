import React from "react";
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
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";


const Handover = () => {
  const [value, setValue] = React.useState(null);
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="交班紀錄" />
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
        <br /> 

        <br />
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
        </Content>
      </BodyContainer>
    </>
  );
};

export default Handover;
