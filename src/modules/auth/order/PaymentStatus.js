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



export default function Budget({ open, handleClose, handleSnackbarClick, orderData}) {

  const classes = useStyles();
  const [order, setOrder] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  // const [flexPaymentStatus, setFlexPaymentStatus] = useState([]);
  const [paymentHistory,setPaymentHistory] = useState([]);
  // setPaymentHistory({installment_no : 0});

  useEffect(() => {
    const fetchData = async () => {
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
        
        if(orderData.order_type === 1 ){
          const order = await Order.getCurrespondingFixedOrder({fixedOrderId: orderData.order_type_id});
          console.log('fixed order',order); 
          
          let payment_table=[];
          let paymentDate = order[0].first_payment;
          let totalPaid = order[0].each_payment_amt;

          for(let i=1; i<= order[0].no_of_payment; i++){
            payment_table.push({
              sr_no : i,
              installment_no: i,
              payment_date: paymentDate,
              payment_amt : order[0].each_payment_amt,
              total_paid : totalPaid,
              installment_before_delivery : order[0].before_delivery_amt,
              // status : 1,              
            });
            paymentDate =  order[0].first_payment;
            totalPaid = totalPaid + order[0].each_payment_amt; 
          }
          console.log(payment_table);
          setPaymentStatus(payment_table);
              
        }else if(orderData.order_type === 2) {
          // console.log('flex',orderData.order_type_id);
          const order = await Order.getCurrespondingFlexOrder({flexOrderId: orderData.order_type_id});
          // console.log('flex order',order);
        }
        // const order = await Order.getExistingBudget({customer_id: customer_id});
        // console.log('order',order);
        // setOldBudgetList(order.oldBudget);   
      } catch (error) {
        console.log('Error..',error);
      }
    };
    fetchData();
   
  }, []);
  
  
  function handlePaymentSubmit(response){
    // console.log(response);

    const fetchData = async () => {
      try {
        const result = await Order.paymentSubmit({
          order_id : orderData.id,
          customer_id: orderData.customer_id,
          installment_no : response.installment_no,
          payment_date: response.payment_date,
          payment_amt : response.payment_amt,
          total_paid : response.total_paid,   
          installment_before_delivery : response.installment_before_delivery,
        });
        // console.log('result',result);
        setOrder(result);
      } catch (error) {
        console.log('Error..',error);
      }
    };
    fetchData();       
    handleClose(); 
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
                          <TableRow>
                            <StyledTableCell>{data.sr_no}</StyledTableCell>
                            <StyledTableCell>{data.payment_date}</StyledTableCell>
                            <StyledTableCell>{data.payment_amt}</StyledTableCell>
                            {/* {paymentHistory != "" ? paymentHistory.} */}
                            <StyledTableCell>
                                {data.installment_no <= paymentHistory[0].installment_no ? data.total_paid : ''}
                            </StyledTableCell>
                            <StyledTableCell>
                              {data.installment_no <= paymentHistory[0].installment_no ? 'Paid' : 'Pending' } 
                            </StyledTableCell>
                            <StyledTableCell>
                              {/* {data.installment_no < paymentHistory[0].installment_no ?  */}
                               <Button  variant="contained" color="primary" className={classes.button} onClick={(event) => { handlePaymentSubmit(data); }} disabled = {data.installment_no === (paymentHistory[0].installment_no + 1) ? false : true}>Paid Installment</Button>
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
      {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={"Send to finance ?"} content={"Do you really want to send selected order to finance ?"} />: null }
    </div>
  );
}
