import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';

// API CALL
import PasswordAPI from '../../../api/setting/Password';
import useSignUpForm from '../franchise/CustomHooks';
export default function ChangePassword(franchiseId) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  
  function validate(values) {
    let errors = {};

    return errors;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await PasswordAPI.pwd();
        setInput('current_password', result.password);
        document.getElementById('new_password').focus();
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

const RESET_VALUES = {
  current_password:'',
  new_password:'',
  confirm_password:'',
};

  const passwordAdd = async () => {
    const response = await PasswordAPI.change({
      current_password: inputs.current_password,
      new_password: inputs.new_password,
      franchise_id: franchiseId,
    });
    setSnackbarOpen(true);
    setInput('current_password', response.password);
    setSnackbarOpen(true); 
  };

  const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    passwordAdd,
    validate
  );

  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>
        <Paper className={classes.paper} style={{ width: '50%' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" className={classes.title}>
                Change Password 
            </Typography>
            <Grid item xs={12} sm={6}>
                <TextField
                  id="current_password"
                  name="current_password"
                  label="Current Password"
                  value={inputs.current_password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  type="text"
                  // placeholder="Franchise Name"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <InputLabel htmlFor="new_password">User Id</InputLabel> */}
                <TextField
                  margin="dense"
                  id="new_password"
                  name="new_password"
                  label="New Password"
                  type="text"
                  value={inputs.new_password} 
                  onChange={handleInputChange}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <InputLabel htmlFor="location">Location *</InputLabel> */}
                <TextField
                  margin="dense"
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirm Password"
                  type="text"
                  value={inputs.confirm_password}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" className={classes.button}  type="submit">
                  Change
                </Button>
              </Grid>
            </form>
        </Paper>
      </Grid>
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
          message="Password Changed successfully!"
        />
      </Snackbar>
    </div>
  );
}
