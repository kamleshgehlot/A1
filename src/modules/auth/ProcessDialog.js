import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';


// const useStyles = makeStyles(theme => ({
//   textsize:{
//     fontSize: theme.typography.pxToRem(13),
//   },
// }));

const useStyles = makeStyles(theme => ({
  progress: {
    display: 'block',    
    backgroundColor: "transparent",   
  },
  loading:{
    alignItems: 'center',    
    justifyContent: 'center',
    minWidth: '50px',    
    minHeight :'50px',
    backgroundColor:  "transparent",
    boxShadow: 'none',
  },
  circular:{
    backgroundColor: "transparent",
    boxShadow: 'none', 
    alignItems: 'center',    
    justifyContent: 'center',
  }
}));

export default function ProcessDialog({open, handleProcessDialogClose}){
  
  const classes = useStyles();
  return(
    
   <div>
    <Dialog  open={open} className={classes.progress}>
        <Grid container>
          <Grid item xs={12} sm={12} className={classes.loading} >
            <CircularProgress className={classes.circular}/>
          </Grid>
        </Grid>
      </Dialog>
  </div>
 )
}