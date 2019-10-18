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
import {useCommonStyles} from '../../common/StyleComman'; 
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

// import validate from '../../common/validation/OrderRuleValidation';
import LinearProgress from '@material-ui/core/LinearProgress';
import { APP_TOKEN } from '../../../api/Constants';

import EditBudget from './EditBudget';
import ViewCustomer from '../customer/ViewCustomer';
import EditFlexOrder from './EditFlexOrder';
import EditFixedOrder from './EditFixedOrder';

// API CALL
import Order from '../../../api/franchise/Order';
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
    marginTop: 10,
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


export default function Edit({ open, handleEditClose, handleSnackbarClick, handleOrderRecData, editableData}) {
  const styleClass = useCommonStyles();
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
  const [totalBudgetList,setTotalBudgetList] = useState(null);
  const [fixedOrderList,setFixedOrderList] = useState(null);
  const [flexOrderList,setFlexOrderList] = useState(null);
  
  const [customer, setCustomer] = useState(null);
  const [productList, setProductList] = useState([]);
  const [assignInterest, setAssignInterest] = React.useState([]);
  const [recData, setRecData] = React.useState(editableData);
  // const [inputs, setInputs] = useState([]);
  
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  
  const [mainCategory, setMainCategory] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [product, setProduct] = useState([]);

  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const related_to = mainCategory.toString() + ',' + category.toString() + ',' + subCategory.toString();
  
  
  useEffect(() => {

    let assignRoleList = [];
    (editableData.product_id.split(',')).map((product,index) =>{
      assignRoleList.push(parseInt(product));
    });
    setAssignInterest(assignRoleList);
    // console.log(assignInterest)
    let productCategory = [];
    (editableData.product_related_to.split(',')).map((product,index) =>{
      productCategory.push(parseInt(product));
    });
    setMainCategory(productCategory[0]);
    setCategory(productCategory[1]);
    setSubCategory(productCategory[2]);

    const fetchData = async () => {
      try {
        const category_list = await Category.mainCategoryList();
        setMainCategoryList(category_list.mainCategoryList);

        const category = await Category.categoryList({maincategory: productCategory[0] });
        setCategoryList(category.categoryList);

        const sub_category = await Category.subCategoryList({category:productCategory[1]});
        setSubCategoryList(sub_category.subCategoryList);

        const product = await Category.RelatedproductList({subcategory:productCategory[2]});
        setProductList(product.productList);              
       
      
        const budget = await Order.getCurrespondingBudget({customer_id: editableData.customer_id, budgetId: editableData.budget_id});
        setBudgetList(budget[0]);
        setTotalBudgetList(budget);


        if(editableData.order_type==2){
          const order = await Order.getCurrespondingFlexOrder({flexOrderId: editableData.order_type_id});
          setFlexOrderList(order[0]);
        }
        if(editableData.order_type==1){
          const order = await Order.getCurrespondingFixedOrder({fixedOrderId: editableData.order_type_id});
          setFixedOrderList(order[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

  fetchData();
  }, []);

  useEffect(() => {
    (productList.length > 0 ? productList : []).map((data,index)=>{
      if(assignInterest[0] == data.id) {
        setProduct(data);
        // if(parseFloat(budgetList.afford_amt) < parseFloat(data.rental)){
        //   alert("you can't afford payment for this product. kindly update your budget or choose other product")
        // }        
      }
      }); 
  },[]);
  
  function validate(values) {
    let errors = {};    
    return errors;
  }

  function handleBudgetClose(){
    setBudgetOpen(false);
  }
  
  function handleBudgetOpen(budgetId, customerId){
    setBudgetId(budgetId);
    setCustomerId(customerId);
    setBudgetOpen(true);
  }
  
  function handleFixedClose(){
    setFixedOrderOpen(false);
  }
  
  function handleFixedOpen(fixedOrderId){    
    setFixedOrderId(fixedOrderId);
    setFlexOrderList(null);
    selectProduct();
    setFixedOrderOpen(true);
  }

  function handleFlexClose(){
    setFlexOrderOpen(false);
  }
  
  function handleFlexOpen(flexOrderId){
    setFlexOrderId(flexOrderId);
    setFixedOrderList(null);
    selectProduct();
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

  const selectProduct = (e) => {
    (productList.length > 0 ? productList : []).map((data,index)=>{
      if(assignInterest[0] == data.id) {
        setProduct(data);
      }
    });
  }



  function handleMainCategory(event) {
    setMainCategory(event.target.value);

    setCategoryList('');
    setSubCategoryList('');    
    setProductList('');
    setCategory('');
    setSubCategory('');
    setAssignInterest('');


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
    setCategory(event.target.value);

    setSubCategoryList('');    
    setProductList('');    
    setSubCategory('');
    setAssignInterest('');


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
    setSubCategory(event.target.value);
    setProductList('');
    setAssignInterest('');

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


  function handleChangeMultiple(event) {
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

  const editOrder = async (event) => {    

    setpLoading(true);
    setSavebtn(true);
    const response = await OrderAPI.editPost({ 
      id : inputs.id,
      products_id :  assignInterest,
      budget_list : budgetList,
      flexOrderType : flexOrderList,
      fixedOrderType : fixedOrderList,
      payment_mode: inputs.payment_mode,
      order_type : inputs.order_type,
      order_type_id : inputs.order_type_id,
      budget_id: inputs.budget_id,
      is_active : 1,
      assigned_to : 0,
      related_to : related_to,
     });
    if(response!='invalid'){
      handleOrderRecData(response);
      handleEditClose(false);
      // assignInterest.length = 0;
      setAssignInterest('');
      }else{
        setpLoading(false);
        setSavebtn(true);
        alert("Invalid or Incomplete Credentials");
      }
  };

  
  const { inputs, handleInputChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    editOrder,
    validate
  ); 
  useEffect(() => {
    setInputsAll(editableData);
  }, []);
    
return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Update Order
              </Typography>            
              <IconButton size="small" onClick={handleEditClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          
          <div className={classes.root}>
           {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">Order #</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="orderid"
                      name="orderid"
                      // label="Order #"
                      value={inputs.order_id}
                      fullWidth
                      type="text"
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
                        disabled
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}                        
                      />
                    </MuiPickersUtilsProvider>                                        
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                   <InputLabel  className={classes.textsize} htmlFor="customer">Customer</InputLabel>
                    <Typography variant="h6" className={classes.labelTitle}>{inputs.customer_name} </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button variant="outlined" size="small" color="primary" onClick={(event) => { handleCustomerOpen(inputs.customer_id); }}>View Profile </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {/* <Fab variant="extended" size="small"  onClick={handleBudgetOpen}>
                      Update Budget
                    </Fab> */}
                    <Button variant="outlined" size="small" color="primary" className={classes.textsize}  onClick={(event) => { handleBudgetOpen(inputs.budget_id, inputs.customer_id); }}>Update Budget </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                    <Select
                      // multiple
                      value={mainCategory}
                      onChange={handleMainCategory}
                      name= 'main_category'
                      id= 'main_category'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      // disabled = {budgetList ==""}
                    > 
                    <MenuItem className={classes.textsize} disabled value={""}>Select Main Category</MenuItem>
                     {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}   
                    
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="category">Category*</InputLabel>
                    <Select
                      // multiple
                      value={category}
                      onChange={handleCategory}
                      name= 'category'
                      id= 'category'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      // disabled = {mainCategory ==""}
                    >    
                     {(categoryList.length > 0 ? categoryList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                    <Select
                      // multiple
                      value={subCategory}
                      onChange={handleSubCategory}
                      name= 'sub_category'
                      id= 'sub_category'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      // disabled = {category ==""}
                    >    
                     {(subCategoryList.length > 0 ? subCategoryList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <InputLabel  className={classes.textsize} htmlFor="product">Product*</InputLabel>
                    <Select
                      // multiple
                      value={assignInterest}
                      onChange={handleChangeMultiple}
                      name= 'product'
                      id= 'product'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                    >    
                     {(productList.length > 0 ? productList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.name}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                 
                  {/* <Grid item xs={12} sm={4}> */}
                    {/* <Typography > TOTAL SURPLUS $ {budgetList.surplus}</Typography>
                    <Typography > AFFORD TO PAY: ${budgetList.afford_amt}</Typography> */}
                   {/* </Grid> */}


                   <Grid item xs={12} sm={6}>
                     {editableData.order_type ===1 ? 
                      <Button variant="outlined" size="small" color="primary"  onClick={(event) => { handleFixedOpen(inputs.order_type_id); }}>Update Fixed Order Type Details </Button> :
                      <Button variant="outlined" size="small" color="primary"    onClick={(event) => { handleFlexOpen(inputs.order_type_id); }}>Update Flex Order Type Details </Button>
                     }
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
                      required
                      className={classes.textsize}
                    >    
                      <MenuItem className={classes.textsize} value={1}>EasyPay</MenuItem>
                      <MenuItem className={classes.textsize} value={2}>Credit</MenuItem>
                      <MenuItem className={classes.textsize} value={3}>Debit</MenuItem>
                      <MenuItem className={classes.textsize} value={4}>PayPal</MenuItem>
                      <MenuItem className={classes.textsize} value={5}>Cash</MenuItem>
                    </Select>
                   </Grid>
                   
                   
                   <Grid item xs={12} sm={12}>                    
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit} disabled = {!savebtn}>
                      save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleEditClose} className={classes.button}>
                      Close
                    </Button>
                  </Grid>
                  } 
                </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
    {budgetOpen ?<EditBudget open={budgetOpen} handleBudgetClose={handleBudgetClose} setBudgetList={setBudgetList} budgetList={budgetList} totalBudgetList={totalBudgetList} customer_id={customerId} isEditable={0} /> : null }
    {fixedOrderOpen ?<EditFixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList} fixedOrderList={fixedOrderList} fixedOrderId ={fixedOrderId} product={product} /> : null }
    {flexOrderOpen ?<EditFlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList} flexOrderList={flexOrderList} flexOrderId={flexOrderId} product={product} /> : null }
    {customerOpen ? <ViewCustomer open={customerOpen} handleClose={handleCustomerClose} handleSnackbarClick={handleSnackbarClick} customerId={customerId}/> : null }
    </div>
  );
}
