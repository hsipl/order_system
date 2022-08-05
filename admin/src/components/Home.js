import React from "react";
import { BodyContainer, Navbar, Content } from "./Navbar";

const Home = () => {
  const userName = JSON.parse(localStorage.getItem("UserName"));
  const StoreName = JSON.parse(localStorage.getItem("StoreName"));
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content style={{display:"flex",justifyContent:"center",fontSize:"3rem"}}>
          {userName} 歡迎您使用 {StoreName} 後台管理系統
        </Content>
      </BodyContainer>
    </>
  );
};

export default Home;
