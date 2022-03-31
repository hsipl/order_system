import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import {DatePicker,LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import { SearchBox, SearchContainer } from "./SearchAndForm";
import { Search } from "@material-ui/icons";
import { TableHeads } from "./Table";

const Handover = () => {
  const [value, setValue] = React.useState(null);
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="交班紀錄" />
          <SearchContainer>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="選擇日期"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <SearchBox variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
            <Button size="large" color="inherit">
              <Search fontSize="large" />
            </Button>
          </SearchContainer>
          <TableContainer component={Paper}>
            <Table>
              <TableHeads id="handover" />
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
