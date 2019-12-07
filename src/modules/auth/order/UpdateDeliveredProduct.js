import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {useCommonStyles} from '../../common/StyleComman'; 
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Order from '../../../api/franchise/Order';
import ConfirmationDialog from '../ConfirmationDialog.js';
import { getDate, getCurrentDate, getDateInDDMMYYYY } from '../../../utils/datetime';

import useSignUpForm from '../franchise/CustomHooks';
import validate from '../../common/validation/ProductDeliveryForm';
import CategoryAPI from '../../../api/Category';
import { FormLabel } from '@material-ui/core';



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
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
  },
  labelTitle: {  
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
  buttonDisabled: {
    color: theme.palette.secondary,
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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(13),
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);

const RESET_VALUES  = {
  comment: '',
  product_brand : '',
  product_color : '',
  product_cost : '',
  specification : '',
  invoice_number : '',
  delivery_date : getCurrentDate(),
  purchase_from : '',
}

export default function UpdateDeliveredProduct({ open, handleClose, handleSnackbarClick, orderData, handleOrderList, roleName}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [requesedData, setRequesedData] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);
  const [orderedProductList, setOrderedProductList] = useState([]);

  function handleDateChange(date){
    handleInputChange({target:{name: 'delivery_date', value: date}})
  }
  
  const getRequiredData = async () => {
      try {
          const result = await Order.getProductAndCategoryName({
          product_id : orderData.product_id,        
        });
        setRequesedData(result[0]);

        const response = await CategoryAPI.getOrderedProductList({ product_ids : orderData.product_id });
        setOrderedProductList(response.productList);
      } catch (error) {
        console.log('Error..',error);
      }
  };
  
  useEffect(() => {
     getRequiredData();
  },[]);

  const submit = async () => {
    setpLoading(true);
    setSavebtn(true);

    const result = await Order.submitDeliveredProduct({
      id : orderData.id,
      product_brand : inputs.product_brand,
      product_color : inputs.product_color,
      product_cost : inputs.product_cost,
      specification : inputs.specification,
      invoice_number : inputs.invoice_number,
      delivery_date : getDate(inputs.delivery_date),
      purchase_from : inputs.purchase_from,
      
      product_id : orderData.product_id,
      customer_id : orderData.customer_id,
      related_to : orderData.product_related_to,

      order_id: orderData.order_id,
      user_role: roleName,
      comment: inputs.comment, 

      assigned_to: 5,       
      delivered_date: getDate(inputs.delivery_date),
      delivered_time: new Date(),
    });
    handleOrderList(result);
    handleClose();
  }


  const { inputs, handleInputChange,  handleNumberInput, handlePriceInput, handleRandomInput, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    submit,
    validate
  ); 


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Update Product
              </Typography>              
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          
          <div className={classes.root}>
          {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Order Id: " + orderData.order_id }
                  </Typography> 
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Name: " + orderData.first_name + ' ' + orderData.last_name }
                  </Typography>
                </Grid>               
           
                <Grid item xs={12} sm={6}>     
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Id:  " + orderData.customer_id }
                  </Typography>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Add.:  " + orderData.address }
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {/* {"PRODUCT TO DELIVERED:  " + requesedData.main_category + '/' + requesedData.category +'/'  + requesedData.sub_category + '/' + requesedData.product_name} */}
                      {"PRODUCT TO DELIVERED :  " + (orderedProductList.length > 0 ? orderedProductList :[]).map(data => {
                        return(data.name)
                      })}
                  </Typography>                  
                </Grid>
                <Grid item xs={12} sm={12}>   
                    <Divider />
                </Grid> 
                <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="delivery_date">Delivery Date*</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        id="delivery_date"
                        name="delivery_date"
                        format="dd-MM-yyyy"
                        placeholder="DD-MM-YYYY"
                        value={inputs.delivery_date}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
                        // error={errors.delivery_date}
                        // helperText={errors.delivery_date}                               
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="invoice_number">Invoice Number </InputLabel>
                  <TextField                       
                      id="invoice_number"
                      name="invoice_number"
                      value={inputs.invoice_number}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.invoice_number}
                      helperText={errors.invoice_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="purchase_from">Purchase From </InputLabel>
                  <TextField                       
                      id="purchase_from"
                      name="purchase_from"
                      value={inputs.purchase_from}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.purchase_from}
                      helperText={errors.purchase_from}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_cost">Product Cost </InputLabel>
                  <TextField                       
                      id="product_cost"
                      name="product_cost"
                      value={inputs.product_cost}
                      onChange={handlePriceInput}                      
                      fullWidth                       
                      error={errors.product_cost}
                      helperText={errors.product_cost}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.product_cost}
                      helperText={errors.product_cost}
                    />
                  </Grid>
                <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_brand">Product Brand *</InputLabel>
                  <TextField                       
                      id="product_brand"
                      name="product_brand"
                      value={inputs.product_brand}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.product_brand}
                      helperText={errors.product_brand}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_color">Product Color *</InputLabel>
                  <TextField                       
                      id="product_color"
                      name="product_color"
                      value={inputs.product_color}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.product_color}
                      helperText={errors.product_color}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>     
                  <InputLabel className={classes.textsize}  htmlFor="specification">Product Specification *</InputLabel>
                  <TextField                       
                      id="specification"
                      name="specification"
                      value={inputs.specification}
                      onChange={handleInputChange}                      
                      fullWidth   
                      multiline                   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.specification}
                      helperText={errors.specification}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>     
                  <InputLabel className={classes.textsize}  htmlFor="comment">Write comment about order *</InputLabel>
                  <TextField                       
                      id="comment"
                      name="comment"
                      value={inputs.comment}
                      onChange={handleInputChange}                      
                      fullWidth   
                      multiline                   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.comment}
                      helperText={errors.comment}
                    />
                  </Grid>
                <Grid item xs={12} sm={12}>                                     
                  <Button variant="contained" color='primary' className={classes.button} onClick={ handleSubmit } disabled = {savebtn} >Submit</Button>
                  <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                    Cancel
                  </Button> 
                </Grid>
            </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
      {/* {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={""} content={"Sure to cancel this order ?"} />: null } */}
    </div>
  );
}
