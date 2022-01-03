import React from "react";
import styled from "styled-components";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Navbar from "../components/Navbar";

const Productcon = styled.div`
position: relative;
top: 8rem;
left: 13rem;
max-width: 87%;
font-size: 20px;
`;

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    首頁
  </Link>,
  <Typography underline="hover" key="2" color="text.primary" href="/product">
    商品管理
  </Typography>,
];

const Product = () => {
  return (
    <>
    <Navbar/>
    <Productcon id="product">
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Productcon>
    </>
  );
};

export default Product;
