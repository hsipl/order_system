import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import styledC from "styled-components";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";

const LoginCon = styled(Dialog)({
  ".MuiBackdrop-root": {
    backgroundColor: "#F3F3FA",
  },
});

const Input = styled(TextField)({
  margin: "1rem 5rem",
  width: "40vh",
});

const Submit = styled(Button)({
  margin: "2rem 5rem 3rem 5rem",
});

const Wrong = styled(Alert)({
  margin: "1rem 5rem",
});

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [userLogin, setUserLogin] = useState(false);
  const [errMes, setErrMes] = useState(false);

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

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
  }

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/user/login",
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
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
        // history.push("/")//temporary
      });

    localStorage.setItem("name", JSON.stringify(username));
    localStorage.setItem("password", JSON.stringify(password));
  }

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      <LoginCon open="true" maxWidth="xl">
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          登入
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack m={2}>
            <Input
              autoFocus
              placeholder="帳號"
              value={username}
              onChange={handleUsername}
              required
              label="帳號"
            />
            <Input
              id="InputPassword"
              type="password"
              placeholder="密碼"
              value={password}
              onChange={handlePassWord}
              required
              label="密碼"
              onKeyPress={handleKeypress}
            />
            {errMes == true && <Wrong severity="warning">帳號或密碼錯誤</Wrong>}
            <Submit
              id="ButtonSubmit"
              variant="contained"
              type="submit"
              onClick={login}
            >
              登入
            </Submit>
          </Stack>
          {/* <Register href="/">Don't have an account? Sign Up</Register> */}
        </form>
      </LoginCon>
    </>
  );
};

export default Login;
