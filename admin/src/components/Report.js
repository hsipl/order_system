import React from "react";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";

const Report = () => {
  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="財務報表" />
        </Content>
      </BodyContainer>
    </>
  );
};

export default Report;
