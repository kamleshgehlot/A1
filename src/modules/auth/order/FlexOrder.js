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
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    marginTop: 15,
  },
  subTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Budget({ open, handleFlexClose, setFlexOrderList}) {

  const classes = useStyles();
  const [inputs,setInputs] = useState([]);
  const [firstPaymentDate,setFirstPaymentDate] = useState('');
  const [expectedDeliveryDate,setExpectedDeliveryDate] = useState('');

  
  function pastDateDisabled2(){
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    var hour = dtToday.getHours();
    var minute = dtToday.getMinutes();
    if(month < 10){
        month = '0' + month.toString();
      }
    if(day < 10){
        day = '0' + day.toString();
      }
        var maxDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
        document.getElementById('exp_delivery_at').setAttribute('min', maxDateTime);
        setExpectedDeliveryDate(maxDateTime.toString());
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
  
  function handleInputChange(e){
    // console.log('valueee',e.target.value)
    if(e.target.value===""){
      setInputs({
        ...inputs,
        [e.target.name]: 0,
      });
    }
    else{
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  }
  // console.log('inputs.',inputs);

  function handleSubmit(e){
    e.preventDefault();
    handleFlexClose(false)
    const data = {
      goods_rent_price : parseFloat(inputs.goods_rent_price),
      ppsr_fee : parseFloat(inputs.ppsr_fee),
      liability_fee : parseFloat(inputs.liability_fee),
      weekly_total : parseFloat(inputs.weekly_total),
      frequency : parseFloat(inputs.frequency),
      first_payment : firstPaymentDate,
      no_of_payment : parseFloat(inputs.no_of_payment),
      each_payment_amt : parseFloat(inputs.each_payment_amt),
      total_payment_amt : parseFloat(inputs.total_payment_amt),
      before_delivery_amt : parseFloat(inputs.before_delivery_amt),
      exp_delivery_at : expectedDeliveryDate,
      bond_amt : parseFloat(inputs.bond_amt),
    }
    setFlexOrderList(data);
  }

  useEffect(() => {
    inputs.goods_rent_price = 0;
    inputs.ppsr_fee = 0;
    inputs.liability_fee = 0;
    inputs.weekly_total = 0;
    inputs.no_of_payment = 0;
    inputs.each_payment_amt = 0;
    inputs.total_payment_amt     = 0;
    inputs.before_delivery_amt = 0;
    // inputs.exp_delivery_at ;
    inputs.bond_amt = 0;
  }, []);

  useEffect(() => {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    var hour = dtToday.getHours();
    var minute = dtToday.getMinutes();
    if(month < 10){
        month = '0' + month.toString();
      }
    if(day < 10){
        day = '0' + day.toString();
      }
    if(hour < 10){
      hour = '0' + hour.toString();
    }
    if(minute < 10){
      minute = '0' + minute.toString();
    }
        // var maxDate = year + '-' + month + '-' + day;
        var maxDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
        setExpectedDeliveryDate(maxDateTime.toString());
  }, []);

  function pastDate(){
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10){
        month = '0' + month.toString();
      }
    if(day < 10){
        day = '0' + day.toString();
      }
        var maxDate = year + '-' + month + '-' + day;
        document.getElementById('first_payment').setAttribute('min', maxDate);
        setFirstPaymentDate(maxDate.toString());
  }
  

  function handleExpectedDeliveryDate(e){
    setExpectedDeliveryDate(e.target.value);
  }
  function handleFirstPaymentDate(e){
    setFirstPaymentDate(e.target.value);
  }

  
// {console.log('dddk,',expectedDeliveryDate)}

return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleFlexClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleFlexClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Flex Order
              </Typography>
              <Button color="inherit" type="submit">
                save
              </Button>
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
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="goods_rent_price"
                      name="goods_rent_price"
                      label="Rent Price of Goods"
                      value={inputs.goods_rent_price}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="ppsr_fee"
                      name="ppsr_fee"
                      label="PPSR Fee (if applicable)"
                      value={inputs.ppsr_fee}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="liability_fee"
                      name="liability_fee"
                      label="Liability Waiver Fee "
                      value={inputs.liability_fee}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="weekly_total"
                      name="weekly_total"
                      label="TOTAL PER WEEK/ FORTNIGHT"
                      value={inputs.weekly_total}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                Payments 
              </Typography>
              </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography  className={classes.subTitle}>
                    Timing of Payments
                  </Typography>
                  <TextField
                      id="frequency"
                      name="frequency"
                      label="Frequency"
                      value={inputs.frequency}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      
                    />
                     <TextField
                      id="first_payment"
                      name="first_payment"
                      label="First Payment"
                      onChange={handleFirstPaymentDate}
                      onFocus={pastDate}
                      value={firstPaymentDate}
                      defaultValue= {firstPaymentDate}
                      fullWidth
                      // required
                      type="date"
                      // placeholder="Franchise Name"
                      margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
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
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      
                    />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                  Expected Delivery Date/Time
                  </Typography>
                  <TextField
                      id="exp_delivery_at"
                      name="exp_delivery_at"
                      value={expectedDeliveryDate}
                      onChange={handleExpectedDeliveryDate}
                      onFocus={pastDateDisabled2}
                      fullWidth
                      type="datetime-local"
                      defaultValue={expectedDeliveryDate}
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                </Grid>
                  
                </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
