import React, { useState } from "react";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  Container,
  Stack,
} from "@mui/material";
import { Delete, Edit, Search } from "@material-ui/icons";
import { BodyContainer, Navbar, Content, Breadcrumb } from "./Navbar";
import {
  DialogText,
  FormTitle,
  Input,
  SearchBox,
  SearchContainer,
} from "./SearchAndForm";
import { UploadImgButton } from "./Buttons";
import { TableHeads } from "./Table";

const Employee = () => {
  const [open, setOpen] = React.useState(false);
  const [searchInput, setSearchInput] = useState({
    name: "",
    status: "",
  });
  const [searchData, setSearchData] = useState([]);

  const [image, setImage] = useState(null);

  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    account: "",
    password: "",
    type: "",
  });

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
      account: "",
      password: "",
      type: "",
    });
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
            <Button size="large" color="inherit">
              <Search fontSize="large" />
            </Button>
            <Button onClick={handleClean}>清除搜尋</Button>
            <Button
              onClick={handleRegisterClick}
              variant="contained"
              color="success"
              className="AddBTN"
            >
              註冊員工帳號
            </Button>
          </SearchContainer>

          <Dialog
            open={open}
            onClose={handleClose}
            onBackdropClick="false"
            fullWidth="true"
            maxWidth="sm"
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
              {"新增員工資訊"}
            </FormTitle>

            <form>
              <Stack  mx={5} my={3}>
                <Stack direction="row" >
                  <Input
                    name="name"
                    label="姓名"
                    variant="outlined"
                    required
                    onChange={handleEmployeeInfo}
                    value={employeeInfo.name}
                  />
                  <Input
                    name="type"
                    label="職位"
                    variant="outlined"
                    required
                    onChange={handleEmployeeInfo}
                    value={employeeInfo.type}
                  />
                </Stack>
                <Input
                  name="account"
                  label="帳號"
                  variant="outlined"
                  required
                  onChange={handleEmployeeInfo}
                  value={employeeInfo.account}
                />
                <Input
                  name="password"
                  label="密碼"
                  variant="outlined"
                  type="password"
                  required
                  onChange={handleEmployeeInfo}
                />

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
                  <Button type="submit" size="large">
                    確認
                  </Button>
                </DialogActions>
              </Stack>
            </form>
          </Dialog>

          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHeads id={"employee"} />
              <TableRow>
                <TableCell align="center">Member1</TableCell>
                <TableCell align="center">xxxxxxxxxx</TableCell>
                <TableCell align="center">xxxx</TableCell>
                <TableCell align="center">
                  <Button>
                    <Edit />
                  </Button>
                  <Button>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Content>
      </BodyContainer>
    </>
  );
};

export default Employee;
