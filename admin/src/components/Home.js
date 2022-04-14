import React, { useState, useEffect } from "react";
import { BodyContainer, Navbar, Content } from "./Navbar";
import {
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableContainer,
  Dialog,
  DialogActions,
  Button,
  MenuItem,
  Stack,
  Box,
  Tab,
  Alert,
} from "@mui/material";
const Home = () => {

    const [check , setCheck] = useState(0)
    const handleClick=()=>{
      setCheck(1)
      console.log(check)
    } 

    const handleChange =(e) =>{
      console.log(e.target.value.length)
      e.target.value.length>=5?setCheck(1):setCheck(0)
    }
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
{/* 
          <Button onClick={handleClick}>Test</Button>
          {check===1?<Button> Test2</Button>:<Button disabled>Test2</Button>}
          <input onChange={handleChange}></input> */}
          
        </Content>
      </BodyContainer>
    </>
  );
};

export default Home;
