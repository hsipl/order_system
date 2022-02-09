import React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Breadcrumbs,
  CardMedia,
  Paper,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { AccountCircle, Home, ExitToApp } from "@material-ui/icons";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavDialog } from "./NavDialog";
import { FilterLeftButtons,NonLineLink } from "./Buttons";

const TopNav = styled(Paper)({
  backgroundColor: "rgb(208, 216, 229)",
  display: "grid",
  gridTemplateColumns: " 1fr 10fr 1fr",
  gridTemplateRows: "6rem",
  width: "100%",
  position: "fixed",
});

 export const LogoImg = styled(CardMedia)({
  position: "relative",
  height: "6rem",
  width: "10rem"
});

const TopList = styled(Box)({
  gridColumn: "3 / -1",
  padding: "0.5rem 2rem",
  alignSelf: "center",
  minWidth: "12rem",
});

const LeftNav = styled(Paper)({
  position: "fixed",
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 7fr",
  top: "6rem",
  width: "10rem",
  height: "100%",
  backgroundColor: "rgb(208, 216, 229)",
  justifyItems: "center",
});

export const BodyContainer = styled(Paper)({
  display: "grid",
  gridTemplateRows: "6rem 9fr",
  gridTemplateColumns: "10rem 12fr",
  height: "100vh",
  fontSize: "20px",
});

export const Content = styled(Paper)({
  fontSize: "20px",
  backgroundColor: "#efebe9",
  gridColumn: "2 / -1",
  gridRow: "2 / -1",
  padding: "1rem 3rem",
  display: "grid",
  gridTemplateRows: "1fr 11fr",
  gridRowGap: "1rem",
});

export const Breadcrumb = (props) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NonLineLink to="/">
          首頁
        </NonLineLink>
        <Typography color="primary">
          {props.name}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const url = "http://localhost:8000/api/user/logout";

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


  const LogoUrl = localStorage.getItem("StoreLogo")!==""? "http://localhost:8000/" + JSON.parse(localStorage.getItem("StoreLogo")):""

  return (
    <>
      <TopNav square elevation={3}>
        <NonLineLink to="/">
          <LogoImg
            image={LogoUrl}
          />
        </NonLineLink>
        <TopList>
          <Tooltip title="設定" onClick={handleClickOpen}>
            <IconButton size="large" color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="首頁">
            <NonLineLink to="/">
              <IconButton size="large" color="inherit">
                <Home fontSize="large" />
              </IconButton>
            </NonLineLink>
          </Tooltip>

          <Tooltip title="登出" onClick={handleLogOut} href="/login">
            <IconButton size="large" color="inherit">
              <ExitToApp fontSize="large" />
            </IconButton>
          </Tooltip>
        </TopList>
      </TopNav>
      <NavDialog open={open} onClose={handleClose} />
      <LeftNav square elevation={0}>
        <FilterLeftButtons
          isfilter={JSON.parse(localStorage.getItem("StoreType"))}
        />
      </LeftNav>
    </>
  );
};
