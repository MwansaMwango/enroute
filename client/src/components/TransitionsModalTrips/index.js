import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import Drive from "../../pages/Drive";
import { IconButton } from "@material-ui/core";

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
    padding: theme.spacing(1),
  },
  img: {
    display: 'block',
    margin: "0 auto",
    maxWidth: "40%",

  },
}));

export default function TransitionsModalTrips({ editClicked, tripData }) {
  console.log("props in modal =", tripData);
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
      <IconButton>
        <EditIcon
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpen();
          }}
          startIcon={<EditIcon />}
          fontSize="large"
        />
      </IconButton>

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
            <img
              className={classes.img}
              src={require("../../assets/edit.svg")}
              alt="Edit details..."
            />
            <h2 style={{ textAlign: "center" }} id="transition-modal-title">
              Update your Trip details
            </h2>
            <p id="transition-modal-description">
              <Drive isEdit={true} tripData={tripData} />
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
