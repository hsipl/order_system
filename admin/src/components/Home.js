import React from "react";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";


import {useContext,useEffect,useState} from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const HomeContainer = styled(Box)({
  position:"absolute",
  top: "6rem",
  left: "10rem",
  right: "0px",
  borderRadius: "2px",
  padding:"3rem",
  fontSize: "20px",
});

const breadcrumbs = [

  <Typography underline="hover" key="2" color="text.primary" style={{fontWeight:"bold"}}>
    首頁
  </Typography>,
];


const Home = () => {

  var [label,setLabel] = useState(null);
  const headers = {
    "Content-Type": "application/json",

  };

  function login() {
    axios
      .post(
        "http://localhost:8000/api/user/login",
        { username: "hsipl206", password: "hsipl206" },
        {
          headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      .then((response) => setLabel(response.data['msg'].toString()));
  }

  function store() {
    axios.get("http://localhost:8000/api/store",{
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((res) => {
            console.log(res.data)
      setLabel(res.data[0]['name'].toString());
    });
  }

  
  return (
    <>
    <Navbar/>
      <HomeContainer id="home">
        <Stack spacing={1}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Button variant="text" onClick={() => login()}>
        login
      </Button>
      <Button variant="text" onClick={() => store()}>
        store
      </Button>
      <p>  {label} </p>

      </HomeContainer>
    </>
  );
};

export default Home;
