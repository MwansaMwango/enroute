import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Axios from "axios";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import LocalTaxiRoundedIcon from "@material-ui/icons/LocalTaxiRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
// const beamsClient = new PusherPushNotifications.Client({
//   instanceId: "0bb3f3ca-f205-4863-a264-e0e2264bc4bf",
// });
import { ReactComponent as DriveLogo } from "../../assets/siterider-logo-white.svg";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FF9057",
      main: "#E64500",
      dark: "#259CBB",
      contrastText: "#fff",
    },
    secondary: {
      light: "#78849E",
      main: "#259CBB",
      dark: "#168387",
      contrastText: "#000",
    },
    // type: 'dark', // dark theme
    typography: {
      fontFamily: "Montserrat",
    },
  },
});

const useStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
    },
    img: {
      // width: "5rem",
      // padding: 10,
      // width: 300
      // height: '50%'
      minHeight: '100%',
      maxWidth: "100%",
     
      // height: '50%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      padding: 0,
      margin: 0,
    },

    // search: {
    //   position: 'relative',
    //   borderRadius: theme.shape.borderRadius,
    //   backgroundColor: fade(theme.palette.common.white, 0.15),
    //   '&:hover': {
    //     backgroundColor: fade(theme.palette.common.white, 0.25),
    //   },
    //   marginRight: theme.spacing(2),
    //   marginLeft: 0,
    //   width: '100%',
    //   [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    //   },
    // },
    // searchIcon: {
    //   padding: theme.spacing(0, 2),
    //   height: '100%',
    //   position: 'absolute',
    //   pointerEvents: 'none',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    inputRoot: {
      color: "inherit",
      backgroundColor: "#FAD961",
      backgroundImage: "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});

export default function Nav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [currentUserFullName, setCurrentUserFullName] = React.useState(null);
  console.log("props.notificationStatus = ", props);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
    getUser();
  }, []);
  const history = useHistory();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push("/profile");
  };
  const handleMenuCloseGotoProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  };
  const logout = () => {
    Axios.get("/api/auth/logout").then(() => {
      window.location.href = "/";
    });
  };
  const getUser = () => {
    Axios.get("/api/users/current-user")
      .then((res) => {
        setCurrentUserFullName(
          res.data.data.firstName + " " + res.data.data.lastName
        );
        return true;
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <div>
      {currentUserFullName ? (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      ) : (
        <div></div>
      )}
    </div>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <div>
      {currentUserFullName ? (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              href="/myTrips"
            >
              <Badge badgeContent={0} color="secondary">
                <LocalTaxiRoundedIcon />
              </Badge>
              <p>Trip Notifications</p>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              href="/myrequests"
              aria-label="show 1 new notifications"
              color="inherit"
            >
              <Badge badgeContent={props.notificationStatus} color="secondary">
                <EmojiPeopleRoundedIcon />
              </Badge>
              <p>Ride Notifications</p>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <p>{currentUserFullName}</p>
            </IconButton>
          </MenuItem>
        </Menu>
      ) : (
        <div></div>
      )}
    </div>
  );

  return (
    <div className={classes.grow}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          {" "}
          {/* dark theme */}
          <Toolbar>
            <MenuItem>
              {/* <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                href="/Drive"
                // maxWidth='80%'
              > */}
              {/* <MenuIcon /> */}

              {/* <img
                  src={require("../../assets/siterider-logo-white.svg")}
                  className={classes.img}
                /> */}
              {/* <DriveLogo /> */}
              {/* </IconButton> */}
            </MenuItem>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {/* <DriveLogo width='100px' fontSize="1rem" /> */}
              {/* <Typography className={classes.title} variant="h4" noWrap>
                Enroute
              </Typography> */}
              <a href="/Drive">
                <img
                  src={require("../../assets/siterider-logo-white.svg")}
                  className={classes.img}
                />
              </a>
            </Grid>

            {currentUserFullName ? (
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <IconButton
                      aria-label="show 4 new mails"
                      color="inherit"
                      href="/mytrips"
                    >
                      <Badge badgeContent={0} color="secondary">
                        <LocalTaxiRoundedIcon />
                      </Badge>
                    </IconButton>

                    <IconButton
                      href="/myrequests"
                      aria-label="show 1 new notifications"
                      color="inherit"
                    >
                      <Badge
                        badgeContent={props.notificationStatus}
                        color="secondary"
                      >
                        <EmojiPeopleRoundedIcon />
                      </Badge>
                    </IconButton>

                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                      {getUser()}
                      {currentUserFullName}
                    </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            ) : (
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Typography variant="h6">
                  <Link href="/login" color="inherit" underline="none">
                    Login
                  </Link>
                </Typography>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </ThemeProvider>
    </div>
  );
}
