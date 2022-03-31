import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled, Button, TableCell, TableHead, TableRow,Tooltip } from "@mui/material";
import { Edit, Delete, Flag } from "@material-ui/icons";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const TableHeads = (props) => {
  const TableTitle = styled(TableCell)({
    backgroundColor: "#6379A1",
    color: "white",
    textAlign: "center",
  });

  const Heads = {
    product: ["編號","產品名稱", "價格", "圖片", "類別", "狀態", "操作"],
    employee: ["姓名", "帳號", "職位", "操作"],
    shop: ["店家照片", "店家名稱", "類型", "狀態", "創店日期", "操作"],
    report: ["產品名稱", "銷售總額(元)", "銷售總數(份)"],
    handover: ["交班人", "系統金額", "實際金額", "交班時間"],
    tags: ["編號", "調味料名稱", "狀態", "操作"],
  };

  return (
    <TableHead>
      <TableRow>
        {Heads[props.id].map((item) => (
          <TableTitle>{item}</TableTitle>
        ))}
      </TableRow>
    </TableHead>
  );
};

export function ControlCell(props) {
  const DelBTN = props.Del;
  const EditBTN = props.Edit;
  const ManageEdit = props.ManageEdit;
  const BusinessCard = props.BusinessCard;
  const status = props.status;
  const Page = props.Page;
  const idIdentity = props.idIdentity;

  if (Page === "shop") {
    if (status === "已歇業") {
      return (
        <>
        <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
          </Tooltip>
          <Tooltip title="檢視/修改店長資訊">
          <Button onClick={BusinessCard}>
            <CreditScoreIcon />
          </Button>
          </Tooltip>
        </>
      );
    } else if (idIdentity === false) {
      return (
        <>
         <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
          </Tooltip>
          <Tooltip title="刪除">
          <Button onClick={DelBTN}>
            <Delete />
          </Button>
          </Tooltip>
          <Tooltip title="檢視/修改店長資訊">
          <Button onClick={BusinessCard}>
            <CreditScoreIcon />
          </Button>
          </Tooltip>
        </>
      );
    } else if (idIdentity === true) {
      return (
        <>
        <Tooltip title="新增店長資訊">
          <Button onClick={ManageEdit}>
            <PersonAddIcon />
          </Button>
          </Tooltip>
          <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
          </Tooltip>
          <Tooltip title="刪除">
          <Button onClick={DelBTN}>
            <Delete />
          </Button>
          </Tooltip>
          {/* <Button onClick={BusinessCard}>
            <CreditScoreIcon />
          </Button> */}
        </>
      );
    } else {
      return (
        <>
          <Tooltip title="新增店長資訊">
          <Button onClick={ManageEdit}>
            <PersonAddIcon />
          </Button>
          </Tooltip>
          <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
          </Tooltip>
          <Tooltip title="刪除">
          <Button onClick={DelBTN}>
            <Delete />
          </Button>
          </Tooltip>
          <Tooltip title="檢視/修改店長資訊">
          <Button onClick={BusinessCard}>
            <CreditScoreIcon />
          </Button>
          </Tooltip>
        </>
      );
    }
  } else {
    if (status === "已歇業" || status === "已停用" || status === "已停售") {
      return (
        <Tooltip title="修改">
        <Button onClick={EditBTN}>
          <Edit />
        </Button>
        </Tooltip>
      );
    } else {
      return (
        <>
         <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
          </Tooltip>
          <Tooltip title="刪除">
          <Button onClick={DelBTN}>
            <Delete />
          </Button>
          </Tooltip>
         
        </>
      );
    }
  }
}

export function ControlManageCell(props) {
  const ManageEdit = props.ManageEdit;
  const EditBTN = props.Edit;
  return (
    <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
          </Tooltip>
  );
}

export function ControlHandoverCell(props) {
  const EditBTN = props.Edit;

  return (
    <Tooltip title="修改">
    <Button onClick={EditBTN}>
      <Edit />
    </Button>
    </Tooltip>
  );
}

export function TableShop(props) {
  const delBTN = props.Del;
  const editBTN = props.Edit;
  const Id = props.Id;
  const Img = props.Img;
  const storeName = props.storeName;
  const storeType = props.storeType;
  const storeStatus = props.storeStatus;
  const createdAt = props.createdAt;
  const Page = props.Page;
  const ManageEdit = props.ManageEdit;
  const BusinessCard = props.BusinessCard;
  const idIdentity = props.idIdentity;

  const ShopData = [
    <img src={"http://localhost:8000/" + Img} alt={Img} height="100" />,
    storeName,
    storeType,
    storeStatus,
    createdAt,
    <ControlCell
      Page={Page}
      status={storeStatus}
      Del={delBTN}
      Edit={editBTN}
      ManageEdit={ManageEdit}
      BusinessCard={BusinessCard}
      idIdentity={idIdentity}
    />,
  ];

  return (
    <TableRow key={Id}>
      {ShopData.map((item) => (
        <TableCell
          align="center"
          sx={{
            height: "5rem",
          }}
        >
          {item}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function TableProduct(props) {
  const TagId = props.TagId;
  const TagTag = props.TagTag;
  const TagStatus = props.TagStatus;

  const productId = props.productId;
  const productName = props.productName;
  const productCategory = props.productCategory;
  const productImage = props.productImage;
  const productPrice = props.productPrice;
  const productStatus = props.productStatus;
  const productTag = props.ProductTag;
  const DelBTN = props.Del;
  const EditBTN = props.Edit;

  const tagData = [
    TagId,
    TagTag,
    TagStatus,
    <ControlCell status={TagStatus} Del={DelBTN} Edit={EditBTN} />,
  ];

  const productData = [
    productId,
    productName,
    productPrice,
    <img
      src={"http://localhost:8000/" + productImage}
      alt={productImage}
      height="100"
    />,
    productCategory,
    productStatus,
    <ControlCell status={productStatus} Del={DelBTN} Edit={EditBTN} />,
  ];

  if (localStorage.getItem("Tabs") === "2") {
    return (
      <TableRow key={TagId} hover={true} title={TagTag}>
        {tagData.map((item) => (
          <TableCell
            align="center"
            sx={{
              height: "5rem",
            }}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    );
  } else {
    return (
      <TableRow key={productId} hover={true} title={productTag}>
        {productData.map((item) => (
          <TableCell
            align="center"
            sx={{
              height: "5rem",
            }}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    );
  }
}

export function TableHandover(props) {
  const handoverId = props.handoverId;

  const handoverSysmoney = props.handoverSysmoney;
  const handoverRealcash = props.handoverRealcash;
  const handoverCreateAt = props.handoverCreateAt;
  const EditBTN = props.Edit;

  const PageTable = [
    handoverId,
    handoverSysmoney,
    handoverRealcash,
    handoverCreateAt,
    <ControlHandoverCell Edit={EditBTN} />,
  ];

  return (
    <TableRow key={handoverId}>
      {PageTable.map((item) => (
        <TableCell
          align="center"
          sx={{
            height: "5rem",
          }}
        >
          {item}
        </TableCell>
      ))}
    </TableRow>
  );
}
