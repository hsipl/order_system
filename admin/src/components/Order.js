import React, { useState, useRef } from "react";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

const Order = () => {
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="員工管理" />
        </Content>
      </BodyContainer>
    </>
  );
};

export default Order;
