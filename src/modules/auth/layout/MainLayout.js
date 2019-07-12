import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Router, Route, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleIcon from '@material-ui/icons/People';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';

import Franchise from '../franchise/Franchise';
import Category from '../category/CategoryList';
import Staff from '../staff/Staff';
import FranchiseStaff from '../franchisestaff/FranchiseStaff';
import Task from '../task/Task';
import Profile from '../setting/Profile';

// Helpers
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import UserAPI from '../../../api/User';

import MuiVirtualizedTable from '../../common/MuiVirtualizedTable';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  fonttransform:{
    textTransform:"initial"
  },
  menu:{
    color:"white",
    textTransform:'initial'
  }
}));

export default function ClippedDrawer(props) {
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;
  const franchiseId = APP_TOKEN.get().franchiseId;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showCategory, setShowCategory] = useState(false);
  const [showMasterStaff, setShowMasterStaff] = useState(false);
  const [showFranchiseStaff, setShowFranchiseStaff] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');


  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  function handleToggleMenu() {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  }
  function handleCloseMenu(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setMenuOpen(false);
  }
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setStaffOpen(false);
  }


  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick(flag, message) {
    setSnackbarOpen(true);
  }

  function handleFranchiseClick() {
    setShowFranchise(true);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
  }

  function handleCategoryClick() {
    setShowCategory(true);
    setShowFranchise(false);
    setShowMasterStaff(false);
    setShowStaff(false);
    setShowFranchiseStaff(false);
    setShowTask(false);
    setShowProfile(false);
  }

  function handleMasterStaffClick(){
    setShowMasterStaff(true);
    setShowFranchise(false);
    setShowCategory(false);
    setShowFranchiseStaff(false);
    setShowTask(false);
    setShowProfile(false);
  }

  function handleFranchiseStaffClick(){
    setShowFranchiseStaff(true);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowTask(false);
    setShowProfile(false);
  }
  function handleTaskClick(){
    setShowTask(true);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
  }
  function handleProfileClick(){
    setShowProfile(true);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
  }

  function handleLogout() {
    APP_TOKEN.remove();
    props.history.push('/login');
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
          Welcome {userName}
          </Typography>
          <Typography variant="h6" className={classes.title} noWrap>
          Welcome To Rental Solutions
          </Typography>
          {/* <Button color="inherit" className={classes.fonttransform} onClick={handleLogout}>
          Logout
          </Button>
          
          </Button> */}
      <div>
        <Button
          ref={anchorRef}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          onClick={handleToggleMenu} className={classes.menu}
        >
         Settings
        </Button>
        <Popper open={menuOpen} anchorEl={anchorRef.current} keepMounted transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleCloseMenu}>
                  <MenuList>
                    <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Change Password</MenuItem>
                    <MenuItem  onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
        </Toolbar>
      </AppBar>


      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
        {console.log(roleName)}
          {roleName === 'Super Admin' 
            && (<List>
              {/* <Link to="auth/franchise"> */}
                <ListItem button key="ManageFranchise" onClick={handleFranchiseClick}>
                  <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                  <ListItemText primary="Manage Franchise" />
                </ListItem>
              {/* </Link> */}
              {/* code by Bhagyashree starts from here
              Category is added to menu */}
              {/* <Link to="category"> */}
                <ListItem button key="ManageCategory"  onClick={handleCategoryClick}>
                  <ListItemIcon><PeopleIcon /> </ListItemIcon>
                  <ListItemText primary="Manage Products Catalogue" />
                </ListItem>
                
                {/* code by Bhagyashree ends here */}
              {/* </Link> */}
                <ListItem button key="ManageStaff" onClick={handleMasterStaffClick}>
                  <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                  <ListItemText primary="Manage Staff" />
                </ListItem>
            </List>
            )}
            </List>
             <List>
               
              {roleName === 'Admin' && (
              <List>
                <ListItem button key="ManageFranchise"  onClick={handleFranchiseStaffClick}>
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Staff" />
                </ListItem>
                <ListItem button key="ManageTask"  onClick={handleTaskClick}>
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Task" />
                </ListItem>
              </List>
              )}
            </List>
        {/* <Divider /> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          showFranchise ? <Franchise /> : null
        }

        {
          showCategory ? <Category /> : null
        }
        {
          showMasterStaff ? <Staff /> : null
        }
        {
          showFranchiseStaff ? <FranchiseStaff  franchiseId={franchiseId}/> : null
        }
        {
          showTask ? <Task franchiseId={franchiseId} /> : null
        }
        {
          showProfile ? <Profile /> : null
        }
        {/* {props.children} */}
      </main>


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Frenchise Created successfully with Admin User!"
        />
      </Snackbar>
    </div>
  );
}
