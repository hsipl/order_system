import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TextField,
  Button,
  DialogActions,
  ListItem,
  ListItemText,
  Dialog,
  Chip,
  Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import { TableHandover, TableHeads } from "./Table";
import { Search } from "@material-ui/icons";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import { FormTitle, SearchBox, SearchContainer } from "./SearchAndForm";

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleHandoverEditOpen = (item, index) => {
    setOpenEdit(true);
    setCurrentHandover({
      "id": item.id,
      "userId": item.userId.id,
      "userName": item.userId.name,
      "sysmoney": item.sysmoney,
      "realcash": item.realcash,
      "createdAt": item.createdAt,
      "status": item.status,
    });
    setHandoverInfo({
      "userId": item.userId.id,
      "sysmoney": item.sysmoney,
      "status": item.status,
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  function handleHandoverInfo(e) {
    setHandoverInfo((preData) => ({
      ...preData,
      "realcash": e.target.value,
    }));
  }

  const filtered = handoverFilter === null ? handoverData : handoverFilter;

  const handleHandoverSearch = async () => {
    let { data } = await axios.get(
      url_Handover + "/date?date=" + value,
      config
    );
    for (var i = 0; i < data.length; i++) {
      data[i].createdAt = data[i].createdAt.replace("Z", "");
      data[i].createdAt = data[i].createdAt.replace("T", " ");
      data[i].createdAt = data[i].createdAt.substring(0, 19);
    }
    setHandoverFilter(data);
  };

  const handleClean = async () => {
    setHandoverFilter(null);
    setValue(null);
  };

  return (
    <>
      <BodyContainer>
        <Navbar />
        <Content>
          <Breadcrumb name="交班紀錄" />
          <SearchContainer>
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
                  <SearchBox variant="filled" {...params} helperText={null} />
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
          </SearchContainer>

          <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
            <Table stickyHeader>
              <TableHeads id={"handover"} />
              {filtered.length === 0 ? (
                <TableCell
                  colSpan={5}
                  align="center"
                  style={{ fontSize: "1.5rem" }}
                >
                  查無此資料
                </TableCell>
              ) : (
                filtered.map((item, index) => (
                  <TableHandover
                    handoverId={item.id}
                    handoverSysmoney={item.sysmoney}
                    handoverRealcash={item.realcash}
                    handoverCreateAt={item.createdAt}
                    Edit={() => handleHandoverEditOpen(item, index)}
                  />
                ))
              )}
              <Dialog
                open={openEdit}
                onClose={handleHandoverEditClose}
                aria-labelledby="edit"
                aria-describedby="edit"
                onBackdropClick="false"
                fullWidth="true"
                maxWidth="xs"
              >
                <FormTitle
                  variant="h6"
                  id="edit"
                  style={{ textAlign: "center", cursor: "move" }}
                >
                  {"修改實際金額"}
                </FormTitle>

                <form>
                  <Stack mx={10} my={3} spacing={5}>
                    <ListItem button disableGutters>
                      <ListItemText
                        primary="交班人 :"
                        sx={{ maxWidth: "50%" }}
                      />
                      <Chip
                        label={currentHandover.userName}
                        style={{ margin: "auto" }}
                      />
                    </ListItem>
                    <ListItem button disableGutters>
                      <ListItemText
                        primary="系統金額 :"
                        sx={{ maxWidth: "50%" }}
                      />
                      <Chip
                        label={currentHandover.sysmoney}
                        style={{ margin: "auto" }}
                      />
                    </ListItem>
                    <ListItem button disableGutters>
                      <ListItemText
                        primary="交班時間 :"
                        sx={{ maxWidth: "50%" }}
                      />
                      <Chip
                        label={currentHandover.createdAt}
                        style={{ margin: "auto" }}
                      />
                    </ListItem>
                    <TextField
                      required="true"
                      defaultValue={currentHandover.realcash}
                      onChange={handleHandoverInfo}
                      name="realCash"
                      label="實際金額"
                      variant="outlined"
                    />
                  </Stack>
                  <Stack mx={5} my={2}>
                    <DialogActions>
                      <Button onClick={handleHandoverEditClose}>取消</Button>
                      <Button onClick={handleHandoverEditSubmit}>確認</Button>
                    </DialogActions>
                  </Stack>
                </form>
              </Dialog>
            </Table>
          </TableContainer>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Handover;
