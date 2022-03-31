import React from "react";
import {
  styled,
  Button,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ImageTwoTone from "@material-ui/icons/ImageTwoTone";

const DialogContainer = styled(Dialog)({
  borderRadius: "50px",
});

const DialogTitle = styled(Typography)({
  fontWeight: "bold",
  padding: "1rem",
  backgroundColor: "#8DB1D3",
  margin: "0",
});

const FormContent = styled(DialogContent)({
  display: "flex",
  padding: "1rem",
  justifyItems: "center",
  justifyContent: "center",
  backgroundColor: "#E5E8ED",
});

const InfoTableCell = styled(TableCell)({
  txetAlign: "left",
  fontSize: 16,
  padding: "0px 16px",
});

const DialogImg = styled(CardMedia)({
  width: "16rem",
  height: "12rem",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
});

const CloseBtn = styled(Button)({
  backgroundColor: "#E5E8ED",
  padding: "1rem",
  ":hover": {
    backgroundColor: "#E5E8ED",
  },
});

const NoImg = styled(ImageTwoTone)({
  fontSize: "6rem",
});

export const NavDialog = (props) => {
  const { open, onClose } = props;

  const StoreName = JSON.parse(localStorage.getItem("StoreName"));
  const StoreStatus =
    JSON.parse(localStorage.getItem("StoreStatus")) === 0 ? "營業中" : "已歇業";
  const UserName = JSON.parse(localStorage.getItem("UserName"));
  const UserAccount = (localStorage.getItem("UserAccount"));
  const StoreLogo = JSON.parse(localStorage.getItem("StoreLogo"));

  const StoreInfo = [
    { title: "店家名稱 : ", info: StoreName },
    { title: "營業狀態 : ", info: StoreStatus },
    { title: "負責人姓名 : ", info: UserName },
    { title: "負責人帳號 : ", info: UserAccount },
  ];

  const handleClose = () => {
    onClose(false);
  };

  function Logo(props) {
    const LogoUrl = props.url;
    if (LogoUrl !== "") {
      return <DialogImg image={"http://localhost:8000/" + LogoUrl} />;
    } else {
      return (
        <DialogImg>
          <NoImg fontSize="large" />
        </DialogImg>
      );
    }
  }

  return (
    <div>
      <DialogContainer
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle align="center" mt={5} variant="h5">
          本店資訊
        </DialogTitle>
        <FormContent>
          <Logo url={StoreLogo} />
          <Table size="small">
            <TableBody>
              {StoreInfo.map((item, index) => (
                <TableRow
                  hover
                  key={StoreInfo.indexOf(item)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <InfoTableCell align="center" key={"title" + index}>
                    {item.title}
                  </InfoTableCell>
                  <InfoTableCell align="left" key={"Info" + index}>
                    <Chip label={item.info} />
                  </InfoTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FormContent>
        <CloseBtn onClick={handleClose}>關閉</CloseBtn>
      </DialogContainer>
    </div>
  );
};
