import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AlertDialog({props}) {
  const [open, setOpen] = React.useState(props.dialogOpen);
  console.log("Alert props ", props.dialogOpen, props);

  
  // const handleClickOpen = () => {
  //     setOpen(props.dialogOpen);
   // };
  
  
  
  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div  >
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog {props.btnOpenTxt}
      </Button> */}
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.dialogContentTxt}
          </DialogContentText>
          <CircularProgress color="primary" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {props.btnOKTxt}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {props.btnCancelTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
