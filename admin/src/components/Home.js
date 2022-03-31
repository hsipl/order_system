import React, { useState } from "react";
import { BodyContainer, Navbar, Content } from "./Navbar";

const Home = () => {
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content></Content>
      </BodyContainer>
    </>
  );
};

export default Home;
