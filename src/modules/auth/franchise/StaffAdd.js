import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import CheckboxList from '../../common/CheckboxList';

// API CALL
import UserAPI from '../../../api/franchise/User'
import { APP_TOKEN } from '../../../api/Constants';

import useSignUpForm from '../franchise/CustomHooks';

import { store, useStore } from '../../../store/hookStore';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const RESET_VALUES = {name: '', location: '', contact: '', abn: '', user_name: '', user_id: '', password: ''};

export default function Add({open, handleClose, handleSnackbarClick}) {
  const classes = useStyles();
  let userName = APP_TOKEN.get().userName;

  const [franchiseList, setFranchiseList] = useStore();
  const [roles, setRoles] = useStore();

  const signup = async () => {
    const response = await UserAPI.add({
      // cancelToken: this.isTokenSource.token,
      name: inputs.name,
      location: inputs.location,
      contact: inputs.contact,
      abn: inputs.abn,
      user_name: inputs.user_name,
      user_id: inputs.user_id,
      password: inputs.password,
      name: inputs.name,
      role_id: 3,
      roles: roles
    });

    handleSnackbarClick(true);
    setFranchiseList(response.userList);
    handleReset(RESET_VALUES);

    handleClose(false);
  };

  function validate(values) {
    let errors = {};

    return errors;

  };

  const {inputs, handleInputChange, handleSubmit, handleReset, setInput} = useSignUpForm(RESET_VALUES, signup, validate);

  function callback(roles) {
    setRoles(roles);
  }

  function handleNameBlurChange(e) {
    if(userName.split(' ').length > 1) {
      userName = userName.split(' ')[1].toLowerCase();
    }

    setInput('user_id', inputs.name.substring(0, 4).toLowerCase() + '_' + userName.substring(0, 4).toLowerCase());
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add Franchise Staff</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              onChange={handleInputChange} 
              value={inputs.name} 
              required
              onBlur={handleNameBlurChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              onChange={handleInputChange}
              value={inputs.location}
              required
              fullWidth
            />

            <DialogTitle id="form-dialog-title">User Credentials</DialogTitle>

            <Divider />
            <TextField
              margin="dense"
              id="user_id"
              name="user_id"
              label="User Id"
              type="text"
              value={inputs.user_id} 
              required
              fullWidth
              readOnly
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="text"
              onChange={handleInputChange}
              value={inputs.password}
              required
              fullWidth
            />
            <DialogTitle id="form-dialog-title">Roles</DialogTitle>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              className={classes.root}
            >
              <Grid item>
                <CheckboxList items={['CSR', 'Finance', 'Delivery', 'HR']} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
              Add
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancle
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
