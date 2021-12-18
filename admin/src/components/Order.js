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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const OrderCon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;
const AddForm = styled.form`
  height: 400px;
`;
const UploadImg = styled.input``;

const Order = () => {
  const [lis, setLi] = useState([]);

  const [value, setValue] = useState("");

  const [open, setOpen] = React.useState(false);

  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const id = useRef(2);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      首頁
    </Link>,
    <Typography underline="hover" key="2" color="text.primary" href="/handover">
      員工管理
    </Typography>,
  ];

  const handleRegisterClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Button variant="contained" onClick={handleRegisterClick}>
          + 註冊員工帳戶
        </Button>
        <br /> <br />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // onBackdropClick="false"
          // fullWidth="true"
          // maxWidth="xs"
        
    
        >
          <DialogTitle id="alert-dialog-title">{"新增員工資訊"}</DialogTitle>

          <AddForm>
            <DialogContent >
              
              <TextField
                name="name"
                label="姓名"
                variant="outlined"
                sx={{ width: 250 }}
              />
                          
              <br /> <br />
              <TextField
                name="account"
                label="帳號"
                variant="outlined"
                sx={{ width: 250 }}
              />
              <br /> <br />
              <TextField
                name="password"
                label="密碼"
                variant="outlined"
                sx={{ width: 250 }}
              />
              <br /> <br />
              <TextField
                name="position"
                label="職位"
                variant="outlined"
                sx={{ width: 250 }}
              />
              <DialogContentText id="alert-dialog-description">
              Logo圖片:
            </DialogContentText>
            <img width="100#" src={image} />
            <UploadImg type={"file"} onChange={onImageChange} />
            
            </DialogContent>
            <DialogActions sx={{ height: 40 }}>
              <Button onClick={handleClose}>取消</Button>
              <Button type="submit" onClick={handleClose}>
                確認
              </Button>
            </DialogActions>

          </AddForm>
        </Dialog>
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
                姓名
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                帳號
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#6379A1",
                  color: "white",
                }}
              >
                職位
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
              <TableCell align="center">Member1</TableCell>
              <TableCell align="center">xxxxxxxxxx</TableCell>
              <TableCell align="center">xxxx</TableCell>

              <TableCell align="center">
                <Button>
                  <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </OrderCon>
    </>
  );
};

export default Order;
