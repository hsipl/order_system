import React, { useState,useRef } from "react";
import styled from "styled-components";

const Ordercon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const Order = () => {
  const [lis, setLi] = useState([ 
    {id:0,content:""}
  ]);


  const [value,setValue]= useState(" ")

  const id =  useRef(2);

  const handleClick = () => {
    setLi([
      {
      id: id.current,
      content:value
      }, ...lis]);

    setValue(" ");
    id.current++;
  };

  const handleInputChange = (e) =>{
    setValue(e.target.value)
  }


  return (
    <Ordercon>
      Welcome to order page.
      {/* <br />
      <input type="text" value={value} onChange={handleInputChange} />
      <button onClick={handleClick}>add</button>
      {
      lis.map(liss => <li >{liss.content}</li>)}
      <button >刪除</button> */}
    </Ordercon>
  );
};

export default Order;
