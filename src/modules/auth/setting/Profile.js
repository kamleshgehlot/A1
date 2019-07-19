import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import BusinessIcon from '@material-ui/icons/Business';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

// API CALL
import ProfileAPI from '../../../api/Profile';
export default function Profile() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [profileList, setProfileList] = useState({});

  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;
  const uid = APP_TOKEN.get().userId;
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
      padding: theme.spacing(5),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    fonttransform:{
      textTransform:"initial"
    },
    typography:{
      paddingTop: theme.spacing(3),
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await ProfileAPI.info();
        setProfileList(result.profile[0] || {});
        console.log('profile------',result.profile[0]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>
        {profileList.role===2 || profileList.role==null?
            <Paper className={classes.paper} style={{ width: '100%' }}>
              <Typography variant="h4" className={classes.title}>
                {profileList.director}
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <StoreIcon /> {profileList.fname} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <BusinessIcon /> {profileList.name} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <LocationCityIcon /> {profileList.location} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <DescriptionIcon /> {profileList.nbzn} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <EmailIcon /> {profileList.email} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <CallIcon /> {profileList.contact} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <CallIcon /> {profileList.alt_contact===null? 'Not Available':profileList.alt_contact} <br/>
              </Typography>
            </Paper>:
            <Paper className={classes.paper} style={{ width: '100%' }}>
              <Typography variant="h4" className={classes.title}>
                  {profileList.first_name + ' ' + profileList.last_name} 
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <AccountCircleIcon /> {profileList.user_id} <br/>
              </Typography>
              {/* <Typography  variant="h6" className={classes.typography}>
                <StoreIcon /> {profileList.fname} <br/>
              </Typography> */}
              <Typography  variant="h6" className={classes.typography}>
                <LocationCityIcon /> {profileList.location} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <EmailIcon /> {profileList.email} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <CallIcon /> {profileList.contact} <br/>
              </Typography>
          </Paper>
        }
      </Grid>
    </div>
  );
}
