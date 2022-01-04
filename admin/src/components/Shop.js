import React from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Navbar from "../components/Navbar";

const ShopContainer = styled(Paper)({
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
  <ShopContainer id="shop">

  </ShopContainer>;
  </>
)};

export default Shop;
