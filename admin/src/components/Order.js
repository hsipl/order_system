import React from "react";
import styled from "styled-components";

const Ordercon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const Order = () => {
  return <Ordercon>Welcome to order page.</Ordercon>;
};

export default Order;
