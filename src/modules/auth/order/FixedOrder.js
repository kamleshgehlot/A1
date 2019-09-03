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
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';
import validate from '../../common/validation/FixedOrderValidation';

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
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    marginTop: 15,
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
  subTitle:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Budget({ open, handleFixedClose, setFixedOrderList, fixedOrderList}) {

  const classes = useStyles();
  // const [inputs,setInputs] = useState(fixedOrderList);
  // const [firstPaymentDate,setFirstPaymentDate] = useState('');
  // const [lastPaymentDate,setLastPaymentDate] = useState('');
  // const [expectedDeliveryDate,setExpectedDeliveryDate] = useState('');
  // const [deliveryTime, setDeliveryTime] = useState('');

  // function handleInputBlur(e){
  //   // if(e.target.value===''){
  //   //   setInputs({
  //   //     ...inputs,
  //   //     [e.target.name]: 0,
  //   //   });
  //   // }
  // }

  // function handleInputFocus(e){
  //   // if(e.target.value==='0'){
  //   //   setInputs({
  //   //     ...inputs,
  //   //     [e.target.name]: '',
  //   //   });
  //   // }
  // }
  
  // function handleInputChange(e){
  //   // console.log('valueee',e.target.value)
  //   // if(e.target.value===""){
  //     // setInputs({
  //     //   ...inputs,
  //     //   [e.target.name]: 0,
  //     // });
  //   // }
  //   // else{
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // // }

  // }
  function fixed(e){
    // e.preventDefault();   

    let hour = inputs.delivery_time.getHours();
    let minute = inputs.delivery_time.getMinutes();
    if(hour < 10){   hour = '0' + hour.toString(); }
    if(minute < 10){ minute = '0' + minute.toString(); }    

    let deliveryDateTime = inputs.exp_delivery_at +  'T' + hour + ':' + minute;

    const data = {
      int_unpaid_bal  : parseFloat(inputs.int_unpaid_bal),
      cash_price : parseFloat(inputs.cash_price),
      delivery_fee : parseFloat(inputs.delivery_fee),
      ppsr_fee : parseFloat(inputs.ppsr_fee),
      frequency : inputs.frequency,
      first_payment : inputs.first_payment,
      last_payment : inputs.last_payment,
      no_of_payment : parseFloat(inputs.no_of_payment),
      each_payment_amt : parseFloat(inputs.each_payment_amt),
      total_payment_amt : parseFloat(inputs.total_payment_amt),
      before_delivery_amt : parseFloat(inputs.before_delivery_amt),
      exp_delivery_at : deliveryDateTime,
      minimum_payment_amt : parseFloat(inputs.minimum_payment_amt),
      intrest_rate : parseFloat(inputs.intrest_rate),
      intrest_rate_per : parseFloat(inputs.intrest_rate_per),
      total_intrest : parseFloat(inputs.total_intrest),
    }
    setFixedOrderList(data);
    handleFixedClose(false)
  }

  // useEffect(() => {
  //   if(inputs.length ===0){
  //   inputs.int_unpaid_bal = 0;
  //   inputs.cash_price= 0;
  //   inputs.delivery_fee= 0;
  //   inputs.ppsr_fee= 0;
  //   inputs.no_of_payment= 0;
  //   inputs.each_payment_amt= 0;
  //   inputs.total_payment_amt= 0;
  //   inputs.before_delivery_amt= 0;
  //   inputs.frequency = 0;
  //   // inputs.exp_delivery_at;
  //   inputs.minimum_payment_amt= 0;
  //   inputs.intrest_rate= 0;
  //   inputs.intrest_rate_per= 0;
  //   inputs.total_intrest= 0;
  //   }
  // }, []);

  
  // function pastDate(){
  //   var dtToday = new Date();
  //   var month = dtToday.getMonth() + 1;
  //   var day = dtToday.getDate();
  //   var year = dtToday.getFullYear();
  //   if(month < 10){
  //       month = '0' + month.toString();
  //     }
  //   if(day < 10){
  //       day = '0' + day.toString();
  //     }
  //       var maxDate = year + '-' + month + '-' + day;
  //       document.getElementById('first_payment').setAttribute('min', maxDate);
  //       // setFirstPaymentDate(maxDate.toString());
  // }
  const setDateFormat = (date) => {
    let date1 = new Date(date);
    let yy = date1.getFullYear();
    let mm = date1.getMonth() + 1 ;
    let dd = date1.getDate();
    if(mm< 10){ mm = '0' + mm.toString()}
    if(dd< 10){ dd = '0' + dd.toString()}
    let fullDate = yy+ '-'+mm+'-'+dd;
    return fullDate;
  }

  function handleDateChange(date){
    // let fulldate = setDateFormat(date);
    // let fullDate = yy+ '-'+mm+'-'+dd;
    handleInputChange({target:{name: 'first_payment', value: setDateFormat(date)}})
  }

  function handleLastDate(date){
    // let fulldate = setDateFormat(date);
    handleInputChange({target:{name: 'last_payment', value: setDateFormat(date)}})
  }

  function handleDeliveryDate(date){
    // let fulldate = setDateFormat(date);
    handleInputChange({target:{name: 'exp_delivery_at', value: setDateFormat(date)}})
  }

  function handleDeliveryTime(time){      
    handleInputChange({target:{name: 'delivery_time', value: time}})
    // setDeliveryTime(time)    
  }
  

  // function pastDateDisabled(){
  //   var dtToday = new Date();
  //   var month = dtToday.getMonth() + 1;
  //   var day = dtToday.getDate();
  //   var year = dtToday.getFullYear();
  //   if(month < 10){
  //       month = '0' + month.toString();
  //     }
  //   if(day < 10){
  //       day = '0' + day.toString();
  //     }
  //       var maxDate = year + '-' + month + '-' + day;
  //       document.getElementById('last_payment').setAttribute('min', maxDate);
  //       // setLastPaymentDate(maxDate.toString());
  // }

  // function pastDateDisabled2(){
  //   var dtToday = new Date();
  //   var month = dtToday.getMonth() + 1;
  //   var day = dtToday.getDate();
  //   var year = dtToday.getFullYear();
  //   var hour = dtToday.getHours();
  //   var minute = dtToday.getMinutes();
  //   if(month < 10){
  //       month = '0' + month.toString();
  //     }
  //   if(day < 10){
  //       day = '0' + day.toString();
  //     }
  //   if(hour < 10){
  //     hour = '0' + hour.toString();
  //   }
  //   if(minute < 10){
  //     minute = '0' + minute.toString();
  //   }
  //       var maxDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
  //       document.getElementById('exp_delivery_at').setAttribute('min', maxDateTime);
  //       // setExpectedDeliveryDate(maxDateTime.toString());
  // }

  // useEffect(() => {
  //   var dtToday = new Date();
  //   var month = dtToday.getMonth() + 1;
  //   var day = dtToday.getDate();
  //   var year = dtToday.getFullYear();
  //   var hour = dtToday.getHours();
  //   var minute = dtToday.getMinutes();
  //   if(month < 10){
  //       month = '0' + month.toString();
  //     }
  //   if(day < 10){
  //       day = '0' + day.toString();
  //     }
  //   if(hour < 10){
  //     hour = '0' + hour.toString();
  //   }
  //   if(minute < 10){
  //     minute = '0' + minute.toString();
  //   }
  //       var maxDate = year + '-' + month + '-' + day;
  //       var maxDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
  //       console.log('data',fixedOrderList);
  //       if(fixedOrderList.exp_delivery_at!=''){
  //         setExpectedDeliveryDate(fixedOrderList.exp_delivery_at);
  //       }else{
  //         setExpectedDeliveryDate(maxDateTime.toString());
  //       }
  //       if(fixedOrderList.first_payment!=''){
  //         setFirstPaymentDate(fixedOrderList.first_payment);
  //       }else{
  //         setFirstPaymentDate(maxDate.toString());
  //       }
  //       if(fixedOrderList.last_payment!=''){
  //         setLastPaymentDate(fixedOrderList.last_payment);
  //       }else{        
  //       setLastPaymentDate(maxDate.toString());
  //       }
  // }, []);
  
  
  // function handleFirstPaymentDate(e){
  //   setFirstPaymentDate(e.target.value);
  // }
  // function handleLastPaymentDate(e){
  //   setLastPaymentDate(e.target.value);
  // }
  // function handleExpectedDeliveryDate(e){
  //   // console.log('ddd',e.target.value);
  //   setExpectedDeliveryDate(e.target.value);
  // }
  const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    fixed,
    validate
  );
return (
    <div>
      <Dialog maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleFixedClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Fixed Order
              </Typography>
              {/* <Button color="inherit" type="submit">
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                Credit Details
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                     
                      id="int_unpaid_bal"
                      name="int_unpaid_bal"
                      label="Intial Unpaid Balance"
                      value={inputs.int_unpaid_bal}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      error={errors.int_unpaid_bal}
                      helperText={errors.int_unpaid_bal}
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="cash_price"
                      name="cash_price"
                      label="Cash Price"
                      value={inputs.cash_price}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.cash_price}
                      helperText={errors.cash_price}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="delivery_fee"
                      name="delivery_fee"
                      label="Delivery Fee"
                      value={inputs.delivery_fee}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.delivery_fee}
                      helperText={errors.delivery_fee}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="ppsr_fee"
                      name="ppsr_fee"
                      label="PPSR Fee"
                      value={inputs.ppsr_fee}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.ppsr_fee}
                      helperText={errors.ppsr_fee}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                Payments 
              </Typography>
                  <Typography  className={classes.subTitle}>
                    Timing of Payments
                  </Typography>
              </Grid>
                  <Grid item xs={12} sm={4}>              
                  <Typography  className={classes.subTitle}>
                    Frequency
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="frequency"
                      name="frequency"
                      // label="Frequency"
                      value={inputs.frequency}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.frequency}
                      helperText={errors.frequency}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      
                    />
                    </Grid>
                    
                  <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    First Payment Date
                  </Typography>
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        id="first_payment"
                        name="first_payment"
                        format="dd/MM/yyyy"
                        disablePast = {true}
                        // defaultValue = {new Date()}
                        defaultValue = {""}
                        value={inputs.first_payment}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
                        error={errors.first_payment}
                        helperText={errors.first_payment}                               
                      />
                    </MuiPickersUtilsProvider>
                     {/* <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="first_payment"
                      name="first_payment"
                      // label="First Payment"
                      onChange={handleFirstPaymentDate}
                      onFocus={pastDate}
                      value={firstPaymentDate}
                      defaultValue= {firstPaymentDate}
                      fullWidth
                      // required
                      type="date"
                      // placeholder="Franchise Name"
                      margin="dense"
                    /> */}
                    </Grid>
                    
                  <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Last Payment Date
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        id="last_payment"
                        name="last_payment"
                        format="dd/MM/yyyy"
                        disablePast = {true}
                        defaultValue = {""}
                        // defaultValue = {new Date()}
                        value={inputs.last_payment}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleLastDate}
                        error={errors.last_payment}
                        helperText={errors.last_payment}                               
                      />
                    </MuiPickersUtilsProvider>
                    {/* <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="last_payment"
                      name="last_payment"
                      // label="Last Payment"
                      onFocus={pastDateDisabled}
                      value={lastPaymentDate}
                      defaultValue= {lastPaymentDate}
                      onChange={handleLastPaymentDate}
                      fullWidth
                      // required
                      type="date"
                      // placeholder="Franchise Name"
                      margin="dense"
                    /> */}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                      Number of Payments 
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="no_of_payment"
                      name="no_of_payment"
                      // label="no_of_payment/Mortgage"
                      value={inputs.no_of_payment}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      error={errors.no_of_payment}
                      helperText={errors.no_of_payment}
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      // InputProps={{
                      //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      // }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Amount of Each Payments
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="each_payment_amt"
                      name="each_payment_amt"
                      // label="each_payment_amt/Mortgage"
                      value={inputs.each_payment_amt}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.each_payment_amt}
                      helperText={errors.each_payment_amt}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                      Total Amount of Payments
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="total_payment_amt"
                      name="total_payment_amt"
                      // label="total_payment_amt/Mortgage"
                      value={inputs.total_payment_amt}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.total_payment_amt}
                      helperText={errors.total_payment_amt}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                     
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <Typography  className={classes.subTitle}>
                      Minimun Number of Payments before delivery
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="before_delivery_amt"
                      name="before_delivery_amt"
                      // label="before_delivery_amt/Mortgage"
                      value={inputs.before_delivery_amt}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.before_delivery_amt}
                      helperText={errors.before_delivery_amt}
                      
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"                      
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Minimum Payment Amt
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="minimum_payment_amt"
                      name="minimum_payment_amt"
                      // label="minimum_payment_amt/Mortgage"
                      value={inputs.minimum_payment_amt}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.minimum_payment_amt}
                      helperText={errors.minimum_payment_amt}
                      
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                   Expected Delivery Date
                  </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
                          id="exp_delivery_at"
                          name="exp_delivery_at"
                          format="dd/MM/yyyy"
                          disablePast = {true}
                          defaultValue = {""}
                          value={inputs.exp_delivery_at}
                          // fullWidth 
                          // type="datetime-local"
                          InputProps={{
                            classes: {
                              input: classes.textsize,
                            },
                          }}
                          onChange={handleDeliveryDate}
                          error={errors.exp_delivery_at}
                          helperText={errors.exp_delivery_at}                               
                        />
                        </MuiPickersUtilsProvider>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>

                            <Typography  className={classes.subTitle}>
                              Expected Delivery Time
                            </Typography>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            margin="dense"
                            id="delivery_time"
                            name="delivery_time"
                            // label="Time picker" 
                            defaultValue = {""}
                            value={inputs.delivery_time}
                            onChange={handleDeliveryTime}
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            error={errors.delivery_time}
                            helperText={errors.delivery_time}
                            // KeyboardButtonProps={{
                            //   'aria-label': 'change time',
                            // }}
                          />
                      </MuiPickersUtilsProvider>
                      
                    
                    {/* <TextField
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        id="exp_delivery_at"
                        name="exp_delivery_at"
                        value={expectedDeliveryDate}
                        onChange={handleExpectedDeliveryDate}
                        // onFocus={pastDateDisabled2}
                        fullWidth
                        type="datetime-local"
                        defaultValue={expectedDeliveryDate}
                        margin="dense"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> */}
                </Grid>
                {console.log(inputs)}
                
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" className={classes.labelTitle}>
                    Interest
                  </Typography>
              </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography  className={classes.subTitle}>
                    Annual Interest Rates
                  </Typography>
                  
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="intrest_rate"
                      name="intrest_rate"
                      label="Weeks"
                      value={inputs.intrest_rate}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.intrest_rate}
                      helperText={errors.intrest_rate}
                      
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      // InputProps={{
                      //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      // }}
                    />
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="intrest_rate_per"
                      name="intrest_rate_per"
                      label="Daily interest rates of (in %)"
                      value={inputs.intrest_rate_per}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.intrest_rate_per}
                      helperText={errors.intrest_rate_per}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      // InputProps={{
                      //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      // }}
                    />
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography  className={classes.subTitle}>
                    Total Interest Charges
                  </Typography>
                  
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="total_intrest"
                      name="total_intrest"
                      // label=""
                      value={inputs.total_intrest}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.total_intrest}
                      helperText={errors.total_intrest}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
                      save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleFixedClose} className={classes.button}>
                      Close
                    </Button> 
                  </Grid>
              </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
