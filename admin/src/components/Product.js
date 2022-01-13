import React, { useState } from "react";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

const Product = () => {
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="商品管理" />
        </Content>
      </BodyContainer>
    </>
  );
};

export default Product;
