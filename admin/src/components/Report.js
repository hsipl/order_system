import React from "react";
import styled from "styled-components";

const Reportcon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;
const Report = () => {
  return <Reportcon id="report">Welcome to report page.</Reportcon>;
};

export default Report;
