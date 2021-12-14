import React, { useState } from "react";
import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const Topnav = styled.nav`
  position: fixed;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 5rem;
`;

const TopList = styled.div`
  padding: 0.5rem 2rem;
`;

const TopUl = styled.ul``;

const TopLi = styled.li`
  display: inline;
  margin: 1.5rem;
`;

const TopA = styled.a`
  text-decoration-line: none;
  color: black;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const InputAccount = styled.input``;

const InputPassword = styled.input``;

const UploadImg = styled.input``;

const LeftNav = styled.nav`
  position: fixed;
  top: 5rem;
  display: flex;
  flex-direction: column;
  width: 8rem;
  height: 95%;
  text-align: center;
  overflow: auto;
  background-color: rgb(208, 216, 229, 0.83);
`;

const LeftList = styled.div``;

const LeftUl = styled.ul`
  padding: 0% 8%;
   margin-left:5%;

`;

const LeftLi = styled.li`
  margin-top: 2rem;
  border-radius: 10px;
  width: 95%;
  font-weight: bold;
  height:3rem;
  background: #ffffff;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const LeftA = styled.a`
  text-decoration-line: none;
  color: black;
  &:hover {
    color: red;
  }
`;

const Navbar = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
  };

  const handleLogOut = () =>{
    localStorage.clear()
  }

  return (
    <>
      <Topnav>
        <TopList>
          <TopUl>
            <TopLi>
              <Tooltip title="設定">
                <TopA onClick={handleClickOpen}>
                  {/* <PersonIcon sx={{ fontSize: 35 }} /> */}
                  <img src="https://img.icons8.com/ios-filled/33/000000/store-setting.png" />
                </TopA>
              </Tooltip>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onBackdropClick="false"
              >
                <DialogTitle id="alert-dialog-title">
                  {"修改資訊"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    帳號:
                  </DialogContentText>
                  <InputAccount disabled value="Head office" />
                  <DialogContentText id="alert-dialog-description">
                    密碼:
                  </DialogContentText>
                  <InputPassword onChange={handlePassword} />
                  <DialogContentText id="alert-dialog-description">
                    Logo圖片:
                  </DialogContentText>
                  <UploadImg type={"file"} onChange={onImageChange} />
                  <br />
                  <img width="100#" src={image} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>取消</Button>
                  <Button onClick={handleClose}>確認</Button>
                </DialogActions>
              </Dialog>
            </TopLi>
            <TopLi>
              <Tooltip title="首頁">
                <TopA href="/home">
                  {/* <HomeIcon sx={{ fontSize: 35 }} /> */}
                  <img src="https://img.icons8.com/glyph-neue/35/000000/home.png" />
                </TopA>
              </Tooltip>
            </TopLi>
            <TopLi>
              <Tooltip title="登出" onClick={handleLogOut}>
                <TopA href="/login">
                  {/* <DirectionsRunIcon sx={{ fontSize: 35 }} /> */}
                  <img src="https://img.icons8.com/external-sbts2018-solid-sbts2018/35/000000/external-logout-social-media-sbts2018-solid-sbts2018.png" />
                </TopA>
              </Tooltip>
            </TopLi>
          </TopUl>
        </TopList>
      </Topnav>

      <LeftNav>
        <LeftList>
          <LeftUl>
            <LeftLi>
              <LeftA href="/product">商品管理</LeftA>
            </LeftLi>
            <LeftLi>
              <LeftA href="/order">員工管理</LeftA>
            </LeftLi>
            <LeftLi>
              <LeftA href="/shop">分店資訊</LeftA>
            </LeftLi>
            <LeftLi>
              <LeftA href="/report">財務報表</LeftA>
            </LeftLi>
            <LeftLi>
              <LeftA href="/handover">交班紀錄</LeftA>
            </LeftLi>
          </LeftUl>
        </LeftList>
      </LeftNav>
    </>
  );
};

export default Navbar;
