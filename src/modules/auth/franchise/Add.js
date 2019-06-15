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
import UserAPI from '../../../api/User'

import useSignUpForm from './CustomHooks';

import { store, useStore } from '../../../store/hookStore';

export default function Add({open, handleClose, handleSnackbarClick}) {

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
      role_id: 2
    });

    handleSnackbarClick(true);
    setFranchiseList(response.userList);
    handleClose(false);
  }

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm({name: '', location: '', contact: '', abn: '', user_name: '', user_id: '', password: ''}, signup);

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
              onChange={handleInputChange} value={inputs.name} required
              fullWidth
            />
            <TextField
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              onChange={handleInputChange} value={inputs.location} required
              fullWidth
            />
            <TextField
              margin="dense"
              id="contact"
              name="contact"
              label="Contact"
              type="text"
              onChange={handleInputChange} value={inputs.contact} required
              fullWidth
            />
            <TextField
              margin="dense"
              id="abn"
              name="abn"
              label="ABN"
              type="text"
              onChange={handleInputChange} value={inputs.abn} required
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
              onChange={handleInputChange} value={inputs.user_name} required
              fullWidth
            />
            <TextField
              margin="dense"
              id="user_id"
              name="user_id"
              label="User Id"
              type="text"
              onChange={handleInputChange} value={inputs.user_id} required
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="text"
              onChange={handleInputChange} value={inputs.password} required
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
