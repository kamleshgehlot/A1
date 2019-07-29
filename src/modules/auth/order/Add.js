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

import { APP_TOKEN } from '../../../api/Constants';

import Budget from './Budget';
import AddCustomer from '../customer/Add';
import SearchCustomer from './SearchCustomer';

// API CALL
import Staff from '../../../api/franchise/Staff';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

const RESET_VALUES = {
  id: '',
  first_name : '',
  last_name : '',
  location : '',
  contact : '',
  email : '',  
  pre_company_name : '',
  pre_company_address : '',
  pre_company_contact : '',
  pre_position : '',
  duration : '',
  resume : '',
  cover_letter : '',
  employment_docs : '',
  
  user_id : '',
  password : '',
  role : '',
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


export default function Add({ open, handleClose, handleSnackbarClick}) {

  const classes = useStyles();
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [searchCustomerOpen, setSearchCustomerOpen] = useState(false);
  const [assignRole, setAssignRole] = React.useState([]);
  



  function validate(values) {
    let errors = {};

    return errors;
  };

 const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    validate
  );

  function handleBudgetClose(){
    setBudgetOpen(false);
  }
  
  function handleBudgetOpen(){
    setBudgetOpen(true);
  }
  
  function handleCustomerClose(){
    setCustomerOpen(false);
  }
  function handleCustomerOpen(){
    setCustomerOpen(true);
  }
  function handleSearchCustomerClose(){
    setSearchCustomerOpen(false);
  }
  function handleSearchCustomerOpen(){
    setSearchCustomerOpen(true);
  }

return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Order
              </Typography>
              <Button color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={3}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="orderid"
                      name="orderid"
                      label="Order #"
                      value={inputs.order_id}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="order_date"
                      name="order_date"
                      label="Date"
                      type="text"
                      value={inputs.order_date} 
                      onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                   <InputLabel htmlFor="customer">Select Customer*</InputLabel>
                      <RadioGroup
                        aria-label="customer"
                        name="customer"
                        className={classes.group}
                        // value={inputs.gender}
                        // onChange={handleInputChange}
                        row
                      >
                        <FormControlLabel labelPlacement="end" value="new" control={<Radio />} label="New Customer" />
                        <FormControlLabel labelPlacement="end" value="exist" control={<Radio />} label="Existing Customer" />
                        <Fab variant="extended" size="small" className={classes.buttonMargin} onClick={handleCustomerOpen}>
                        Add Customer
                        </Fab>  
                        <Fab variant="extended" size="small" className={classes.buttonMargin} onClick={handleSearchCustomerOpen}>
                        Add Customer
                        </Fab>  
                      </RadioGroup>
                    </Grid>
                  {/* <Grid item xs={12} sm={4}> */}
                    {/* <FormLabel htmlFor="customer">Customer</FormLabel> */}
                    {/* <InputLabel htmlFor="customer">Customer Type *</InputLabel> */}    
                    {/* <Typography variant="h6" className={classes.labelTitle}>
                      <Button color="inherit" >Add New Customer</Button>
                        /    
                      <Button color="inherit" >Existing Customer</Button>
                    </Typography>
                    </Grid> */}
                    {/* <Grid item xs={12} sm={2}>
                      <TextField
                      // margin="normal"
                      id="customer"
                      name="customer"
                      // label="Search"
                      placeholder = "Search..."
                      type="text"
                      value={inputs.customer}
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="product"
                      name="product"
                      label="Product"
                      type="text"
                      value={inputs.product} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    {/* <InputLabel htmlFor="email">Email Id *</InputLabel> */}
                    <Fab variant="extended" size="small" className={classes.buttonMargin} onClick={handleBudgetOpen}>
                      Calculate Budget
                    </Fab>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography >TOTAL SURPLUS: $400</Typography>
                  <Typography > AFFORD TO PAY: $10</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="assigned_to">Assigned To*</InputLabel>
                    <Select
                      value={inputs.assigned_to}
                      onChange={handleInputChange}
                      name= 'assigned_to'
                      id= 'assigned_to'
                      // label='customer'
                      fullWidth
                      required
                    >
                      <MenuItem value={1}>Finance</MenuItem>
                      <MenuItem value={2}>Delivery</MenuItem>
                    </Select>
                   </Grid>
                   <Grid item xs={12} sm={6}>
                   <InputLabel htmlFor="order_type">Order Type</InputLabel>
                      <RadioGroup
                        aria-label="order_type"
                        name="order_type"
                        className={classes.group}
                        // value={inputs.gender}
                        // onChange={handleInputChange}
                        row
                      >
                        <FormControlLabel labelPlacement="end" value="fixed" control={<Radio />} label="Fixed Order" />
                        <FormControlLabel labelPlacement="end" value="flex" control={<Radio />} label="Flex Order" />
                        <Fab variant="extended" size="small" className={classes.buttonMargin}>
                        Add Details
                        </Fab>  
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="payment_mode">Payment Mode*</InputLabel>
                    <Select
                      value={inputs.payment_mode}
                      onChange={handleInputChange}
                      name= 'payment_mode'
                      id= 'payment_mode'
                      // label='customer'
                      fullWidth
                      required
                    >    
                      <MenuItem value={1}>EasyPay</MenuItem>
                      <MenuItem value={2}>Credit</MenuItem>
                      <MenuItem value={3}>Debit</MenuItem>
                      <MenuItem value={4}>PayPal</MenuItem>
                      <MenuItem value={5}>Cash</MenuItem>
                    </Select>
                   </Grid>
                </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
      <Budget open={budgetOpen} handleBudgetClose={handleBudgetClose}/>
    {customerOpen ?  <AddCustomer open={customerOpen} handleClose={handleCustomerClose} handleSnackbarClick={handleSnackbarClick} setCustomerList={''}   enquiryData={''}/> :'' }
    {searchCustomerOpen? <SearchCustomer open={searchCustomerOpen} handleClose={handleSearchCustomerClose} handleSnackbarClick={handleSnackbarClick} /> :''}
    </div>
  );
}
