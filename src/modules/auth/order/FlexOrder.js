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

import { APP_TOKEN } from '../../../api/Constants';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

import validate from '../../common/validation/FlexOrderValidation';
import {useCommonStyles} from '../../common/StyleComman'; 


// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

const RESET_VALUES = {
  goods_rent_price : '',
  ppsr_fee : '',
  liability_fee : '',
  weekly_total : '',
  frequency : '',
  first_payment : '',
  no_of_payment : '',
  duration : '',
  each_payment_amt : '',
  total_payment_amt : '',
  before_delivery_amt : '',
  exp_delivery_date : '',
  exp_delivery_time : '',
  bond_amt : '',
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
  subTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    // fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(12),
    // marginTop: 10,
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
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FlexOrder({ open, handleFlexClose, setFlexOrderList, flexOrderList, handleOrderType, affordAmt, product}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [paymentBeforeDelivery,setPaymentBeforeDelivery] = useState('');
  const [firstPaymentDate,setFirstPaymentDate] = useState('');
  const [dateArray,setDateArray] = useState([]);


  // const setDateFormat = (date) => {
  //   let date1 = new Date(date);
  //   let yy = date1.getFullYear();
  //   let mm = date1.getMonth() + 1 ;
  //   let dd = date1.getDate();
  //   if(mm< 10){ mm = '0' + mm.toString()}
  //   if(dd< 10){ dd = '0' + dd.toString()}
  //   let fullDate = yy+ '-'+mm+'-'+dd;
  //   return fullDate;
  // }

  // const setTimeFormat = (time) => {
  //   let date = new Date(time);
  //   let hh = date.getHours();
  //   let mm = date.getMinutes();
  //   if(hh<10) { hh = '0' + hh.toString()}
  //   if(mm<10) { mm = '0' + mm.toString()}
  //   let fullTime = hh + ':' + mm ;
  //   return fullTime;
  // }

  function handleDateChange(date){    
    // handleInputChange({target:{name: 'first_payment', value: setDateFormat(date)}})
    handleInputChange({target:{name: 'first_payment', value: date}})
    setFirstPaymentDate(date);
  }

  function handleDeliveryDate(date){    
    // handleInputChange({target:{name: 'exp_delivery_date', value: setDateFormat(date)}})
    handleInputChange({target:{name: 'exp_delivery_date', value: date}})
  }

  function handleDeliveryTime(time){      
    // let dTime = new Date(time);
    // handleInputChange({target:{name: 'exp_delivery_time', value: dTime}})    
    handleInputChange({target:{name: 'exp_delivery_time', value: time}})    
  }

  function flex(e){
    // e.preventDefault();
    handleFlexClose(false)

        const data = {
        goods_rent_price : parseFloat(inputs.goods_rent_price).toFixed(2),
        ppsr_fee : parseFloat(inputs.ppsr_fee).toFixed(2),
        liability_fee : parseFloat(inputs.liability_fee).toFixed(2),
        weekly_total : parseFloat(inputs.weekly_total).toFixed(2),
        frequency : parseFloat(inputs.frequency).toFixed(2),        
        no_of_payment : parseFloat(inputs.no_of_payment).toFixed(2),
        duration: inputs.duration,
        each_payment_amt : parseFloat(inputs.each_payment_amt).toFixed(2),
        total_payment_amt : parseFloat(inputs.total_payment_amt).toFixed(2),
        before_delivery_amt : inputs.before_delivery_amt,
        bond_amt : parseFloat(inputs.bond_amt).toFixed(2),
        exp_delivery_date : inputs.exp_delivery_date,
        exp_delivery_time : inputs.exp_delivery_time,
        first_payment : inputs.first_payment,        
      }
      console.log('flex data', data);
      setFlexOrderList(data);
      handleOrderType(2);
  }


  
  const handleFrequency = (e) => {
    setFrequency(Number(e.target.value));
    setInput('frequency', Number(e.target.value));
  }
  
  const handleDuration = (e) => {
    setDuration(Number(e.target.value));
    setInput('duration', Number(e.target.value))
  }

  
  const handleNumberOfPaymentBefDelivery = (e) =>{
    calculateNoOfPayment(e.target.value);
  }

  function calculateNoOfPayment(value) {
    const validNumber = /^[0-9]*$/;
    if (value === '' || validNumber.test(value)) {
      let temp = paymentBeforeDelivery;
      setPaymentBeforeDelivery(value);
      setInput( 'before_delivery_amt' , value);
      if(Number(value) > Number(inputs.no_of_payment)){
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
      setDateArray(paymentDates);            
    }

    if(flexOrderList) {
      if(flexOrderList.before_delivery_amt && Number(flexOrderList.before_delivery_amt) > 0) {
        calculateNoOfPayment(flexOrderList.before_delivery_amt);
      }
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
      let delivery_date = new Date(dateArray[paymentBeforeDelivery - 1]);
      if(flexOrderList !== null){
        delivery_date = flexOrderList.exp_delivery_date;
      }
      handleRandomInput([
        // {name: 'minimum_payment_amt', value: (paymentBeforeDelivery * parseFloat(inputs.each_payment_amt))},
        {name: 'exp_delivery_date', value: delivery_date },
      ]);
    }else{
      handleRandomInput([
        // {name: 'minimum_payment_amt', value: ''},
        {name: 'exp_delivery_date', value: ''},
      ]);
    }
  },[paymentBeforeDelivery]);

  
  useEffect(()=>{
      if(frequency != '' && duration != ''){    
        if(frequency == 1){
          let installment = (parseFloat(product.rental) * 4);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment.toFixed(2)},
            {name: 'no_of_payment', value: duration},
            {name: 'total_payment_amt', value: (installment * duration).toFixed(2)},
          ]);          
        }else if(frequency == 2){ 
          let installment = (parseFloat(product.rental) * 2);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment.toFixed(2)},
            {name: 'no_of_payment', value: (duration * 2)},
            {name: 'total_payment_amt', value: (installment * (duration * 2)).toFixed(2)},
          ]);
        }else if(frequency == 4){ 
          let installment = (parseFloat(product.rental));
          handleRandomInput([
            {name: 'each_payment_amt', value: installment.toFixed(2)},
            {name: 'no_of_payment', value: (duration * 4)},
            {name: 'total_payment_amt', value: (installment * (duration * 4)).toFixed(2)},
          ]);        
        }
      }      
      if(paymentBeforeDelivery > inputs.no_of_payment){
        setPaymentBeforeDelivery('');
        handleRandomInput([
          // {name: 'minimum_payment_amt', value: ''},
          {name: 'before_delivery_amt', value: ''},   
          {name: 'exp_delivery_date', value: ''},     
        ]);
        alert('Number of payment before delivery should be less then or equal to total number of payment.');
      }
  },[duration,frequency]);
  



const { inputs, handleInputChange, handleNumberInput, handleRandomInput, handlePriceInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
  (flexOrderList === null ? RESET_VALUES : flexOrderList),
  flex,
  validate
);

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Flex Order
              </Typography>
              <IconButton size="small" onClick={handleFlexClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                Consumer Lease Details
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="first_name">Rent Price of Goods</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="goods_rent_price"
                      name="goods_rent_price"
                      // label="Rent Price of Goods"
                      value={inputs.goods_rent_price}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.goods_rent_price}
                      helperText={errors.goods_rent_price}
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
                    <InputLabel  className={classes.textsize}  htmlFor="first_name">PPSR Fee (if applicable) *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="ppsr_fee"
                      name="ppsr_fee"
                      // label="PPSR Fee (if applicable)"
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
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">Liability Waiver Fee*</InputLabel>
                    <TextField
                     
                      id="liability_fee"
                      name="liability_fee"
                      // label="Liability Waiver Fee "
                      value={inputs.liability_fee}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.liability_fee}
                      helperText={errors.liability_fee}
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
                    <InputLabel  className={classes.textsize} htmlFor="first_name">TOTAL PER WEEK/ FORTNIGHT*</InputLabel>
                    <TextField
                     
                      id="weekly_total"
                      name="weekly_total"
                      // label="TOTAL PER WEEK/ FORTNIGHT"
                      value={inputs.weekly_total}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.weekly_total}
                      helperText={errors.weekly_total}
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
                        format="MM/dd/yyyy"
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
                        disabled = {frequency == "" || duration == ""}                             
                      />
                    </MuiPickersUtilsProvider>
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
                      onChange={handleNumberInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.no_of_payment}
                      helperText={errors.no_of_payment}
                      fullWidth
                      disabled
                      // required
                      type="text"
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
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
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
                      // required
                      type="text"
                      disabled
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
                          format="MM/dd/yyyy"
                          disablePast = {true}
                          defaultValue = {""}
                          value={inputs.exp_delivery_date}
                          // fullWidth 
                          // type="datetime-local"
                          InputProps={{
                            classes: {
                              input: classes.textsize,
                            },
                          }}
                          onChange={handleDeliveryDate}
                          error={errors.exp_delivery_date}
                          helperText={errors.exp_delivery_date}                               
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
                            id="exp_delivery_time"
                            name="exp_delivery_time"
                            // label="Time picker" 
                            defaultValue = {""}
                            value={inputs.exp_delivery_time}
                            onChange={handleDeliveryTime}
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            error={errors.exp_delivery_time}
                            helperText={errors.exp_delivery_time}
                            // KeyboardButtonProps={{
                            //   'aria-label': 'change time',
                            // }}
                          />
                      </MuiPickersUtilsProvider>
                      
                 
                </Grid>
                
                
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Bond Amt
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="bond_amt"
                      name="bond_amt"
                      // label="bond_amt/Mortgage"
                      value={inputs.bond_amt}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.bond_amt}
                      helperText={errors.bond_amt}
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
                    <Button variant="contained" color="primary" onClick={handleFlexClose} className={classes.button}>
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
