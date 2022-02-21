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

import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@material-ui/icons/Edit";
import Box from "@mui/material/Box";
import SearchIcon from "@material-ui/icons/Search";
import Navbar from "../components/Navbar";
import Draggable from "react-draggable";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const ShopContainer = styled(Box)({
  position: "absolute",
  top: "6rem",
  left: "10rem",
  right: "0px",
  borderRadius: "2px",
  padding: "3rem",
  fontSize: "20px",
});

const AddForm = styledC.form`
  height: 400px;
`;

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    首頁
  </Link>,
  <Typography
    underline="hover"
    key="2"
    color="text.primary"
    style={{ fontWeight: "bold" }}
  >
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

  const [currentShop, setCurrentShop] = useState({});

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

    console.log(currentShop);
  };

  const handleDeClose = () => {
    setOpenDel(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (item) => {
    setOpenEdit(true);

    setCurrentShop({
      ["id"]: item.id,
      ["name"]: item.name,
      ["type"]: item.type === "總店" ? 1 : 0,
      ["status"]: item.status === "營業中" ? 0 : 1,
    });
    console.log(currentShop.name);
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

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
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
          onBackdropClick="false"
          fullWidth="true"
          maxWidth="xs"
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ textAlign: "center", cursor: "move" }}
            id="draggable-dialog-title"
          >
            {"新增店鋪資訊"}
          </DialogTitle>

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
              <TextField
                select
                onChange={handleShopInfo}
                value={shopInfo.type}
                label="類型"
                name="type"
                sx={{ width: 250 }}
              >
                <MenuItem value={0}>分店</MenuItem>
                <MenuItem value={1}>總店</MenuItem>
              </TextField>
              <br /> <br />
              <TextField
                select
                onChange={handleShopInfo}
                value={shopInfo.status}
                name="status"
                label="狀態"
                sx={{ width: 250 }}
              >
                <MenuItem value={0}>營業中</MenuItem>
              </TextField>
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
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
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
                      <Button onClick={() => handleDeClickOpen(item)}>
                        <DeleteIcon />
                      </Button>
                      <Button onClick={() => handleEditOpen(item)}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            <Dialog
              open={openDel}
              onClose={handleDeClose}
              aria-labelledby="delete"
              aria-describedby="delete"
              onBackdropClick="false"
              fullWidth="true"
              maxWidth="xs"
              PaperComponent={PaperComponent}
            >
              <DialogTitle style={{ cursor: "move" }} id="delete">
                {"確定要刪除此項目?"}
              </DialogTitle>
              <DialogContent style={{ textAlign: "right" }}>
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
                    <ListItemText primary="類型 :" sx={{ maxWidth: "50%" }} />
                    <Chip label={currentShop.type} />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="狀態 :" sx={{ maxWidth: "50%" }} />
                    <Chip label={currentShop.status} />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="店家照片 :"
                      sx={{ maxWidth: "40%" }}
                    />
                    <img
                      src={"http://localhost:8000/" + currentShop.image}
                      alt={currentShop.image}
                      width="150"
                    />
                  </ListItem>
                </List>
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
              // PaperComponent={PaperComponent}
            >
              <DialogTitle
                id="edit"
                style={{ textAlign: "center", cursor: "move" }}
              >
                {"修改店鋪資訊"}
              </DialogTitle>

              <AddForm>
                <DialogContent>
                  <TextField
                    defaultValue={currentShop.name}
                    onChange={handleShopInfo}
                    name="name"
                    label="店家名稱"
                    variant="outlined"
                    sx={{ width: 250 }}
                  />
                  <br /> <br />
                  <TextField
                    select
                    onChange={handleShopInfo}
                    label="類型"
                    name="type"
                    sx={{ width: 250 }}
                    defaultValue={currentShop.type}
                  >
                    <MenuItem value={0}>分店</MenuItem>
                    <MenuItem value={1}>總店</MenuItem>
                  </TextField>
                  <br /> <br />
                  <TextField
                    select
                    onChange={handleShopInfo}
                    name="status"
                    label="狀態"
                    sx={{ width: 250 }}
                    defaultValue={currentShop.status}
                  >
                    <MenuItem value={0}>營業中</MenuItem>
                    <MenuItem value={1}>已歇業</MenuItem>
                  </TextField>
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
          </Table>
        </TableContainer>
      </ShopContainer>
    </>
  );
};

export default Shop;
