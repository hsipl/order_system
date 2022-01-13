import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Breadcrumbs,
  CardMedia,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  AccountCircle,
  Home,
  ExitToApp,
} from "@material-ui/icons";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const TopNav = styled(Paper)({
  backgroundColor: "rgb(208, 216, 229)",
  display: "grid",
  gridTemplateColumns: " 10rem auto 15rem",
  gridTemplateRows: "6rem",
  width: "100%",
  position: "fixed",
});

const LogoButton = styled(CardMedia)({
  position: "relative",
  height: "6rem",
});

const TopList = styled(Box)({
  gridColumn: "3 / auto",
  padding: "0.5rem 2rem",
  alignSelf: "center",
  minWidth: "12rem",
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

export const UploadImg = styled("input")({
  "::-webkit-file-upload-button": {
    margin: "1rem 1rem 0 0",
    border: "0px",
    lineHeight: "1.75",
    padding: "6px 16px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "rgb(25, 118, 210)",
  },
});

const LeftNav = styled(Paper)({
  position: "fixed",
  display: "grid",
  gridTemplateRows: "5rem 5rem 5rem 5rem 5rem auto",
  top: "6rem",
  width: "10rem",
  height: "100%",
  backgroundColor: "rgb(208, 216, 229)",
});

const LeftButton = styled(Button)({
  margin: "1.25rem 1.5rem",
  color: "black",
  fontSize: 16,
  border: "1px solid",
  backgroundColor: "#FFFFFF",
  borderColor: "#7B7B7B",
  textAlign: "center",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#9fa8da",
    borderColor: "#7986cb",
  },
});

export const Buttons = [
  { name: "商品管理", id: "BtnProduct", url: "/product" },
  { name: "員工管理", id: "BtnEmployee", url: "/employee" },
  { name: "店鋪管理", id: "BtnShop", url: "/shop" },
  { name: "財務報表", id: "BtnReport", url: "/report" },
  { name: "交班紀錄", id: "BtnHandover", url: "/handover" },
];


export const BodyContainer = styled(Paper)({
  display: "grid",
  gridTemplateRows: "6rem auto",
  gridTemplateColumns: "10rem auto",
  height: "100vh",
  fontSize: "20px",
});

export const Content = styled(Paper)({
  fontSize: "20px",
  backgroundColor: "#efebe9",
  gridColumn: "2 / auto",
  gridRow: "2 / auto",
  padding: "3rem",
  display: "grid",
  gridTemplateRows: "2rem 10rem auto",
  gridRowGap: "1rem",
});

export const Breadcrumb = (props) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link underline="hover" key="1" color="inherit" href="/">
          首頁
        </Link>
        <Typography underline="hover" key="2" color="text.primary">
          {props.name}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};


export const Navbar = (props) => {
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
  };

  const url = "http://140.125.45.167:8000/api/user/logout";

  const handleLogOut = () => {
    localStorage.clear();
    axios
      .get(url, config)
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
        <Link href="/">
          <LogoButton
            component="img"
            sx={{ width: "10rem" }}
            image="https://www.moedict.tw/%E9%B9%BD%E9%85%A5%E9%9B%9E.png?font=wt064"
          />
        </Link>
        <TopList>
          <Tooltip title="設定" onClick={handleClickOpen}>
            <IconButton size="large" color="inherit">
              <AccountCircle fontSize="large" />
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
          <Tooltip title="首頁" href="/">
            <IconButton size="large" color="inherit">
              <Home fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="登出" onClick={handleLogOut} href="/login">
            <IconButton size="large" color="inherit">
              <ExitToApp fontSize="large" />
            </IconButton>
          </Tooltip>
        </TopList>
      </TopNav>

      <LeftNav square elevation={0}>
        {Buttons.map((btn) => (
          <LeftButton id={btn.id} href={btn.url}>
            {btn.name}
          </LeftButton>
        ))}
      </LeftNav>
    </>
  );
};

