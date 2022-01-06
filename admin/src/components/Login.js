import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";

const LoginContainer = styled(Dialog)({
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

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/");
    }
  });

  function handleUsername(e) {
    setUserName(e.target.value);
  }

  function handlePassWord(e) {
    setPassword(e.target.value);
  }

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }

  const url = "http://localhost:8000/api/user/login"

  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        url,
        { username, password },
          config
      )
      .then((result) => {
        console.log(result.data.msg);

        setUserLogin(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setUserLogin(false);
        setErrMes(true);
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
      <LoginContainer open="true" maxWidth="xl">
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
            >
              登入
            </Submit>
          </Stack>
        </form>
      </LoginContainer>
    </>
  );
};

export default Login;
