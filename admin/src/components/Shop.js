import React from "react";
import styled from "styled-components";

const Shopcon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const Shop = () => {
  return <Shopcon id="shop">Welcome to shop page.</Shopcon>;
};

export default Shop;
