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

  let config ={
    headers:{
      'Accept' : 'application/json',
      "Content-Type": "application/json" ,
      
      
    },
    withCredentials: true
  }


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

  async function login() {
    console.warn(username, password);
    let item = { username, password };
    // userLogin==false && setIsLogon(true)

    // return(userLogin == false && <Wrong>錯ㄉ</Wrong>)

    // history.push("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
//http://140.125.45.167:8000/api/user/login
//http://140.125.45.152:8000/api/user/login
   
    await axios
      .post(
        "http://140.125.45.167:8000/api/user/login",
        {username,password},
        {
          headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
             
      )
      .then((result) => {
        console.log(result.data.msg);
       
        setUserLogin(true);
        history.push("/")
        // console.log(result.headers['set-cookie']);
        console.log(result.headers);
      })
      .catch((err) => {
        console.log(err);
        setUserLogin(false);
        setErrMes(true);
        // history.push("/")//temporary
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
        <Textbox type="submit" value="登錄" onClick={login}></Textbox>
        {errMes == true && <Wrong>帳號或密碼錯誤</Wrong>}
        <br />
        <Register href="/">Don't have an account? Sign Up</Register>
      </Form>
    </Loginform>
  );
};

export default Login;
