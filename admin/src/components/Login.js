import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { useHistory } from "react-router";

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

const Wrong = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
`;

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [userLogin, setUserLogin] = useState(false);
  const [errMes, setErrMes] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/");
    }
  });

  function handleUsername(e) {
    setUserName(e.target.value);
    console.log(e);
  }

  function handlePassWord(e) {
    setPassword(e.target.value);
    console.log(e);
  }
  const url = "http://140.125.45.167:8000/api/user/login";

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(url, { username, password }, config)
      .then((result) => {
        console.log(result.data.msg);
        setUserLogin(true);
        history.push("/");
        console.log(result.headers);
      })
      .catch((err) => {
        console.log(err);
        setUserLogin(false);
        setErrMes(true);
      });

    localStorage.setItem("name", JSON.stringify(username));
    localStorage.setItem("password", JSON.stringify(password));
  }

  return (
    <Loginform id="login">
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Textbox
          autoFocus
          placeholder="User name"
          value={username}
          onChange={handleUsername}
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
        <Textbox type="submit" value="登錄"></Textbox>
        {errMes == true && <Wrong>帳號或密碼錯誤</Wrong>}
        <br />
      </Form>
    </Loginform>
  );
};

export default Login;
