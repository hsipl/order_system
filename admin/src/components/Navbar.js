import React, { useState } from "react";
import axios from "axios";
import styledC from "styled-components";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { CardMedia, Container, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";

const TopNav = styled(Paper)({
  position: "fixed",
  top: "0px",
  backgroundColor: "rgb(208, 216, 229, 0.83)",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  height: "6rem",
  left: "0px",
  paddingLeft: "1rem",
  zIndex:"100"
});

const TopList = styled(Box)({
  padding: "0.5rem 2rem",
  alignSelf: "center",
  minWidth:'12rem',
});

const FormContent = styled(DialogContent)({
  display: "grid",
  margin: "1.5rem",
});

const Input = styled(TextField)({
  margin: "1.5rem",
  color: "gray",
});

const DialogText = styled(DialogContentText)({
  margin: "1rem 0 0 1.5rem",
});

const UploadImg = styledC.input`
  ::-webkit-file-upload-button {
    margin:1rem 1rem 0 0;
    border: 0px;
    line-height: 1.75;
    padding: 6px 16px;
    border-radius: 4px;
    color: white;
    background-color: rgb(25, 118, 210);
  }
`;

const LeftNav = styled(Paper)({
  position: "fixed",
  top: "6rem",

  width: "10rem",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgb(208, 216, 229, 0.83)",
});

const LeftList = styled(Box)({
  display: "grid",
  margin: "2rem",
  justifyContent:'center',
  minWidth:'5rem'
});

const LeftButton = styled(Button)({
  marginBottom: "1.5rem",
  color: "black",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#FFFFFF",
  borderColor: "#7B7B7B",
  textAlign:'center',
  borderRadius: '10px',

  "&:hover": {
    backgroundColor: "#9fa8da",
    borderColor: "#7986cb",
  },
});

const Navbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
  };

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }

  const url ="http://localhost:8000/api/user/logout"

  const handleLogOut = () => {
    localStorage.clear();
    axios
      .get(url,config )
      .then((result) => {
        console.log(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TopNav square elevation={3}>
        <CardMedia
          component="img"
          sx={{ width: "10rem" }}
          image="https://www.moedict.tw/%E9%B9%BD%E9%85%A5%E9%9B%9E.png?font=wt064"
        />
        <TopList>
          <Tooltip title="設定" onClick={handleClickOpen}>
            <IconButton size="large" color="inherit" >
              <AccountCircle fontSize="large"/>
            </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onBackdropClick="false"
            fullWidth="90vw"
            fullheight="100vh"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {"修改資訊"}
            </DialogTitle>
            <FormContent>
              <Input
                disabled
                value="Head office"
                label="帳號"
                variant="filled"
              />
              <Input
                required
                onChange={handlePassword}
                label="密碼"
                variant="outlined"
                type="password"
                required
              />
              <DialogText>Logo圖片:</DialogText>
              <Container>
                <UploadImg
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onImageChange}
                />
                <img width="100#" src={image} />
              </Container>
            </FormContent>
            <DialogActions>
              <Button onClick={handleClose}>取消</Button>
              <Button onClick={handleClose}>確認</Button>
            </DialogActions>
          </Dialog>
          <Tooltip title="首頁" href='/'>
            <IconButton size="large" color="inherit" > 
              <Home fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="登出" onClick={handleLogOut} href='/login'>
            <IconButton size="large" color="inherit" >
              <ExitToApp fontSize="large" />
            </IconButton>
          </Tooltip>
        </TopList>
      </TopNav>

      <LeftNav square elevation={3}>
        <LeftList>
          <LeftButton id="BtnProduct"  href="/product">
            商品管理
          </LeftButton>
          <LeftButton variant="contained" href="/order">
            員工管理
          </LeftButton>
          <LeftButton variant="contained" href="/shop">
            分店資訊
          </LeftButton>
          <LeftButton variant="contained" href="/report">
            財務報表
          </LeftButton>
          <LeftButton variant="contained" href="/handover">
            交班紀錄
          </LeftButton>
        </LeftList>
      </LeftNav>
    </>
  );
};

export default Navbar;