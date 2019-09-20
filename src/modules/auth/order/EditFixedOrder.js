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
import {useCommonStyles} from '../../common/StyleComman'; 


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
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
  subTitle:{
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function EditFixedOrder({ open, handleFixedClose, setFixedOrderList, fixedOrderList, fixedOrderId,  product}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [frequency, setFrequency] = useState(fixedOrderList.frequency);
  const [duration, setDuration] = useState(fixedOrderList.duration);
  const [paymentBeforeDelivery,setPaymentBeforeDelivery] = useState(fixedOrderList.before_delivery_amt);
  const [firstPaymentDate,setFirstPaymentDate] = useState(fixedOrderList.first_payment);
  const [dateArray,setDateArray] = useState([]);


  // function handleInputBlur(e){
  //   if(e.target.value===''){
  //     setInputs({
  //       ...inputs,
  //       [e.target.name]: 0,
  //     });
  //   }
  // }

  // function handleInputFocus(e){
  //   if(e.target.value==='0'){
  //     setInputs({
  //       ...inputs,
  //       [e.target.name]: '',
  //     });
  //   }
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
    handleInputChange({target:{name: 'first_payment', value: setDateFormat(date)}})
    setFirstPaymentDate(date);
  }

  function handleLastDate(date){
    handleInputChange({target:{name: 'last_payment', value: setDateFormat(date)}})
  }

  function handleDeliveryDate(date){
    handleInputChange({target:{name: 'exp_delivery_date', value: setDateFormat(date)}})
  }

  function handleDeliveryTime(time){      
    handleInputChange({target:{name: 'delivery_time', value: time}})
  }
  


  function fixed(e){
    handleFixedClose(false)
    const data = {
      int_unpaid_bal  : parseFloat(inputs.int_unpaid_bal),
      cash_price : parseFloat(inputs.cash_price),
      delivery_fee : parseFloat(inputs.delivery_fee),
      ppsr_fee : parseFloat(inputs.ppsr_fee),
      frequency : inputs.frequency,
      first_payment : inputs.first_payment,
      last_payment : inputs.last_payment,
      duration: inputs.duration,
      no_of_payment : parseFloat(inputs.no_of_payment),
      each_payment_amt : parseFloat(inputs.each_payment_amt),
      total_payment_amt : parseFloat(inputs.total_payment_amt),
      before_delivery_amt : parseFloat(inputs.before_delivery_amt),
      exp_delivery_date : inputs.exp_delivery_date,
      exp_delivery_time : inputs.delivery_time,
      minimum_payment_amt : parseFloat(inputs.minimum_payment_amt),
      interest_rate : parseFloat(inputs.interest_rate),
      interest_rate_per : parseFloat(inputs.interest_rate_per),
      total_interest : parseFloat(inputs.total_interest),
    }
    setFixedOrderList(data);
  }


  
  const handleFrequency = (e) => {
    setFrequency(e.target.value);
    setInput('frequency', e.target.value);
  }
  
  const handleDuration = (e) => {
    setDuration(e.target.value);
    setInput('duration', e.target.value)
  }

  const handleNumberOfPaymentBefDelivery = (e) =>{
    const validNumber = /^[0-9]*$/;
    if (e.target.value === '' || validNumber.test(e.target.value)) {
      let temp = paymentBeforeDelivery;
      setPaymentBeforeDelivery(e.target.value);
      setInput( 'before_delivery_amt' , e.target.value);
      if(e.target.value > inputs.no_of_payment){
        alert('Number of payment before delivery should be less then or equal to total number of payment.');
        setPaymentBeforeDelivery(temp);
        setInput( 'before_delivery_amt' , temp);
      }
    }
  }


  
  
  useEffect(() => {
    if(duration != '' && frequency != '' && firstPaymentDate != ''){
      let paymentDates = [];

      if(frequency == 1){
        let firstPayDate = new Date(firstPaymentDate);
        for(let i=0; i< duration; i++){
          // console.log('date',firstPayDate)
          paymentDates.push(firstPayDate.toString())
          firstPayDate.setMonth(firstPayDate.getMonth() + 1);                   
        }        
      }else if(frequency == 2){
        let date1 = new Date(firstPaymentDate);
        let date2 = new Date(firstPaymentDate);
            date2.setDate(date2.getDate() + 15);
        for(let i=1; i <= (duration * 2); i++){
          if(i%2 != 0){
            // console.log('date 1',date1);
            paymentDates.push(date1.toString())            
          }else if(i%2 == 0){
            // console.log('date 2',date2);
            paymentDates.push(date2.toString())            

            date1.setMonth(date1.getMonth() + 1);
            date2.setMonth(date2.getMonth() + 1);            
          }
        }        
      }else if(frequency == 4){
        let date1 = new Date(firstPaymentDate);
        let date2 = new Date(firstPaymentDate);
        let date3 = new Date(firstPaymentDate);
        let date4 = new Date(firstPaymentDate);
            date2.setDate(date1.getDate() + 7);
            date3.setDate(date3.getDate() + 14);
            date4.setDate(date4.getDate() + 21);
        for(let i=1, j=1; i <= (duration * 4); i++, j++){
          if(j==1){
            // console.log('date 1',date1);
            paymentDates.push(date1.toString())
          }else if (j==2){
            // console.log('date 2',date2);
            paymentDates.push(date2.toString())
          }else if (j==3){
            // console.log('date 3',date3);
            paymentDates.push(date3.toString())
          }else if (j==4){
            // console.log('date 4',date4);
            paymentDates.push(date4.toString())
            j = 0;
          }
          
          if(i%4 == 0){
            date1.setMonth(date1.getMonth() + 1);
            date2.setMonth(date2.getMonth() + 1);            
            date3.setMonth(date3.getMonth() + 1);            
            date4.setMonth(date4.getMonth() + 1);            
          }
        }
      }
      
      // console.log('payment dates',paymentDates);

      setDateArray(paymentDates);      
      handleRandomInput([
        {name: 'last_payment', value: paymentDates[paymentDates.length - 1]},        
      ]);
    }
  },[duration, frequency, firstPaymentDate]);



  // useEffect(() => {
  //     if(firstPaymentDate != '' ){
  //       let year = firstPaymentDate.getFullYear();
  //       let lastPaymentYear = year + (parseInt(duration)/12);
  //       let lastPaymentDate = ((firstPaymentDate.getMonth() + 1) + '-' + firstPaymentDate.getDate() + '-' + lastPaymentYear);
  //       handleRandomInput([
  //         {name: 'last_payment', value: lastPaymentDate},        
  //       ]);       
  //     }
  //   },[firstPaymentDate, duration]);


  useEffect(() => {
    if(paymentBeforeDelivery!= ''){
      handleRandomInput([
        {name: 'minimum_payment_amt', value: (paymentBeforeDelivery * parseFloat(inputs.each_payment_amt))},
        {name: 'exp_delivery_date', value:  dateArray[paymentBeforeDelivery - 1]},
      ]);
    }else{
      handleRandomInput([
        {name: 'minimum_payment_amt', value: ''},
        {name: 'exp_delivery_date', value: ''},
      ]);
    }
  },[paymentBeforeDelivery]);

  
  useEffect(()=>{
      if(frequency != '' && duration != ''){    
        if(frequency == 1){
          let installment = (parseFloat(product.rental) * 4);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment},
            {name: 'no_of_payment', value: duration},
            {name: 'total_payment_amt', value: (installment * duration)},
          ]);
          // setInputsAll(val);
        }else if(frequency == 2){ 
          let installment = (parseFloat(product.rental) * 2);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment},
            {name: 'no_of_payment', value: (duration * 2)},
            {name: 'total_payment_amt', value: (installment * duration)},
          ]);
        }else if(frequency == 4){ 
          let installment = (parseFloat(product.rental));
          handleRandomInput([
            {name: 'each_payment_amt', value: installment},
            {name: 'no_of_payment', value: (duration * 4)},
            {name: 'total_payment_amt', value: (installment * duration)},
          ]);        
        }
      }      
      if(paymentBeforeDelivery > inputs.no_of_payment){
        setPaymentBeforeDelivery('');
        handleRandomInput([
          {name: 'minimum_payment_amt', value: ''},
          {name: 'before_delivery_amt', value: ''},   
          {name: 'exp_delivery_date', value: ''},     
        ]);
        alert('Number of payment before delivery should be less then or equal to total number of payment.');
      }
  },[duration,frequency]);



  const { inputs, handleInputChange, handleRandomInput, handleNumberInput, handlePriceInput, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    fixed,
    validate
  );

  useEffect(() => {
    setInputsAll(fixedOrderList);
  }, []);

  

return (
    <div>
      <Dialog maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>            
              <Typography variant="h6" className={classes.title}>
                Update Fixed Order
              </Typography>              
              <IconButton size="small" onClick={handleFixedClose} className={styleClass.closeIcon}> x </IconButton>
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
                    {/* <InputLabel  className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="int_unpaid_bal"
                      name="int_unpaid_bal"
                      label="Intial Unpaid Balance"
                      value={inputs.int_unpaid_bal}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.int_unpaid_bal}
                      helperText={errors.int_unpaid_bal}
                      fullWidth
                      // required
                      type="text"
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
                    {/* <InputLabel  className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="cash_price"
                      name="cash_price"
                      label="Cash Price"
                      value={inputs.cash_price}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.cash_price}
                      helperText={errors.cash_price}
                      fullWidth
                      // required
                      type="text"
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
                    {/* <InputLabel  className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="delivery_fee"
                      name="delivery_fee"
                      label="Delivery Fee"
                      value={inputs.delivery_fee}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.delivery_fee}
                      helperText={errors.delivery_fee}
                      fullWidth
                      // required
                      type="text"
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
                    {/* <InputLabel  className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="ppsr_fee"
                      name="ppsr_fee"
                      label="PPSR Fee"
                      value={inputs.ppsr_fee}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.ppsr_fee}
                      helperText={errors.ppsr_fee}
                      fullWidth
                      // required
                      type="text"
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
                  <InputLabel className={classes.textsize} htmlFor="frequency">Frequency *</InputLabel>
                    <Select
                      id="frequency"
                      name="frequency"
                      value={inputs.frequency}
                      onChange={handleFrequency}
                      error={errors.frequency}
                      margin='dense'                      
                      helperText={errors.frequency}
                      fullWidth                      
                      className={classes.textsize}
                      required                      
                    > 
                      <MenuItem className={classes.textsize} value="" disabled>Select Option</MenuItem>
                      <MenuItem className={classes.textsize} value="4">Weekly</MenuItem>
                      <MenuItem className={classes.textsize} value="2">Fortnightly</MenuItem>
                      <MenuItem className={classes.textsize} value="1">Monthly</MenuItem>                      
                    </Select>              
                  </Grid>
                    
                  <Grid item xs={12} sm={4}>    
                
                <InputLabel className={classes.textsize} htmlFor="duration">Duration *</InputLabel>
                  <Select
                    id="duration"
                    name="duration"
                    value={inputs.duration}
                    onChange={handleDuration}
                    error={errors.duration}
                    margin='dense'                      
                    helperText={errors.duration}
                    fullWidth                      
                    className={classes.textsize}
                    required                      
                  > 
                    <MenuItem className={classes.textsize} value="" disabled>Select Option</MenuItem>
                    <MenuItem className={classes.textsize} value="12">1 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="24">2 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="36">3 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="48">4 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="60">5 Year</MenuItem>                      
                  </Select>                          
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
                        // error={errors.first_payment}
                        // helperText={errors.first_payment}                               
                      />
                    </MuiPickersUtilsProvider>
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
                            error={errors.last_payment}
                            helperText={errors.last_payment} 
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            onChange={handleLastDate}
                            disabled
                            // error={errors.last_payment}
                            // helperText={errors.last_payment}                               
                          />
                        </MuiPickersUtilsProvider>
                  </Grid>
                 
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                      Number of Payments 
                  </Typography>
                  <TextField
                      id="no_of_payment"
                      name="no_of_payment"
                      // label="no_of_payment/Mortgage"
                      value={inputs.no_of_payment}
                      onChange={handleNumberInput}
                      // onFocus={handleInputFocus}
                      error={errors.no_of_payment}
                      helperText={errors.no_of_payment}
                      // onBlur={handleInputBlur}
                      fullWidth
                      disabled
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Amount of Each Payments
                  </Typography>
                  <TextField
                      id="each_payment_amt"
                      name="each_payment_amt"
                      // label="each_payment_amt/Mortgage"
                      value={inputs.each_payment_amt}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.each_payment_amt}
                      helperText={errors.each_payment_amt}
                      fullWidth
                      disabled
                      // required
                      type="text"
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
                      id="total_payment_amt"
                      name="total_payment_amt"
                      // label="total_payment_amt/Mortgage"
                      value={inputs.total_payment_amt}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.total_payment_amt}
                      helperText={errors.total_payment_amt}
                      fullWidth
                      disabled
                      // required
                      type="text"
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
                      id="before_delivery_amt"
                      name="before_delivery_amt"
                      // label="before_delivery_amt/Mortgage"
                      value={inputs.before_delivery_amt}
                      onChange={handleNumberOfPaymentBefDelivery}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.before_delivery_amt}
                      helperText={errors.before_delivery_amt}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
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
                          id="exp_delivery_date"
                          name="exp_delivery_date"
                          format="dd/MM/yyyy"
                          disablePast = {true}
                          value={inputs.exp_delivery_date}
                          error={errors.exp_delivery_date}
                          helperText={errors.exp_delivery_date}
                          // fullWidth 
                          // type="datetime-local"
                          InputProps={{
                            classes: {
                              input: classes.textsize,
                            },
                          }}
                          onChange={handleDeliveryDate}
                          // error={errors.exp_delivery_date}
                          // helperText={errors.exp_delivery_date}                               
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
                            error={errors.delivery_time}
                            helperText={errors.delivery_time}
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            // error={errors.delivery_time}
                            // helperText={errors.delivery_time}
                            // KeyboardButtonProps={{
                            //   'aria-label': 'change time',
                            // }}
                          />
                      </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Minimum Payment Amt
                  </Typography>
                  <TextField
                      id="minimum_payment_amt"
                      name="minimum_payment_amt"
                      // label="minimum_payment_amt/Mortgage"
                      value={inputs.minimum_payment_amt}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      error={errors.minimum_payment_amt}
                      helperText={errors.minimum_payment_amt}
                      // onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
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
                    Interest
                  </Typography>
                  <Typography  className={classes.subTitle}>
                    Annual Interest Rates
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>                 
                  <InputLabel  className={classes.textsize}  htmlFor="interest_rate">Weeks *</InputLabel>
                  <TextField
                      id="interest_rate"
                      name="interest_rate"
                      // label="Weeks"
                      value={inputs.interest_rate}
                      onChange={handleNumberInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      // InputProps={{
                      //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                     
                      // }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>  
                    <InputLabel  className={classes.textsize}  htmlFor="interest_rate_per">Daily interest rates of (in %) *</InputLabel>
                    <TextField
                      id="interest_rate_per"
                      name="interest_rate_per"
                      // label="Daily interest rates of (in %)"
                      value={inputs.interest_rate_per}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      // InputProps={{
                      //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        
                      // }}
                    />
                  </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Total Interest Charges
                  </Typography>
                  
                  <TextField
                      id="total_interest"
                      name="total_interest"
                      // label=""
                      value={inputs.total_interest}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
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
