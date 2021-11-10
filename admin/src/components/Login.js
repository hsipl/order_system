import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Loginform = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
const Title = styled.h1`
  font-weight: normal;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 50px;
`;

const Textbox = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 20px;
`;
const Register = styled.a`
  margin: 10px;
  text-align: center;
`;

const Login = () => {
  const [account, setAccunt] = useState("");
  const [password, setPassword] = useState("");
  function handleAccount(e) {
    setAccunt(e.target.value);
    console.log(e);
  }

  function handlePassWord(e) {
    setPassword(e.target.value);
    console.log(e);
  }

  async function handleSubmit(e) {
    e.preventDefault(); 

  }

  return (
    <Loginform>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Textbox
            autoFocus
          placeholder="Account"
          value={account}
          onChange={handleAccount}
          required
        ></Textbox>

        <Textbox
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassWord}
          required
        ></Textbox>
        <br />
        <Textbox type="submit" value="Sign in"></Textbox>
        <br />
        <Register href="/">Don't have an account? Sign Up</Register>
      </Form>
    </Loginform>
  );
};

export default Login;
