import React, { useEffect } from "react";
import axios from "axios";
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
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [allStore, setAllStore] = React.useState([]);
  const url = "http://localhost:8000/api/store";

  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handleChange = (event) => {
    setBranch(event.target.value);
  };

  useEffect(() => {
    const get_api = async () => {
      let { data } = await axios.get(url, config);
      for (var i = 0; i < data.length; i++) {
        setAllStore((preData) => [...preData, data[i].name]);
      }
    };
    get_api();
  }, []);

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
              {allStore.map((item, index) => (
                <MenuItem value={index}>{item}</MenuItem>
              ))}
            </SearchBox>
            <Stack direction="row">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="選取起始時間"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => (
                    <SearchBox variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="選取結束時間"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
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
