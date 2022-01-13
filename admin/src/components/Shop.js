import React from "react";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

const Shop = () => {
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="店鋪管理" />
        </Content>
      </BodyContainer>
    </>
  );
};

export default Shop;
