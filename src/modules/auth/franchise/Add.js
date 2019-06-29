import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// API CALL
import UserAPI from '../../../api/User';

import useSignUpForm from './CustomHooks';

import { store, useStore } from '../../../store/hookStore';

const RESET_VALUES = {
  name: '',
  location: '',
  contact: '',
  abn: '',
  user_name: '',
  user_id: '',
  password: '',
};

export default function Add({ open, handleClose, handleSnackbarClick }) {
  const [franchiseList, setFranchiseList] = useStore();

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
      role_id: 2,
    });

    handleSnackbarClick(true);
    setFranchiseList(response.userList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    signup,
  );

  function handleNameBlurChange(e) {
    let value = inputs.name;

    if (value.split(' ').length > 1) {
      value = value.split(' ')[1].toLowerCase();
    }

    // if(value !== '') {
    //   const output = Array.from(value.toLowerCase());

    //   if(output.length > 6) {
    //     setInput('user_id', '_' + output[0] + output[2] + output[4] + output[6]);
    //   } else {
    setInput(
      'user_id',
      `${inputs.user_name.substring(0, 4)}_${value.substring(0, 4).toLowerCase()}`,
    );
    // }
    // }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add Franchise</DialogTitle>
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
              placeholder="ex: Rentronics Hemilton"
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
            <TextField
              margin="dense"
              id="contact"
              name="contact"
              label="Contact"
              type="text"
              onChange={handleInputChange}
              value={inputs.contact}
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="abn"
              name="abn"
              label="ABN"
              type="text"
              onChange={handleInputChange}
              value={inputs.abn}
              required
              fullWidth
            />
            <br />
            <Typography variant="h6" component="h2">
              Owner Details
            </Typography>
            <Divider />
            <TextField
              margin="dense"
              id="user_name"
              name="user_name"
              label="User Name"
              type="text"
              onChange={handleInputChange}
              value={inputs.user_name}
              required
              onBlur={handleNameBlurChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="user_id"
              name="user_id"
              label="User Id"
              type="text"
              onChange={handleInputChange}
              value={inputs.user_id}
              required
              fullWidth
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
