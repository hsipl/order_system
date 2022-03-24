import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  Container,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";
import { Delete, Edit, Search } from "@material-ui/icons";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import {
  DialogText,
  FormTitle,
  Input,
  SearchBox,
  SearchContainer,
} from "./SearchAndForm";
import { UploadImgButton } from "./Buttons";
import { TableHeads, TableEmployee } from "./Table";
import axios from "axios";

const Employee = () => {
  const [allData, setAllData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [searchInput, setSearchInput] = useState({
    name: "",
    status: "",
  });
  const [searchData, setSearchData] = useState([]);

  const [image, setImage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    username: "",
    password: "",
    type: 0,
  });

  const [errMes, setErrMes] = useState("");

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const url = "http://localhost:8000/api/user";

  useEffect(() => {
    const get_api = async () => {
      let { data } = await axios.get(url + "/employee", config);
      setAllData(data);
      toChinese(data);
    };
    get_api();
  }, []);

  function toChinese(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].type === 0 ? (data[i].type = "員工") : (data[i].type = "店長");
      data[i].status === 0
        ? (data[i].status = "在職")
        : (data[i].status = "已離職");
    }

    setSearchData(data);
  }

  const handleRegisterClick = () => {
    setOpen(true);
  };

  function handleEmployeeInfo(e) {
    const { value, name } = e.target;

    setEmployeeInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handleLength(e) {
    const { value, name } = e.target;
    if (value.length <= 5) {
      setErrMes(0);
      setEmployeeInfo((preData) => ({
        ...preData,
        [name]: "",
      }));
    } else if (value.length > 15) {
      setErrMes(1);
      setEmployeeInfo((preData) => ({
        ...preData,
        [name]: "",
      }));
    } else {
      setErrMes("");
      setEmployeeInfo((preData) => ({
        ...preData,
        [name]: value,
      }));
    }
  }

  function handlePassWord(e) {
    setPassword(e.target.value);
  }

  function handleCheck(e) {
    if (e.target.value !== password) {
      setErrMes(2);
      setEmployeeInfo((preData) => ({
        ...preData,
        password: "",
      }));
    } else {
      setErrMes("");
      setEmployeeInfo((preData) => ({
        ...preData,
        password: e.target.value,
      }));
    }
  }

  console.log(errMes,employeeInfo)

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setEmployeeInfo((preData) => ({
      ...preData,
      ["image"]: e.target.files[0],
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setErrMes("");
    setUsername("");
    setPassword("");
    setEmployeeInfo({
      name: "",
      username: "",
      password: "",
      type: 0,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("storeId", localStorage.getItem("StoreId"));
    formData.append("name", employeeInfo.name);
    formData.append("type", employeeInfo.type);
    formData.append("username", employeeInfo.username);
    formData.append("password", employeeInfo.password);
    formData.append("image", employeeInfo.image);

    try {
      await axios.post(url + "/register", formData, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  function SearchOnChange(e) {
    const { value, name } = e.target;

    setSearchInput((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleClean = async () => {
    setSearchData(null);
    setSearchInput({
      name: "",
      status: "",
    });
  };

  const filtered = searchData === null ? allData : searchData;

  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="員工管理" />
          <SearchContainer>
            <SearchBox
              id="SearchProductName"
              label="員工姓名"
              variant="filled"
              type="search"
              name="name"
              value={searchInput.name}
              onChange={SearchOnChange}
            />
            <SearchBox
              id="SearchProductStatus"
              select
              label="營業狀態"
              value={searchInput.status}
              onChange={SearchOnChange}
              variant="filled"
              name="status"
              sx={{ width: "10rem" }}
            >
              <MenuItem value="">
                <em style={{ color: "gray" }}>請選擇</em>
              </MenuItem>
              <MenuItem value={0}>在職</MenuItem>
              <MenuItem value={1}>已離職</MenuItem>
            </SearchBox>
            <Button size="large" color="inherit">
              <Search fontSize="large" />
            </Button>
            <Button onClick={handleClean}>清除搜尋</Button>
            <Button
              onClick={handleRegisterClick}
              variant="contained"
              color="success"
              className="AddBTN"
            >
              註冊員工帳戶
            </Button>
          </SearchContainer>

          <Dialog
            open={open}
            onClose={handleClose}
            onBackdropClick="false"
            fullWidth="true"
            maxWidth="sm"
            // 移動部分尚未解決
            // PaperComponent={PaperComponent}
            // aria-labelledby="draggable-dialog-title"
          >
            <FormTitle
              variant="h6"
              // 移動部分尚未解決
              // style={{ cursor: "move" }}
              // id="draggable-dialog-title"
            >
              {"註冊員工帳戶"}
            </FormTitle>

            <form onSubmit={handleSubmit}>
              <Stack mx={5} my={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Input
                    name="name"
                    label="請輸入姓名"
                    variant="outlined"
                    required
                    onChange={handleEmployeeInfo}
                    value={employeeInfo.name}
                  />
                  <Input
                    name="status"
                    label="狀態"
                    variant="outlined"
                    select
                    required
                    onChange={handleEmployeeInfo}
                    value={employeeInfo.type}
                    sx={{ width: "12rem" }}
                  >
                    <MenuItem value={0}>店員</MenuItem>
                  </Input>
                </Stack>
                <Input
                  name="username"
                  label="請輸入帳號"
                  variant="outlined"
                  required
                  onChange={handleUsername}
                  value={username}
                  onBlur={handleLength}
                />
                <Input
                  name="password"
                  label="請輸入密碼"
                  variant="outlined"
                  type="password"
                  required
                  onChange={handlePassWord}
                  onBlur={handleLength}
                />

                <Input
                  name="password"
                  label="請再次輸入密碼"
                  variant="outlined"
                  type="password"
                  required
                  onBlur={handleCheck}
                />
                {errMes === 0 && (
                  <Alert severity="warning" sx={{ marginX: "1.5rem" }}>
                    帳號或密碼長度過短,限制為5-15字
                  </Alert>
                )}
                {errMes === 1 && (
                  <Alert severity="warning" sx={{ marginX: "1.5rem" }}>
                    帳號或密碼長度過長,限制為5-15字
                  </Alert>
                )}
                {errMes === 2 && (
                  <Alert
                    severity="warning"
                    px="1rem"
                    sx={{ marginX: "1.5rem" }}
                  >
                    兩次密碼不相同，請重新輸入
                  </Alert>
                )}
                <DialogText>Logo圖片:</DialogText>
                <Container>
                  <UploadImgButton
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={onImageChange}
                  />
                  <img width="100#" src={image} />
                </Container>
                <DialogActions>
                  <Button onClick={handleClose} size="large">
                    取消
                  </Button>
                  <Button type="submit" size="large">
                    確認
                  </Button>
                </DialogActions>
              </Stack>
            </form>
          </Dialog>

          <TableContainer component={Paper} sx={{ maxHeight: "38rem" }}>
            <Table stickyHeader>
              <TableHeads id={"employee"} />
              {filtered.map((item) => (
                <>
                  <TableEmployee
                    Page={"shop"}
                    Img={item.image}
                    Name={item.name}
                    Type={item.type}
                    Status={item.status}
                    item={item}
                    // Del={() => handleDeClickOpen(item)}
                    // Edit={() => handleEditOpen(item)}
                  />
                </>
              ))}
            </Table>
          </TableContainer>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Employee;
