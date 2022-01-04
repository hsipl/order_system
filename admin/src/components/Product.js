import React,{useState} from "react";
import styledC from "styled-components";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import { Paper } from "@mui/material";


const Productcon = styled(Paper)({
  position: "fixed",
  top: "6rem",
  left: "10rem",
  right:'0px',
  bottom:'0px',
  fontSize:"20px",
  backgroundColor:'#efebe9',
  borderRadius: '2px',
});

const textInput = styledC.input`

`; 

const addBtn = styledC.button`

`;




const Product = () => {

  return (
    
  <>
  <Navbar />
  <Productcon id="product" >


  </Productcon>
  </>
  );
};

export default Product;
