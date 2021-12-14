import React,{useContext,useEffect} from "react";
import styled from "styled-components";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Navbar from "../components/Navbar";

import {Route,Redirect} from "react-router-dom"

const HomeCon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const breadcrumbs = [

  <Typography underline="hover" key="2" color="text.primary" href="/handover">
    首頁
  </Typography>,
];

const Home = () => {

  
  return (
    <>
    <Navbar/>
      <HomeCon id="home">
        <Stack spacing={1}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </HomeCon>
    </>
  );
};

export default Home;
