import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {useCommonStyles} from '../common/StyleComman'; 


export default function CommentDialog({open, handleCommentBoxClose}){
  const styleClass = useCommonStyles();   
  const [comment, setComment] = useState('');

  function handleCommentChange(e){
    setComment(e.target.value)
  }

  return(
   <div>     
  <Dialog open={open}  >
      <DialogTitle id="form-dialog-title">Comment Box</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you have something to give info about order then you can post a comment.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Write a Comment"
            type="text"
            fullWidth
            required
            onChange = {handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={""} color="primary" > Post Comment </Button>
          <Button onClick={handleCommentBoxClose} color="primary" > Close </Button>
        </DialogActions>
      </Dialog>
      {/* className={styleClass.commentBoxButton} */}    
  </div>
 )
}