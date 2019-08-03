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
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { APP_TOKEN } from '../../../api/Constants';

import Budget from './Budget';
import AddCustomer from '../customer/Add';
import SearchCustomer from './SearchCustomer';
import FlexOrder from './FlexOrder';
import FixedOrder from './FixedOrder';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Category from '../../../../src/api/Category';
import OrderAPI from '../../../api/franchise/Order';
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
  const [fixedOrderOpen, setFixedOrderOpen] = useState(false);
  const [flexOrderOpen, setFlexOrderOpen]  = useState(false);
  const [searchCustomerOpen, setSearchCustomerOpen] = useState(false);
  const [budgetList,setBudgetList] = useState([]);
  const [fixedOrderList,setFixedOrderList] = useState(null);
  const [flexOrderList,setFlexOrderList] = useState(null);
  const [orderDate,setOrderDate] = useState('');
  const [customer, setCustomer] = useState(null);
  const [junkData,setJunkData] = useState({});
  const [productList, setProductList] = useState([]);
  const [isNewCustomer,setIsNewCustomer] = useState(0);
  const [assignInterest, setAssignInterest] = React.useState([]);

  // console.log('flex r', flexOrderList);
  // console.log('flex r', fixedOrderList);
  // console.log('product list', assignInterest);


  function validate(values) {
    let errors = {};
    return errors;
  };

 
  

 
  function handleBudgetClose(){
    setBudgetOpen(false);
  }
  
  function handleBudgetOpen(){
    setBudgetOpen(true);
  }
  
  function handleFixedClose(){
    setFixedOrderOpen(false);
  }
  
  function handleFixedOpen(){
    setFlexOrderList(null);
    setFixedOrderOpen(true);
  }

  function handleFlexClose(){
    setFlexOrderOpen(false);
  }
  
  function handleFlexOpen(){
    setFixedOrderList(null);
    setFlexOrderOpen(true);
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

  function handleCustomerList(response){
    setIsNewCustomer(1);
    setCustomer(response[0]);
  }
  function handleIsExistCustomer(response){
    setIsNewCustomer(0);
    
  }

  function handleDateChange(e){
    setOrderDate(e.target.value);
  }

  function handleChangeMultiple(event) {
    setAssignInterest(event.target.value);
  }
  
  
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
          document.getElementById('order_date').setAttribute('min', maxDate);
          setOrderDate(maxDate.toString());
    }
    
    useEffect(() => {
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
          setOrderDate(maxDate.toString());

          
    }, []);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Category.productlist();
        // console.log('rrrr',result);
        setProductList(result.productList);

        const order_id = await OrderAPI.getnewid();
        // console.log('order..',order_id);
        if(order_id.id[0]!=null){
          setInput('order_id',("O_" + (order_id.id[0].id+ 1)));
        }
        else{
          setInput('order_id','O_1');
        }
      } catch (error) {
        console.log(error);
      }
  };
  fetchData();
  }, []);

  const addOrder = async () => {
    const response = await OrderAPI.postOrder({ 
      order_id :  inputs.order_id,
      customer_id : customer.id,
      products_id :  assignInterest.join(),
      order_type : inputs.order_type,
      flexOrderType : flexOrderList,
      fixedOrderType : fixedOrderList,
      payment_mode: inputs.payment_mode,
      order_date  : orderDate,

      budget_list : budgetList,
      is_active : 1,
     });
     console.log('response ', response);
    assignInterest.length = 0;
    // handleSnackbarClick(true);
    // setFranchiseList(response.staffList);
    // handleReset(RESET_VALUES);
    handleClose(false);
  };

  const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    addOrder,
    validate
  );

    // const data = {
    //   order_id :  inputs.order_id,
    //   customer_id : customer.id,
    //   products_id :  assignInterest.join(),
    //   order_type : inputs.order_type,
    //   flexOrderType : flexOrderList,
    //   fixedOrderType : fixedOrderList,
    //   payment_mode: inputs.payment_mode,
    //   order_date  : orderDate,

    //   budget_list : budgetList,
    //   is_active : 1,
    // }
    
    
    // console.log('Data.....',data);
    // console.log('Inputs.....',inputs);
    

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
                      // onChange={handleInputChange}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel htmlFor="order_date">Date*</InputLabel>
                    <TextField
                      margin="dense"
                      id="order_date"
                      name="order_date"
                      // label="Date"
                      type="date"
                      value={orderDate}
                      defaultValue= {orderDate}
                      onChange={handleDateChange}
                      onFocus={pastDate}
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
                        value={inputs.customer_type}
                        onChange={handleInputChange}
                        row
                      >
                        {console.log('customer ',customer)}
                        <FormControlLabel labelPlacement="end" value="1" control={<Radio />} label="New Customer" onClick={handleCustomerOpen} />
                        <FormControlLabel labelPlacement="end" value="2" control={<Radio />} label="Existing Customer" onClick={handleSearchCustomerOpen} />
                        {customer  != null  ? 
                        <FormControlLabel labelPlacement="end" control={<DoneIcon />}  disabled/>
                        : ''
                        }
                      </RadioGroup>
                    </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product">Prodcut*</InputLabel>
                    <Select
                      multiple
                      value={assignInterest}
                      onChange={handleChangeMultiple}
                      name= 'product'
                      id= 'product'
                      // label='customer'
                      fullWidth
                      required
                    >    
                     {(productList.length > 0 ? productList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.name}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  {customer  != null && isNewCustomer === 1? 
                    <Fab variant="extended" size="small"  onClick={handleBudgetOpen}>
                      Calculate Budget
                    </Fab>
                    : ''
                  }
                  {customer  != null && isNewCustomer === 0? 
                    <Fab variant="extended" size="small"  onClick={handleBudgetOpen}>
                      Update Budget
                    </Fab>
                    : ''
                  }
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  {customer  != null  ? 
                  <div>
                  <Typography > TOTAL SURPLUS $ {budgetList.surplus}</Typography>
                  <Typography > AFFORD TO PAY: ${budgetList.afford_amt}</Typography>
                  </div>
                  : ''
                  }
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
                   <Grid item xs={12} sm={6}>
                   <InputLabel htmlFor="order_type">Order Type</InputLabel>
                      <RadioGroup
                        aria-label="order_type"
                        name="order_type"
                        className={classes.group}
                        value={inputs.order_type}
                        onChange={handleInputChange}
                        row
                      >
                        <FormControlLabel labelPlacement="end" value="1" control={<Radio />} label="Fixed Order" onClick={handleFixedOpen} />
                        <FormControlLabel labelPlacement="end" value="2" control={<Radio />} label="Flex Order" onClick={handleFlexOpen}  />
                        <Typography variant="h6" className={classes.labelTitle}>{fixedOrderList ? 'Fixed Order Method Applied' : flexOrderList ? 'Flex Order Method Applied' : 'Enter Payment Details'}</Typography>
                        {/* <Fab variant="extended" size="small" className={classes.buttonMargin}>
                        Add Details
                        </Fab>   */}
                      </RadioGroup>
                    </Grid>
                   
                </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
    <Budget open={budgetOpen} handleBudgetClose={handleBudgetClose} setBudgetList={setBudgetList}/>
    <AddCustomer open={customerOpen} handleClose={handleCustomerClose} handleSnackbarClick={handleSnackbarClick} setCustomerList={handleCustomerList}   enquiryData={''} setCustomer={setJunkData}/>
    <FixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList}/>
    <FlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList}/>
    <SearchCustomer open={searchCustomerOpen} handleClose={handleSearchCustomerClose} handleSnackbarClick={handleSnackbarClick}  setCustomerList={handleIsExistCustomer} setCustomer={setCustomer} /> 
    </div>
  );
}
