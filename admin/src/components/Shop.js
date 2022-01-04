import React from "react";
import styledC from "styled-components";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Navbar from "../components/Navbar";

const Shopcon = styled(Paper)({
  position: "fixed",
  top: "6rem",
  left: "10rem",
  right:'0px',
  bottom:'0px',
  fontSize:"20px",
  backgroundColor:'#efebe9',
  borderRadius: '2px',
});

const Shop = () => {
  return (
  <>
  <Navbar />
  <Shopcon id="shop">

  </Shopcon>;
  </>
)};

export default Shop;
