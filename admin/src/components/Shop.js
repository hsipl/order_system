import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  styled,
  Chip,
  Container,
  DialogContentText,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Table,
  TableContainer,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import Draggable from "react-draggable";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import { Search } from "@material-ui/icons";
import { TableShop, TableHeads } from "./Table";
import { UploadImgButton } from "./Buttons";

const SearchContainer = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",

  ".AddBTN": {
    marginLeft: "auto",
  },
});

const SearchBox = styled(TextField)({
  margin: "1rem",
  "& .MuiInputBase-root": {
    background: "rgba(255, 255, 255, 0.8)",
  },
  ":first-child": {
    marginLeft: "0",
  },
});

const FormTitle = styled(Typography)({
  fontWeight: "bold",
  margin: "2rem 0 0 0",
  textAlign: "center",
});

const FormContent = styled(DialogContent)({
  display: "grid",
  margin: "0 0.5rem",
});

const Input = styled(TextField)({
  margin: "1.5rem",
  color: "gray",
});

const DialogText = styled(DialogContentText)({
  margin: "0.5rem 1.5rem",
});

const Shop = () => {
  const [arrayData, setArratData] = useState([]);
  const [changeArrayData, setChangeArrayData] = useState([]);
  const [open, setOpen] = React.useState(false);
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
      toChinese(data);
    };
    get_api();
  }, []);

  function SearchOnChange(e) {
    const { value, name } = e.target;

    setSearchInput((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const filtered = searchData === null ? arrayData : searchData;

  function handleShopInfo(e) {
    const { value, name } = e.target;

    setShopInfo((preData) => ({
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
    }

    setChangeArrayData(data);
    setSearchData(data);
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
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="分店管理" />
          <SearchContainer>
            <Box>
              <SearchBox
                id="SearchProductName"
                label="店家名稱"
                variant="filled"
                autoComplete
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
                <MenuItem value={0}>營業中</MenuItem>
                <MenuItem value={1}>已歇業</MenuItem>
              </SearchBox>
            </Box>
            <Button size="large" color="inherit" onClick={() => handleSearch()}>
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
            // PaperComponent={PaperComponent}
            // aria-labelledby="draggable-dialog-title"
          >
            {/* <DialogTitle
              id="alert-dialog-title"
              style={{ textAlign: "center", cursor: "move" }}
              id="draggable-dialog-title"
            >
              {"新增店鋪資訊"}
            </DialogTitle> */}
            <FormTitle
              variant="h6"
              // style={{ cursor: "move" }}
              // id="draggable-dialog-title"
            >
              {"新增店鋪資訊"}
            </FormTitle>

            <form onSubmit={handleSubmit}>
              <FormContent>
                <Input
                  onChange={handleShopInfo}
                  value={shopInfo.name}
                  name="name"
                  label="店家名稱"
                  variant="outlined"
                />
                <Input
                  select
                  onChange={handleShopInfo}
                  value={shopInfo.type}
                  label="類型"
                  name="type"
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
                    accept="image/png, image/jpeg"
                    onChange={onImageChange}
                  />
                  <img width="100#" src={image} />
                </Container>
                <DialogActions>
                <Button onClick={handleClose} size="large">
                  取消
                </Button>
                <Button type="submit" onClick={handleSubmit} size="large">
                  確認
                </Button>
              </DialogActions>
              </FormContent>

            </form>
          </Dialog>

          <TableContainer component={Paper} sx={{ maxHeight: "38rem" }}>
            <Table stickyHeader>
              <TableHeads id={"shop"} />
              {filtered.map((item) => (
                <>
                  {/* <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
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
                        <Delete />
                      </Button>
                      <Button onClick={() => handleEditOpen(item)}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow> */}

                  <TableShop
                    Page={"shop"}
                    Img={item.image}
                    StoreName={item.name}
                    StoreType={item.type}
                    StoreStatus={item.status}
                    CreatedAt={item.createdAt}
                    item={item}
                    Del={() => handleDeClickOpen(item)}
                    Edit={() => handleEditOpen(item)}
                  />
                </>
              ))}
              <Dialog
                open={openDel}
                onClose={handleDeClose}
                // aria-labelledby="delete"
                // aria-describedby="delete"
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
                <FormContent style={{ textAlign: "right" }}>
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
                  <DialogActions>
                    <Button onClick={handleDeClose}>取消</Button>
                    <Button onClick={() => handleDelete()}>確認</Button>
                  </DialogActions>
                </FormContent>
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
                <FormTitle
                  variant="h6"
                  // style={{ cursor: "move" }}
                  // id="draggable-dialog-title"
                >
                  {"修改店鋪資訊"}
                </FormTitle>

                <form>
                  <FormContent>
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
                        accept="image/png, image/jpeg"
                        onChange={onImageChange}
                      />
                      <img width="100#" src={image} />
                    </Container>
                    <DialogActions>
                    <Button onClick={handleEditClose}>取消</Button>
                    <Button onClick={() => handleEditSubmit()}>確認</Button>
                  </DialogActions>
                  </FormContent>

                </form>
              </Dialog>
            </Table>
          </TableContainer>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Shop;
