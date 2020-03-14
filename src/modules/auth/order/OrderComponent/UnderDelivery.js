import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';

import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';

import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
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


export default function UnderDelivery({order, count, roleName, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  const styleClass = useCommonStyles();
  
return (   
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Order No</StyledTableCell>
          <StyledTableCell>Customer Name</StyledTableCell>
          <StyledTableCell>Contact</StyledTableCell>
          <StyledTableCell>Order Date</StyledTableCell>
          <StyledTableCell>Order Status</StyledTableCell>
          {/* <StyledTableCell>Assigned To</StyledTableCell> */}
          <StyledTableCell>Rental Type</StyledTableCell>
          <StyledTableCell>Payment Mode</StyledTableCell>
          {/* <StyledTableCell>Action</StyledTableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
      {(order.length > 0 ? order : []).map((data, index) => {        
        return(
          <TableRow key={Math.random()}>
            <StyledTableCell>{index + 1}</StyledTableCell>
            <StyledTableCell>{data.order_id}</StyledTableCell>
            <StyledTableCell>{data.first_name + ' ' + data.last_name}</StyledTableCell>
            <StyledTableCell>{data.mobile}</StyledTableCell>
            <StyledTableCell>{getDateInDDMMYYYY(data.order_date)}</StyledTableCell>
            <StyledTableCell>{data.order_status_name}</StyledTableCell>
            {/* <StyledTableCell>{'In Progress'}</StyledTableCell> */}
            <StyledTableCell>{data.order_type==1 ? 'Fix' : 'Flex'}</StyledTableCell>
            <StyledTableCell>{data.payment_mode_name} </StyledTableCell>          
        </TableRow>
        )        
      })
    }                              
      </TableBody>
      
    <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            colSpan={9}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}