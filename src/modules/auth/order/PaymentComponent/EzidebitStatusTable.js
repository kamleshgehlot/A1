import React, { useState, useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CancelIcon from '@material-ui/icons/Cancel';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';

import {useCommonStyles} from '../../../common/StyleComman';
import {getDateInDDMMYYYY} from '../../../../utils/datetime';
import {TablePaginationActions} from '../../../common/Pagination';

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
  expansionHeader: {
    fontSize: 13,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));


export default function PaymentStatusTable({paymentList, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  
return (  
    <Table stickyHeader>
      <TableHead> 
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Payment Date</StyledTableCell>
          <StyledTableCell>Settlement Date</StyledTableCell>
          <StyledTableCell>Payment Amount.</StyledTableCell>
          <StyledTableCell>Ezidebit Customer Id</StyledTableCell>
          <StyledTableCell>Customer Name</StyledTableCell>        
          <StyledTableCell>Client Contract Ref</StyledTableCell>        
          <StyledTableCell>Payment Source</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        {paymentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
          return (
            <TableRow> 
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{getDateInDDMMYYYY(data.DebitDate)  === 'Invalid date' ? '' : getDateInDDMMYYYY(data.DebitDate)}</StyledTableCell>
              <StyledTableCell>{getDateInDDMMYYYY(data.SettlementDate) === 'Invalid date' ? '' : getDateInDDMMYYYY(data.SettlementDate)}</StyledTableCell>
              <StyledTableCell>{data.PaymentAmount}</StyledTableCell>
              <StyledTableCell>{data.EzidebitCustomerID}</StyledTableCell>
              <StyledTableCell>{data.CustomerName}</StyledTableCell>
              <StyledTableCell>{data.YourSystemReference}</StyledTableCell>
              <StyledTableCell>{data.PaymentSource}</StyledTableCell>
            </TableRow>           
          )
        })}           
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            colSpan={8}
            count={paymentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />  
        </TableRow>
      </TableFooter>
    </Table>
  )
}