import React, { useState, useRef } from "react";
import styled from "styled-components";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const OrderCon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const Order = () => {
  const [lis, setLi] = useState([]);

  const [value, setValue] = useState("");

  const id = useRef(2);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      首頁
    </Link>,
    <Typography underline="hover" key="2" color="text.primary" href="/handover">
      員工管理
    </Typography>,
  ];

  return (
    <>
      <Navbar />
      <OrderCon>
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <br />
        <Button variant="contained">+ 新增商品</Button>
        <br /> <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                商品照片
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                商品名稱
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                價格
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                種類
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                操作
              </TableCell>
            </TableHead>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">30</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">1</TableCell>
            <Button>
              <DeleteIcon />
            </Button>
            <Button>
              <EditIcon />
            </Button>
            <Box>
              <Box sx={{ display: "flex", mx: 20, my: 1 }}>
                <TextField
                  id="input-with-sx"
                  label="搜尋產品"
                  variant="standard"
                  type="search"
                />
              </Box>
            </Box>
          </Table>
        </TableContainer>
      </OrderCon>
    </>
  );
};

export default Order;
