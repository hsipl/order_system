import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
// import Navbar from "../components/Navbar";
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

import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TableHandover } from "./Table";
import { Search } from "@material-ui/icons";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";


import Chip from "@mui/material/Chip";
const HandoverContainer = styled(Box)({
  position: "absolute",
  top: "6rem",
  left: "10rem",
  right: "0px",
  borderRadius: "2px",
  padding: "3rem",
  fontSize: "20px",
});

const AddForm = styledC.form`
  height: auto;
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
    交班紀錄
  </Typography>,
];

const Handover = () => {
  const [value, setValue] = React.useState(null);
  const [handoverData, setHandoverData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentHandover, setCurrentHandover] = useState({});
  const [handoverFilter, setHandoverFilter] = useState([]);

  const [handoverInfo, setHandoverInfo] = useState({
    userId: "",
    sysmoney: "",
    realcash: "",
    status: "",
    realcash: "",
  });

  const url_Handover = "http://localhost:8000/api/handover";

  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const get_api = async () => {
      let { data } = await axios.get(url_Handover, config);
      for (var i = 0; i < data.length; i++) {
        data[i].createdAt = data[i].createdAt.replace("Z", "");
        data[i].createdAt = data[i].createdAt.replace("T", " ");
        data[i].createdAt = data[i].createdAt.substring(0, 19);
      }
      setHandoverData(data);
      setHandoverFilter(data);


    };
    get_api();
  }, []);

  const handleHandoverEditOpen = (item, index) => {
    setOpenEdit(true);
    setCurrentHandover({
      ["id"]: item.id,
      ["userId"]: item.userId.id,
      ["userName"]: item.userId.name,
      ["sysmoney"]: item.sysmoney,
      ["realcash"]: item.realcash,
      ["createdAt"]: item.createdAt,
      ["status"]: item.status,
    });
    setHandoverInfo({
      ["userId"]: item.userId.id,
      ["sysmoney"]: item.sysmoney,
      ["status"]: item.status,
    });
  };

  const handleHandoverEditClose = () => {
    setOpenEdit(false);
  };

  const handleHandoverEditSubmit = async () => {
    try {
      await axios.put(
        url_Handover + "/?id=" + currentHandover.id,
        JSON.stringify(handoverInfo),
        config
      );
      console.log("sucess");
      window.location.reload();
    } catch (error) {}
  };

  function handleHandoverInfo(e) {
    setHandoverInfo((preData) => ({
      ...preData,
      ["realcash"]: e.target.value,
    }));
  }

  const filtered = handoverFilter === null ? handoverData : handoverFilter;

  const handleHandoverSearch = async () => {
    let { data } = await axios.get(
      url_Handover + "/date?date=" + value,
      config
    );
    setHandoverFilter(data);
  };

  const handleClean = async () => {
    setHandoverFilter(null);
    setValue(null);
  };

  // const filtered = !value
  //   ? handoverData
  //   : handoverData.filter((item) => item.createdAt.includes(value));

  return (
    <>
    <BodyContainer>
      <Navbar />
      <HandoverContainer id="handover">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="選擇日期"
            value={value}
            onChange={(newValue) => {
              setValue(
                newValue === null
                  ? null
                  : newValue.getFullYear() +
                      "-" +
                      (newValue.getMonth() + 1 < 10
                        ? "0" + (newValue.getMonth() + 1)
                        : newValue.getMonth() + 1) +
                      "-" +
                      (newValue.getDate() < 10
                        ? "0" + newValue.getDate()
                        : newValue.getDate())
              );
            }}
            inputFormat="yyyy-MM-dd"
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <Button
          size="large"
          color="inherit"
          onClick={() => handleHandoverSearch()}
        >
          <Search fontSize="large" />
        </Button>
        <Button onClick={handleClean}>清除搜尋</Button>
        <br />

        <br />
        <TableContainer component={Paper} sx={{ maxHeight: 610 }}>
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
                  交班人
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                  }}
                >
                  系統金額
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                  }}
                >
                  實際金額
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#6379A1",
                    color: "white",
                  }}
                >
                  交班時間
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
            {filtered.map(
              (item, index) => (
                <TableHandover
                  handoverId={item.id}
                  handoverSysmoney={item.sysmoney}
                  handoverRealcash={item.realcash}
                  handoverCreateAt={item.createdAt}
                  Edit={() => handleHandoverEditOpen(item, index)}
                />
              )

              // {
              //   return (
              //     <TableRow key={item.id}>
              //       <TableCell align="center">{item.userId.name}</TableCell>

              //       <TableCell align="center">{item.sysmoney}</TableCell>

              //       <TableCell align="center">{item.realcash}</TableCell>

              //       <TableCell align="center">{item.createdAt}</TableCell>
              //       <TableCell align="center">
              //         <Button onClick={() => handleHandoverEditOpen(item, index)}>
              //           <EditIcon />
              //         </Button>
              //       </TableCell>
              //     </TableRow>
              //   );
              // }
            )}
            <Dialog
              open={openEdit}
              onClose={handleHandoverEditClose}
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
                {"修改實際金額"}
              </DialogTitle>
              <AddForm>
                <DialogContent style={{ textAlign: "center" }}>
                  <ListItem button>
                    <ListItemText primary="交班人 :" sx={{ maxWidth: "50%" }} />
                    <Chip
                      label={currentHandover.userName}
                      style={{ margin: "auto" }}
                    />
                  </ListItem>
                  <br /> <br />
                  <ListItem button>
                    <ListItemText
                      primary="系統金額 :"
                      sx={{ maxWidth: "50%" }}
                    />
                    <Chip
                      label={currentHandover.sysmoney}
                      style={{ margin: "auto" }}
                    />
                  </ListItem>
                  <br /> <br />
                  <ListItem button>
                    <ListItemText
                      primary="交班時間 :"
                      sx={{ maxWidth: "50%" }}
                    />
                    <Chip
                      label={currentHandover.createdAt}
                      style={{ margin: "auto" }}
                    />
                  </ListItem>
                  <br /> <br />
                  <TextField
                    required="true"
                    defaultValue={currentHandover.realcash}
                    onChange={handleHandoverInfo}
                    name="realCash"
                    label="實際金額"
                    variant="outlined"
                    sx={{ width: 300 }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleHandoverEditClose}>取消</Button>
                  <Button onClick={handleHandoverEditSubmit}>確認</Button>
                </DialogActions>
              </AddForm>
            </Dialog>
          </Table>
        </TableContainer>
      </HandoverContainer>
      </BodyContainer>
    </>
  );
};

export default Handover;
