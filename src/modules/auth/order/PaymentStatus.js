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

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';
import ConfirmationDialog from '../ConfirmationDialog.js';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

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
  const [order, setOrder] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [payResopnse, setPayResopnse] = React.useState([]);
  // const [flexPaymentStatus, setFlexPaymentStatus] = useState([]);
  const [paymentHistory,setPaymentHistory] = useState([]);


  
    const getPaymentHistory = async () => {
      try {
        const existingPayment = await Order.getPaymentHistory({id: orderData.id});
        if(existingPayment != ""){
          setPaymentHistory(existingPayment);
        }else{          
          let temp=[];
            temp.push({
              installment_no: 0,
            });
          setPaymentHistory(temp);
        }
      } catch (error) {
        console.log('Error..',error);
      }
    };
  

  
    const getFixedPaymentTable = async () => {
      try {
        const fixOrder = await Order.getCurrespondingFixedOrder({fixedOrderId: orderData.order_type_id});
        console.log('fix' , fixOrder);
          let payment_table=[];
          var paymentDate = new Date(fixOrder[0].first_payment);          
          let totalPaid = fixOrder[0].each_payment_amt;
          let addDays = fixOrder[0].frequency;
          var date ="";
          var monthCount = 0;
          // if(fixOrder[0].frequency ===1){addDays = 30;}
          // else if(fixOrder[0].frequency ===2){addDays = 15;}
          // else if(fixOrder[0].frequency ===4){addDays = 7;}

          for(let i=1; i<= fixOrder[0].no_of_payment; i++){
            if(fixOrder[0].frequency ===1){addDays = 30;}
            else if(fixOrder[0].frequency ===2){addDays = 15;}
            else if(fixOrder[0].frequency ===4){addDays = 7;}
            var month = paymentDate.getMonth() + 1;
            var day = paymentDate.getDate();
            var year = paymentDate.getFullYear();
            if(month < 10){
                month = '0' + month.toString();
              }
            if(day < 10){
                day = '0' + day.toString();
              }
            
            date = year + '-' + month + '-' + day;           

            payment_table.push({
              sr_no : i,
              installment_no: i,
              payment_date: date,
              payment_amt : fixOrder[0].each_payment_amt,
              total_paid : totalPaid,
              installment_before_delivery : fixOrder[0].before_delivery_amt,
              last_installment_no : fixOrder[0].no_of_payment,
            });
            // let a = new Date(paymentDate.getFullYear, paymentDate.getMonth() + 1, 0).getDate();
            let a = new Date(year, month, 0).getDate();
            // // console.log(aa);
            // // paymentDate.setDate();
            if(fixOrder[0].frequency===1){
              // let a = new Date(year, month, 0).getDate();
              if(a === 31){
                addDays += 1;
              }else if(a < 30){
                let b = 30 -a;
                addDays -= b;
              }
            }
            // else if(fixOrder[0].frequency===2){
            //     // var day1 = paymentDate.getDate();
            //     var day1 = new Date(fixOrder[0].first_payment);
            //     var day2 = new Date(fixOrder[0].first_payment);
            //     day2.setDate(day2.getDate()+15);
            //     var date1 = day1.getDate();
            //     var date2 = day2.getDate();
            //     var mon1 = day1.getMonth();
            //     var mon2 = day2.getMonth();
                
                

            //     // var mon = day2.getMonth() + 1;
                
            //     // if(mon !== month || monthCount===1){                  
            //     //   if(a === 31){
            //     //     addDays += 1;
            //     //   }else if(a < 30){
            //     //     let b = 30 -a;
            //     //     addDays -= b;
            //     //   }
            //     //   monthCount = 0;
            //     // }else{
            //     //   monthCount =1 ;
            //     // }
            //     // var month = paymentDate.getMonth();
            //     // const m = new Date(paymentDate.getDate() + 15);
            //     // let c = new Date(m.getDate() + addDays);
            //     // let n = c.getMonth();
            //     console.log('day1',day1);
            //     // console.log('n',month);
            //     console.log('day2',day2)
            //   }
            paymentDate.setDate(paymentDate.getDate() + addDays)            
            totalPaid = totalPaid + fixOrder[0].each_payment_amt; 
          }
            setPaymentStatus(payment_table);             
      } catch (error) {
        console.log('Error..',error);
      }
    };


    const getFlexPaymentTable = async () => {
      try {
        const flexOrder = await Order.getCurrespondingFlexOrder({flexOrderId: orderData.order_type_id});
          let payment_table=[];
          var paymentDate = new Date(flexOrder[0].first_payment);          
          let totalPaid = flexOrder[0].each_payment_amt;
          let addDays = flexOrder[0].frequency;

          // if(flexOrder[0].frequency ===1){addDays = 30;}
          // else if(flexOrder[0].frequency ===2){addDays = 15;}
          // else if(flexOrder[0].frequency ===4){addDays = 7;}

          for(let i=1; i<= flexOrder[0].no_of_payment; i++){
            if(flexOrder[0].frequency ===1){addDays = 30;}            
            else if(flexOrder[0].frequency ===2){addDays = 15;}
            else if(flexOrder[0].frequency ===4){addDays = 7;}
            var month = paymentDate.getMonth() + 1;
            var day = paymentDate.getDate();
            var year = paymentDate.getFullYear();
            if(month < 10){
                month = '0' + month.toString();
              }
            if(day < 10){
                day = '0' + day.toString();
              }
            var date = year + '-' + month + '-' + day;            

            payment_table.push({
              sr_no : i,
              installment_no: i,
              payment_date: date,
              payment_amt : flexOrder[0].each_payment_amt,
              total_paid : totalPaid,
              installment_before_delivery : flexOrder[0].before_delivery_amt,
              last_installment_no : flexOrder[0].no_of_payment,
            });

            let a = new Date(year, month, 0).getDate();
            if(flexOrder[0].frequency===1){
              if(a === 31){
                addDays += 1;
              }else if(a < 30){
                let b = 30 -a;
                addDays -= b;
              }
            }
            
            paymentDate.setDate(paymentDate.getDate() + addDays)
            totalPaid = totalPaid + flexOrder[0].each_payment_amt; 
          }
            setPaymentStatus(payment_table);             
      } catch (error) {
        console.log('Error..',error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try{
        await getPaymentHistory();
        if(orderData.order_type===1){
          await getFixedPaymentTable();
        }else if(orderData.order_type===2){
          await getFlexPaymentTable();
        }
      }catch (error) {
        console.log('Error..',error);
      }
    };
    fetchData();   
  }, []);
  
  
  function handlePaymentSubmit(response){
    setPayResopnse(response);
    setConfirmation(true);
  }

  function handleConfirmationDialog (response){
    if(response === 1){
      const fetchData = async () => {
          try {
            await Order.paymentSubmit({
              order_id : orderData.id,
              customer_id: orderData.customer_id,
              installment_no : payResopnse.installment_no,
              payment_date: payResopnse.payment_date,
              payment_amt : payResopnse.payment_amt,
              total_paid : payResopnse.total_paid,   
              installment_before_delivery : payResopnse.installment_before_delivery,
              last_installment_no : payResopnse.last_installment_no,
            });              
            await getPaymentHistory();
            if(orderData.order_type===1){
              getFixedPaymentTable();
            }else if(orderData.order_type===2){
              getFlexPaymentTable();
            }            
          } catch (error) {
            console.log('Error..',error);
          }
        };
        fetchData();   
    }
    setConfirmation(false);
  }


return (
    <div>
      <Dialog maxWidth open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleBudgetClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Payment Status
              </Typography>
              {/* <Button color="inherit" type="submit">
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
                {/* <Grid item xs={12} sm={12}>
                  <Typography variant="h6" className={classes.labelTitle}>
                      
                  </Typography>
                </Grid> */}
                <Grid item xs={12} sm={12}>        
                <Table >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Payment Date</StyledTableCell>
                        <StyledTableCell>Installment Amt. </StyledTableCell>
                        <StyledTableCell>Paid Amt.</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Option</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { (paymentStatus.length > 0 ? paymentStatus : []).map((data, index) => {
                        return(
                          <TableRow className={ data.installment_no === data.installment_before_delivery ? classes.highlightRow : null}>
                            <StyledTableCell>{data.sr_no}</StyledTableCell>
                            <StyledTableCell>{data.payment_date}</StyledTableCell>
                            <StyledTableCell>{data.payment_amt}</StyledTableCell>
                            {/* {paymentHistory != "" ? paymentHistory.} */}
                            <StyledTableCell >
                                {data.installment_no <= paymentHistory[0].installment_no ? data.total_paid : ''}
                            </StyledTableCell>
                            <StyledTableCell>
                              {data.installment_no <= paymentHistory[0].installment_no ? 'Paid' : 'Pending' } 
                            </StyledTableCell>
                            <StyledTableCell>
                              {/* {data.installment_no < paymentHistory[0].installment_no ?  */}
                               <Button variant="contained" color='primary' className={classes.button} onClick={(event) => { handlePaymentSubmit(data); }} disabled = {data.installment_no === (paymentHistory[0].installment_no + 1) ? false : true}>Paid Installment</Button>
                               {/* : null} */}
                            </StyledTableCell>
                          </TableRow>
                        )
                      })

                      }
                    </TableBody>
                </Table>
                </Grid>
                <Grid item xs={12} sm={12}>                      
                  {/* <Button  variant="contained"  color="primary" className={classes.button}>
                    save
                  </Button> */}
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
    </div>
  );
}
