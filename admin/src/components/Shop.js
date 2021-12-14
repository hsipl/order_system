import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
import Paper from "@mui/material/Paper";
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
import Cookies from "js-cookie";

const Shopcon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const AddForm = styled.form`
  height: 400px;
`;

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    首頁
  </Link>,
  <Typography underline="hover" key="2" color="text.primary" href="/handover">
    分店管理
  </Typography>,
];

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const Shop = () => {
  const url = "http://140.125.45.167:8000/api/store";
  const [arrayData, setArratData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openDe, setOpenDe] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeClickOpen = () => {
    setOpenDe(true);
  };

  const handleDeClose = () => {
    setOpenDe(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const [shopInfo, setShopInfo] = useState({
    // id: "",
    name: "",
    type: "0",
    status: "0",
    //create: "",
    images: [],
  });

  // useEffect(() => {
  //   const get_api = async () => {
  //     let { data } = await axios.get(`${url}`);
  //     setArratData(data);
  //     console.log(data);
  //   };
  //   get_api();
  // }, []);

  axios.defaults.withCredentials=true
  useEffect(()=>{
    // let cookie_value = document.cookie
    axios.get(url,{
      headers:{

        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    })
    .then((result) => {console.log(result.data)})
    .catch((err)=>{console.error(err)})
    // console.log(cookie_value)
  })



  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    // console.log(searchValue);
    if (searchInput !== "") {
      const filteredData = arrayData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(arrayData);
    }
  };

  // const handleSearch =(e)=>{
  //   setSearchInput(e.target.value)
  // }

  // useEffect(()=>{
  //   const results = arrayData.filter(arrayData =>
  //     arrayData.toLowerCase().includes(searchInput)
  //   );
  //   setFilteredResults(results);
  // }, [searchInput])

  function handleShopInfo(e) {
    // Array.from(e.target.files).forEach((i) => {
    //   // 建立 FromData 物件例項
    //   let formData = new FormData();
    //   // key 值為 後臺介面引數名 ，傳入遍歷的每一項
    //   formData.append("file", i);
    //   // 傳送對應的請求
    //   axios
    //     .post("http://140.125.45.167:8000/api/store", formData)
    //   console.log(formData)
    //   });

    // console.log(e.target.files);
    shopInfo.images = e.target.files;
    // console.log(shopInfo.images)
    const { value, name } = e.target;

    setShopInfo((preData) => ({
      ...preData,
      [name]: value,
    }));
    console.log(shopInfo);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    Array.from(shopInfo.images).forEach((image) => {
      const formData = new FormData();
      formData.append("files", image);
      console.log(image);
    });

    // axios
    //   .post(`http://140.125.45.167:8000/api/store`, shopInfo, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   })

    const data = await axios.post(
      "http://140.125.45.167:8000/api/store",
      shopInfo
    );

    // console.log(shopInfo);

    // console.log(JSON.stringify(shopInfo));

    // const data = await axios.post(
    //   "http://140.125.45.167:8000/api/store",
    //   shopInfo
    // );

    // console.log(data);
    window.location.reload();
  };

  const handleEditSubmit = (id) => {
    axios.put("http://140.125.45.167:8000/api/store", shopInfo);
    console.log(shopInfo);
  };

  function handleDelete(id) {
    axios.delete("http://140.125.45.167:8000/api/store/" + id);
    window.location.reload();
  }

  return (
    <>
    <Navbar/>
    <Shopcon id="shop">
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick="false"
        fullWidth="true"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{"新增店鋪資訊"}</DialogTitle>

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
              {/* <MenuItem value={1}>已倒閉</MenuItem> */}
            </Select>
            <br />
            <br />
            <input type="file" name="files" onChange={handleShopInfo}></input>
          </DialogContent>
          <DialogActions sx={{ height: 40 }}>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit" onClick={handleClose}>
              確認
            </Button>
          </DialogActions>
        </AddForm>
      </Dialog>

      {/* <input
        type="search"
        onChange={(e) => searchItems(e.target.value)}
        placeholder="Search..."
      /> */}

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
            onChange={(e) => searchItems(e.target.value)}
            // onChange={(e)=>setSearchInput(e.target.value)}
          />
        </Box>
      </Box>
      <br />
      <Button onClick={handleClickOpen} variant="contained" color="success">
        新增分店資訊
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">店家編號</TableCell>
              <TableCell align="center">店家照片</TableCell>
              <TableCell align="center">店家名稱</TableCell>
              <TableCell align="center">類型</TableCell>
              <TableCell align="center">狀態</TableCell>
              <TableCell align="center">創店日期</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
         
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <>
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="item">
                        {item.id}
                      </TableCell>
                      <TableCell align="center">{item.img}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.type}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">{item.createdAt}</TableCell>
                      <TableCell align="center">
                        <Button onClick={handleDeClickOpen}>
                          <DeleteIcon />
                        </Button>

                        <Button onClick={handleEditOpen}>
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
                        <Button onClick={() => handleDelete(item.id)}>
                          確認
                        </Button>
                      </DialogContent>
                    </Dialog>
{/* 
                    <Dialog
                      open={openEdit}
                      onClose={handleEditClose}
                      aria-labelledby="edit"
                      aria-describedby="edit"
                      onBackdropClick="false"
                      fullWidth="true"
                      maxWidth="xs"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"修改店鋪資訊"}
                      </DialogTitle>

                      <AddForm >
                        <DialogContent>
                          <TextField
                            defaultValue={item.name}
                            onChange={handleShopInfo}
                            // value={shopInfo.name}
                            name="name"
                            label="店家名稱"
                            variant="outlined"
                            sx={{ width: 250 }}
                          />
                          <br /> <br />
                          <InputLabel id="demo-simple-select-label">
                            類型
                          </InputLabel>
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
                          <InputLabel id="demo-simple-select-label">
                            狀態
                          </InputLabel>
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
                            name="files"
                            onChange={handleShopInfo}
                          ></input>
                        </DialogContent>
                        <DialogActions sx={{ height: 40 }}>
                          <Button onClick={handleEditClose}>取消</Button>
                          <Button onClick={handleEditSubmit}>確認</Button>
                        </DialogActions>
                      </AddForm>
                    </Dialog> */}
                  </>
                );
              })
            : arrayData.map((item) => {
                return (
                  <>
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="item">
                        {item.id}
                      </TableCell>
                      <TableCell align="center">{item.img}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.type}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">{item.createdAt}</TableCell>
                      <TableCell align="center">
                        <Button onClick={handleDeClickOpen}>
                          <DeleteIcon />
                        </Button>
                        <Button onClick={handleEditOpen}>
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
                        <Button onClick={() => handleDelete(item.id)}>
                          確認
                        </Button>
                      </DialogContent>
                    </Dialog>

                    {/* <Dialog
                      open={openEdit}
                      onClose={handleEditClose}
                      aria-labelledby="edit"
                      aria-describedby="edit"
                      onBackdropClick="false"
                      fullWidth="true"
                      maxWidth="xs"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"修改店鋪資訊"}
                      </DialogTitle>

                      <AddForm>
                        <DialogContent>
                          <TextField
                            defaultValue={item.name}
                            onChange={handleShopInfo}
                            // value={shopInfo.name}
                            name="name"
                            label="店家名稱"
                            variant="outlined"
                            sx={{ width: 250 }}
                          />
                          <br /> <br />
                          <InputLabel id="demo-simple-select-label">
                            類型
                          </InputLabel>
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
                          <InputLabel id="demo-simple-select-label">
                            狀態
                          </InputLabel>
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
                            name="files"
                            onChange={handleShopInfo}
                          ></input>
                        </DialogContent>
                        <DialogActions sx={{ height: 40 }}>
                          <Button onClick={handleEditClose}>取消</Button>
                          <Button onClick={handleEditSubmit}>確認</Button>
                        </DialogActions>
                      </AddForm>
                    </Dialog> */}
                  </>
                );
              })}
        </Table>
      </TableContainer>
    </Shopcon>
    </>
  );
};

export default Shop;
