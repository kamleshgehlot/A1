import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function ConfirmationDialog({open, handleConfirmationClose, title, content}){
//  function handleDialogClose(){
  //  console.log(event);
//   handleConfirmationClose('0');
//  }
//  function handleDialogConfirm(){
//   // console.log(event);
//  handleConfirmationClose('4');
// }
 
  return(
   <div>
    <Dialog
        maxHeight= "lg"
        open={open}
        onClose={handleConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{content}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button name="close" onClick={handleConfirmationClose} color="primary">
            No
          </Button>
          <Button name="comfirm" onClick={handleConfirmationClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  </div>
 )
}