import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/More';
import DetailsIcon from '@material-ui/icons/Details';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';



// Components
import useSignUpForm from '../../franchise/CustomHooks';
import {getDate, getCurrentDate} from '../../../../utils/datetime';
import {useCommonStyles} from '../../../common/StyleComman';
// import validate from '../../common/validation/BankDetailRules';

const RESET_VALUES = {
 
};

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
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  group: {
    // margin: theme.spacing(1, 0),
    fontSize: theme.typography.pxToRem(12),
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
    // fontSize: '10px',
    marginRight:theme.spacing(-4),
  },
  dobMsg : {
    marginTop : theme.spacing(-1),
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function WithCustomer({ open, handleClose }) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);

 const { inputs, handleInputChange, handleNumberInput, handleRandomInput, handlePriceInput, handleSubmit, handleReset, setInput,errors } = useSignUpForm(
    bankDetailArray == "" ?  RESET_VALUES : bankDetailArray,
    detailSubmit,
    validate
  );
  

return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      </Paper>
    </div>
  );
}
