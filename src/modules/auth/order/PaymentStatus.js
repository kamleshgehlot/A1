import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
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
import DateFnsUtils from '@date-io/date-fns';
import {useCommonStyles} from '../../common/StyleComman'; 
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';
import CategoryAPI from '../../../api/Category';
import ConfirmationDialog from '../ConfirmationDialog.js';
import DateChanger from './PaymentComponent/DateChanger.js';

import { getDate, getCurrentDate, getCurrentDateDDMMYYYY, getCurrentDateDBFormat, getDateInDDMMYYYY, setDBDateFormat } from '../../../utils/datetime';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

import FixPaymentTable from './OrderComponent/FixPaymentTable';
import FlexPaymentTable from './OrderComponent/FlexPaymentTable';
import PaymentStatusTable from './PaymentComponent/PaymentStatusTable.js';

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
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
  },  
  rowHeading: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
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



export default function paymentStatus({ open, handleClose, handleSnackbarClick, orderData}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  
  
  const [confirmation, setConfirmation] = React.useState(false);
  const [payResopnse, setPayResopnse] = React.useState([]);
  
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [nextPayment, setNextPayment] = useState({installment_no:0});
  
  const [paymentRecDate, setPaymentRecDate] = useState(new Date());
  const [paymentAmt, setPaymentAmt] = useState('');
  const [orderTypeData, setOrderTypeData] = useState([]);
  const [requesedData, setRequesedData] = useState([]);
  const [orderedProductList, setOrderedProductList] = useState([]);
  const [remarkField,setRemarkField] = useState('');
  const [totalPaid, setTotalPaid] = useState(0);
  const [scheduleChangerOpen, setScheduleChangerOpen] = useState(false);


  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getPaymentSchedule(); 
    await getRequiredData();
    if(orderData.order_type===1){
      await getFixedFormDetail();
    }else if(orderData.order_type===2){
      await getFlexFlexFormDetail();
    }
  }

  function handleDateChange(date){
      setPaymentRecDate(date);    
  }

  const handlePriceInput = e => {
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (e.target.value === '' || validDecimalNumber.test(e.target.value)) {
      setPaymentAmt(e.target.value);
    }
  }

  const handleInputChange = e =>{
    setRemarkField(e.target.value);
  }

  const handleSetScheduledData = (result) => {
    setPaymentSchedule(result.paymentSchedule);

    if(result.lastInst[0] != null && result.lastInst[0] != ''){
      setTotalPaid(result.lastInst[0].total_paid);
    }
    if(result.nextInstallmentRow[0] != null && result.nextInstallmentRow[0] != ''){
      setNextPayment(result.nextInstallmentRow[0]);
      setPaymentAmt(result.nextInstallmentRow[0].payment_amt);
    }
  }
  
  const getPaymentSchedule = async () => {
    try {
        const result = await Order.getPaymentSchedule({order_id: orderData.id});
        handleSetScheduledData(result);
      } catch (error) {
        console.log('Error..',error);
      }
  };  

  
  const getRequiredData = async () => {
    try {
      const result = await Order.getProductAndCategoryName({ product_id : orderData.product_id });
      setRequesedData(result[0]);

      const response = await CategoryAPI.getOrderedProductList({ product_ids : orderData.product_id });
      setOrderedProductList(response.productList);
    } catch (error) {
      console.log('Error..',error);
    }
  };

  const getFlexFlexFormDetail = async () => {
    try{
      const flexOrder = await Order.getCurrespondingFlexOrder({flexOrderId: orderData.order_type_id});
      setOrderTypeData(flexOrder[0]);
    }catch (error) {
        console.log('Error..',error);
    }
  }
  
  const getFixedFormDetail = async () => {
    try{
      const fixOrder = await Order.getCurrespondingFixedOrder({fixedOrderId: orderData.order_type_id});
      setOrderTypeData(fixOrder[0]);
    }catch (error) {
        console.log('Error..',error);
    }
  }
  
  function handlePaymentSubmit(response){
    setConfirmation(true);
  }

  const handleConfirmationDialog = async (isConfirm) => {
    setConfirmation(false);
    if(isConfirm === 1){
      try {
        const result = await Order.paymentSubmit({
          order_id : orderData.id,
          customer_id: orderData.customer_id,
          installment_no : nextPayment.installment_no,
          payment_date:  nextPayment.payment_date,
          settlement_date : getDate(paymentRecDate),
          payment_amt : nextPayment.payment_amt,
          deposit_amt : paymentAmt,
          total_paid : totalPaid,
          remark : remarkField,
          order_type : orderData.order_type,
          order_type_id : orderData.order_type_id,
        });
        handleSetScheduledData(result);
        setRemarkField('');
      } catch (error) {
        console.log('Error..',error);
      }        
    }    
  }


  const handleSchduleChangerOpen = (data) => {
    setPayResopnse(data);
    setScheduleChangerOpen(true);
  }

  const handleSchduleChangerClose = () => {
    setScheduleChangerOpen(false);
  }

  
return (
    <div>
      <Dialog maxWidth open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>              
              <Typography variant="h6" className={classes.title}> Payment Status </Typography>
                <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
              </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}> 
          <Grid container  justify="space-around">  
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Order Id: " + orderData.order_id }
              </Typography> 
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Customer Name: " + orderData.first_name + ' ' + orderData.last_name }
              </Typography>              
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Customer Id:  " + orderData.customer_id }
              </Typography>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Rental Type: " + orderData.order_type_name }
              </Typography>              
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Order Date:  " + getDateInDDMMYYYY(orderData.order_date) }
              </Typography>
              <Typography variant="h6" className={classes.labelTitle}>
                {"Payment Mode: " + orderData.payment_mode_name }
            </Typography>
            </Grid>         
            <Grid item xs={12} sm={0}></Grid>  
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Each Installment Amt. " + 
                    (orderTypeData.frequency === 1 ? "(Monthly): " :
                     orderTypeData.frequency === 2 ? "(Fortnightly): " :
                     orderTypeData.frequency === 4 ? "(Weekly): " : '')
                   + "$" + orderTypeData.each_payment_amt }
              </Typography>              
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                {orderData.order_type===1 ?
                  ("Total Expected:  " + orderTypeData.total_payment_amt) 
                :orderData.order_type===2 ?
                  ("Bond Amt:  " + orderTypeData.bond_amt )
                :''}
              </Typography>                            
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Total Received Amt.:  " + totalPaid.toFixed(2) }
              </Typography>              
            </Grid>
            {orderData.order_type===1 &&
            <Grid item xs={12} sm={11}>
              <Typography variant="h6" className={classes.labelTitle}>
                { ("Bond Amt:  " + orderTypeData.minimum_payment_amt )}
              </Typography>                            
            </Grid>
            }   
            <Grid item xs={12} sm={0}></Grid>  
            <Grid item xs={12} sm={11}>
              <Typography variant="h6" className={classes.labelTitle}>
                {"Rental Product :  " + (orderedProductList.length > 0 ? orderedProductList :[]).map(data => {
                  return(data.name)
                })}
              </Typography>                  
            </Grid>
            <Grid item xs={12} sm={11}>   
              <Divider />
              <Typography variant="h6" className={classes.labelTitle}> {'\n'} </Typography> 
            </Grid> 
          </Grid>

            
            <Grid container  justify="space-around">                              
              <Grid item xs={12} sm={11}>
              <Typography variant="h6" className={classes.rowHeading}> Add Payment </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Installment No.: </Typography>
                  <TextField 
                    id="installment_no"
                    name="installment_no"
                    value={nextPayment.installment_no}
                    fullWidth
                    type="text"
                    margin="dense"
                    InputProps={{                     
                      classes: {
                        input: styleClass.textsize,
                      },                    
                    }}
                    disabled
                  />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Currnet Payment Date:  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="dense"
                      id="payment_date"
                      name="payment_date"
                      format="dd-MM-yyyy"
                      placeholder="DD-MM-YYYY"                      
                      fullWidth 
                      value = {nextPayment.payment_date}
                      InputProps={{
                        classes: {
                          input: styleClass.textsize,
                        },
                      }} 
                      disabled
                    />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Payment Amount </Typography>
                  <TextField 
                    id="payment_amt"
                    name="payment_amt"
                    value={paymentAmt}
                    onChange={handlePriceInput}
                    fullWidth
                    type="text"
                    margin="dense"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      classes: {
                        input: styleClass.textsize,
                      },
                    }}
                  />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Payment Rec. Date </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="dense"
                      id="payment_rec_date"
                      name="payment_rec_date"
                      format="dd-MM-yyyy"
                      placeholder="DD-MM-YYYY"
                      value={paymentRecDate}
                      fullWidth 
                      InputProps={{
                        classes: {
                          input: styleClass.textsize,
                        },                                        
                      }}                                      
                      onChange={handleDateChange}                    
                    />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" className={classes.labelTitle}>Remark </Typography>
                  <TextField 
                    id="remark"
                    name="remark"
                    value={remarkField}
                    onChange={handleInputChange}
                    fullWidth
                    type="text"
                    margin="dense"
                    multiline
                    InputProps={{
                      classes: {
                        input: styleClass.textsize,
                      },
                    }}
                  />
              </Grid>
              <Grid item xs={12} sm={2} style={{marginTop: '30px', textAlign: 'right'}}>
                <Button variant="contained" color="primary" onClick={handlePaymentSubmit} className={classes.button}> Submit</Button> 
                {/* <Button variant="contained" color="primary" onClick={() => { handleSchduleChangerOpen([]); }} className={classes.button}> Reschedule Remaining</Button>  */}                
              </Grid>

              <Grid item xs={12} sm={12}  style={{marginTop: '20px', marginBottom : '15px'}}>
                <PaymentStatusTable paymentSchedule ={paymentSchedule} installmentBeforeDelivery={orderTypeData.before_delivery_amt} />
              </Grid>
           
              <Grid item xs={12} sm={12} style={{marginTop: '10px', marginBottom : '15px', textAlign: 'right'}}>                      
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                  Close
                </Button> 
              </Grid>
          </Grid>
        </Paper>
        </div>
      </form>
    </Dialog>
      
      {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={""} content={"Is this installment paid by customer ?"} />: null }
      {scheduleChangerOpen ? <DateChanger open = {scheduleChangerOpen} handleClose = {handleSchduleChangerClose} paymentData = { payResopnse } orderData= {orderData} fetchData= {fetchData} paymentSchedule = {paymentSchedule} /> : null }
    </div>
  );
}
