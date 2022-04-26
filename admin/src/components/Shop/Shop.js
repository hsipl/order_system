import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableContainer,
  Dialog,
  DialogActions,
  Button,
  MenuItem,
  Stack,
  Box,
  Tab,
  Alert,
  TableCell,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { BodyContainer, Navbar, Content, Breadcrumb } from "../Navbar";
import { Search } from "@material-ui/icons";
import { TableShop, TableHeads } from "../Table";
import { UploadImgButton } from "../Buttons";
import ShopProduct from "./ShopProduct";
import {
  DialogText,
  FormTitle,
  SearchBox,
  SearchContainer,
  Input,
  PaperComponent,
} from "../SearchAndForm";
import MenuList from "../Menu";

const Shop = () => {
  const [arrayData, setArratData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [shopInfo, setShopInfo] = useState({
    name: "",
    type: 0,
    status: 0,
  });
  const [image, setImage] = useState(null);
  const [currentShop, setCurrentShop] = useState({});
  const [searchInput, setSearchInput] = useState({
    name: "",
    status: "",
  });
  const [searchData, setSearchData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [value, setValue] = useState(localStorage.getItem("StoreTabs"));
  const [openManager, setOpenManager] = useState(false);
  const [manageInfo, setManageInfo] = useState({
    name: "",
    type: 1,
    status: 0,
    account: "",
    password: "",
    passwordVal: "",
  });
  const [check, setCheck] = useState(0); //wrong
  const [openBuinessCard, setopenBuinessCard] = useState(false);
  const [bussineCheck, setBussineCheck] = useState(0); //wrong
  const [businessCard, setBusinessCard] = useState({
    name: "",
    password: "",
    passwordVal: "",
    type: 1,
    status: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeClickOpen = (item) => {
    setOpenDel(true);
    setCurrentShop({
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

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setShopInfo({
      name: "",
      type: 0,
      status: 0,
    });
  };

  const handleEditOpen = (item) => {
    setOpenEdit(true);
    setCurrentShop({
      ["id"]: item.id,
      ["name"]: item.name,
      ["type"]: item.type === "總店" ? 1 : 0,
      ["status"]: item.status === "營業中" ? 0 : 1,
    });
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setImage(null);
  };
  const url = "http://localhost:8000/api/store";
  const employee_url = "http://localhost:8000/api/user/user";
  const register_url = "http://localhost:8000/api/user/register";

  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const get_api = async () => {
      try {
        let { data } = await axios.get(url, config);
        for (var i = 0; i < data.length; i++) {
          data[i].createdAt = data[i].createdAt.replace("Z", "");
          data[i].createdAt = data[i].createdAt.replace("T", " ");
          data[i].createdAt = data[i].createdAt.substring(0, 19);
        }
        setArratData(data);
        toChinese(data);
      } catch (e) {
        localStorage.removeItem("UserAccount");
      }
    };

    get_api();
  }, []);

  useEffect(() => {
    const get_api = async () => {
      try {
        let { data } = await axios.get(employee_url, config);
        for (var i = 0; i < data.length; i++) {
          data[i].status === 0
            ? (data[i].status = "在職中")
            : (data[i].status = "已離職");
          data[i].type === 0
            ? (data[i].type = "員工")
            : (data[i].type = "店長");
        }
        setEmployeeData(data);
      } catch (e) {
        localStorage.removeItem("UserAccount");
      }
    };
    get_api();
  }, []);

  let getemployeeId = employeeData.map((employeeId) => employeeId.id);
  let getemployeeName = employeeData.map((employeeName) => employeeName.name);
  let getemployeeType = employeeData.map((employeeType) => employeeType.type);
  let getemployeeStatus = employeeData.map(
    (employeeStatus) => employeeStatus.status
  );
  let getemployeeImage = employeeData.map(
    (employeeImage) => employeeImage.image
  );

  //Search part
  const filtered = searchData === null ? arrayData : searchData;
  function SearchOnChange(e) {
    const { value, name } = e.target;

    setSearchInput((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleSearch = async () => {
    if (searchInput.name === "" && searchInput.status === "") {
      let { data } = await axios.get(url, config);
      toChinese(data);
    } else if (searchInput.name === "" && searchInput.status !== "") {
      let { data } = await axios.get(
        url + "?status=" + searchInput.status,
        config
      );
      toChinese(data);
    } else if (searchInput.name !== "" && searchInput.status === "") {
      let { data } = await axios.get(url + "?name=" + searchInput.name, config);
      toChinese(data);
    } else {
      let { data } = await axios.get(
        url + "?name=" + searchInput.name + "&status=" + searchInput.status,
        config
      );
      toChinese(data);
    }
  };

  const handleClean = async () => {
    setSearchData(null);
    setSearchInput({
      name: "",
      status: "",
    });
  };

  function toChinese(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].type === 0 ? (data[i].type = "分店") : (data[i].type = "總店");
      data[i].status === 0
        ? (data[i].status = "營業中")
        : (data[i].status = "已歇業");
      data[i].createdAt = data[i].createdAt.replace("Z", "");
      data[i].createdAt = data[i].createdAt.replace("T", " ");
      data[i].createdAt = data[i].createdAt.substring(0, 19);
    }
    setSearchData(data);
  }

  function handleShopInfo(e) {
    const { value, name } = e.target;

    setShopInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  function onImageChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setShopInfo((preData) => ({
      ...preData,
      ["image"]: e.target.files[0],
    }));
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", shopInfo.name);
    formData.append("type", shopInfo.type);
    formData.append("status", shopInfo.status);
    formData.append("image", shopInfo.image);

    try {
      await axios.post(url, formData, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    shopInfo.name === ""
      ? formData.append("name", currentShop.name)
      : formData.append("name", shopInfo.name);
    formData.append("type", shopInfo.type);
    formData.append("status", shopInfo.status);
    formData.append("image", shopInfo.image);
    try {
      await axios.put(url + "/" + currentShop.id, formData, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(url + "/" + currentShop.id, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    {
      localStorage.setItem("StoreTabs", newValue);
    }
  };

  //Handle manage

  const handleEmployee = (item) => {
    setOpenManager(true);
    setCurrentShop({
      ["id"]: item.id,
    });
  };

  const handleManageClose = () => {
    setOpenManager(false);
  };

  function handleCheck(e) {
    e.target.value.length >= 5 &&
    e.target.value.length <= 15 &&
    e.target.value != null
      ? setCheck(1)
      : setCheck(0);

    manageInfo.password === e.target.value ? setCheck(1) : setCheck(0);
  }

  function onManagerImageChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setManageInfo((preData) => ({
      ...preData,
      ["image"]: e.target.files[0],
    }));
  }

  function handleManagerChange(e) {
    const { value, name } = e.target;

    setManageInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleManagerSubmit = async () => {
    const formData = new FormData();
    formData.append("username", manageInfo.account);
    formData.append("password", manageInfo.password);
    formData.append("name", manageInfo.name);
    formData.append("type", manageInfo.type);
    formData.append("status", manageInfo.status);
    formData.append("storeId", currentShop.id);
    formData.append("image", manageInfo.image);
    try {
      await axios.post(register_url, formData, config);
    } catch (error) {
      console.log(error);
    }
  };

  /*處理 BusinessCard*/

  const handleBusinessCard = (item) => {
    setopenBuinessCard(true);
    setCurrentShop({
      ["id"]: item.id - 1,
    });
  };

  const handleBusinessCardClose = () => {
    setopenBuinessCard(false);
  };

  function handleBusinessCardChange(e) {
    const { value, name } = e.target;
    if (businessCard.name === "") {
      setBusinessCard((preData) => ({
        ...preData,
        ["name"]: getemployeeName[currentShop.id],
      }));
    } else {
      setBusinessCard((preData) => ({
        ...preData,
        [name]: value,
      }));
    }
  }

  function handleBussineCheck(e) {
    e.target.value.length >= 5 &&
    e.target.value.length <= 15 &&
    e.target.value != null
      ? setBussineCheck(1)
      : setBussineCheck(0);

    businessCard.password === e.target.value
      ? setBussineCheck(1)
      : setBussineCheck(0);
  }

  const handleBusinessCardSubmit = async () => {
    var id = currentShop.id + 1;

    JSON.stringify(businessCard);

    try {
      await axios.put(
        employee_url + "/" + id,
        JSON.stringify(businessCard, ["password", "name", "type", "status"]),
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = useState(1);
  function goNextPage() {
    if (page === 2) return;
    setPage((page) => page + 1);
  }

  function goPrePage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  const onChangeSearchValue = (onChangeSearchName, onChangeSearchValue) => {
    setSearchInput((preData) => ({
      ...preData,
      [onChangeSearchName]: onChangeSearchValue,
    }));
  };

  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="分店管理" />

          {/*Tabs*/}
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="分店資訊" value="1" />
                  <Tab label="財務報表" value="2" />
                  <Tab label="商品資訊" value="3" />
                </TabList>
                <TabPanel value="1">
                  <SearchContainer>
                    <SearchBox
                      id="SearchProductName"
                      label="店家名稱"
                      variant="filled"
                      type="search"
                      name="name"
                      value={searchInput.name}
                      onChange={SearchOnChange}
                    />
                    <MenuList
                      label="營業狀態"
                      value={searchInput.status}
                      onChange={onChangeSearchValue}
                      name="status"
                      type="ShopStauts"
                    />
                    <Button
                      size="large"
                      color="inherit"
                      onClick={() => handleSearch()}
                    >
                      <Search fontSize="large" />
                    </Button>
                    <Button onClick={handleClean}>清除搜尋</Button>
                    <Button
                      onClick={handleClickOpen}
                      variant="contained"
                      color="success"
                      className="AddBTN"
                    >
                      新增分店
                    </Button>
                  </SearchContainer>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    onBackdropClick="false"
                    fullWidth="true"
                    maxWidth="sm"
                  >
                    <FormTitle variant="h6">{"新增店鋪資訊"}</FormTitle>

                    <form>
                      <Stack mx={5} my={3}>
                        <Input
                          onChange={handleShopInfo}
                          value={shopInfo.name}
                          name="name"
                          label="店家名稱"
                          variant="outlined"
                          required
                        />
                        <Input
                          select
                          onChange={handleShopInfo}
                          value={shopInfo.type}
                          label="類型"
                          name="type"
                          required
                        >
                          <MenuItem value={0}>分店</MenuItem>
                          <MenuItem value={1}>總店</MenuItem>
                        </Input>
                        <Input
                          select
                          onChange={handleShopInfo}
                          value={shopInfo.status}
                          name="status"
                          label="狀態"
                          required
                        >
                          <MenuItem value={0}>營業中</MenuItem>
                        </Input>
                        <DialogText>Logo圖片:</DialogText>
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
                          <Button
                            type="submit"
                            onClick={handleSubmit}
                            size="large"
                          >
                            確認
                          </Button>
                        </DialogActions>
                      </Stack>
                    </form>
                  </Dialog>

                  <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
                    <Table stickyHeader>
                      <TableHeads id={"shop"} />
                      {filtered.length === 0 ? (
                        <TableCell
                          colSpan={6}
                          align="center"
                          style={{ fontSize: "1.5rem" }}
                        >
                          查無此資料
                        </TableCell>
                      ) : (
                        filtered.map((item, index) => (
                          <>
                            <TableShop
                              Page={"shop"}
                              Img={item.image}
                              storeName={item.name}
                              storeType={item.type}
                              storeStatus={item.status}
                              createdAt={item.createdAt}
                              item={item}
                              idIdentity={
                                getemployeeId[item.id - 1] === undefined
                              }
                              Del={() => handleDeClickOpen(item)}
                              Edit={() => handleEditOpen(item)}
                              ManageEdit={() => handleEmployee(item)}
                              BusinessCard={() => handleBusinessCard(item)}
                            />
                          </>
                        ))
                      )}
                      {/*設定管理者資訊Doalog*/}
                      <Dialog
                        open={openManager}
                        onClose={handleManageClose}
                        onBackdropClick="false"
                        fullWidth="true"
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                      >
                        <FormTitle
                          variant="h6"
                          style={{ cursor: "move" }}
                          id="draggable-dialog-title"
                        >
                          {"新增店長資訊"}
                        </FormTitle>

                        <form>
                          <Stack mx={8} my={1}>
                            <Input
                              name="storeId"
                              label="分店編號"
                              variant="outlined"
                              defaultValue={currentShop.id}
                              disabled
                            />
                            <Input
                              select
                              onChange={handleManagerChange}
                              defaultValue={1}
                              label="類型"
                              name="type"
                              disabled
                            >
                              <MenuItem value={0} disabled>
                                員工
                              </MenuItem>
                              <MenuItem value={1}>店長</MenuItem>
                            </Input>
                            <Input
                              select
                              onChange={handleManagerChange}
                              defaultValue={0}
                              name="status"
                              label="狀態"
                              disabled
                            >
                              <MenuItem value={0}>在職中</MenuItem>
                              <MenuItem value={1} disabled>
                                已停職
                              </MenuItem>
                            </Input>
                            <Input
                              autoFocus
                              onChange={handleManagerChange}
                              name="name"
                              label="使用者名稱"
                              variant="outlined"
                              required
                            />
                            <Input
                              placeholder="帳號"
                              name="account"
                              onBlur={handleManagerChange}
                              onChange={handleCheck}
                              required
                              label="帳號"
                            />
                            {manageInfo.account.length === 0 ? null : manageInfo
                                .account.length >= 5 &&
                              manageInfo.account.length <= 15 ? null : (
                              <Alert severity="error">
                                帳號長度不足(需再5~15碼之間)!
                              </Alert>
                            )}

                            <Input
                              id="InputPassword"
                              type="password"
                              placeholder="新密碼"
                              name="password"
                              onBlur={handleManagerChange}
                              onChange={handleCheck}
                              required
                              label="新密碼"
                            />
                            <DialogText sx={{ width: "85%" }}>
                              {manageInfo.password.length ===
                              0 ? null : manageInfo.password.length >= 5 &&
                                manageInfo.password.length <= 15 ? null : (
                                <Alert severity="error">
                                  密碼長度不足(需再5~15碼之間)!
                                </Alert>
                              )}
                            </DialogText>
                            <Input
                              id="InputPassword"
                              type="password"
                              name="passwordVal"
                              placeholder="請再次輸入新密碼"
                              onBlur={handleManagerChange}
                              onChange={handleCheck}
                              required
                              label="請再次輸入新密碼"
                            />
                            <DialogText sx={{ width: "85%" }}>
                              {manageInfo.passwordVal.length ===
                              0 ? null : manageInfo.password ===
                                manageInfo.passwordVal ? (
                                <Alert severity="success">與密碼相符!</Alert>
                              ) : (
                                <Alert severity="error">與密碼不相符!</Alert>
                              )}
                            </DialogText>

                            <DialogText>照片:</DialogText>
                            <Container>
                              <UploadImgButton
                                name="file"
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={onManagerImageChange}
                              />
                              <img width="100#" src={image} />
                            </Container>
                            <DialogActions>
                              <Button onClick={handleManageClose}>取消</Button>
                              {check === 1 ? (
                                <Button
                                  type="submit"
                                  onClick={handleManagerSubmit}
                                >
                                  確認
                                </Button>
                              ) : (
                                <Button disabled>確認</Button>
                              )}
                            </DialogActions>
                          </Stack>
                        </form>
                      </Dialog>
                      {/*BusinessCard Doalog*/}
                      <Dialog
                        open={openBuinessCard}
                        onClose={handleBusinessCardClose}
                        onBackdropClick="false"
                        fullWidth="true"
                        maxWidth="xs"
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                      >
                        <FormTitle variant="h6" id="draggable-dialog-title">
                          {"確認/修改店長資訊"}
                        </FormTitle>
                        {/*.........................................................................*/}
                        {page === 1 && (
                          <Stack mx={5} my={3} style={{ textAlign: "right" }}>
                            <List aria-label="mailbox folders">
                              <ListItem button>
                                <ListItemText
                                  primary="店長名稱 :"
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip label={getemployeeName[currentShop.id]} />
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <ListItemText
                                  primary="類型 :"
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip label={getemployeeType[currentShop.id]} />
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <ListItemText
                                  primary="狀態 :"
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip
                                  label={getemployeeStatus[currentShop.id]}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <ListItemText
                                  primary="店長照片 :"
                                  sx={{ maxWidth: "40%" }}
                                />
                                <img
                                  src={
                                    "http://localhost:8000/" +
                                    getemployeeImage[currentShop.id]
                                  }
                                  alt={getemployeeImage[currentShop.id]}
                                  width="150"
                                />
                              </ListItem>
                            </List>
                            <DialogActions>
                              <Button onClick={handleBusinessCardClose}>
                                關閉
                              </Button>
                              <Button onClick={goNextPage}>修改店長資訊</Button>
                            </DialogActions>
                          </Stack>
                        )}
                        {page === 2 && (
                          <form>
                            <Stack mx={8} my={1}>
                              <Input
                                autoFocus
                                onChange={handleBusinessCardChange}
                                name="name"
                                defaultValue={getemployeeName[currentShop.id]}
                                label="店長姓名"
                                variant="outlined"
                                required
                                autocomplete="on"
                              />
                              <Input
                                type="password"
                                placeholder="新密碼"
                                name="password"
                                onBlur={handleBusinessCardChange}
                                onChange={handleBussineCheck}
                                required
                                label="新密碼"
                              />
                              <DialogText sx={{ width: "85%" }}>
                                {businessCard.password.length ===
                                0 ? null : businessCard.password.length >= 5 &&
                                  businessCard.password.length <= 15 ? null : (
                                  <Alert severity="error">
                                    密碼長度不足(需再5~15碼之間)!
                                  </Alert>
                                )}
                              </DialogText>
                              <Input
                                type="password"
                                name="passwordVal"
                                placeholder="請再次輸入新密碼"
                                onBlur={handleBusinessCardChange}
                                onChange={handleBussineCheck}
                                required
                                label="請再次輸入新密碼"
                              />
                              <DialogText sx={{ width: "85%" }}>
                                {businessCard.passwordVal.length ===
                                0 ? null : businessCard.password ===
                                  businessCard.passwordVal ? (
                                  <Alert severity="success">與密碼相符!</Alert>
                                ) : (
                                  <Alert severity="error">與密碼不相符!</Alert>
                                )}
                              </DialogText>
                            </Stack>
                            <DialogActions>
                              <Button onClick={handleBusinessCardClose}>
                                關閉
                              </Button>
                              <Button onClick={goPrePage}>上一步</Button>
                              {bussineCheck === 1 ? (
                                <Button
                                  type="submit"
                                  onClick={handleBusinessCardSubmit}
                                >
                                  提交
                                </Button>
                              ) : (
                                <Button disabled>提交</Button>
                              )}
                            </DialogActions>
                          </form>
                        )}
                      </Dialog>

                      {/*刪除 Dialog*/}
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
                          {"確定要刪除此項目?"}
                        </FormTitle>
                        <Stack mx={5} my={3} style={{ textAlign: "right" }}>
                          <List aria-label="mailbox folders">
                            <ListItem button>
                              <ListItemText
                                primary="店家名稱 :"
                                sx={{ maxWidth: "50%" }}
                              />
                              <Chip label={currentShop.name} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                              <ListItemText
                                primary="類型 :"
                                sx={{ maxWidth: "50%" }}
                              />
                              <Chip label={currentShop.type} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                              <ListItemText
                                primary="狀態 :"
                                sx={{ maxWidth: "50%" }}
                              />
                              <Chip label={currentShop.status} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                              <ListItemText
                                primary="店家照片 :"
                                sx={{ maxWidth: "40%" }}
                              />
                              <img
                                src={
                                  "http://localhost:8000/" + currentShop.image
                                }
                                alt={currentShop.image}
                                width="150"
                              />
                            </ListItem>
                          </List>
                          <DialogActions>
                            <Button onClick={handleDeClose}>取消</Button>
                            <Button onClick={() => handleDelete()}>確認</Button>
                          </DialogActions>
                        </Stack>
                      </Dialog>

                      <Dialog
                        open={openEdit}
                        onClose={handleEditClose}
                        onBackdropClick="false"
                        aria-labelledby="edit"
                        aria-describedby="edit"
                        fullWidth="true"
                        maxWidth="sm"
                      >
                        <FormTitle variant="h6">{"修改店鋪資訊"}</FormTitle>

                        <form>
                          {currentShop.status === 0 ? (
                            <Stack mx={5} my={3}>
                              <Input
                                defaultValue={currentShop.name}
                                onChange={handleShopInfo}
                                name="name"
                                label="店家名稱"
                                variant="outlined"
                              />
                              <Input
                                select
                                onChange={handleShopInfo}
                                defaultValue={currentShop.type}
                                label="類型"
                                name="type"
                              >
                                <MenuItem value={0}>分店</MenuItem>
                                <MenuItem value={1}>總店</MenuItem>
                              </Input>
                              <Input
                                select
                                onChange={handleShopInfo}
                                defaultValue={currentShop.status}
                                name="status"
                                label="狀態"
                              >
                                <MenuItem value={0}>營業中</MenuItem>
                                <MenuItem value={1} disabled>
                                  已歇業
                                </MenuItem>
                              </Input>
                              <DialogText>Logo圖片:</DialogText>
                              <Container>
                                <UploadImgButton
                                  name="file"
                                  accept="image/*"
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange={onImageChange}
                                />
                                <img width="100#" src={image} />
                              </Container>
                              <DialogActions>
                                <Button onClick={handleEditClose}>取消</Button>
                                <Button onClick={() => handleEditSubmit()}>
                                  確認
                                </Button>
                              </DialogActions>
                            </Stack>
                          ) : (
                            <Stack mx={5} my={3}>
                              <Input
                                defaultValue={currentShop.name}
                                name="name"
                                label="店家名稱"
                                disabled
                                variant="outlined"
                              />
                              <Input
                                select
                                onChange={handleShopInfo}
                                defaultValue={currentShop.type}
                                label="類型"
                                name="type"
                                disabled
                              >
                                <MenuItem value={0}>分店</MenuItem>
                                <MenuItem value={1}>總店</MenuItem>
                              </Input>
                              <Input
                                select
                                onChange={handleShopInfo}
                                defaultValue={currentShop.status}
                                name="status"
                                label="狀態"
                              >
                                <MenuItem value={0}>營業中</MenuItem>
                                <MenuItem value={1} disabled>
                                  已歇業
                                </MenuItem>
                              </Input>
                              <DialogText>Logo圖片:</DialogText>
                              <Container>
                                <UploadImgButton
                                  name="file"
                                  accept="image/*"
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange={onImageChange}
                                />
                                <img width="100#" src={image} />
                              </Container>
                              <DialogActions>
                                <Button onClick={handleEditClose}>取消</Button>
                                <Button onClick={() => handleEditSubmit()}>
                                  確認
                                </Button>
                              </DialogActions>
                            </Stack>
                          )}
                        </form>
                      </Dialog>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="2">
                  <div>This is report tabs.</div>
                </TabPanel>
                <TabPanel value="3">
                  <ShopProduct />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Shop;
