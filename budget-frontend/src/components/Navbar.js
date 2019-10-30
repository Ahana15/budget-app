import React, { useState, createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
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
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  let fileInputRef = React.createRef();
  let pressSubmitRef = React.createRef();

  function OptionsDialog() {
    return (
      <Dialog
        onClose={() => setOpenStatus(false)}
        aria-labelledby="simple-dialog-title"
        open={openStatus}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
          <ListItem
            onFilesAdded={data => console.log(data)}
            onClick={() => fileInputRef.current.click()}
          >
            TakePicture
            <form
              action="http://localhost:3000/image_recognition"
              method="POST"
              encType="multipart/form-data"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={e => pressSubmitRef.current.click()}
              ></input>
              <input
                type="submit"
                ref={pressSubmitRef}
                style={{ display: "none" }}
              ></input>
            </form>
          </ListItem>
          <ListItem>
            <Link to="/new-transaction">Enter Manually</Link>
          </ListItem>
        </List>
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
        onClick={() => setOpenStatus(true)}
        icon={<AddCircleOutlineIcon />}
      />
      <OptionsDialog />
      <Link to="/analytics">
        <BottomNavigationAction label="Analytics" icon={<PieChartIcon />} />
      </Link>
      <Link to="/profile">
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </Link>
    </BottomNavigation>
  );
}
