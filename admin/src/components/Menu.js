import { MenuItem } from "@mui/material";
import { useMemo } from "react";
import { SearchBox } from "./SearchAndForm";

const MenuList = (props) => {
  const Menus = {
    Type: ["無", "產品名稱", "價格", "類別", "狀態"],
    Category:["肉類","蔬菜類","加工類","其他類"],
    SellStatus:["販售中","已停售"],
    ShopStauts:["營業中","已歇業"],
    TagStatus:["使用中","已停用"],
    
  };

  const label = props.label;
  const value = props.value;
  const name = props.name;


  const changeValue = (e) => {
    const onChangeSearchName = e.target.name;
    const onChangeSearchValue = e.target.value;
    props.onChange(onChangeSearchName, onChangeSearchValue);

  };

  return (
    <SearchBox
      onChange={changeValue}
      name={name}
      label={label}
      value={value}
      select
      sx={{ width: "10rem" }}
      variant="filled"
    >
      {Menus[props.type].map((item, index) => (
        <MenuItem key={index} value={index}>
          {item}
        </MenuItem>
      ))}
    </SearchBox>
  );
};

export default MenuList;
