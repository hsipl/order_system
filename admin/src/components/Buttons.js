import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const LeftButton = styled(Link)({
  display: "table",
  textDecoration:"none",
  verticalAlign:"middle",
  margin: "1.5rem 1rem",
  padding:"0.5rem 0.2rem",
  width: "70%",
  color: "black",
  fontSize: 17,
  border: "1px solid",
  backgroundColor: "#FFFFFF",
  borderColor: "#7B7B7B",
  textAlign: "center",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#9fa8da",
    borderColor: "#7986cb",
  },
  ".LeftBTN1":{
    marginTop:"1rem"
  }
});

export const LeftButtonsInfo = [
  { name: "商品管理", id: "BtnProduct", url: "/product", isMain: false },
  { name: "員工管理", id: "BtnEmployee", url: "/employee", isMain: false },
  { name: "財務報表", id: "BtnReport", url: "/report", isMain: false },
  { name: "交班紀錄", id: "BtnHandover", url: "/handover", isMain: false },
  { name: "分店管理", id: "BtnShop", url: "/shop", isMain: true },
];

export const LeftButtons = (props) => {
  const FilterLeftButtons = props.info;
  return (
    <>
      {FilterLeftButtons.map((btn,index) => (
        <LeftButton class={'LeftBTN'+index} key={btn.id} to={btn.url}>
          {btn.name}
        </LeftButton>
      ))}
    </>
  );
};

export function FilterLeftButtons(props) {
  const isFilter = props.isfilter;
  if (isFilter === 1) {
    return <LeftButtons info={LeftButtonsInfo} />;
  } else {
    const FilterLeftButtons = LeftButtonsInfo.filter(function (value) {
      return value.isMain === false;
    });
    return <LeftButtons info={FilterLeftButtons} />;
  }
}

export const UploadImgButton = styled("input")({
  "::-webkit-file-upload-button": {
    margin: "1rem 1rem 0 0",
    border: "0px",
    lineHeight: "1.75",
    padding: "6px 16px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "rgb(25, 118, 210)",
  },
});

export const NonLineLink = styled(Link)({
  textDecoration:"none",
  color:"black",
  ":hover":{
    textDecoration:"underline",
  },
})