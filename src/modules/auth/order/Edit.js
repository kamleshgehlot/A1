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

import EditBudget from './EditBudget';
import ViewCustomer from '../customer/ViewCustomer';
import EditFlexOrder from './EditFlexOrder';
import EditFixedOrder from './EditFixedOrder';

// API CALL
import Category from '../../../../src/api/Category';
import OrderAPI from '../../../api/franchise/Order';
import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel, InputBase } from '@material-ui/core';
import { stringify } from 'querystring';
import { string } from 'prop-types';

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


export default function Add({ open, handleEditClose, handleSnackbarClick, handleOrderRecData, editableData}) {

  const classes = useStyles();
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [fixedOrderOpen, setFixedOrderOpen] = useState(false);
  const [flexOrderOpen, setFlexOrderOpen]  = useState(false);
  const [searchCustomerOpen, setSearchCustomerOpen] = useState(false);
  const [customerId, setCustomerId] = useState();
  
  const [budgetId, setBudgetId] = useState();
  const [fixedOrderId, setFixedOrderId] = useState();
  const [flexOrderId, setFlexOrderId] = useState();

  const [budgetList,setBudgetList] = useState(null);
  const [fixedOrderList,setFixedOrderList] = useState(null);
  const [flexOrderList,setFlexOrderList] = useState(null);
  
  const [customer, setCustomer] = useState(null);
  const [productList, setProductList] = useState([]);
  const [assignInterest, setAssignInterest] = React.useState([]);
  const [recData, setRecData] = React.useState(editableData);

  // console.log('ddd',recData);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Category.productlist();
        setProductList(result.productList);
      } catch (error) {
        console.log(error);
      }
    };

    let assignRoleList = [];
    (recData.product_id.split(',')).map((product,index) =>{
      assignRoleList.push(parseInt(product));
    });
    setAssignInterest(assignRoleList);

  fetchData();
  }, []);

//  console.log('assign,,,',assignInterest);
  function handleBudgetClose(){
    setBudgetOpen(false);
  }
  
  function handleBudgetOpen(budgetId){
    setBudgetId(budgetId);
    setBudgetOpen(true);
  }
  
  function handleFixedClose(){
    setFixedOrderOpen(false);
  }
  
  function handleFixedOpen(fixedOrderId){
    setFixedOrderId(fixedOrderId);
    setFlexOrderList(null);

    setFixedOrderOpen(true);
  }

  function handleFlexClose(){
    setFlexOrderOpen(false);
  }
  
  function handleFlexOpen(flexOrderId){
    setFlexOrderId(flexOrderId);
    setFixedOrderList(null);
    setFlexOrderOpen(true);
  }

  function handleCustomerClose(){
    setCustomerOpen(false);
  }
  function handleCustomerOpen(customerId){
    setCustomerId(customerId);
    setCustomerOpen(true);
  }
 
  function handleSearchCustomerClose(){
    setSearchCustomerOpen(false);
  }
  function handleSearchCustomerOpen(){
    setSearchCustomerOpen(true);
  }


  function handleChangeMultiple(event) {
    setAssignInterest(event.target.value);
  }

  const EditOrder = async (e) => {
    if (event) {
      event.preventDefault();
    }
    // if(budgetList==null ){ <EditBudget />}
    // if(fixedOrderList==null) { <EditFixedOrder/> }
    // if(flexOrderList==null) {<EditFlexOrder />}

    const response = await OrderAPI.editPost({ 
      id : recData.id,
      products_id :  assignInterest.join(),
      budget_list : budgetList,
      flexOrderType : flexOrderList,
      fixedOrderType : fixedOrderList,
      payment_mode: recData.payment_mode,
      order_type : recData.order_type,
      order_type_id : recData.order_type_id,
      budget_id: recData.budget_id,
      is_active : 1,
     });
    // console.log('response ', response);
    assignInterest.length = 0;
    // handleReset(RESET_VALUES);
    if(response!='invalid'){
      handleOrderRecData(response);
      handleEditClose(false);
      }else{
        alert("Invalid or Incomplete Credentials")
      }
  };

  const handleInputChange = event => {
    const { name, value } = event.target
    setRecData({ ...recData, [name]: value })
  }

    
return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleEditClose} TransitionComponent={Transition}>
        <form onSubmit={EditOrder}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
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
                      value={recData.order_id}
                      fullWidth
                      type="text"
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
                      type="date"
                      defaultValue= {recData.order_date}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                   <InputLabel htmlFor="customer">Customer</InputLabel>
                    <Typography variant="h6" className={classes.labelTitle}>{recData.customer_name} </Typography>
                    <Button variant="outlined" size="small" color="primary" onClick={(event) => { handleCustomerOpen(recData.customer_id); }}>View Profile </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product">Product*</InputLabel>
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
                    {/* <Fab variant="extended" size="small"  onClick={handleBudgetOpen}>
                      Update Budget
                    </Fab> */}
                    <Button variant="outlined" size="small"  onClick={(event) => { handleBudgetOpen(recData.budget_id); }}>Update Budget </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {/* <Typography > TOTAL SURPLUS $ {budgetList.surplus}</Typography>
                    <Typography > AFFORD TO PAY: ${budgetList.afford_amt}</Typography> */}
                   </Grid>

                    <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="payment_mode">Payment Mode*</InputLabel>
                    <Select
                      value={recData.payment_mode}
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
                     {editableData.order_type ===1 ? 
                      <Button variant="outlined" size="small"  onClick={(event) => { handleFixedOpen(recData.order_type_id); }}>Update Fixed Order Type Details </Button> :
                      <Button variant="outlined" size="small"   onClick={(event) => { handleFlexOpen(recData.order_type_id); }}>Update Flex Order Type Details </Button>
                     }
                    </Grid>
                   
                </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
    {budgetOpen ?<EditBudget open={budgetOpen} handleBudgetClose={handleBudgetClose} setBudgetList={setBudgetList} budgetList={budgetList} budgetId={budgetId}/> : null }
    {fixedOrderOpen ?<EditFixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList} fixedOrderList={fixedOrderList} fixedOrderId ={fixedOrderId} /> : null }
    {flexOrderOpen ?<EditFlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList} flexOrderList={flexOrderList} flexOrderId={flexOrderId} /> : null }
    {customerOpen ? <ViewCustomer open={customerOpen} handleClose={handleCustomerClose} handleSnackbarClick={handleSnackbarClick} customerId={customerId}/> : null }
    </div>
  );
}
