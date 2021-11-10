import React from "react";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const HomeCon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const Home = () => {
  return(
    <>
  <HomeCon id="home">Welcome to Home page.
  <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>

  </HomeCon>

    </>
  );
};

export default Home;
