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

import validate from '../../common/validation/FlexOrderValidation';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

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
  subTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightBold,
    marginTop: 12,
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


export default function EditFlexOrder({ open, handleFlexClose, setFlexOrderList, flexOrderList, flexOrderId}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();

  // const [inputs,setInputs] = useState([]);  

  
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
  }

  function handleDeliveryDate(date){
    handleInputChange({target:{name: 'exp_delivery_date', value: setDateFormat(date)}})
  }

  function handleDeliveryTime(time){      
    let dTime = new Date(time);
    handleInputChange({target:{name: 'delivery_time', value: dTime}}) 
  }
  
  function handleInputBlur(e){
    if(e.target.value===''){
      setInputs({
        ...inputs,
        [e.target.name]: 0,
      });
    }
  }

  function handleInputFocus(e){
    if(e.target.value==='0'){
      setInputs({
        ...inputs,
        [e.target.name]: '',
      });
    }
  }
  
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
  // console.log('inputs.',inputs);

  function flex(e){
    // e.preventDefault();
    handleFlexClose(false);

    const data = {
      goods_rent_price : parseFloat(inputs.goods_rent_price),
      ppsr_fee : parseFloat(inputs.ppsr_fee),
      liability_fee : parseFloat(inputs.liability_fee),
      weekly_total : parseFloat(inputs.weekly_total),
      frequency : parseFloat(inputs.frequency),
      first_payment : inputs.first_payment,
      no_of_payment : parseFloat(inputs.no_of_payment),
      each_payment_amt : parseFloat(inputs.each_payment_amt),
      total_payment_amt : parseFloat(inputs.total_payment_amt),
      before_delivery_amt : parseFloat(inputs.before_delivery_amt),
      exp_delivery_date : inputs.exp_delivery_date,
      exp_delivery_time : inputs.delivery_time,
      bond_amt : parseFloat(inputs.bond_amt),
    }
    setFlexOrderList(data);
  }

  // console.log('inputs==',inputs);
  // useEffect(() => {
  //   // console.log(flexOrderList);
  //   const fetchData = async () => {
  //     try {
  //       const order = await Order.getCurrespondingFlexOrder({flexOrderId: flexOrderId});
  //       // console.log('dd====',order);
  //       if(flexOrderList!=null){
  //         setInputsAll(flexOrderList);
  //       }else{
  //       setInputsAll(order[0]);        
  //     }
  //     } catch (error) {
  //       console.log('Error..',error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const { inputs, handleInputChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    flex,
    validate
  ); 
  useEffect(() => {
    setInputsAll(flexOrderList);
  }, []);
return (
    <div>
      <Dialog maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <form> 
          <AppBar className={classes.appBar}>
            <Toolbar>            
              <Typography variant="h6" className={classes.title}>
                Update Flex Order
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
                    {/* <InputLabel className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="goods_rent_price"
                      name="goods_rent_price"
                      label="Rent Price of Goods"
                      value={inputs.goods_rent_price}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errors.goods_rent_price}
                      helperText={errors.goods_rent_price}
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
                    {/* <InputLabel className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="ppsr_fee"
                      name="ppsr_fee"
                      label="PPSR Fee (if applicable)"
                      value={inputs.ppsr_fee}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
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
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="liability_fee"
                      name="liability_fee"
                      label="Liability Waiver Fee "
                      value={inputs.liability_fee}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errors.liability_fee}
                      helperText={errors.liability_fee}
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
                    {/* <InputLabel className={classes.textsize}  htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="weekly_total"
                      name="weekly_total"
                      label="TOTAL PER WEEK/ FORTNIGHT"
                      value={inputs.weekly_total}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errors.weekly_total}
                      helperText={errors.weekly_total}
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
                <InputLabel className={classes.textsize} htmlFor="frequency">Frequency *</InputLabel>
                    <Select
                      id="frequency"
                      name="frequency"
                      value={inputs.frequency}
                      onChange={handleInputChange}
                      error={errors.frequency}
                      margin='dense'                      
                      helperText={errors.frequency}
                      fullWidth                      
                      className={classes.textsize}
                      required                      
                    > 
                      <MenuItem className={classes.textsize} value="">Select Option</MenuItem>
                      <MenuItem className={classes.textsize} value="4">Weekly</MenuItem>
                      <MenuItem className={classes.textsize} value="2">Fortnightly</MenuItem>
                      <MenuItem className={classes.textsize} value="1">Monthly</MenuItem>                      
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
                        value={inputs.first_payment}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
                        onError={errors.first_payment}
                        helperText={errors.first_payment} 
                        // error={errors.first_payment}
                        // helperText={errors.first_payment}                               
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
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errors.no_of_payment}
                      helperText={errors.no_of_payment}
                      fullWidth
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
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
                      id="each_payment_amt"
                      name="each_payment_amt"
                      // label="each_payment_amt/Mortgage"
                      value={inputs.each_payment_amt}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
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
                      id="total_payment_amt"
                      name="total_payment_amt"
                      // label="total_payment_amt/Mortgage"
                      value={inputs.total_payment_amt}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
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
                
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                      Minimun Number of Payments before delivery
                  </Typography>
                  <TextField
                      id="before_delivery_amt"
                      name="before_delivery_amt"
                      // label="before_delivery_amt/Mortgage"
                      value={inputs.before_delivery_amt}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errors.before_delivery_amt}
                      helperText={errors.before_delivery_amt}
                      fullWidth
                      // required
                      type="number"
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
                    Bond Amt
                  </Typography>
                  <TextField
                      id="bond_amt"
                      name="bond_amt"
                      // label="bond_amt/Mortgage"
                      value={inputs.bond_amt}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errors.bond_amt}
                      helperText={errors.bond_amt}
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
                      Save
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
