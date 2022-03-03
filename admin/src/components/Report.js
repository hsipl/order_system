import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Report = () => {
  const [branch, setBranch] = React.useState("");

  const handleChange = (event) => {
    setBranch(event.target.value);
  };

  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  return (
    <>

      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="財務報表" />
          <Box>
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">選取分店</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={branch}
              label="branch"
              onChange={handleChange}
            >
              <MenuItem value={1}>分店一</MenuItem>
              <MenuItem value={2}>分店二</MenuItem>
              <MenuItem value={3}>分店三</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          {/* <DatePicker
            label="選取起始時間"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        {/* </LocalizationProvider> */}
        <span>&emsp;</span>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          {/* <DatePicker
            label="選取結束時間"
            value={value2}
            onChange={(newValue) => {
              setValue2(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        {/* </LocalizationProvider> */}
        <span>&emsp;</span>
        <img src="https://img.icons8.com/ios-filled/50/000000/search--v1.png" />
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
                    width: "33%",
                  }}
                >
                  產品名稱
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                    width: "33%",
                  }}
                >
                  銷售總額(元)
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                    width: "33%",
                  }}
                >
                  銷售總數(份)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell align="center">
                <TextField
                  id="input-with-sx"
                  label="搜尋產品"
                  variant="standard"
                  type="search"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">30</TableCell>
              <TableCell align="center">1</TableCell>
            </TableRow>

            
          </Table>

        </TableContainer>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Report;
