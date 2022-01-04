import React,{useState} from "react";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import { Paper } from "@mui/material";

const ProductContainer = styled(Paper)({
  position: "fixed",
  top: "6rem",
  left: "10rem",
  right:'0px',
  bottom:'0px',
  fontSize:"20px",
  backgroundColor:'#efebe9',
  borderRadius: '2px',
});

const Product = () => {
  return (
  <>
  <Navbar />
  <ProductContainer id="product" >
  </ProductContainer>
  </>
  );
};

export default Product;
