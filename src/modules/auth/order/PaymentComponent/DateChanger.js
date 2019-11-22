import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import addSubtractDate from 'add-subtract-date';
import Fab from '@material-ui/core/Fab';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from '../../../common/StyleComman'; 
import { getDate, getCurrentDate, getCurrentDateDDMMYYYY, getDateInDDMMYYYY, setDBDateFormat, subtractOneDay, addOneDay } from '../../../../utils/datetime';

// API CALL



const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  closeIcon: { marginTop:theme.spacing(-3) },  
}));



export default function DateChanger({open, handleClose, paymentData, orderData}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [ploading, setpLoading] = React.useState(false);
  const [errors, setErrors] = useState();
  const [payDate, setPayDate] = useState(setDBDateFormat(paymentData.payment_date));
  const [date, setDate] = useState(paymentData.payment_date);
  
  
  const submitForm = async () => {
      let check=false;
      if (payDate == "") {
        setErrors('Date is required');
        check=true;
      } else{
        setErrors('');
      }
      if(check===false){
          setpLoading(true);
          // const response = await Brand.addbrand({ brand_name: inputs.brand_name, });
          handleClose(false);
        }
  };
  const handleDateIncrease = () => {
    setPayDate(addOneDay(payDate));
    // setDate(getDateInDDMMYYYY(payDate));
  }

  const handleDateDecrease = () => {
    setPayDate(subtractOneDay(payDate));
    // setDate(getDateInDDMMYYYY(payDate));
  }


  return (
    <div>
      <Dialog maxWidth="sm" open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>             
            <Typography variant="h6" className={classes.title}>
              Update Payment Schedule
            </Typography>              
          <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
            <Paper className={classes.paper}> 
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                  <Fab variant="contained" color="primary" onClick={handleDateDecrease} className={classes.button}> - </Fab>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                      style= {{fontSize : 15, fontWeight : "bold"}}                                         
                      id="date_changer"
                      name="date_changer"
                      value={payDate}                      
                      fullWidth
                      margin="dense"                      
                      disabled
                      error={errors}
                      helperText = {errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Fab variant="contained" color="primary" onClick={handleDateIncrease} className={classes.button}> + </Fab> 
                  </Grid>
                  <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" onClick={submitForm} className={classes.button}> Update </Button>
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}> Close </Button>                   
                  </Grid>
                
              </Grid>
              </Paper>
          </div>
      </Dialog>
    </div>
  );
}
