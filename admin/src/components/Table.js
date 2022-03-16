import React from "react";
import { styled, Button, TableCell, TableHead, TableRow } from "@mui/material";
import { Edit, Delete } from "@material-ui/icons";

export const TableHeads = (props) => {
  const TableTitle = styled(TableCell)({
    backgroundColor: "#6379A1",
    color: "white",
    textAlign: "center",
  });

  const Heads = {
    product: ["產品名稱", "價格", "圖片", "類別", "狀態", "操作"],
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
  const status = props.status;
  if (status === "已歇業" || status === "已停用" || status === "已停售" ) {
    return (
      <Button onClick={EditBTN}>
        <Edit />
      </Button>
    );
  } else {
    return (
      <>
        <Button onClick={DelBTN}>
          <Delete />
        </Button>
        <Button onClick={EditBTN}>
          <Edit />
        </Button>
      </>
    );
  }
}

export function ControlHandoverCell(props) {

    const EditBTN = props.Edit;

   
      return (
        <Button onClick={EditBTN}>
          <Edit />
        </Button>
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

  const ShopData = [
    <img src={"http://localhost:8000/" + Img} alt={Img} height="100" />,
    storeName,
    storeType,
    storeStatus,
    createdAt,
    <ControlCell status={storeStatus} Del={delBTN} Edit={editBTN} />,
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
    <ControlHandoverCell  Edit={EditBTN} />,
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
