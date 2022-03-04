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
  if (status === "已歇業") {
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
export function TableShop(props) {
  const DelBTN = props.Del;
  const EditBTN = props.Edit;
  const Id = props.Id;
  const Img = props.Img;
  const StoreName = props.StoreName;
  const StoreType = props.StoreType;
  const StoreStatus = props.StoreStatus;
  const CreatedAt = props.CreatedAt;

  const ShopData = [
    <img src={"http://localhost:8000/" + Img} alt={Img} height="100" />,
    StoreName,
    StoreType,
    StoreStatus,
    CreatedAt,
    <ControlCell status={StoreStatus} Del={DelBTN} Edit={EditBTN} />,
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
