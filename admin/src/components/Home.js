import React ,{useCallback}from "react";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Box from "@mui/material/Box";

// import {useMappedState,useDispatch} from 'redux-react-hook';


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


const Home = (props) => {




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

      </HomeContainer>
    </>
  );
};

export default Home;
