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
  
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [payResopnse, setPayResopnse] = React.useState([]);
  const [paymentHistory,setPaymentHistory] = useState([]);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [paymentRecDate, setPaymentRecDate] = useState(new Date());
  const [paymentAmt, setPaymentAmt] = useState('');
  const [orderTypeData, setOrderTypeData] = useState([]);
  const [requesedData, setRequesedData] = useState([]);
  const [orderedProductList, setOrderedProductList] = useState([]);
  
  const [totalPaid, setTotalPaid] = useState(0);
  const [scheduleChangerOpen, setScheduleChangerOpen] = useState(false);


  function handleDateChange(date){
      setPaymentRecDate(date);    
  }

  const handlePriceInput = e => {
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (e.target.value === '' || validDecimalNumber.test(e.target.value)) {
      setPaymentAmt(e.target.value);
    }
  }

  const getPaymentHistory = async () => {
    try {
      const existingPayment = await Order.getPaymentHistory({id: orderData.id});
        setPaymentHistory(existingPayment);
      } catch (error) {
        console.log('Error..',error);
      }
  };

  const getPaymentSchedule = async () => {
    try {
        const paymentSchedule = await Order.getPaymentSchedule({order_id: orderData.id});
        setPaymentSchedule(paymentSchedule);
      } catch (error) {
        console.log('Error..',error);
      }
  };  
  
  const handleFixPaymentStatus = (fixData, paymentHistory, paymentSchedule) => {
    let payment_table=[];

    (paymentSchedule.length> 0 ? paymentSchedule : []).map((schdeuleData) => {
      let bool = false;
      let dueInstallAmt = 0;
        (paymentHistory.length > 0 ? paymentHistory : []).map((historyData, index) => {
              if(schdeuleData.installment_no === historyData.installment_no){
                payment_table.push({
                  sr_no : schdeuleData.installment_no,
                  installment_no:  historyData.installment_no,
                  payment_date: getDateInDDMMYYYY(schdeuleData.payment_date),
                  payment_rec_date: getDateInDDMMYYYY(historyData.payment_rec_date),
                  payment_amt : historyData.payment_amt.toFixed(2),
                  total_paid : historyData.total_paid.toFixed(2),
                  due_installment_amt : historyData.due_installment_amt,
                  sub_installment_no : historyData.sub_installment_no,
                  installment_before_delivery : fixData.before_delivery_amt,
                  last_installment_no : fixData.no_of_payment,
                  status : (historyData.status == 1 ?  "Paid" : historyData.status == 2 ? "Dishonoured Paid" :''),
                });  
                dueInstallAmt = historyData.due_installment_amt;
                bool = true;
              }
        });
        
        if(bool === false || dueInstallAmt != 0){
            payment_table.push({
              sr_no : schdeuleData.installment_no,
              installment_no: schdeuleData.installment_no,
              payment_date: getDateInDDMMYYYY(schdeuleData.payment_date),
              payment_rec_date: '',
              payment_amt : '',
              total_paid : '',
              due_installment_amt : '',
              sub_installment_no : 0,
              installment_before_delivery : fixData.before_delivery_amt,
              last_installment_no : fixData.no_of_payment,
              status : ( getDate(schdeuleData.payment_date) > getCurrentDateDBFormat() ? "pending" :  "Dishonoured pending"),
            });
        }          
      })
    setPaymentStatus(payment_table); 
  }
  
  const getFixedPaymentTable = async () => {
      try {
        const fixOrder = await Order.getCurrespondingFixedOrder({fixedOrderId: orderData.order_type_id});
        const existingPayment = await Order.getPaymentHistory({id: orderData.id});
        const paymentSchedule = await Order.getPaymentSchedule({order_id: orderData.id});
        
        const fixData = fixOrder[0];
        setOrderTypeData(fixOrder[0]);

            if(existingPayment.length > 0){
              setTotalPaid(existingPayment[existingPayment.length -1].total_paid);
              if(existingPayment[existingPayment.length -1].due_installment_amt == 0){
                setPaymentAmt(fixData.each_payment_amt);
              }else{
                setPaymentAmt(existingPayment[existingPayment.length -1].due_installment_amt);
              }
            }else{
              setPaymentAmt(fixData.each_payment_amt);
            }        
        handleFixPaymentStatus(fixData, existingPayment, paymentSchedule);
      } catch (error) {
        console.log('Error..',error);
      }
  };

  const handleFlexPaymentStatus = (flexData, paymentHistory, paymentSchedule) => {
    let payment_table=[];
    (paymentSchedule.length> 0 ? paymentSchedule : []).map((schdeuleData) => {
      let bool = false;
      let dueInstallAmt = 0;
        (paymentHistory.length > 0 ? paymentHistory : []).map((historyData, index) => {
          if(schdeuleData.installment_no === historyData.installment_no){
            payment_table.push({
              sr_no : schdeuleData.installment_no,
              installment_no:  historyData.installment_no,
              payment_date: getDateInDDMMYYYY(schdeuleData.payment_date),
              payment_rec_date: getDateInDDMMYYYY(historyData.payment_rec_date),
              payment_amt : historyData.payment_amt.toFixed(2),
              total_paid : historyData.total_paid.toFixed(2),
              due_installment_amt : historyData.due_installment_amt,
              sub_installment_no : historyData.sub_installment_no,
              installment_before_delivery : flexData.before_delivery_amt,
              last_installment_no : '',
              status : (historyData.status == 1 ?  "Paid" : historyData.status == 2 ? "Dishonoured Paid" :''),
            });
            bool = true;
            dueInstallAmt = historyData.due_installment_amt;
          }
        });

        if(bool === false || dueInstallAmt != 0){
          payment_table.push({
            sr_no :  schdeuleData.installment_no,
            installment_no:  schdeuleData.installment_no,
            payment_date:  getDateInDDMMYYYY(schdeuleData.payment_date),
            payment_rec_date: '',
            payment_amt : '',
            total_paid : '',
            due_installment_amt : '',
            sub_installment_no : 0,
            installment_before_delivery : flexData.before_delivery_amt,
            last_installment_no : '',
            status : ( getDate(schdeuleData.payment_date) > getCurrentDateDBFormat() ? "pending" :  "Dishonoured pending"),
          });
        }
      });
    setPaymentStatus(payment_table); 
  }
  
  const getFlexPaymentTable = async () => {
      try {
        const flexOrder = await Order.getCurrespondingFlexOrder({flexOrderId: orderData.order_type_id});
        const existingPayment = await Order.getPaymentHistory({id: orderData.id});
        const paymentSchedule = await Order.getPaymentSchedule({order_id: orderData.id});
        const flexData = flexOrder[0];
        setOrderTypeData(flexOrder[0]);

            if(existingPayment.length > 0){
              setTotalPaid(existingPayment[existingPayment.length -1].total_paid);

              if(existingPayment[existingPayment.length -1].due_installment_amt == 0){
                setPaymentAmt(flexData.each_payment_amt);
              }else{
                setPaymentAmt(existingPayment[existingPayment.length -1].due_installment_amt);
              }
            }else{
              setPaymentAmt(flexData.each_payment_amt);
            }             
        handleFlexPaymentStatus(flexData, existingPayment, paymentSchedule);                   
    } catch (error) {
      console.log('Error..',error);
    }
  };

  const fetchData = async () => {
    try{
      await getPaymentHistory();     
      await getPaymentSchedule(); 
      await getRequiredData();
      if(orderData.order_type===1){
        await getFixedPaymentTable();
      }else if(orderData.order_type===2){
        await getFlexPaymentTable();
      }
    }catch (error) {
      console.log('Error..',error);
    }
  };

  useEffect(() => {
    fetchData();   
  }, []);
  
  
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

  const handleSchduleChangerOpen = (data) => {
    setPayResopnse(data);
    setScheduleChangerOpen(true);
  }

  const handleSchduleChangerClose = () => {
    setScheduleChangerOpen(false);
  }

  function handlePaymentSubmit(response){
    setPayResopnse(response);
    setConfirmation(true);
  }

  

  const handleConfirmationDialog = async (isConfirm) => {
    setConfirmation(false);
    if(isConfirm === 1){
      let totalPaid = 0;
      let dueInstallment = 0;
      let subInstallmentNo = 0;
      
      if(paymentHistory == "" || paymentHistory == [] || paymentHistory.length == 0){
        
      }else{
        const lastPayRecord = paymentHistory[paymentHistory.length -1];
        totalPaid = lastPayRecord.total_paid;        
        dueInstallment = lastPayRecord.due_installment_amt;
        
        if(Number(lastPayRecord.due_installment_amt)===0){
          subInstallmentNo = 0;
        }else{
          subInstallmentNo = lastPayRecord.sub_installment_no;
        }
      }   

      try {
        await Order.paymentSubmit({
          order_id : orderData.id,
          customer_id: orderData.customer_id,
          installment_no : payResopnse.installment_no,
          payment_date:  setDBDateFormat(payResopnse.payment_date),
          payment_rec_date : getDate(paymentRecDate),
          payment_amt : paymentAmt,
          total_paid : totalPaid,
          due_installment_amt : dueInstallment,
          sub_installment_no : subInstallmentNo,
          installment_before_delivery : payResopnse.installment_before_delivery,
          last_installment_no : payResopnse.last_installment_no,
          each_payment_amt : orderTypeData.each_payment_amt,
          frequency : orderTypeData.frequency,      
          status : payResopnse.status,
          order_type : orderData.order_type,
          no_of_total_installment : paymentSchedule[paymentSchedule.length - 1].installment_no,
          last_date_of_payment : paymentSchedule[paymentSchedule.length - 1].payment_date, 
        });
        await getPaymentHistory();
        await getPaymentSchedule();
        if(orderData.order_type===1){
          getFixedPaymentTable();
        }else if(orderData.order_type===2){
          getFlexPaymentTable();
        }            
      } catch (error) {
        console.log('Error..',error);
      }        
    }    
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
          {/* <p> */}
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
                { ("Bond Amt:  " + orderTypeData.bond_amt )}
              </Typography>                            
            </Grid>
            }   
            <Grid item xs={12} sm={0}></Grid>  
            <Grid item xs={12} sm={11}>
              <Typography variant="h6" className={classes.labelTitle}>
                {/* {"Rental Product :  " + requesedData.main_category + '/' + requesedData.category +'/'  + requesedData.sub_category + '/' + requesedData.product_name} */}
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

            
            <Grid container spacing={4}>                              
                <Grid item xs={12} sm={12}>    
                {orderData.order_type===1 ?
                  <FixPaymentTable paymentStatus= {paymentStatus} paymentRecDate= {paymentRecDate} paymentAmt= {paymentAmt} handleDateChange= {handleDateChange} handlePriceInput={handlePriceInput} handlePaymentSubmit={handlePaymentSubmit} totalPaidInstallment = {paymentHistory.length} handleSchduleChangerOpen= {handleSchduleChangerOpen} />
                :orderData.order_type===2 ?
                  <FlexPaymentTable paymentStatus= {paymentStatus} paymentRecDate= {paymentRecDate} paymentAmt= {paymentAmt} handleDateChange= {handleDateChange} handlePriceInput={handlePriceInput} handlePaymentSubmit={handlePaymentSubmit} totalPaidInstallment = {paymentHistory.length} handleSchduleChangerOpen= {handleSchduleChangerOpen} />
                :''
                } 
                </Grid>
                <Grid item xs={12} sm={12}>                      
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
