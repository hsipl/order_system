import React from "react";
import axios from "axios";
import {
  styled,
  Breadcrumbs,
  CardMedia,
  Paper,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { AccountCircle, Home, ExitToApp } from "@material-ui/icons";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavDialog } from "./NavDialog";
import { FilterLeftButtons, NonLineLink } from "./Buttons";

const TopNav = styled(Stack)({
  backgroundColor: "rgb(208, 216, 229)",
  boxShadow:"1px 1px 5px gray",
  width: "100%",
  position: "fixed",
  zIndex:"10"
});

export const LogoImg = styled(CardMedia)({
  position: "relative",
  height: "6rem",
  width: "10rem",
});

const LeftNav = styled(Stack)({
  position: "fixed",
  width: "10rem",
  height: "100%",
  backgroundColor: "rgb(208, 216, 229)",
  zIndex:"10"
});

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
});

export const Breadcrumb = (props) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NonLineLink to="/">首頁</NonLineLink>
        <Typography color="primary">{props.name}</Typography>
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

  const LogoUrl =
    localStorage.getItem("StoreLogo") !== ""
      ? "http://localhost:8000/" + JSON.parse(localStorage.getItem("StoreLogo"))
      : "";

  return (
    <>
      <TopNav 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <NonLineLink to="/">
          <LogoImg image={LogoUrl} />
        </NonLineLink>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={1}
          mr={3}
        >
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
        </Stack>
      </TopNav>
      <NavDialog open={open} onClose={handleClose} />
      <LeftNav mt={12}>
        <FilterLeftButtons
          isfilter={JSON.parse(localStorage.getItem("StoreType"))}
        />
      </LeftNav>
    </>
  );
};