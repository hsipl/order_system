import React, { useState, useRef } from "react";
import styledC from "styled-components";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Navbar from "../components/Navbar";

const Ordercon = styled(Paper)({
  position: "fixed",
  top: "6rem",
  left: "10rem",
  right:'0px',
  bottom:'0px',
  fontSize:"20px",
  backgroundColor:'#efebe9',
  borderRadius: '2px',
});

const Order = () => {
  const [lis, setLi] = useState([{ id: 0, content: "" }]);

  const [value, setValue] = useState(" ");

  const id = useRef(2);

  const handleClick = () => {
    setLi([
      {
        id: id.current,
        content: value,
      },
      ...lis,
    ]);

    setValue(" ");
    id.current++;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Ordercon></Ordercon>
    </>
  );
};

export default Order;
