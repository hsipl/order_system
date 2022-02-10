import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

const AddForm = styled.form`
  height: 400px;
`;
const UploadImg = styled.input``;

const Employee = () => {

  const [open, setOpen] = React.useState(false);

  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRegisterClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="員工管理" />
          <Button variant="contained" onClick={handleRegisterClick}>
          + 註冊員工帳戶
        </Button>
        <br /> <br />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
    
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
        </Content>
      </BodyContainer>
    </>
  );
};

export default Employee;
