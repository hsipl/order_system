import {
    styled,
    Box,
    DialogContentText,
    TextField,
    Typography,
    Paper,
  } from "@mui/material";
  import Draggable from "react-draggable";
  
  export const SearchContainer = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "center",
  
    ".AddBTN": {
      marginLeft: "auto",
    },
  });
  
  export const SearchBox = styled(TextField)({
    margin: "1rem",
    "& .MuiInputBase-root": {
      background: "rgba(255, 255, 255, 0.8)",
    },
    ":first-child": {
      marginLeft: "0",
    },
  });
  
  export const FormTitle = styled(Typography)({
    fontWeight: "bold",
    margin: "2rem 0 0 0",
    textAlign: "center",
  });
  
  export const Input = styled(TextField)({
    margin: "1rem 1.5rem",
    color: "gray",
  });
  
  export const DialogText = styled(DialogContentText)({
    margin: "0.5rem 1.5rem",
  });
  
  export function PaperComponent(props) {
      return (
        <Draggable
          handle="#draggable-dialog-title"
          cancel={'[class*="MuiDialogContent-root"]'}
        >
          <Paper {...props} />
        </Draggable>
      );
    }
