import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Add from '../franchise/Add';
import StaffAdd from '../franchise/StaffAdd';
import UserList from '../layout/franchise/UserList';

import { store, useStore } from '../../../store/hookStore';

import { APP_TOKEN } from '../../../api/Constants';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import MuiVirtualizedTable from '../../common/MuiVirtualizedTable';
import Grid from '@material-ui/core/Grid';

export default function Franchise(props) {
  const [open, setOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');

  const [franchiseList, setFranchiseList] = useStore();

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
  const classes = useStyles();
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
  }, [setFranchiseList]);
  // /////////////////////////////////////
  function handleFranchiseClick() {
    setShowFranchise(true);
    setShowStaff(false);
  }

  function handleStaffClick() {
    setShowFranchise(false);
    setShowStaff(true);
  }

  function handleClickStaffOpen() {
    setStaffOpen(true);
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

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  return (
    <div>
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
                  },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      
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
              <UserList />
            </Paper>
          </Grid>
        </Grid>
      

      <StaffAdd
        open={staffOpen}
        handleClose={handleClose}
        handleSnackbarClick={handleSnackbarClick}
      />
    </div>
  );
}
