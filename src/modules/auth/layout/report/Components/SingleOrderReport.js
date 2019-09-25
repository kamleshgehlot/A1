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
import SendIcon from '@material-ui/icons/send';
import PropTypes from 'prop-types';


import {useCommonStyles} from '../../../../common/StyleComman';


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



export default function SingleOrderReport({data }) {
  const styleClass = useCommonStyles();
  let total = 0;
return (  
  <Table >
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Actual Payment Date.</StyledTableCell>
        <StyledTableCell>Payment Rec. Date.</StyledTableCell>
        <StyledTableCell>Payment Amt.</StyledTableCell>        
      </TableRow>
    </TableHead>
    <TableBody>
    {(data.length > 0 ? data : []).map((data, index) => {  
      total = total + data.payment_amt;          
      return(
        <TableRow>
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell>{data.payment_date}</StyledTableCell>
          <StyledTableCell>{data.payment_rec_date}</StyledTableCell>
          <StyledTableCell>{data.payment_amt}</StyledTableCell>
        </TableRow>
        )
      })
    }
      <TableRow >
          <StyledTableCell style={{'fontWeight':'bold', 'fontSize':'15px'}} colSpan="3" align="right">{"Total   "}</StyledTableCell>
          <StyledTableCell style={{'fontWeight':'bold', 'fontSize':'15px'}}>{total}</StyledTableCell>
      </TableRow>                              
    </TableBody>
  </Table>
  )
}