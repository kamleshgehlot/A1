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
import EditIcon from '@material-ui/icons/Edit';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Popover from '@material-ui/core/Popover';

import LinearProgress from '@material-ui/core/LinearProgress';
import { APP_TOKEN } from '../../../api/Constants';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
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

import validate from '../../common/validation/OrderRuleValidation';
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
    fontSize: theme.typography.pxToRem(13),
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
  fab:{
    marginRight: theme.spacing(1),
    fontSize: 12,
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Add({ open, handleClose, handleSnackbarClick, handleOrderRecData, convertId, converted_name}) {

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
  
  const [mainCategory, setMainCategory] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const related_to = mainCategory.toString() + ',' + category.toString() + ',' + subCategory.toString();


  // function validate(values) {
  //   let errors = {};
  //   return errors;
  // };

  
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
    if(fixedOrderList==null){
    setFixedOrderList({
      int_unpaid_bal  : 0,
      cash_price : 0,
      delivery_fee : 0,
      ppsr_fee : 0,
      no_of_payment : 0,
      each_payment_amt : 0,
      total_payment_amt : 0,
      before_delivery_amt : 0,
      frequency  : 0,
      exp_delivery_at : '',
      first_payment : '',
      last_payment : '',
      minimum_payment_amt : 0,
      intrest_rate : 0,
      intrest_rate_per : 0,
      total_intrest : 0,
      });
    }
    setFlexOrderList(null);
    setFixedOrderOpen(true);
  }

  function handleFlexClose(){
    setFlexOrderOpen(false);
  }
  
  function handleFlexOpen(){
    if(flexOrderList==null){
      setFlexOrderList({
        goods_rent_price : 0,
        ppsr_fee : 0,
        liability_fee : 0,
        weekly_total : 0,
        frequency : 0,
        first_payment : '',
        no_of_payment : 0,
        each_payment_amt : 0,
        total_payment_amt : 0,
        before_delivery_amt : 0,
        exp_delivery_at : '',
        bond_amt : 0,
        });
      }
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

  function handleDateChange(date){
    let date1 = new Date(date);
    let yy = date1.getFullYear();
    let mm = date1.getMonth() + 1 ;
    let dd = date1.getDate();
    if(mm< 10){ mm = '0' + mm.toString()}
    if(dd< 10){ dd = '0' + dd.toString()}
    let fullDate = yy+ '-'+mm+'-'+dd;
    handleInputChange({target:{name: 'order_date', value: fullDate}})
    setOrderDate(fullDate);
  }

  function handleChangeMultiple(event) {
    setInput('product',event.target.value);
    setAssignInterest(event.target.value);
  }

  function handleMainCategory(event) {
    
    setInput('main_category',event.target.value);
    setMainCategory(event.target.value);
    setCategoryList('');
    setSubCategoryList('');    
    setProductList('');

    const fetchData = async () => {
      try {
        const result = await Category.categoryList({maincategory: event.target.value});
        setCategoryList(result.categoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  }

  function handleCategory(event) {
    setInput('category',event.target.value);
    setCategory(event.target.value);
    setSubCategoryList('');    
    setProductList('');


    const fetchData = async () => {
      try {
        const result = await Category.subCategoryList({category: event.target.value});
        setSubCategoryList(result.subCategoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  }
  function handleSubCategory(event) {
    
    setInput('sub_category',event.target.value);
    setSubCategory(event.target.value);
    setProductList('');

    const fetchData = async () => {
      try {
        const result = await Category.RelatedproductList({subcategory: event.target.value});
        setProductList(result.productList);
        // const result = await Category.productList({subCategory: event.target.value});
        // setSubCategoryList(result.subCategoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
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
          // setOrderDate(maxDate.toString());
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
          handleInputChange({target:{name: 'order_date', value: maxDate.toString()}})
          
    }, []);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const category_list = await Category.mainCategoryList();
        setMainCategoryList(category_list.mainCategoryList);

        const order_id = await OrderAPI.getnewid();
        // console.log('123',order_id)
        let zero = 0;
        if(order_id == ""){
         setInput('order_id','0000001');
        }else{
          zero = 7 - (order_id[0].id.toString().length); 
          let orderId='';
          for(let i=0; i< zero ; i++){
            orderId += '0';
          }
         setInput('order_id',(orderId + (order_id[0].id+ 1)));
        }
          
        // console.log('order id',inputs.order_id);
        // setInput('order_id',("" + (order_id.id[0].id+ 1)));
          // let now = Date.now().toString() // '1492341545873'
          // now += now + Math.floor(Math.random() * 10)
          // setInput('order_id',([now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')));
          
        //   if(order_id.id[0]!=null){
        //   let orderNo = "O" + (order_id.id[0].id + 1);
        //   // setInput('order_id',("O_" + (order_id.id[0].id+ 1)));
        //   setInput('order_id',(orderNo + "-" + [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')));
        //   }
        //   else{
        //   let orderNo = ("O1");
        //   // setInput('order_id',("O_" + (order_id.id[0].id+ 1)));
        //   setInput('order_id',(orderNo + "-" + [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')));
        //   // setInput('order_id','O_1');
        // }
      } catch (error) {
        console.log(error);
      }
  };
  fetchData();
  }, []);


  const addOrder = async () => {
    setpLoading(true);
    setSavebtn(true);
    console.log('response ');

    const response = await OrderAPI.postOrder({
      order_id :  inputs.order_id,
      customer_id : customer.id,
      customer_type: inputs.customer_type,
      products_id :  assignInterest,
      order_type : inputs.order_type,
      flexOrderType : flexOrderList,
      fixedOrderType : fixedOrderList,
      payment_mode: inputs.payment_mode,
      order_date  : inputs.order_date,
      assigned_to : 0,
      budget_list : budgetList,
      related_to : related_to,
      is_active : 1,
      converted_to : convertId,
      converted_name : converted_name,
      
     });
    console.log('response ', response);
    setAssignInterest('');
    // assignInterest = '';
    // handleSnackbarClick(true);
    // setFranchiseList(response.staffList);
    // handleReset(RESET_VALUES);
    if(response!='invalid'){
      handleOrderRecData(response);
      setSavebtn(false);
        handleClose(false);
      }else{
        setSavebtn(false);
        alert("Invalid or Incomplete Credentials")
      }
  };
  

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addOrder,
    validate
  );

  console.log(inputs);
    
return (
  <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                New Order
              </Typography>
              {/* <Button color="inherit" type="submit">
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
           {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="order_id">Order#</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="order_id"
                      name="order_id"
                      // label="Order #"
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
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="order_date">Date*</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        id="order_date"
                        name="order_date"
                        format="dd/MM/yyyy"
                        disablePast = {true}
                        value={inputs.order_date}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
                        // error={errors.order_date}
                        // helperText={errors.order_date}                               
                      />
                    </MuiPickersUtilsProvider>
                    
                    {/* <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="order_date"
                      name="order_date"
                      // label="Date"
                      type="date"
                      value={inputs.order_date}
                      defaultValue= {orderDate}
                      onChange={handleDateChange}
                      onFocus={pastDate}
                      required
                      fullWidth
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                   <InputLabel  className={errors.customer_type? classes.errorHeading : classes.textsize} htmlFor="customer_type">Select Customer*</InputLabel>
                      <RadioGroup
                        aria-label="customer_type"
                        name="customer_type"
                        className={classes.group}
                        value={inputs.customer_type}
                        onChange={handleInputChange}
                        row
                      >
                        {/* {console.log('customer ',customer)} */}
                        <FormControlLabel labelPlacement="end" value="1"  control={<Radio color="primary" />} label="New Customer" onClick={handleCustomerOpen} />
                        {/* {convertLead === 0 ? */}
                        <FormControlLabel labelPlacement="end" value="2"  control={<Radio color="primary" />} label="Existing Customer" onClick={handleSearchCustomerOpen} />
                        {/* : '' } */}
                        {customer  != null  ? 
                        <FormControlLabel labelPlacement="end"  control={<InputLabel />} label= {customer.customer_name + ", " + customer.address + ", " + customer.city} disabled />
                        
                    // <Typography > {customer.customer_name + ", " + customer.address + ", " + customer.city}</Typography>
                          // <FormControlLabel labelPlacement="end" control={<DoneIcon /> }  disabled/>
                          // <Tooltip title={customer.customer_name + ", " + customer.address + ", " + customer.city}>
                          //   {/* <IconButton  size="small" className={classes.fab} > */}
                          //     <FormControlLabel labelPlacement="end" control={<DoneIcon /> }  disabled/>
                          //   {/* </IconButton> */}
                          // </Tooltip>
                          : ''
                        }
                      </RadioGroup>
                    </Grid>
                    
                  <Grid item xs={12} sm={6}>
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
                    {customer  != null && budgetList!="" ? 
                    <div>
                    <Typography > TOTAL SURPLUS $ {budgetList.surplus}</Typography>
                    <Typography > AFFORD TO PAY: ${budgetList.afford_amt}</Typography>
                    </div>
                    : ''
                    }
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                    <Select
                      // multiple
                      value={inputs.main_category}
                      onChange={handleMainCategory}
                      name= 'main_category'
                      id= 'main_category'
                      // label='customer'
                      fullWidth
                      className={classes.textsize}
                      required
                      disabled = {budgetList ==""}
                      error={errors.main_category}
                      helperText={errors.main_category}
                      
                    > 
                    {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data,index)=>{
                      return(
                        data.type === 1 ? 
                         <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         : ''
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="category">Category*</InputLabel>
                    <Select
                      // multiple
                      value={inputs.category}
                      onChange={handleCategory}
                      name= 'category'
                      id= 'category'
                      className={classes.textsize}
                      // label='customer'
                      fullWidth
                      required
                      disabled = {mainCategory ==""}
                      error={errors.category}
                      helperText={errors.category}
                    >    
                     {(categoryList.length > 0 ? categoryList : []).map((data,index)=>{
                      return(
                        data.type === 2 ? 
                         <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         : ''
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                    <Select
                      // multiple
                      value={inputs.sub_category}
                      onChange={handleSubCategory}
                      name= 'sub_category'
                      id= 'sub_category'
                      // label='customer'
                      fullWidth className={classes.textsize}
                      required
                      disabled = {category ==""}
                      error={errors.sub_category}
                      helperText={errors.sub_category}
                    >    
                    {(subCategoryList.length > 0 ? subCategoryList : []).map((data,index)=>{
                      return(
                        data.type === 3 ? 
                         <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         : ''
                      ) 
                     })}
                    </Select>
                  </Grid>

                  
                  <Grid item xs={12} sm={12}>
                    <InputLabel  className={classes.textsize} htmlFor="product">Product*</InputLabel>
                    <Select
                      // multiple
                      value={inputs.product}
                      onChange={handleChangeMultiple}
                      name= 'product'
                      id= 'product'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      disabled = {subCategory ==""}
                      error={errors.product}
                      helperText={errors.product}
                    >    
                     {(productList.length > 0 ? productList : []).map((data,index)=>{
                      return(
                         <MenuItem className={classes.textsize} value={data.id}>{data.name}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                   <Grid item xs={12} sm={6}>
                   <InputLabel  className={errors.order_type? classes.errorHeading : classes.textsize} htmlFor="order_type">Order Type</InputLabel>
                      <RadioGroup
                        aria-label="order_type"
                        name="order_type"
                        className={classes.group}
                        value={inputs.order_type}
                        onChange={handleInputChange}
                        row
                      >
                        <FormControlLabel labelPlacement="end" value="1"  control={<Radio color="primary" />} label="Fixed Order" onClick={handleFixedOpen} />
                        <FormControlLabel labelPlacement="end" value="2"  control={<Radio color="primary" />} label="Flex Order" onClick={handleFlexOpen}  />
                        <Typography variant="h6" className={classes.labelTitle}>{fixedOrderList ? 'Fixed Order Method Applied' : flexOrderList ? 'Flex Order Method Applied' : 'Enter Payment Details'}</Typography>
                        {/* <Fab variant="extended" size="small" className={classes.buttonMargin}>
                        Add Details
                        </Fab>   */}
                      </RadioGroup>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="payment_mode">Payment Mode*</InputLabel>
                    <Select
                      value={inputs.payment_mode}
                      onChange={handleInputChange}
                      name= 'payment_mode'
                      id= 'payment_mode'
                      // label='customer'
                      fullWidth
                      className={classes.textsize}
                      error={errors.payment_mode}
                      helperText={errors.payment_mode}
                      required
                      disabled = {budgetList ==""}
                    >    
                      <MenuItem className={classes.textsize} value={1}>EasyPay</MenuItem>
                      <MenuItem className={classes.textsize} value={2}>Credit</MenuItem>
                      <MenuItem className={classes.textsize} value={3}>Debit</MenuItem>
                      <MenuItem className={classes.textsize} value={4}>PayPal</MenuItem>
                      <MenuItem className={classes.textsize} value={5}>Cash</MenuItem>
                    </Select>
                   </Grid>
                      
           
                    
            {savebtn? <Grid item xs={12} sm={12}> 
                          <Button  variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>save</Button>
                          <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>Close</Button> 
                      </Grid> 
                    : <Grid item xs={12} sm={12}>
                          <Button  variant="contained"  color="primary" className={classes.button} disabled>save</Button>
                          <Button variant="contained" color="primary" className={classes.button} disabled>Close</Button> 
                      </Grid>
            }
                </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
    {budgetOpen ?<Budget open={budgetOpen} handleBudgetClose={handleBudgetClose} budgetList={budgetList} setBudgetList={setBudgetList} customer_id= {customer.id}/> : null }
    {customerOpen ? <AddCustomer open={customerOpen} handleClose={handleCustomerClose} handleSnackbarClick={handleSnackbarClick} setCustomerList={handleCustomerList}   enquiryData={''} setCustomer={setJunkData}/> : null }
    {fixedOrderOpen ?<FixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList} fixedOrderList= {fixedOrderList}/> : null }
    {flexOrderOpen ?<FlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList} flexOrderList={flexOrderList}/> : null }
    {searchCustomerOpen ?<SearchCustomer open={searchCustomerOpen} handleClose={handleSearchCustomerClose} handleSnackbarClick={handleSnackbarClick}  setCustomerList={handleIsExistCustomer} setCustomer={setCustomer} />  : null }
    </div>
  );
}
