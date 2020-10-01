import AppBar from "@material-ui/core/AppBar";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
// Material UI Components  //
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//  Icons  //
import { default as AccountCircle } from "@material-ui/icons/AccountCircle";
import Add from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logOutAction } from "../redux/actions/auth_actions";
import http from "../helpers/http";

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
  },
  mainLink: {
    textDecoration: "none",
    color: "#000000",
    fontWeight: "bold",
  },
}));

export default function AppContainer(props) {
  const role = useSelector((store) => store.authReducer.role);
  const dispatch = useDispatch();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuApplications, setMenuApplications] = useState(false);
  const [menuUsers, setMenuUsers] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);

  const handleApplicationsNestedMenu = () => {
    setMenuApplications(!menuApplications);
  };

  const handleUsersNestedMenu = () => {
    setMenuUsers(!menuUsers);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = useSelector((store) => store.authReducer.isLoggedIn);

  const handleLogOut = () => {
    dispatch(logOutAction());
    if (!isLoggedIn) {
      http.defaultHeader();
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            معامل تست بدعم من توظيف للخدمات المتعددة Covid-19 فحص كرونا
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openAnchor}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/user-profile">الملف الشخصي</Link>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Link>تسجيل الخروج</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {SidebarItem("الاستعلامات", "/dashboard", <DashboardIcon />)}
          {SidebarNestedItemsParent(
            "الفحوصات",
            handleApplicationsNestedMenu,
            <AssignmentTurnedInIcon />,
            menuApplications,
            <List component="div" disablePadding>
              {role === "agency" &&
                SidebarNestedItem(
                  "/my-applications",
                  "جميع فحوصات العملاء",
                  <AssignmentIndIcon />
                )}
              {(role === "lab" || role === "admin") &&
                SidebarNestedItem(
                  "/all-applications",
                  "جميع فحوصات العملاء",
                  <GroupIcon />
                )}
              {role !== "lab" &&
                SidebarNestedItem("/new-application", "اضافة طلب فحص", <Add />)}
            </List>
          )}
          {role === "admin" &&
            SidebarNestedItemsParent(
              "المستخدمين",
              handleUsersNestedMenu,
              <AssignmentTurnedInIcon />,
              menuUsers,
              <List component="div" disablePadding>
                {SidebarNestedItem(
                  "/all-users",
                  "جميع المستخدمسن",
                  <AssignmentIndIcon />
                )}
                {SidebarNestedItem(
                  "/admin-user-registration",
                  "اضافة مستخدم",
                  <PersonAddIcon />
                )}
              </List>
            )}
          <Divider />
          {SidebarItem("الملف الشخصي", "/user-profile", <AccountCircle />)}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );

  function SidebarItem(name, url, icon) {
    return (
      <Link className={classes.mainLink} to={url}>
        <ListItem button key={name}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </Link>
    );
  }

  function SidebarNestedItemsParent(
    name,
    handleClick,
    icon,
    menuState,
    nestedItems
  ) {
    return (
      <>
        <ListItem button key={name} onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
          {menuState ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menuState} timeout="auto" unmountOnExit>
          {nestedItems}
        </Collapse>
      </>
    );
  }

  function SidebarNestedItem(url, name, icon) {
    return (
      <Link className={classes.link} to={url}>
        <ListItem button className={classes.nested}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </Link>
    );
  }
}
