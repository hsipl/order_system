import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

import axios from "axios";
import React, { useState, useEffect } from "react";
import styledC from "styled-components";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@mui/material/Box";
import SearchIcon from "@material-ui/icons/Search";
import Navbar from "../components/Navbar";


const ShopContainer = styled(Box)({
  position:"absolute",
  top: "6rem",
  left: "10rem",
  right: "0px",
  borderRadius: "2px",
  padding:"3rem",
  fontSize: "20px",
});

const AddForm = styledC.form`
  height: 400px;
`;

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    首頁
  </Link>,
  <Typography underline="hover" key="2" color="text.primary"  style={{fontWeight:"bold"}}>
    分店管理
  </Typography>,
];

const Shop = () => {
  const [arrayData, setArratData] = useState([]);
  const [changeArrayData, setChangeArrayData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [shopInfo, setShopInfo] = useState({
    name: "",
    type: 0,
    status: 0,
  });

  const [currentId, setCurrentId] = useState("");

  const [currentShopInfo, setCurrentShopInfo] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeClickOpen = (id) => {
    setOpenDel(true);
    setCurrentId(id);

    console.log(currentId);
  };

  const handleDeClose = () => {
    setOpenDel(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (id, name) => {
    setOpenEdit(true);
    setCurrentShopInfo(name);
    setCurrentId(id);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const url = "http://localhost:8000/api/store";

  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const get_api = async () => {
      let { data } = await axios.get(url, config);
      setArratData(data);
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        data[i].type === 0 ? (data[i].type = "分店") : (data[i].type = "總店");
        data[i].status === 0
          ? (data[i].status = "營業中")
          : (data[i].status = "已歇業");
      }
      setChangeArrayData(data);
    };
    get_api();
  }, []);

  function SearchOnChange(e) {
    setSearchInput(e.target.value);
  }

  const filtered = !searchInput
    ? arrayData
    : arrayData.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
      );

  function handleShopInfo(e) {
    const { value, name } = e.target;

    setShopInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleShopInfoImage = (e) => {
    setShopInfo((preData) => ({
      ...preData,
      ["image"]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", shopInfo.name);
    formData.append("type", shopInfo.type);
    formData.append("status", shopInfo.status);
    formData.append("image", shopInfo.image);

    axios
      .post(url, formData, config)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    window.location.reload();
  };

  const handleEditSubmit = () => {
    const formData = new FormData();
    formData.append("name", shopInfo.name);
    formData.append("type", shopInfo.type);
    formData.append("status", shopInfo.status);
    formData.append("image", shopInfo.image);

    axios
      .put(url + "/" + currentId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    window.location.reload();
  };

  function handleDelete() {
    axios
      .delete(url + "/" + currentId, config)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      <ShopContainer id="shop">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        {/* Dialog1*/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onBackdropClick="false"
          fullWidth="true"
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>{"新增店鋪資訊"}</DialogTitle>

          <AddForm onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                onChange={handleShopInfo}
                value={shopInfo.name}
                name="name"
                label="店家名稱"
                variant="outlined"
                sx={{ width: 250 }}
              />
              <br /> <br />
              <InputLabel id="demo-simple-select-label">類型</InputLabel>
              <Select
                onChange={handleShopInfo}
                value={shopInfo.type}
                label="類型"
                name="type"
                sx={{ width: 250 }}
              >
                <MenuItem value={0}>分店</MenuItem>
                <MenuItem value={1}>總店</MenuItem>
              </Select>
              <br /> <br />
              <InputLabel id="demo-simple-select-label">狀態</InputLabel>
              <Select
                onChange={handleShopInfo}
                value={shopInfo.status}
                name="status"
                label="狀態"
                sx={{ width: 250 }}
              >
                <MenuItem value={0}>營業中</MenuItem>
              </Select>
              <br />
              <br />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleShopInfoImage}
              ></input>
            </DialogContent>
            <DialogActions sx={{ height: 40 }}>
              <Button onClick={handleClose}>取消</Button>
              <Button type="submit" onClick={handleClose}>
                確認
              </Button>
            </DialogActions>
          </AddForm>
        </Dialog>
        <br />
        <Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
        <Button onClick={handleClickOpen} variant="contained" color="success">
          新增分店資訊
        </Button>
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
                  店家編號
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                  }}
                >
                  店家照片
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                  }}
                >
                  店家名稱
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                  }}
                >
                  類型
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
                  創店日期
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
                    <TableCell align="center" component="th" scope="item">
                      {item.id}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={"http://localhost:8000/" + item.image}
                        alt={item.image}
                        width="200"
                        hight="100"
                      />
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.type}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell align="center">{item.createdAt}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleDeClickOpen(item.id)}>
                        <DeleteIcon />
                      </Button>
                      <Button
                        onClick={() => handleEditOpen(item.id, item.name)}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <Dialog
                    open={openDel}
                    onClose={handleDeClose}
                    aria-labelledby="delete"
                    aria-describedby="delete"
                    onBackdropClick="false"
                    fullWidth="true"
                    maxWidth="xs"
                  >
                    <DialogTitle id="delete">{"確定要刪除此項目?"}</DialogTitle>
                    <DialogContent>
                      <Button onClick={handleDeClose}>取消</Button>

                      <Button onClick={() => handleDelete()}>確認</Button>
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
                    <DialogTitle id="edit" style={{ textAlign: "center" }}>{"修改店鋪資訊"}</DialogTitle>

                    <AddForm>
                      <DialogContent>
                        <TextField
                          defaultValue={currentShopInfo}
                          onChange={handleShopInfo}
                          name="name"
                          label="店家名稱"
                          variant="outlined"
                          sx={{ width: 250 }}
                        />
                        <br /> <br />
                        <InputLabel id="edit">類型</InputLabel>
                        <Select
                          onChange={handleShopInfo}
                          value={0}
                          label="類型"
                          name="type"
                          sx={{ width: 250 }}
                        >
                          <MenuItem value={0}>分店</MenuItem>
                          <MenuItem value={1}>總店</MenuItem>
                        </Select>
                        <br /> <br />
                        <InputLabel id="edit">狀態</InputLabel>
                        <Select
                          onChange={handleShopInfo}
                          value={0}
                          name="status"
                          label="狀態"
                          sx={{ width: 250 }}
                        >
                          <MenuItem value={0}>營業中</MenuItem>
                        </Select>
                        <br />
                        <br />
                        <input
                          type="file"
                          name="files"
                          onChange={handleShopInfoImage}
                          accept="image/png, image/jpeg"
                        ></input>
                      </DialogContent>
                      <DialogActions sx={{ height: 40 }}>
                        <Button onClick={handleEditClose}>取消</Button>
                        <Button onClick={() => handleEditSubmit()}>確認</Button>
                      </DialogActions>
                    </AddForm>
                  </Dialog>
                </>
              );
            })}
          </Table>
        </TableContainer>
      </ShopContainer>
    </>
  );
};

export default Shop;
