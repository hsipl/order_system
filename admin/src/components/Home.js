import React,{useContext,useEffect,useState} from "react";
import styled from "styled-components";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Navbar from "../components/Navbar";





import axios from "axios";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@mui/material/Box";
import SearchIcon from "@material-ui/icons/Search";



import {Route,Redirect} from "react-router-dom"

const HomeCon = styled.div`
position: relative;
top: 8rem;
left: 13rem;
max-width: 87%;
font-size: 20px;
`;

const breadcrumbs = [

  <Typography underline="hover" key="2" color="text.primary" href="/handover">
    首頁
  </Typography>,
];


const Home = () => {

  var [label,setLabel] = useState(null);
  const headers = {
    "Content-Type": "application/json",

  };


  // useEffect(() => {
  //   axios
  //     .get("http://140.125.45.154:8000/api/store",{
        
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true
  //     })
  //     .then((result) => {
  //       console.log(result.data);
  //       console.log("OK");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });
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
      <HomeCon id="home">
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

      </HomeCon>
    </>
  );
};

export default Home;
