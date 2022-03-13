import React from "react";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import {
  MenuItem,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab/";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Search } from "@material-ui/icons";
import { SearchBox, SearchContainer } from "./SearchAndForm";
import { TableHeads } from "./Table";

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
          <Stack spacing={-3}>
            <SearchBox
              select
              variant="filled"
              value={branch}
              label="選取分店"
              onChange={handleChange}
              sx={{ width: "10rem" }}
            >
              <MenuItem value={1}>分店一</MenuItem>
              <MenuItem value={2}>分店二</MenuItem>
              <MenuItem value={3}>分店三</MenuItem>
            </SearchBox>
            <Stack direction="row">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="選取起始時間"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <SearchBox variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="選取結束時間"
                  value={value2}
                  onChange={(newValue) => {
                    setValue2(newValue);
                  }}
                  renderInput={(params) => (
                    <SearchBox variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
              <Button size="large" color="inherit">
                <Search fontSize="large" />
              </Button>
            </Stack>
          </Stack>
          <TableContainer component={Paper}>
            <Table>
              <TableHeads id="report" />

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
