import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
// Helpers
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import UserAPI from '../../../api/User'

import Add from '../franchise/Add';
import StaffAdd from '../franchise/StaffAdd';

import MuiVirtualizedTable from '../../common/MuiVirtualizedTable'

import { store, useStore } from '../../../store/hookStore';

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
}));

export default function ClippedDrawer(props) {
console.log("props...................", props);
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

  const [open, setOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);


  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseList, setFranchiseList] = useStore();


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await UserAPI.list();
        setFranchiseList(result.userList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
///////////////////////////////////////

  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickStaffOpen() {
    setStaffOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setStaffOpen(false);
  }

  function handleFranchiseClick() {
    setShowFranchise(true);
    setShowStaff(false);
  }

  function handleStaffClick() {
    setShowFranchise(false);
    setShowStaff(true);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  function handleLogout() {
    APP_TOKEN.remove();
    props.history.push('/login');
  }
console.log("....... roles", roleName);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Rentronics
          </Typography>
          <Typography variant="h6" className={classes.title} noWrap>
              Welcome {userName}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
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
            {roleName === 'Super Admin' && <ListItem button key='ManagewStaff' onClick={handleFranchiseClick}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary='Manage Franchise' />
            </ListItem>
            }
            {roleName === 'Admin' && <ListItem button key='Manage Staff' onClick={handleStaffClick}>
             <ListItemIcon><PeopleIcon /></ListItemIcon>
             <ListItemText primary='Manage Staff' />
           </ListItem>
            }
        </List>
        {/* <Divider /> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {showFranchise ? 
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Fab
                  variant="extended"
                  size="small"
                  color="primary"
                  aria-label="Add"
                  className={classes.margin}
                  onClick={handleClickOpen}
                >
                  <AddIcon className={classes.extendedIcon} />
                  Franchise
                </Fab>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: 400, width: '100%' }}>
                  <MuiVirtualizedTable
                    rowCount={franchiseList.length ? franchiseList.length : 0}
                    rowGetter={({ index }) => franchiseList[index]}
                    columns={[
                      {
                        width: 200,
                        label: 'Name',
                        dataKey: 'name',
                      },
                      {
                        width: 120,
                        label: 'Location',
                        dataKey: 'location',
                        numeric: true,
                      },
                      {
                        width: 120,
                        label: 'Contact',
                        dataKey: 'contact',
                        numeric: true,
                      },
                      {
                        width: 120,
                        label: 'abn',
                        dataKey: 'abn',
                        numeric: true,
                      }
                    ]}
                  />
                </Paper>
              </Grid>
            </Grid>
            : null}
            {showStaff ?
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Fab
                  variant="extended"
                  size="small"
                  color="primary"
                  aria-label="Add"
                  className={classes.margin}
                  onClick={handleClickStaffOpen}
                >
                  <AddIcon className={classes.extendedIcon} />
                  Staff
                </Fab>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: 400, width: '100%' }}>
                  <MuiVirtualizedTable
                    rowCount={franchiseList.length ? franchiseList.length : 0}
                    rowGetter={({ index }) => franchiseList[index]}
                    columns={[
                      {
                        width: 200,
                        label: 'Name',
                        dataKey: 'name',
                      },
                      {
                        width: 120,
                        label: 'Location',
                        dataKey: 'location',
                        numeric: true,
                      },
                      {
                        width: 120,
                        label: 'Contact',
                        dataKey: 'contact',
                        numeric: true,
                      },
                      {
                        width: 120,
                        label: 'abn',
                        dataKey: 'abn',
                        numeric: true,
                      }
                    ]}
                  />
                </Paper>
              </Grid>
            </Grid> : null
          }
      </main>
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}/>

      <StaffAdd open={staffOpen} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}/>

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
