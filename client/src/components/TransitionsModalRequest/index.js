import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Ride from "../../pages/Ride";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 300,
  },
}));

export default function TransitionsModalRequest({ editClicked, requestData }) {
  console.log("props in modal =", requestData);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleOpen();
        }}
        startIcon={<EditIcon />}
        // fontSize="large"
        style={{
          width: "100px",
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "20px",
        }}
      >
        EDIT
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Update Ride Details</h2>
            {/* TODO edit ride page formating */}
            <Ride isEdit={true} requestData={requestData} />
            {/* <p id="transition-modal-description">
            </p> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
