import React from "react";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

const Handover = () => {
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="交班紀錄" />
        </Content>
      </BodyContainer>
    </>
  );
};

export default Handover;
