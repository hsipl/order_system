import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import {
  styled,
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
  const [errMes, setErrMes] = useState("");

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
  };

  const url = "http://localhost:8000/api/user/login";

  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(url, { username, password }, config)
      .then((result) => {
        let UserInfo = result.data.data;

        if (UserInfo.type === 1) {
          console.log(result.data.msg);
          setUserLogin(true);

          localStorage.setItem("UserName", JSON.stringify(UserInfo.name));

          localStorage.setItem(
            "StoreName",
            JSON.stringify(UserInfo.storeId.name)
          );
          localStorage.setItem(
            "StoreStatus",
            JSON.stringify(UserInfo.storeId.status)
          );

          localStorage.setItem(
            "UserAccount",
            UserInfo.username
          );
          localStorage.setItem(
            "StoreLogo",
            JSON.stringify(UserInfo.storeId.image)
          );
          localStorage.setItem(
            "StoreType",
            JSON.stringify(UserInfo.storeId.type)
          );
          localStorage.setItem(
            "StoreId",
            JSON.stringify(UserInfo.storeId.id)
          );
          localStorage.setItem(
            "Tabs",
            JSON.stringify(1)
          );
          localStorage.setItem(
            "StoreTabs",
            JSON.stringify(1)
          );
          history.push("/");
        } else {
          setUserLogin(false);
          setErrMes(1);
        }
      })
      .catch((err) => {
        console.log(err);
        setUserLogin(false);
        setErrMes(0);
      });
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
            {errMes === 0 && <Wrong severity="warning">帳號或密碼錯誤</Wrong>}
            {errMes === 1 && <Wrong severity="warning">權限不足</Wrong>}
            <Submit id="ButtonSubmit" variant="contained" type="submit">
              登入
            </Submit>
          </Stack>
        </form>
      </LoginContainer>
    </>
  );
};

export default Login;
