import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import EditIcon from '@material-ui/icons/Edit';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import {useCommonStyles} from '../../common/StyleComman'; 


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

import validate from '../../common/validation/OrderRuleValidation';

function getOrderDate() {
  const dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  if(month < 10){
      month = '0' + month.toString();
    }
  if(day < 10){
      day = '0' + day.toString();
    }

    return year + '-' + month + '-' + day;
}

const RESET_VALUES = {
  order_date: getOrderDate()
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
    // marginRight: theme.spacing(1),
    // width: 100,
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
    fontSize: 12
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

  const styleClass = useCommonStyles(); 
  const classes = useStyles();
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [fixedOrderOpen, setFixedOrderOpen] = useState(false);
  const [flexOrderOpen, setFlexOrderOpen]  = useState(false);
  const [searchCustomerOpen, setSearchCustomerOpen] = useState(false);
  const [budgetList,setBudgetList] = useState([]);
  const [fixedOrderList,setFixedOrderList] = useState(null);
  const [flexOrderList,setFlexOrderList] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [junkData,setJunkData] = useState({});
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState([]);
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

  function handleFixedOrderType(response){
    inputs.order_type = 1;
  }

  function handleFlexOrderType(response){
    inputs.order_type = 2;
  }

  function handleCustomerList(response){
    inputs.customer_type = 1;
    setIsNewCustomer(1);
    setCustomer(response[0]);
    setBudgetList([]);
  }
  function handleIsExistCustomer(response){
    inputs.customer_type = 2;
    setIsNewCustomer(0);    
    setBudgetList([]);
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
  }

  useEffect(()=>{
      if(productList=="" || assignInterest == ""){
        setInput('product','');
      }
      if(categoryList == "" || category == ""){
        setInput('category','');
      }
      if(subCategoryList=="" || subCategory == ""){
        setInput('sub_category','');
      }
  },[productList,categoryList,subCategoryList,mainCategory,category,subCategoryList,assignInterest]);

  useEffect(()=>{
    if(product!= ""){
      if(parseFloat(budgetList.afford_amt) < parseFloat(product.rental)){
        alert("you can't afford payment for this product. kindly update your budget or choose other product")
      }  
    }
  },[budgetList])

  
  function handleChangeMultiple(event) {
    setInput('product',event.target.value);    
    setAssignInterest(event.target.value);
    
   (productList.length > 0 ? productList : []).map((data,index)=>{
      if(event.target.value === data.id) {
        setProduct(data);        
        if(parseFloat(budgetList.afford_amt) < parseFloat(data.rental)){
          alert("you can't afford payment for this product. kindly update your budget or choose other product")
        }        
      }
    });  
  }

  console.log(product)
  function handleMainCategory(event) {
    
    setInput('main_category',event.target.value);
    setMainCategory(event.target.value);
    setCategoryList('');
    setSubCategoryList('');
    setProductList('');
    setCategory('');
    setSubCategory('');
    setAssignInterest('');
    setProduct('');

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
    setSubCategory('');
    setAssignInterest('');
    setProduct('');

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
    setAssignInterest('');
    setProduct('');

    const fetchData = async () => {
      try {
        const result = await Category.RelatedproductList({subcategory: event.target.value});
        setProductList(result.productList);        
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  }
  
  useEffect(() => {
    const dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if(month < 10){
        month = '0' + month.toString();
      }
    if(day < 10){
        day = '0' + day.toString();
      }
  let maxDate = year + '-' + month + '-' + day;
  setInput('order_date', maxDate.toString())
  
    const fetchData = async () => {
      try {
        
        const category_list = await Category.mainCategoryList();
        setMainCategoryList(category_list.mainCategoryList);

        const order_id = await OrderAPI.getnewid();
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
      assigned_to :  3,
      budget_list : budgetList,
      related_to : related_to,
      is_active : 1,
      converted_to : convertId,
      converted_name : converted_name,
      
     });
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

return (
  <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              
              <Typography variant="h6" className={classes.title}>
                New Order
              </Typography>
              
            <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>

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
                        format="MM/dd/yyyy"
                        disablePast = {true}
                        // defaultValue = {new Date()}
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
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    
                    <Typography variant="h6" className={classes.labelTitle}>
                      Select Customer*
                    </Typography>
                    <Button variant= {inputs.customer_type === 1 ? "contained" : "outlined" } size="small" color="primary"  value="1"  onClick={handleCustomerOpen} className={classes.textField} > New </Button>
                    <Button variant= {inputs.customer_type === 2 ? "contained" : "outlined" } size="small" color="primary"  value="2" onClick={handleSearchCustomerOpen}  className={classes.textField}>Existing </Button>
                    
                    {customer  != null && isNewCustomer === 1 ? 
                      <Button variant={customer  != null && budgetList!="" ? "contained" : "outlined" } size="small" color="primary"  onClick={handleBudgetOpen}  className={classes.textField}>Calculate Budget </Button>
                      : ''
                    }
                    {customer  != null && isNewCustomer === 0 ? 
                      <Button variant={customer  != null && budgetList!="" ? "contained" : "outlined" } size="small" color="primary"  onClick={handleBudgetOpen}  className={classes.textField}> Update Budget </Button>                       
                      : ''
                    }                    
                    {customer  != null  ? 
                    <Typography variant="h6" className={classes.labelTitle}>
                      {customer.customer_name + ", " + customer.address + ", " + customer.city}
                    </Typography>
                    : ''}

                    {customer  != null && budgetList!="" ? 
                        <Typography variant="h6" className={classes.labelTitle}> TOTAL SURPLUS $ {budgetList.surplus} {"  "}AFFORD TO PAY: ${budgetList.afford_amt}</Typography>
                      : ''
                    }
                  </Grid>
                 
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
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
                    <MenuItem className={classes.textsize} disabled value={""}>Select Main Category</MenuItem>
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
                    <MenuItem className={classes.textsize} disabled value={""}>Select Category</MenuItem>
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
                    <MenuItem className={classes.textsize} disabled value={""}>Select Sub Category</MenuItem>
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
                    <MenuItem className={classes.textsize} disabled value={""}>Select Product</MenuItem>
                     {(productList.length > 0 ? productList : []).map((data,index)=>{
                      return(
                         <MenuItem className={classes.textsize} value={data.id}>{data.name}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                   <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={errors.order_type? classes.errorHeading : classes.labelTitle}>
                      Order Type*
                    </Typography>                    
                    {/* <InputLabel  className={errors.order_type? classes.errorHeading : classes.textsize} htmlFor="order_type">Order Type*</InputLabel> */}
                    <Button variant= {inputs.order_type === 1 ? "contained" : "outlined" } size="small" color="primary"  value="1"  onClick={handleFixedOpen} className={classes.textField} disabled={budgetList == "" || product =="" || (parseFloat(budgetList.afford_amt) < parseFloat(product.rental))}> Fixed Order </Button>
                    <Button variant= {inputs.order_type === 2 ? "contained" : "outlined" } size="small" color="primary"  value="2" onClick={handleFlexOpen}  className={classes.textField} disabled={budgetList == "" || product =="" ||  (parseFloat(budgetList.afford_amt) < parseFloat(product.rental))}>Flex Order </Button>
                    {/* <Typography variant="h6" className={classes.labelTitle}>{fixedOrderList ? 'Fixed Order Method Applied' : flexOrderList ? 'Flex Order Method Applied' : 'Enter Payment Details'}</Typography>  */}
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
                          <Button variant="contained" color="primary"  onClick={handleClose} className={classes.button}>Close</Button> 
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
    {fixedOrderOpen ?<FixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList} fixedOrderList= {fixedOrderList} handleOrderType = {handleFixedOrderType} affordAmt={budgetList.afford_amt} product={product}/> : null }
    {flexOrderOpen ?<FlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList} flexOrderList={flexOrderList} handleOrderType = {handleFlexOrderType} affordAmt={budgetList.afford_amt} product={product} /> : null }
    {searchCustomerOpen ?<SearchCustomer open={searchCustomerOpen} handleClose={handleSearchCustomerClose} handleSnackbarClick={handleSnackbarClick}  setCustomerList={handleIsExistCustomer} setCustomer={setCustomer} />  : null }
    </div>
  );
}
