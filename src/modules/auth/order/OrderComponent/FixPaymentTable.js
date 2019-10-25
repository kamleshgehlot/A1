import React, { useState, useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import InputAdornment from '@material-ui/core/InputAdornment';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/send';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CancelIcon from '@material-ui/icons/Cancel';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';

import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';

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


export default function FixPaymentTable({paymentStatus, paymentRecDate, paymentAmt, handleDateChange, handlePriceInput, handlePaymentSubmit, totalPaidInstallment}) {
  const styleClass = useCommonStyles();
  const [singleInstallment, setSingleInstallment] = useState([]);
  let isExpansionExist = false;

  useEffect(() => {
    let singleInstallment = [];
    let i = 1;

    (paymentStatus.length > 0 ? paymentStatus :[]).map((data, index) => {
      if(data.installment_no === i){
        singleInstallment.push(data);
        i = i + 1;
      }
    });
    setSingleInstallment(singleInstallment);
  },[paymentStatus]);

  // console.log('ddd',singleInstallment);
return (  
  <Table>
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Installment No.</StyledTableCell>
        <StyledTableCell>Payment Date</StyledTableCell>
        <StyledTableCell>Payment Rec. Date</StyledTableCell>
        <StyledTableCell>Last Payment </StyledTableCell>
        <StyledTableCell>Total Deposit</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Option</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {(singleInstallment.length > 0 ? singleInstallment : []).map((singleData, singleIndex) => {
        isExpansionExist = false;
      return (
        (paymentStatus.length > 0 ? paymentStatus : []).map((expanseData, index) => { 
          return(
            (singleData.installment_no == expanseData.installment_no && expanseData.sub_installment_no != 0 && isExpansionExist === false ) ?
            <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
              <Typography>{index}</Typography>
            </ExpansionPanelSummary>
              {isExpansionExist = true}
            <ExpansionPanelDetails>{
            (paymentStatus.length > 0 ? paymentStatus : []).map((data, index) => {
            return(
            (singleData.installment_no == data.installment_no && data.sub_installment_no != 0) &&
                <TableRow className={data.installment_no === data.installment_before_delivery ? styleClass.highlightRow : null}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{data.installment_no}</StyledTableCell>
                      <StyledTableCell>{data.payment_date}</StyledTableCell>
                      <StyledTableCell>
                        {data.payment_rec_date === "" && totalPaidInstallment === index  ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="dense"
                                id="payment_rec_date"
                                name="payment_rec_date"
                                format="dd/MM/yyyy"
                                value={paymentRecDate}
                                fullWidth 
                                InputProps={{
                                  classes: {
                                    input: styleClass.textsize,
                                  },                                        
                                }}                                      
                                disableFuture
                                onChange={handleDateChange}                    
                              />
                            </MuiPickersUtilsProvider>
                          : data.payment_rec_date
                        }   
                      </StyledTableCell>
                      <StyledTableCell>
                        {data.payment_amt === "" && totalPaidInstallment === index ?
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
                          : data.payment_amt              
                        }   
                      </StyledTableCell>                            
                      <StyledTableCell> {data.total_paid !== "" ? data.total_paid : ''} </StyledTableCell>
                      <StyledTableCell> {data.status} </StyledTableCell>
                      <StyledTableCell>
                        <Button variant="contained" color='primary' className={styleClass.button} onClick={(event) => { handlePaymentSubmit(data); }} disabled = { totalPaidInstallment === index ? false : true}>Paid Installment</Button>
                      </StyledTableCell>
                    </TableRow>                    
            )})}
            </ExpansionPanelDetails>
            </ExpansionPanel>:
           
           (singleData.installment_no == expanseData.installment_no && expanseData.sub_installment_no == 0) &&
            <TableRow className={expanseData.installment_no === expanseData.installment_before_delivery ? styleClass.highlightRow : null}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{expanseData.installment_no}</StyledTableCell>
                      <StyledTableCell>{expanseData.payment_date}</StyledTableCell>
                      <StyledTableCell>
                        {expanseData.payment_rec_date === "" && totalPaidInstallment === index  ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="dense"
                                id="payment_rec_date"
                                name="payment_rec_date"
                                format="dd/MM/yyyy"
                                value={paymentRecDate}
                                fullWidth 
                                InputProps={{
                                  classes: {
                                    input: styleClass.textsize,
                                  },                                        
                                }}                                      
                                disableFuture
                                onChange={handleDateChange}                    
                              />
                            </MuiPickersUtilsProvider>
                          : expanseData.payment_rec_date
                        }   
                      </StyledTableCell>
                      <StyledTableCell>
                        {expanseData.payment_amt === "" && totalPaidInstallment === index ?
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
                          : expanseData.payment_amt              
                        }
                      </StyledTableCell>                            
                      <StyledTableCell> {expanseData.total_paid !== "" ? expanseData.total_paid : ''} </StyledTableCell>
                      <StyledTableCell> {expanseData.status} </StyledTableCell>
                      <StyledTableCell>
                        <Button variant="contained" color='primary' className={styleClass.button} onClick={(event) => { handlePaymentSubmit(data); }} disabled = { totalPaidInstallment === index ? false : true}>Paid Installment</Button>
                      </StyledTableCell>
                    </TableRow> 

        )        
      }))})}
  </TableBody>
</Table>
)
}