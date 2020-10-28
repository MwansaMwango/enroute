import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AlertDialog(props) {
  console.log("Alert props ", props);
  console.log("matches dialog", props.dialogContentTxtMatches);
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog {props.btnOpenTxt}
      </Button> */}

      <Dialog
        open={true}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: "center" }}
      >
        {props.dialogContentTxtMatches >= 0 ? ( // Ride request sent
          <img
            style={{
              display: "block",
              margin: "0 auto",
              maxWidth: "30%",
              paddingTop: "30px",
            }}
            src={require("../../assets/undraw-sent.svg")}
            alt="Sent..."
          />
        ) : props.btnOpenTxt === "cancel" ? ( // cancel booking
          <img
            style={{
              display: "block",
              margin: "0 auto",
              maxWidth: "30%",
              paddingTop: "30px",
            }}
            src={require("../../assets/undraw-cancel.svg")}
            alt="Cancel..."
          />
        ) : (
          // Trip posted
          <img
            style={{
              display: "block",
              margin: "0 auto",
              maxWidth: "30%",
              paddingTop: "30px",
            }}
            src={require("../../assets/undraw-confirmed.svg")}
            alt="Edit details..."
          />
        )}
        <strong>
          <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
        </strong>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            <strong style={{ fontSize: "2rem", color: "#E64500" }}>
              {props.dialogContentTxtMatches}
            </strong>
            {props.dialogContentTxt}
          </DialogContentText>
          {/* <CircularProgress color="primary" /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            {props.btnOKTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
