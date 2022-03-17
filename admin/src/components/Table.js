import React from "react";
import {
  styled,
  Button,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@material-ui/icons";

export const TableHeads = (props) => {
  const TableTitle = styled(TableCell)({
    backgroundColor: "#6379A1",
    color: "white",
    textAlign: "center",
  });

  const Heads = {
    product: ["產品名稱", "價格", "圖片", "類別", "狀態", "操作"],
    employee: ["照片", "姓名", "職位", "狀態", "操作"],
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
  if (
    status === "已歇業" ||
    status === "已停用" ||
    status === "已停售" ||
    status === "已離職"
  ) {
    return (
      <Button onClick={EditBTN}>
        <Edit />
      </Button>
    );
  } else {
    return (
      <>
        <Tooltip title="刪除">
          <Button onClick={DelBTN}>
            <Delete />
          </Button>
        </Tooltip>
        <Tooltip title="修改">
          <Button onClick={EditBTN}>
            <Edit />
          </Button>
        </Tooltip>
      </>
    );
  }
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
            width: "15%",
          }}
        >
          {item}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function TableEmployee(props) {
  const delBTN = props.Del;
  const editBTN = props.Edit;
  const Id = props.Id;
  const Img = props.Img;
  const Name = props.Name;
  const Type = props.Type;
  const Status = props.Status;
  // const createdAt = props.createdAt;

  const EmployeeData = [
    <img src={"http://localhost:8000/" + Img} alt={Img} height="100" />,
    Name,
    Type,
    Status,
    <ControlCell status={Status} Del={delBTN} Edit={editBTN} />,
  ];

  return (
    <TableRow key={Id}>
      {EmployeeData.map((item) => (
        <TableCell
          align="center"
          sx={{
            height: "5rem",
            width: "15%",
          }}
        >
          {item}
        </TableCell>
      ))}
    </TableRow>
  );
}
