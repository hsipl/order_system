import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchBox, SearchContainer } from "../SearchAndForm";
import {
  Table,
  TableContainer,
  Paper,
  Button,
  MenuItem,
  TableCell,
} from "@mui/material";
import { Search } from "@material-ui/icons";
import { TableHeads, TableShopProduct } from "../Table";

const ShopProduct = () => {
  const [shopData, setShopData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [searchInput, setSearchInput] = useState({
    type: "",
    id: "",
    name: "",
    price: "",
    category: "",
    status: "",
  });
  const [check, setCheck] = useState(0); //  0鎖 1 name input 2 price input 3 category select 4 status select

  const url_Store = "http://localhost:8000/api/store";
  const url_Product = "http://localhost:8000/api/product";
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const get_Store = async () => {
      try {
        let { data } = await axios.get(url_Store, config);
        setShopData(data);
      } catch (e) {
        localStorage.removeItem("UserAccount");
      }
    };
    get_Store();
  }, []);

  useEffect(() => {
    const get_Product = async () => {
      try {
        let { data } = await axios.get(url_Product, config);
        setProductData(data);
      } catch (e) {
        localStorage.removeItem("UserAccount");
      }
    };
    get_Product();
  }, []);

  const storeName = shopData.map((name, index) => (
    <MenuItem value={name.id} key={index}>
      {name.name}
    </MenuItem>
  ));

  function SearchOnChange(e) {
    const { value, name } = e.target;

    setSearchInput((preData) => ({
      ...preData,
      [name]: value,
    }));
  }

  const handleSearch = async () => {
    if (searchInput.id !== "") {
      let { data } = await axios.get(
        url_Product + "?storeId=" + searchInput.id,
        config
      );
      toChinese(data);
      if (searchInput.type === 1) {
        let { data } = await axios.get(
          url_Product +
            "?storeId=" +
            searchInput.id +
            "&name=" +
            searchInput.name,
          config
        );
        toChinese(data);
      } else if (searchInput.type === 2) {
        let { data } = await axios.get(
          url_Product +
            "?storeId=" +
            searchInput.id +
            "&price=" +
            searchInput.price,
          config
        );
        toChinese(data);
      } else if (searchInput.type === 3) {
        let { data } = await axios.get(
          url_Product +
            "?storeId=" +
            searchInput.id +
            "&category=" +
            searchInput.category,
          config
        );
        toChinese(data);
      } else if (searchInput.type === 4) {
        let { data } = await axios.get(
          url_Product +
            "?storeId=" +
            searchInput.id +
            "&status=" +
            searchInput.status,
          config
        );
        toChinese(data);
      } else if (searchInput.type === "") {
        let { data } = await axios.get(
          url_Product + "?storeId=" + searchInput.id,
          config
        );
        toChinese(data);
      }
    }
  };

  function toChinese(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].category === 0
        ? (data[i].category = "肉類")
        : data[i].category === 1
        ? (data[i].category = "蔬菜類")
        : data[i].category === 2
        ? (data[i].category = "加工類")
        : (data[i].category = "其他類");
      data[i].status === 0
        ? (data[i].status = "販售中")
        : (data[i].status = "已停售");
    }

    setSearchData(data);
  }

  const handleClean = async () => {
    setSearchData(null);
    setSearchInput({
      id: "",
      status: "",
      category: "",
      name: "",
      price: "",
    });
  };

  const handleCheck = () => {
    searchInput.type === 0
      ? setCheck(0)
      : searchInput.type === 1
      ? setCheck(1)
      : searchInput.type === 2
      ? setCheck(2)
      : searchInput.type === 3
      ? setCheck(3)
      : searchInput.type === 4
      ? setCheck(4)
      : null;
  };
  const filtered = searchData === null ? [] : searchData;
  let getProductTag = productData.map((taggs) => taggs.tags.map((k) => k.tag));

  return (
    <>
      <SearchContainer>
        <SearchBox
          id="SearchProductName"
          label="請選擇分店"
          variant="filled"
          name="id"
          select
          onChange={SearchOnChange}
          value={searchInput.id}
          sx={{ width: "10rem" }}
        >
          <MenuItem value="">
            <em style={{ color: "gray" }}>請選擇</em>
          </MenuItem>
          {storeName}
        </SearchBox>

        <SearchBox
          id="SearchProductStatus"
          select
          label="類型"
          value={searchInput.type}
          onChange={SearchOnChange}
          onBlur={handleCheck}
          variant="filled"
          name="type"
          sx={{ width: "10rem" }}
        >
          <MenuItem value={0} key={0}>
            無
          </MenuItem>
          <MenuItem value={1} key={1}>
            產品名稱
          </MenuItem>
          <MenuItem value={2} key={2}>
            價格
          </MenuItem>
          <MenuItem value={3} key={3}>
            類別
          </MenuItem>
          <MenuItem value={4} key={4}>
            狀態
          </MenuItem>
        </SearchBox>
        {check === 0 ? (
          <SearchBox disabled />
        ) : check === 1 ? (
          <SearchBox
            id="SearchProductStatus"
            label="輸入產品名稱"
            onChange={SearchOnChange}
            value={searchInput.name}
            variant="filled"
            name="name"
            sx={{ width: "10rem" }}
          />
        ) : check === 2 ? (
          <SearchBox
            id="SearchProductStatus"
            label="輸入價錢"
            onChange={SearchOnChange}
            value={searchInput.price}
            variant="filled"
            name="price"
            sx={{ width: "10rem" }}
          />
        ) : check === 3 ? (
          <SearchBox
            select
            label="選擇類別"
            sx={{ width: "10rem" }}
            onChange={SearchOnChange}
            name="category"
            value={searchInput.category}
          >
            <MenuItem value={0} key={0}>
              肉類
            </MenuItem>
            <MenuItem value={1} key={1}>
              蔬菜類
            </MenuItem>
            <MenuItem value={2} key={2}>
              加工類
            </MenuItem>
            <MenuItem value={3} key={3}>
              其他類
            </MenuItem>
          </SearchBox>
        ) : check === 4 ? (
          <SearchBox
            sx={{ width: "10rem" }}
            onChange={SearchOnChange}
            label="選擇狀態"
            select
            name="status"
            value={searchInput.status}
          >
            <MenuItem value={0} key={0}>
              販售中
            </MenuItem>
            <MenuItem value={1} key={1}>
              已停售
            </MenuItem>
          </SearchBox>
        ) : (
          <SearchBox disabled sx={{ width: "10rem" }} />
        )}
        <Button size="large" color="inherit" onClick={() => handleSearch()}>
          <Search fontSize="large" />
        </Button>
        <Button onClick={handleClean}>清除搜尋</Button>
      </SearchContainer>

      <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
        <Table stickyHeader>
          <TableHeads id={"productShop"} />

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
              <TableShopProduct
                productId={item.id}
                productName={item.name}
                productCategory={item.category}
                productImage={item.image}
                productPrice={item.price}
                ProductTag={getProductTag[index]}
                productStatus={item.status}
              />
            ))
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default ShopProduct;
