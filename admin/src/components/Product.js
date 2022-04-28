import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableCell,
  TableContainer,
  Paper,
  Button,
  TextField,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  Chip,
  ListItemText,
  Tab,
  Container,
} from "@mui/material";
import { FormTitle, SearchBox, SearchContainer } from "./SearchAndForm";
import Stack from "@mui/material/Stack";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { UploadImgButton } from "./Buttons";
import Draggable from "react-draggable";
import "react-toastify/dist/ReactToastify.css";
import { TableHeads, TableProduct } from "./Table";
import { Search } from "@material-ui/icons";
import MenuList from "./Menu";

const AddForm = styled.form`
  height: 400px;
`;

const Product = (props) => {
  const [sauceData, setSauceData] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [changeArrayData, setChangeArrayData] = useState([]);
  const [searchSauceInput, setSearchSauceInput] = useState({
    name: "",
    status: "",
  });
  const [searchInput, setSearchInput] = useState({
    name: "",
    status: "",
    category: "",
  });
  const [open, setOpen] = useState(false);
  const [openDe, setOpenDe] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [sauceInfo, setSauceInfo] = useState({
    tag: "",
    status: 0,
  });
  const [sauceFilter, setSauceFilter] = useState([]);
  const [productData, setProductData] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [changeProductData, setChangeProductData] = useState([]);
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    category: "",
    status: 0,
    storeId: localStorage.getItem("StoreId"),
  });
  const [currentSauce, setCurrentSauce] = useState({});
  const [currentInfo, setCurrentInfo] = useState({});

  /*Tab*/

  const [value, setValue] = useState(localStorage.getItem("Tabs"));

  const searchboxMenuStatus = [{ name: "販賣中" }, { name: "已停售" }];

  const searchboxMenuTagsStatus = [{ name: "使用中" }, { name: "已停用" }];

  const searchboxMenuNewTagsStatus = [{ name: "使用中" }, { name: "未使用" }];

  const searchboxMenuCategory = [
    { name: "肉類" },
    { name: "蔬菜類" },
    { name: "加工類" },
    { name: "其他類" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    {
      localStorage.setItem("Tabs", newValue);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleProductDeClickOpen = (id, item, index) => {
    setOpenDe(true);
    setCurrentId(id);
    setCurrentInfo({
      ["name"]: item.name,
      ["price"]: item.price,
      ["category"]:
        item.category === "肉類"
          ? 0
          : item.category === "蔬菜類"
          ? 1
          : item.category === "加工類"
          ? 2
          : 3,
      ["category2"]: item.category,
      ["image"]: item.image,

      ["tag"]: getProductId[index],
      ["tagName"]: getProductTag[index],
    });
  };

  const handleDeClose = () => {
    setOpenDe(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProductEditOpen = (id, item, index) => {
    setOpenEdit(true);

    setCurrentInfo({
      ["name"]: item.name,
      ["price"]: item.price,
      ["category"]:
        item.category === "肉類"
          ? 0
          : item.category === "蔬菜類"
          ? 1
          : item.category === "加工類"
          ? 2
          : 3,
      ["category2"]: item.category,
      ["image"]: item.image,

      ["tag"]: getProductId[index],
      ["tagName"]: getProductTag[index],
    });

    setCurrentId(id);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const url_Sauce = "http://localhost:8000/api/tag";
  const url_Product = "http://localhost:8000/api/product";
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  function PaperComponent(props) {
    return (
      <Draggable>
        <Paper {...props} />
      </Draggable>
    );
  }

  /***************Handle Sauce***************/
  useEffect(() => {
    const get_SauceApi = async () => {
      try {
        let { data } = await axios.get(url_Sauce, config);
        setSauceData(data);
        for (var i = 0; i < data.length; i++) {
          data[i].status === 0
            ? (data[i].status = "使用中")
            : (data[i].status = "已停用");
        }
        setChangeArrayData(data);
        setSauceFilter(data);
      } catch (e) {
        localStorage.removeItem("UserAccount");
      }
    };
    get_SauceApi();
  }, []);

  function handleSauceInfo(e) {
    const { value, name } = e.target;

    setSauceInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleSauceDeClickOpen = (item, index) => {
    setOpenDe(true);

    setCurrentSauce({
      ["id"]: item.id,
      ["tag"]: item.tag,
      ["status"]: item.status === "使用中" ? 0 : 1,
    });
  };

  const handleSauceEditOpen = (item, index) => {
    setOpenEdit(true);

    setCurrentSauce({
      ["id"]: item.id,
      ["tag"]: item.tag,
      ["status"]: item.status === "使用中" ? 0 : 1,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(url_Sauce, JSON.stringify(sauceInfo), config);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        url_Sauce + "/" + currentSauce.id,
        JSON.stringify(sauceInfo),
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(url_Sauce + "/" + currentSauce.id, config);
      window.location.reload();
    } catch (error) {}
  };

  function SearchSauceOnChange(e) {
    const { value, name } = e.target;
    setSearchSauceInput((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  function SearchOnChange(e) {
    const { value, name } = e.target;
    setSearchInput((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const filtered = sauceFilter === null ? sauceData : sauceFilter;

  const handleSauceSearch = async () => {
    try {
      if (searchSauceInput.name === "" && searchSauceInput.status === "") {
        let { data } = await axios.get(url_Sauce, config);

        sauceChange(data);
      } else if (
        searchSauceInput.name !== "" &&
        searchSauceInput.status === ""
      ) {
        let { data } = await axios.get(
          url_Sauce + "?tag=" + searchSauceInput.name,
          config
        );
        sauceChange(data);
      } else if (
        searchSauceInput.name === "" &&
        searchSauceInput.status !== ""
      ) {
        let { data } = await axios.get(
          url_Sauce + "?status=" + searchSauceInput.status,
          config
        );
        sauceChange(data);
      } else {
        let { data } = await axios.get(
          url_Sauce +
            "?tag=" +
            searchSauceInput.name +
            "&status=" +
            searchSauceInput.status,
          config
        );
        sauceChange(data);
      }
    } catch (error) {}
  };

  function sauceChange(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].status === 0
        ? (data[i].status = "使用中")
        : (data[i].status = "已停用");
    }
    setSauceFilter(data);
  }

  const handleClean = async () => {
    setSauceFilter(null);
    setProductFilter(null);
    setSearchSauceInput({
      name: "",
      status: "",
    });
    setSearchInput({
      name: "",
      status: "",
      category: "",
    });
  };

  /***************Handle Product***************/

  useEffect(() => {
    const get_ProductApi = async () => {
      try {
        let { data } = await axios.get(
          url_Product + "?storeId=" + localStorage.getItem("StoreId"),
          config
        );

        setProductData(data);
        for (var i = 0; i < data.length; i++) {
          data[i].status === 0
            ? (data[i].status = "販賣中")
            : (data[i].status = "已停售");
          data[i].category === 0
            ? (data[i].category = "肉類")
            : data[i].category === 1
            ? (data[i].category = "蔬菜類")
            : data[i].category === 2
            ? (data[i].category = "加工類")
            : (data[i].category = "其他類");
          data[i].image === null ? (data[i].image = "無") : "";
        }
        setChangeProductData(data);

        setProductFilter(data);
      } catch (e) {
        localStorage.removeItem("UserAccount");
      }
    };
    get_ProductApi();
  }, []);

  function handleProductInfo(e) {
    const { value, name } = e.target;

    setProductInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const filteredProduct = productFilter === null ? productData : productFilter;

  const handleProductSearch = async () => {
    try {
      if (
        searchInput.name === "" &&
        searchInput.status === "" &&
        searchInput.category === ""
      ) {
        let { data } = await axios.get(url_Product, config);

        productChange(data);
      } else if (
        searchInput.name !== "" &&
        searchInput.status === "" &&
        searchInput.category === ""
      ) {
        let { data } = await axios.get(
          url_Product + "?name=" + searchInput.name,
          config
        );
        productChange(data);
      } else if (
        searchInput.name === "" &&
        searchInput.status !== "" &&
        searchInput.category === ""
      ) {
        let { data } = await axios.get(
          url_Product + "?status=" + searchInput.status,
          config
        );
        productChange(data);
      } else if (
        searchInput.name === "" &&
        searchInput.status === "" &&
        searchInput.category !== ""
      ) {
        let { data } = await axios.get(
          url_Product + "?category=" + searchInput.category,
          config
        );
        productChange(data);
      } else if (
        searchInput.name !== "" &&
        searchInput.status !== "" &&
        searchInput.category === ""
      ) {
        let { data } = await axios.get(
          url_Product +
            "?name=" +
            searchInput.category +
            "&status=" +
            searchInput.status,
          config
        );
        productChange(data);
      } else if (
        searchInput.name === "" &&
        searchInput.status !== "" &&
        searchInput.category !== ""
      ) {
        let { data } = await axios.get(
          url_Product +
            "?status=" +
            searchInput.status +
            "&category=" +
            searchInput.category,
          config
        );
        productChange(data);
      } else {
        let { data } = await axios.get(
          url_Product +
            "?name=" +
            searchInput.name +
            "&category=" +
            searchInput.category,
          config
        );
        productChange(data);
      }
    } catch (error) {}
  };

  function productChange(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].status === 0
        ? (data[i].status = "販賣中")
        : (data[i].status = "已停售");
      data[i].category === 0
        ? (data[i].category = "肉類")
        : data[i].category === 1
        ? (data[i].category = "蔬菜類")
        : data[i].category === 2
        ? (data[i].category = "加工類")
        : (data[i].category = "其他類");
    }
    setProductFilter(data);
  }

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setProductInfo((preData) => ({
      ...preData,
      ["image"]: e.target.files[0],
    }));
  };

  const handleCheckChange = (e) => {
    e.target.checked === true
      ? setProductInfo({
          ...productInfo,
          [e.target.name + "[" + e.target.value + "]"]: e.target.value,
        })
      : setProductInfo({
          ...productInfo,
          [e.target.name + "[" + e.target.value + "]"]: null,
        });
  };

  const handleProductSubmit = async () => {
    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("price", productInfo.price);
    formData.append("category", productInfo.category);
    formData.append("status", productInfo.status);
    formData.append("storeId", productInfo.storeId);

    for (var i = 1; i <= 1000; i++) {
      formData.append("tags[" + i + "]", productInfo["tags[" + i + "]"]);
    }
    formData.append("image", productInfo.image);

    try {
      await axios.post(url_Product, formData, config);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDelete = async () => {
    try {
      await axios.delete(url_Product + "/" + currentId, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductEditSubmit = async () => {
    try {
      const formData = new FormData();
      productInfo.name === ""
        ? formData.append("name", currentInfo.name)
        : formData.append("name", productInfo.name);
      productInfo.price === ""
        ? formData.append("price", currentInfo.price)
        : formData.append("price", productInfo.price);
      productInfo.category === ""
        ? formData.append("category", currentInfo.category)
        : formData.append("category", productInfo.category);
      formData.append("status", productInfo.status);
      formData.append("storeId", productInfo.storeId);
      for (var i = 1; i <= 1000; i++) {
        formData.append("tags[" + i + "]", productInfo["tags[" + i + "]"]);
      }
      formData.append("image", productInfo.image);
      await axios.put(url_Product + "/" + currentId, formData, config);
    } catch (error) {
      console.log(error);
    }
  };

  const sauceTag = sauceData.map((sauce, index) =>
    sauce.status === "已停用" ? null : (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            onChange={handleCheckChange}
            check={productInfo}
            value={sauce.id}
            name="tags"
          />
        }
        label={sauce.tag}
      />
    )
  );

  let getProductTag = productData.map((taggs) => taggs.tags.map((k) => k.tag));
  let getProductId = productData.map((taggs) => taggs.tags.map((k) => k.id));

  const onChangeSearchValue = (onChangeSearchName, onChangeSearchValue) => {
    setSearchInput((preData) => ({
      ...preData,
      [onChangeSearchName]: onChangeSearchValue,
    }));
  };

  const onChangeSearchSauceValue = (
    onChangeSearchName,
    onChangeSearchValue
  ) => {
    setSearchSauceInput((preData) => ({
      ...preData,
      [onChangeSearchName]: onChangeSearchValue,
    }));
  };

  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="商品管理" />

          {/*Tab*/}
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="商品資訊" value="1" />
                  <Tab label="調味料資訊" value="2" />
                </TabList>
                {/*Tab1*/}
                {/****************************************************************************/}
                <TabPanel value="1">
                  <SearchContainer>
                    <Box>
                      <SearchBox
                        id="SearchProductName"
                        label="商品名稱"
                        variant="filled"
                        autoComplete
                        type="search"
                        name="name"
                        value={searchInput.name}
                        onChange={SearchOnChange}
                      />
                    </Box>

                    <MenuList
                      label="使用狀態"
                      value={searchInput.status}
                      onChange={onChangeSearchValue}
                      name="status"
                      type="SellStatus"
                    />
                    <MenuList
                      label="使用狀態"
                      value={searchInput.category}
                      onChange={onChangeSearchValue}
                      name="category"
                      type="Category"
                    />
                    <Button
                      size="large"
                      color="inherit"
                      onClick={() => handleProductSearch()}
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
                      新增商品資訊
                    </Button>
                  </SearchContainer>

                  {/* Dialog1*/}

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    onBackdropClick="false"
                    maxWidth="xs"
                  >
                    <FormTitle
                      id="alert-dialog-title"
                      style={{ textAlign: "center", cursor: "move" }}
                    >
                      {"新增商品資訊"}
                    </FormTitle>

                    <form onSubmit={handleProductSubmit}>
                      <DialogContent>
                        <TextField
                          onChange={handleProductInfo}
                          value={productInfo.name}
                          name="name"
                          label="商品名稱"
                          variant="outlined"
                          sx={{ width: 350 }}
                          style={{ textAlign: "center" }}
                          required="true"
                        />
                        <br /> <br />
                        <TextField
                          onChange={handleProductInfo}
                          value={productInfo.price}
                          name="price"
                          label="價格"
                          variant="outlined"
                          sx={{ width: 350 }}
                          required="true"
                        />
                        <br /> <br />
                        <TextField
                          select
                          onChange={handleProductInfo}
                          value={productInfo.category}
                          name="category"
                          label="種類"
                          sx={{ width: 350 }}
                        >
                          {searchboxMenuCategory.map((item, index) => (
                            <MenuItem value={index} key={index}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <br />
                        <br />
                        <InputLabel id="demo-simple-select-label">
                          調味料選項:
                        </InputLabel>
                        <FormGroup row={true}>{sauceTag}</FormGroup>
                        <InputLabel id="demo-simple-select-label">
                          產品圖片:
                        </InputLabel>
                        <UploadImgButton
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={onImageChange}
                        />
                        <br />
                        <br />
                        <img width="200#" src={image} />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>取消</Button>
                        <Button type="submit">確認</Button>
                      </DialogActions>
                    </form>
                  </Dialog>

                  <TableContainer sx={{ maxHeight: 530 }} component={Paper}>
                    <Table stickyHeader>
                      <TableHeads id={"product"} />

                      {filteredProduct.length === 0 ? (
                        <TableCell
                          colSpan={7}
                          align="center"
                          style={{ fontSize: "1.5rem" }}
                        >
                          查無此資料
                        </TableCell>
                      ) : (
                        filteredProduct.map((item, index) => (
                          <TableProduct
                            productId={item.id}
                            productName={item.name}
                            productCategory={item.category}
                            productImage={item.image}
                            productPrice={item.price}
                            ProductTag={getProductTag[index]}
                            productStatus={item.status}
                            Del={() =>
                              handleProductDeClickOpen(item.id, item, index)
                            }
                            Edit={() =>
                              handleProductEditOpen(item.id, item, index)
                            }
                          />
                        ))
                      )}
                      {/* 刪除商品Dialog */}
                      <Dialog
                        open={openDe}
                        onClose={handleDeClose}
                        aria-labelledby="delete"
                        aria-describedby="delete"
                        onBackdropClick="false"
                        fullWidth="true"
                        maxWidth="xs"
                        PaperComponent={PaperComponent}
                      >
                        <FormTitle id="delete" style={{ cursor: "move" }}>
                          {"確定要刪除此商品?"}
                        </FormTitle>
                        <DialogContent>
                          <Stack mx={4} my={2} style={{ textAlign: "right" }}>
                            <List aria-label="mailbox folders">
                              <ListItem button>
                                <ListItemText
                                  primary="產品名稱 :"
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip
                                  label={currentInfo.name}
                                  style={{ margin: "auto" }}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <ListItemText
                                  primary="價錢 : "
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip
                                  label={currentInfo.price}
                                  style={{ margin: "auto" }}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <ListItemText
                                  primary="圖片 : "
                                  sx={{ maxWidth: "55%" }}
                                />
                                <img
                                  src={
                                    "http://localhost:8000/" + currentInfo.image
                                  }
                                  alt={currentInfo.image}
                                  width="150"
                                  style={{ margin: "auto" }}
                                />
                              </ListItem>
                              <Divider />

                              <ListItem button>
                                <ListItemText
                                  primary="類別 : "
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip
                                  label={currentInfo.category2}
                                  style={{ margin: "auto" }}
                                />
                              </ListItem>

                              <Divider />

                              <ListItem button>
                                <ListItemText
                                  primary="調味料 : "
                                  sx={{ maxWidth: "50%" }}
                                />
                                <Chip
                                  label={"" + currentInfo.tagName + ""}
                                  style={{ margin: "auto" }}
                                />
                              </ListItem>
                            </List>
                            <br />
                            <DialogActions sx={{ height: 0 }}>
                              <Button onClick={handleDeClose}>取消</Button>

                              <Button onClick={() => handleProductDelete()}>
                                確認
                              </Button>
                            </DialogActions>
                          </Stack>
                        </DialogContent>
                      </Dialog>
                      {/* 修改商品Dialog */}
                      <Dialog
                        open={openEdit}
                        onClose={handleProductEditOpen}
                        aria-labelledby="edit"
                        aria-describedby="edit"
                        onBackdropClick="false"
                        fullWidth="true"
                        maxWidth="xs"
                      >
                        <FormTitle
                          id="edit"
                          style={{ textAlign: "center", cursor: "move" }}
                        >
                          {"修改商品資訊"}
                        </FormTitle>

                        <form onSubmit={handleProductEditSubmit}>
                          <Stack mx={5} my={3}>
                            <DialogContent>
                              <TextField
                                onChange={handleProductInfo}
                                name="name"
                                label="商品名稱"
                                variant="outlined"
                                sx={{ width: 300 }}
                                defaultValue={currentInfo.name}
                              />
                              <br /> <br />
                              <TextField
                                onChange={handleProductInfo}
                                defaultValue={currentInfo.price}
                                name="price"
                                label="價格"
                                variant="outlined"
                                sx={{ width: 300 }}
                                required
                              />
                              <br /> <br />
                              <TextField
                                select
                                onChange={handleProductInfo}
                                name="category"
                                label="種類"
                                sx={{ width: 300 }}
                                defaultValue={currentInfo.category}
                              >
                                {searchboxMenuCategory.map((item, index) => (
                                  <MenuItem value={index} key={index}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <br />
                              <br />
                              <InputLabel id="demo-simple-select-label">
                                調味料選項
                              </InputLabel>
                              <FormGroup row={true}>{sauceTag}</FormGroup>
                              <br />
                              <InputLabel id="demo-simple-select-label">
                                產品圖片:
                              </InputLabel>
                              <UploadImgButton
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={onImageChange}
                              />
                              <br />
                              <br />
                              <img width="200#" src={image} />
                            </DialogContent>
                            <DialogActions sx={{ height: 0 }}>
                              <Button onClick={handleEditClose}>取消</Button>
                              <Button type="submit" onClick={handleEditClose}>
                                確認
                              </Button>
                            </DialogActions>
                          </Stack>
                        </form>
                      </Dialog>
                    </Table>
                  </TableContainer>

                  {/*****調味料**************************************************/}
                </TabPanel>
                {/*Tab2*/}
                <TabPanel value="2">
                  <SearchContainer>
                    <Box>
                      <SearchBox
                        id="SearchProductName"
                        label="調味料名稱"
                        variant="filled"
                        autoComplete
                        name="name"
                        value={searchSauceInput.name}
                        onChange={SearchSauceOnChange}
                      />

                      <MenuList
                        label="使用狀態"
                        value={searchSauceInput.status}
                        onChange={onChangeSearchSauceValue}
                        name="status"
                        type="TagStatus"
                      />
                    </Box>
                    <Button
                      size="large"
                      color="inherit"
                      onClick={() => handleSauceSearch()}
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
                      新增調味料資訊
                    </Button>
                  </SearchContainer>

                  {/* Dialog1*/}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    onBackdropClick="false"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      style={{ textAlign: "center", cursor: "move" }}
                    >
                      {"新增調味料資訊"}
                    </DialogTitle>

                    <AddForm
                      onSubmit={handleSubmit}
                      style={{ height: "280px", width: "350px" }}
                    >
                      <DialogContent>
                        <TextField
                          onChange={handleSauceInfo}
                          value={sauceInfo.tag}
                          name="tag"
                          label="調味料名稱"
                          variant="outlined"
                          sx={{ width: 300 }}
                          required="true"
                        />
                        <br /> <br />
                        <TextField
                          select
                          onChange={handleSauceInfo}
                          value={sauceInfo.status}
                          name="status"
                          label="狀態"
                          sx={{ width: 300 }}
                          defaultValue={0}
                        >
                          {searchboxMenuNewTagsStatus.map((item, index) => (
                            <MenuItem value={index} key={index}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <br />
                        <br />
                      </DialogContent>
                      <DialogActions sx={{ height: 0 }}>
                        <Button onClick={handleClose}>取消</Button>
                        <Button type="submit" onClick={handleClose}>
                          確認
                        </Button>
                      </DialogActions>
                    </AddForm>
                  </Dialog>

                  <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
                    <Table stickyHeader>
                      <TableHeads id={"tags"} />

                      {filtered.length === 0 ? (
                        <TableCell
                          colSpan={4}
                          align="center"
                          style={{ fontSize: "1.5rem" }}
                        >
                          查無此資料
                        </TableCell>
                      ) : (
                        filtered.map((item, index) => (
                          <TableProduct
                            TagId={item.id}
                            TagTag={item.tag}
                            TagStatus={item.status}
                            Del={() => handleSauceDeClickOpen(item)}
                            Edit={() => handleSauceEditOpen(item)}
                          />
                        ))
                      )}
                      {/* 刪除調味料Dialog */}
                      <Dialog
                        open={openDe}
                        onClose={handleDeClose}
                        aria-labelledby="delete"
                        aria-describedby="delete"
                        onBackdropClick="false"
                        fullWidth="true"
                        maxWidth="xs"
                        PaperComponent={PaperComponent}
                      >
                        <FormTitle id="delete" style={{ cursor: "move" }}>
                          {"確定要刪除此項目?"}
                        </FormTitle>

                        <Stack mx={3} my={3} style={{ textAlign: "right" }}>
                          <List aria-label="mailbox folders">
                            <ListItem button>
                              <ListItemText
                                primary="調味料名稱 :"
                                sx={{ maxWidth: "50%" }}
                              />
                              <Chip label={currentSauce.tag} />
                            </ListItem>
                            <Divider />
                          </List>
                          <DialogActions>
                            <Button onClick={handleDeClose}>取消</Button>

                            <Button onClick={() => handleDelete()}>確認</Button>
                          </DialogActions>
                        </Stack>
                      </Dialog>
                      {/* 修改調味料Dialog */}
                      <Dialog
                        open={openEdit}
                        onClose={handleSauceEditOpen}
                        aria-labelledby="edit"
                        aria-describedby="edit"
                        onBackdropClick="false"
                        fullWidth="true"
                        maxWidth="xs"
                      >
                        <FormTitle
                          id="edit"
                          style={{ textAlign: "center", cursor: "move" }}
                        >
                          {"修改調味料資訊"}
                        </FormTitle>

                        <form onSubmit={handleEditSubmit}>
                          <Stack mx={7} my={2}>
                            <DialogContent>
                              <TextField
                                onChange={handleSauceInfo}
                                defaultValue={currentSauce.tag}
                                name="tag"
                                label="調味料名稱"
                                variant="outlined"
                                sx={{ width: 280 }}
                              />
                              <br /> <br />
                              <TextField
                                select
                                onChange={handleSauceInfo}
                                defaultValue={currentSauce.status}
                                name="status"
                                label="狀態"
                                sx={{ width: 280 }}
                              >
                                {searchboxMenuNewTagsStatus.map(
                                  (item, index) => (
                                    <MenuItem value={index} key={index}>
                                      {item.name}
                                    </MenuItem>
                                  )
                                )}
                              </TextField>
                              <br />
                              <br />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleEditClose}>取消</Button>
                              <Button type="submit" onClick={handleEditClose}>
                                確認
                              </Button>
                            </DialogActions>
                          </Stack>
                        </form>
                      </Dialog>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Product;
