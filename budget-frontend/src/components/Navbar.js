import React, { useState, createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button
} from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import { create } from "jss";
import Axios from "axios";

export default function Navbar() {
  const [openStatus, setOpenStatus] = useState({
    list: false,
    transaction: false
  });
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    location: "",
    category: ""
  });
  const [selectedFile, setSelectedFile] = useState("");
  let fileInputRef = React.createRef();

  useEffect(() => {
    let formData = new FormData();
    formData.append("image", selectedFile);
    Axios.post("http://localhost:3000/image_recognition", formData).then(res =>
      console.log(res)
    );
  }, [selectedFile]);

  function OptionsDialog() {
    return (
      <Dialog
        onClose={() => setOpenStatus({ ...openStatus, list: false })}
        aria-labelledby="simple-dialog-title"
        open={openStatus.list}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
          <ListItem onClick={() => fileInputRef.current.click()}>
            Take Picture
            <input
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={e => setSelectedFile(e.target.files[0])}
            ></input>
          </ListItem>
          <ListItem
            onClick={() =>
              setOpenStatus({ ...openStatus, transaction: true, list: false })
            }
          >
            Enter Manually
          </ListItem>
        </List>
      </Dialog>
    );
  }

  function EnterNewTransaction() {
    return (
      <Dialog
        onClose={() =>
          setOpenStatus({ ...openStatus, transaction: false, list: true })
        }
        aria-labelledby="simple-dialog-title"
        open={openStatus.transaction}
      >
        <DialogTitle id="simple-dialog-title">New Transaction</DialogTitle>
        <TextField margin="dense" label="Amount" type="number" />
        <TextField margin="dense" label="Location" type="Text" />
        <InputLabel>Category</InputLabel>
        <Select>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
        </Select>
        <Button
          onClick={() => setOpenStatus({ ...openStatus, transaction: false })}
        >
          Add
        </Button>
      </Dialog>
    );
  }
  return (
    <BottomNavigation
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "lightblue"
      }}
    >
      <Link to="/dashboard">
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </Link>
      <Link to="/leaderboard">
        <BottomNavigationAction
          label="Leaderboard"
          icon={<FormatListNumberedIcon />}
        />
      </Link>

      <BottomNavigationAction
        label="Add Paymnet"
        onClick={() => setOpenStatus({ ...openStatus, list: true })}
        icon={<AddCircleOutlineIcon />}
      />
      <OptionsDialog />
      <EnterNewTransaction></EnterNewTransaction>
      <Link to="/analytics">
        <BottomNavigationAction label="Analytics" icon={<PieChartIcon />} />
      </Link>
      <Link to="/profile">
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </Link>
    </BottomNavigation>
  );
}
