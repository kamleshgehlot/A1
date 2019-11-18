import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';

// API CALL
import BadgeComp from '../../common/BadgeComp';
import OrderAPI from '../../../api/franchise/Order.js';
import {getDate, getDateInDDMMYYYY} from '../../../utils/datetime'


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

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 1000
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  },
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
}));



export default function Payments({roleName}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [paymentList, setPaymentList] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getReceivedPaymentsList = async () => {
    const result = await OrderAPI.getReceivedPaymentsList();
    setPaymentList(result);
  }

  useEffect(() => {
    getReceivedPaymentsList();
  },[]);

  
const columns = [
  { id: 'sr_no',              label: '#',                     minWidth: 170 },
  { id: 'debitDate',          label: 'Payment Date',          minWidth: 170 },
  { id: 'paymentAmount',      label: 'Payment Amount',        minWidth: 100 },
  // { id: 'settlementDate',     label: 'Date Settled',          minWidth: 170,},
  { id: 'eziDebitCustomerID', label: 'Ezidebit Customer Id',  minWidth: 170,},
  { id: 'customerName',       label: 'Customer Name',         minWidth: 170,},
  { id: 'yourSystemReference',label: 'Client Contract Ref',   minWidth: 170,},
  { id: 'paymentSource',      label: 'Payment Source',        minWidth: 170,},  
];

  return (
    <Paper className={classes.root}>
    <div className={classes.tableWrapper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id}>                      
                      {column.id === "debitDate" ? getDateInDDMMYYYY(value): 
                       column.id === "sr_no" ? index+1 : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={paymentList.length}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        'aria-label': 'previous page',
      }}
      nextIconButtonProps={{
        'aria-label': 'next page',
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </Paper>
  );
}
