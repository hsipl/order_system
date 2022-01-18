import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Navbar from "../components/Navbar";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import SearchIcon from "@material-ui/icons/Search";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

const Productcon = styled.div`
  position: relative;
  top: 8rem;
  left: 13rem;
  max-width: 87%;
  font-size: 20px;
`;

const AddForm = styled.form`
  height: 400px;
`;
const AddFormProduct = styled.form`
  height: 60vh;
`;

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    首頁
  </Link>,
  <Typography underline="hover" key="2" color="text.primary" href="/product">
    商品管理
  </Typography>,
];

const Product = () => {
  const [sauceData, setSauceData] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [changeArrayData, setChangeArrayData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openDe, setOpenDe] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentSauceInfo, setCurrentSauceInfo] = useState();
  const [currentProductInfo, setCurrentProductInfo] = useState();
  const [sauceInfo, setSauceInfo] = useState({
    tag: "",
    status: 0,
  });
  const [productData, setProductData] = useState([]);
  const [changeProductData, setChangeProductData] = useState([]);
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    category: "",
    status: 0,
    storeId: localStorage.getItem("StoreId"),
  });

  /*Tab*/

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeClickOpen = (id) => {
    setOpenDe(true);
    setCurrentId(id);
  };

  const handleDeClose = () => {
    setOpenDe(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (id, tag, name) => {
    setOpenEdit(true);

    setCurrentSauceInfo(tag);
    setCurrentProductInfo(name);
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

  /***************Handle Sauce***************/
  useEffect(() => {
    const get_SauceApi = async () => {
      let { data } = await axios.get(url_Sauce, config);
      setSauceData(data);

      for (var i = 0; i < data.length; i++) {
        data[i].status === 0
          ? (data[i].status = "使用中")
          : (data[i].status = "已停用");
      }
      setChangeArrayData(data);
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

  const handleSubmit = async () => {
    try {
      await axios.post(url_Sauce, JSON.stringify(sauceInfo), config);

      window.location.reload();
    } catch (error) {}
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        url_Sauce + "/" + currentId,
        JSON.stringify(sauceInfo),
        config
      );
      window.location.reload();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete(url_Sauce + "/" + currentId, config);
      window.location.reload();
    } catch (error) {}
  };

  function SearchOnChange(e) {
    setSearchInput(e.target.value);
  }

  const filtered = !searchInput
    ? sauceData
    : sauceData.filter((item) =>
        item.tag.toLowerCase().includes(searchInput.toLocaleLowerCase())
      );
  /***************Handle Product***************/
  useEffect(() => {
    const get_ProductApi = async () => {
      let { data } = await axios.get(url_Product, config);
      setProductData(data);
      for (var i = 0; i < data.length; i++) {
        data[i].status === 0
          ? (data[i].status = "使用中")
          : (data[i].status = "已停用");
        data[i].category === 0
          ? (data[i].category = "肉類")
          : data[i].category === 1
          ? (data[i].category = "蔬菜類")
          : data[i].category === 2
          ? (data[i].category = "加工類")
          : (data[i].category = "其他類");
      }
      setChangeProductData(data);
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

    for (var i = 1; i <= sauceData.length; i++) {
      formData.append("tags[" + i + "]", productInfo["tags[" + i + "]"]);
    }
    formData.append("image", productInfo.image);

    try {
      await axios.post(url_Product, formData, config);

      console.log("sucess");
      window.location.reload();
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
      formData.append("name", currentProductInfo);
      formData.append("price", productInfo.price);
      formData.append("category", productInfo.category);
      formData.append("status", productInfo.status);
      formData.append("storeId", productInfo.storeId);
      for (var i = 1; i <= sauceData.length; i++) {
        formData.append("tags[" + i + "]", productInfo["tags[" + i + "]"]);
      }
      formData.append("image", productInfo.image);
      await axios.put(url_Product + "/" + currentId, formData, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const sauceTag = sauceData.map((sauce) => (
    <FormControlLabel
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
  ));

  return (
    <>
      <Navbar />
      <Productcon id="product">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <br />

        {/*Tab*/}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="調味料資訊" value="1" />
                <Tab label="商品資訊" value="2" />
              </TabList>
              {/*Tab1*/}
              {/****************************************************************************/}
              <TabPanel value="2">
                <Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <SearchIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id="input-with-sx"
                      label="Search"
                      variant="standard"
                      type="search"
                      value={searchInput}
                      onChange={SearchOnChange}
                    />
                  </Box>
                </Box>

                <br />
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="success"
                >
                  新增商品資訊
                </Button>
                {/* Dialog1*/}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  onBackdropClick="false"
                  // style={{height:'500px'}}
                  maxWidth="xs"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{ textAlign: "center" }}
                  >
                    {"新增商品資訊"}
                  </DialogTitle>

                  <AddFormProduct
                    onSubmit={handleProductSubmit}
                    // style={{ height: "280px", width: "350px" }}
                  >
                    <DialogContent>
                      <TextField
                        onChange={handleProductInfo}
                        value={productInfo.name}
                        name="name"
                        label="商品名稱"
                        variant="outlined"
                        sx={{ width: 390 }}
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
                        sx={{ width: 390 }}
                        required="true"
                      />
                      <br /> <br />
                      <InputLabel id="demo-simple-select-label">
                        種類
                      </InputLabel>
                      <Select
                        onChange={handleProductInfo}
                        value={productInfo.category}
                        name="category"
                        label="種類"
                        sx={{ width: 390 }}
                        required="true"
                        // defaultValue={0}
                      >
                        <MenuItem value={0}>肉類</MenuItem>
                        <MenuItem value={1}>蔬菜類</MenuItem>
                        <MenuItem value={2}>加工類</MenuItem>
                        <MenuItem value={3}>其他類</MenuItem>
                      </Select>
                      <br />
                      <br />
                      <InputLabel id="demo-simple-select-label">
                        調味料選項
                      </InputLabel>
                      <FormGroup row={true}>{sauceTag}</FormGroup>
                      <br />
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={onImageChange}
                      ></input>
                      <img width="100#" src={image} />
                    </DialogContent>
                    <DialogActions sx={{ height: 0 }}>
                      <Button onClick={handleClose}>取消</Button>
                      <Button type="submit" onClick={handleClose}>
                        確認
                      </Button>
                    </DialogActions>
                  </AddFormProduct>
                </Dialog>

                <br />
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 850 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          編號
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          產品名稱
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          價格
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          圖片
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          類別
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          狀態
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          操作
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {productData.map((item) => {
                      return (
                        <>
                          <TableRow
                            key={item.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">{item.id}</TableCell>

                            <TableCell align="center">{item.name}</TableCell>
                            <TableCell align="center">{item.price}</TableCell>

                            <img
                              src={"http://localhost:8000/" + item.image}
                              alt={item.image}
                              width="100"
                              hight="50"
                            />
                            <TableCell align="center">
                              {item.category}
                            </TableCell>
                            <TableCell align="center">{item.status}</TableCell>

                            <TableCell align="center">
                              <Button
                                onClick={() => handleDeClickOpen(item.id)}
                              >
                                <DeleteIcon />
                              </Button>
                              <Button
                                onClick={() =>
                                  handleEditOpen(item.id, item.tag, item.name)
                                }
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                          </TableRow>

                          <Dialog
                            open={openDe}
                            onClose={handleDeClose}
                            aria-labelledby="delete"
                            aria-describedby="delete"
                            onBackdropClick="false"
                            fullWidth="true"
                            maxWidth="xs"
                          >
                            <DialogTitle id="delete">
                              {"確定要刪除此項目?"}
                            </DialogTitle>
                            <DialogContent>
                              <Button onClick={handleDeClose}>取消</Button>

                              <Button onClick={() => handleProductDelete()}>
                                確認
                              </Button>
                            </DialogContent>
                          </Dialog>
                        </>
                      );
                    })}
                  </Table>
                </TableContainer>

                <Dialog
                  open={openDe}
                  onClose={handleDeClose}
                  aria-labelledby="delete"
                  aria-describedby="delete"
                  onBackdropClick="false"
                  fullWidth="true"
                  maxWidth="xs"
                >
                  <DialogTitle id="delete">{"確定要刪除此商品?"}</DialogTitle>
                  <DialogContent>
                    <Button onClick={handleDeClose}>取消</Button>

                    <Button onClick={() => handleProductDelete()}>確認</Button>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={openEdit}
                  onClose={handleEditOpen}
                  aria-labelledby="edit"
                  aria-describedby="edit"
                  onBackdropClick="false"
                  fullWidth="true"
                  maxWidth="xs"
                >
                  <DialogTitle id="edit" style={{ textAlign: "center" }}>
                    {"修改商品資訊"}
                  </DialogTitle>

                  <AddFormProduct onSubmit={handleProductEditSubmit}>
                    <DialogContent>
                      <TextField
                        disabled
                        value={currentProductInfo}
                        name="name"
                        label="商品名稱"
                        variant="outlined"
                        sx={{ width: 300 }}
                        defaultValue={currentProductInfo}
                      />
                      <br /> <br />
                      <TextField
                        onChange={handleProductInfo}
                        value={sauceInfo.price}
                        name="price"
                        label="價格"
                        variant="outlined"
                        sx={{ width: 300 }}
                      />
                      <br /> <br />
                      <InputLabel id="demo-simple-select-label">
                        種類
                      </InputLabel>
                      <Select
                        onChange={handleProductInfo}
                        value={sauceInfo.category}
                        name="category"
                        label="種類"
                        sx={{ width: 300 }}
                        // defaultValue={0}
                      >
                        <MenuItem value={0}>肉類</MenuItem>
                        <MenuItem value={1}>蔬菜類</MenuItem>
                        <MenuItem value={2}>加工類</MenuItem>
                        <MenuItem value={3}>其他類</MenuItem>
                      </Select>
                      <br />
                      <br />
                      <InputLabel id="demo-simple-select-label">
                        調味料選項
                      </InputLabel>
                      <FormGroup row={true}>{sauceTag}</FormGroup>
                      <br />
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={onImageChange}
                      ></input>
                      <img width="100#" src={image} />
                    </DialogContent>
                    <DialogActions sx={{ height: 0 }}>
                      <Button onClick={handleEditClose}>取消</Button>
                      <Button type="submit" onClick={handleEditClose}>
                        確認
                      </Button>
                    </DialogActions>
                  </AddFormProduct>
                </Dialog>

                {/*****調味料**************************************************/}
              </TabPanel>
              {/*Tab2*/}
              <TabPanel value="1">
                <Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <SearchIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id="input-with-sx"
                      label="Search"
                      variant="standard"
                      type="search"
                      value={searchInput}
                      onChange={SearchOnChange}
                    />
                  </Box>
                </Box>

                <br />
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="success"
                >
                  新增調味料資訊
                </Button>
                {/* Dialog1*/}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  onBackdropClick="false"
                  // style={{height:'500px'}}
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    style={{ textAlign: "center" }}
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
                      />
                      <br /> <br />
                      <InputLabel id="demo-simple-select-label">
                        狀態
                      </InputLabel>
                      <Select
                        onChange={handleSauceInfo}
                        value={sauceInfo.status}
                        name="status"
                        label="狀態"
                        sx={{ width: 300 }}
                        defaultValue={0}
                      >
                        <MenuItem value={0}>使用中</MenuItem>
                        <MenuItem value={1}>未使用</MenuItem>
                      </Select>
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

                <br />
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 850 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          編號
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          調味料名稱
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          狀態
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#6379A1",
                            color: "white",
                          }}
                        >
                          操作
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {filtered.map((item) => {
                      return (
                        <>
                          <TableRow
                            key={item.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="item"
                            >
                              {item.id}
                            </TableCell>

                            <TableCell align="center">{item.tag}</TableCell>

                            <TableCell align="center">{item.status}</TableCell>

                            <TableCell align="center">
                              <Button
                                onClick={() => handleDeClickOpen(item.id)}
                              >
                                <DeleteIcon />
                              </Button>
                              <Button
                                onClick={() =>
                                  handleEditOpen(item.id, item.tag)
                                }
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                          </TableRow>

                          <Dialog
                            open={openDe}
                            onClose={handleDeClose}
                            aria-labelledby="delete"
                            aria-describedby="delete"
                            onBackdropClick="false"
                            fullWidth="true"
                            maxWidth="xs"
                          >
                            <DialogTitle id="delete">
                              {"確定要刪除此項目?"}
                            </DialogTitle>
                            <DialogContent style={{ textAlign: "right" }}>
                              <Button onClick={handleDeClose}>取消</Button>

                              <Button onClick={() => handleDelete()}>
                                確認
                              </Button>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={openEdit}
                            onClose={handleEditClose}
                            aria-labelledby="edit"
                            aria-describedby="edit"
                            onBackdropClick="false"
                            fullWidth="true"
                            maxWidth="xs"
                          >
                            <DialogTitle
                              id="edit"
                              style={{ textAlign: "center" }}
                            >
                              {"修改調味料資訊"}
                            </DialogTitle>

                            <AddForm style={{ height: "300px" }}>
                              <DialogContent>
                                <TextField
                                  defaultValue={currentSauceInfo}
                                  onChange={handleSauceInfo}
                                  name="tag"
                                  label="調味料名稱"
                                  variant="outlined"
                                  sx={{ width: 380 }}
                                />
                                <br /> <br />
                                <InputLabel id="edit">狀態</InputLabel>
                                <Select
                                  onChange={handleSauceInfo}
                                  value={0}
                                  name="status"
                                  label="狀態"
                                  sx={{ width: 380 }}
                                >
                                  <MenuItem value={0}>使用中</MenuItem>
                                  <MenuItem value={1}>未使用</MenuItem>
                                </Select>
                                <br />
                                <br />
                              </DialogContent>
                              <DialogActions sx={{ height: 40 }}>
                                <Button onClick={handleEditClose}>取消</Button>
                                <Button onClick={() => handleEditSubmit()}>
                                  確認
                                </Button>
                              </DialogActions>
                            </AddForm>
                          </Dialog>
                        </>
                      );
                    })}
                  </Table>
                </TableContainer>
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Productcon>
    </>
  );
};

export default Product;
