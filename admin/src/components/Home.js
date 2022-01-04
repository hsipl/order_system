import React from "react";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";

const HomeCon = styled(Paper)({
  position: "fixed",
  top: "6rem",
  left: "10rem",
  right:'0px',
  bottom:'0px',
  fontSize:"20px",
  backgroundColor:'#efebe9',
  borderRadius: '2px',
});

const Home = () => {
  return(
    <>
    <Navbar />
    <HomeCon id="home">
    </HomeCon>
    </>
  );
};

export default Home;
