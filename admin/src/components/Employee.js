import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  Paper,
  Dialog,
  DialogActions,
  Container,
  Stack,
  MenuItem,
  Alert,
  ListItem,
  ListItemText,
  Chip,
  List,
} from "@mui/material";
import { Search } from "@material-ui/icons";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import {
  DialogText,
  FormTitle,
  Input,
  PaperComponent,
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

  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    username: "",
    password: "",
    status: 0,
    type: 0,
    passwordCheck: "",
    image: "",
  });

  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentInfo, setCurrentInfo] = useState({});
  const [editInfo, setEditInfo] = useState({
    password: "",
    passwordCheck: "",
  });

  const [openDel, setOpenDel] = React.useState(false);

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
    setEmployeeInfo({
      name: "",
      username: "",
      password: "",
      type: 0,
      passwordCheck: "",
    });
  };

  const handleSearch = async () => {
    if (searchInput.name === "" && searchInput.status === "") {
    } else if (searchInput.name === "" && searchInput.status !== "") {
      let { data } = await axios.get(
        url +
          "/user/?storeId=" +
          localStorage.getItem("StoreId") +
          "&status=" +
          searchInput.status,
        config
      );
      toChinese(data);
    } else if (searchInput.name !== "" && searchInput.status === "") {
      let { data } = await axios.get(
        url +
          "/user/?storeId=" +
          localStorage.getItem("StoreId") +
          "&name=" +
          searchInput.name,
        config
      );
      toChinese(data);
    } else {
      let { data } = await axios.get(
        url +
          "/user/?storeId=" +
          localStorage.getItem("StoreId") +
          "&name=" +
          searchInput.name +
          "&status=" +
          searchInput.status,
        config
      );
      toChinese(data);
    }
  };
  console.log(employeeInfo);
  const handleSubmit = async () => {
    const newForm = new FormData();
    newForm.append("storeId", localStorage.getItem("StoreId"));
    newForm.append("name", employeeInfo.name);
    newForm.append("type", employeeInfo.type);
    newForm.append("username", employeeInfo.username);
    newForm.append("password", employeeInfo.password);
    newForm.append("image", employeeInfo.image);

    try {
      await axios.post(url + "/register", newForm, config);
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

  const handleEditOpen = (item) => {
    setOpenEdit(true);

    setCurrentInfo({
      ["id"]: item.id,
      ["name"]: item.name,
      ["type"]: item.type === "店長" ? 1 : 0,
      ["status"]: item.status === "在職" ? 0 : 1,
      ["image"]: item.image,
    });
    setEditInfo((preData) => ({
      ...preData,
      name: item.name,
    }));
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setEditInfo({ password: "", passwordCheck: "" });
  };

  function handleEditInfo(e) {
    const { value, name } = e.target;
    setEditInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleEditSubmit = async () => {
    try {
      if (
        editInfo.password === "" &&
        editInfo.passwordCheck === "" &&
        editInfo.name === currentInfo.name
      ) {
        await axios.patch(
          url + "/user/" + currentInfo.id,
          JSON.stringify(editInfo, ["status"]),
          config
        );
      } else if (
        editInfo.password === "" &&
        editInfo.passwordCheck === "" &&
        editInfo.name !== currentInfo.name
      ) {
        await axios.patch(
          url + "/user/" + currentInfo.id,
          JSON.stringify(editInfo, ["name"]),
          config
        );
      } else {
        await axios.patch(
          url + "/user/" + currentInfo.id,
          JSON.stringify(editInfo, ["name", "password"]),
          config
        );
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeClickOpen = (item) => {
    setOpenDel(true);
    setCurrentInfo({
      ["id"]: item.id,
      ["name"]: item.name,
      ["type"]: item.type,
      ["status"]: item.status,
      ["image"]: item.image,
    });
  };

  const handleDeClose = () => {
    setOpenDel(false);
  };

  const handleDelSubmit = async () => {
    try {
      await axios.patch(url + "/user/" + currentInfo.id, { status: 1 }, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
            <Button size="large" color="inherit" onClick={handleSearch}>
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
            maxWidth="xs"
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
                    label="職位"
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
                  onBlur={handleEmployeeInfo}
                />
                {employeeInfo.username.length === 0 ? null : employeeInfo
                    .username.length >= 5 &&
                  employeeInfo.username.length <= 15 ? null : (
                  <Alert severity="error" sx={{ marginX: "1.5rem" }}>
                    帳號字數不符,限制為5-15字
                  </Alert>
                )}
                <Input
                  name="password"
                  label="請輸入密碼"
                  variant="outlined"
                  type="password"
                  required
                  onBlur={handleEmployeeInfo}
                />
                {employeeInfo.password.length === 0 ? null : employeeInfo
                    .password.length >= 5 &&
                  employeeInfo.password.length <= 15 ? null : (
                  <Alert severity="error" sx={{ marginX: "1.5rem" }}>
                    密碼字數不符,限制為5-15字
                  </Alert>
                )}
                <Input
                  name="passwordCheck"
                  label="請再次輸入密碼"
                  variant="outlined"
                  type="password"
                  required
                  onBlur={handleEmployeeInfo}
                />
                {employeeInfo.passwordCheck.length ===
                0 ? null : employeeInfo.passwordCheck ===
                  employeeInfo.password ? (
                  <Alert severity="success" sx={{ marginX: "1.5rem" }}>
                    與密碼相符
                  </Alert>
                ) : (
                  <Alert severity="error" sx={{ marginX: "1.5rem" }}>
                    與密碼不符，請重新輸入
                  </Alert>
                )}
                <DialogText>員工照片:</DialogText>
                <Container>
                  <UploadImgButton
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onImageChange}
                  />
                  <img width="100#" src={image} />
                </Container>
                <DialogActions>
                  <Button onClick={handleClose} size="large">
                    取消
                  </Button>
                  {employeeInfo.username.length >= 5 &&
                  employeeInfo.username.length <= 15 &&
                  employeeInfo.password.length >= 5 &&
                  employeeInfo.password.length <= 15 &&
                  employeeInfo.password === employeeInfo.passwordCheck &&
                  employeeInfo.name !== "" &&
                  employeeInfo.image !== "" ? (
                    <Button type="submit" size="large">
                      確認
                    </Button>
                  ) : (
                    <Button type="submit" size="large" disabled>
                      確認
                    </Button>
                  )}
                </DialogActions>
              </Stack>
            </form>
          </Dialog>

          <TableContainer component={Paper} sx={{ maxHeight: "38rem" }}>
            <Table stickyHeader>
              <TableHeads id={"employee"} />
              {filtered.length === 0 ? (
                <TableCell
                  align="center"
                  colSpan={5}
                  size="medium"
                  sx={{ fontSize: "1.5rem" }}
                >
                  查無資料
                </TableCell>
              ) : (
                filtered.map((item) => (
                  <>
                    <TableEmployee
                      Page={"shop"}
                      Img={item.image}
                      Name={item.name}
                      Type={item.type}
                      Status={item.status}
                      item={item}
                      Del={() => handleDeClickOpen(item)}
                      Edit={() => handleEditOpen(item)}
                    />
                  </>
                ))
              )}

              <Dialog
                open={openEdit}
                onClose={handleEditClose}
                onBackdropClick="false"
                aria-labelledby="edit"
                aria-describedby="edit"
                fullWidth="true"
                maxWidth="xs"
              >
                <FormTitle
                  variant="h6"
                  // 可移動部分尚未解決
                  // style={{ cursor: "move" }}
                  // id="draggable-dialog-title"
                >
                  {"修改員工資訊"}
                </FormTitle>
                {currentInfo.status === 1 ? (
                  <form onSubmit={handleSubmit}>
                    <Stack mx={5} my={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Input
                          name="name"
                          label="姓名"
                          variant="outlined"
                          disabled
                          onChange={handleEditInfo}
                          defaultValue={currentInfo.name}
                        />
                        <Input
                          name="status"
                          label="職位"
                          variant="outlined"
                          select
                          required
                          onChange={handleEmployeeInfo}
                          value={currentInfo.type}
                          sx={{ width: "12rem" }}
                          disabled
                        >
                          <MenuItem value={0}>員工</MenuItem>
                          <MenuItem value={1}>店長</MenuItem>
                        </Input>
                      </Stack>
                      <Input
                        name="status"
                        label="狀態"
                        variant="outlined"
                        select
                        required
                        onChange={handleEditInfo}
                        defaultValue={currentInfo.status}
                      >
                        <MenuItem value={0}>在職</MenuItem>
                        <MenuItem value={1} disabled>
                          已離職
                        </MenuItem>
                      </Input>

                      <DialogActions>
                        <Button onClick={handleEditClose} size="large">
                          取消
                        </Button>
                        {editInfo.status === 0 ? (
                          <Button
                            type="submit"
                            size="large"
                            onClick={handleEditSubmit}
                          >
                            確認
                          </Button>
                        ) : (
                          <Button type="submit" size="large" disabled>
                            確認
                          </Button>
                        )}
                      </DialogActions>
                    </Stack>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Stack mx={5} my={2}>
                      
                        <Input
                          name="name"
                          label="姓名"
                          variant="outlined"
                          required
                          onChange={handleEditInfo}
                          defaultValue={currentInfo.name}
                        />
                        <Stack direction="row" justifyContent="space-between">
                        <Input
                          name="status"
                          label="職位"
                          variant="outlined"
                          select
                          required
                          onChange={handleEmployeeInfo}
                          value={currentInfo.type}
                          sx={{ width: "12rem" }}
                          disabled
                        >
                          <MenuItem value={0}>員工</MenuItem>
                          <MenuItem value={1}>店長</MenuItem>
                        </Input>
                        <Input
                          name="status"
                          label="狀態"
                          variant="outlined"
                          select
                          required
                          onChange={handleEditInfo}
                          defaultValue={currentInfo.status}
                          sx={{ width: "12rem" }}
                          disabled
                        >
                          <MenuItem value={0}>在職</MenuItem>
                          <MenuItem value={1} disabled>
                            已離職
                          </MenuItem>
                        </Input>
                      </Stack>
                      <Input
                        name="password"
                        label="如需修改，請輸入密碼"
                        variant="outlined"
                        type="password"
                        onBlur={handleEditInfo}
                      />
                      {editInfo.password.length === 0 ? null : editInfo.password
                          .length >= 5 &&
                        editInfo.password.length <= 15 ? null : (
                        <Alert severity="error" sx={{ marginX: "1.5rem" }}>
                          密碼字數不符,限制為5-15字
                        </Alert>
                      )}
                      <Input
                        name="passwordCheck"
                        label="請再次輸入密碼"
                        variant="outlined"
                        type="password"
                        onBlur={handleEditInfo}
                      />
                      {editInfo.passwordCheck.length ===
                      0 ? null : editInfo.passwordCheck ===
                        editInfo.password ? (
                        <Alert severity="success" sx={{ marginX: "1.5rem" }}>
                          與密碼相符
                        </Alert>
                      ) : (
                        <Alert severity="error" sx={{ marginX: "1.5rem" }}>
                          與密碼不符，請重新輸入
                        </Alert>
                      )}
                      <DialogActions>
                        <Button onClick={handleEditClose} size="large">
                          取消
                        </Button>

                        {editInfo.password !== "" ||
                        editInfo.passwordCheck !== "" ? (
                          editInfo.password.length >= 5 &&
                          editInfo.password.length <= 15 &&
                          editInfo.password === editInfo.passwordCheck ? (
                            <Button
                              type="submit"
                              size="large"
                              onClick={handleEditSubmit}
                            >
                              確認
                            </Button>
                          ) : (
                            <Button type="submit" size="large" disabled>
                              確認
                            </Button>
                          )
                        ) : (
                          <Button
                            type="submit"
                            size="large"
                            onClick={handleEditSubmit}
                          >
                            確認
                          </Button>
                        )}
                      </DialogActions>
                    </Stack>
                  </form>
                )}
              </Dialog>

              <Dialog
                open={openDel}
                onClose={handleDeClose}
                onBackdropClick="false"
                fullWidth="true"
                maxWidth="xs"
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <FormTitle
                  variant="h6"
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  {"確定要刪除此員工?"}
                </FormTitle>
                <Stack mx={5} my={2} >
                  <List aria-label="mailbox folders">
                    <ListItem button divider disableGutters>
                      <ListItemText primary="姓名 :" sx={{ maxWidth: "50%" }} inset/>
                      <Chip label={currentInfo.name} />
                    </ListItem>
                    <ListItem button divider disableGutters>
                      <ListItemText primary="職位 :" sx={{ maxWidth: "50%" }} inset/>
                      <Chip label={currentInfo.type} />
                    </ListItem>
                    <ListItem button divider disableGutters>
                      <ListItemText primary="狀態 :" sx={{ maxWidth: "50%" }} inset/>
                      <Chip label={currentInfo.status} />
                    </ListItem>
                    <ListItem button divider disableGutters>
                      <ListItemText
                        primary="員工照片 :"
                        sx={{ maxWidth: "37.5%" }} inset/>
                      <img
                        src={"http://localhost:8000/" + currentInfo.image}
                        alt={currentInfo.image}
                        width="150"
                      />
                    </ListItem>
                  </List>
                  <DialogActions>
                    <Button onClick={handleDeClose}>取消</Button>
                    <Button onClick={() => handleDelSubmit()}>確認</Button>
                  </DialogActions>
                </Stack>
              </Dialog>
            </Table>
          </TableContainer>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Employee;
