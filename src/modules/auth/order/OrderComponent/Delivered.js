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


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;  
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function Delivered({order, roleName}) {
  const styleClass = useCommonStyles();

return (  
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Order No.</StyledTableCell>
          <StyledTableCell>Customer</StyledTableCell>
          <StyledTableCell>Contact</StyledTableCell>
          <StyledTableCell>Order Date</StyledTableCell>
          {/* <StyledTableCell>Order Status</StyledTableCell> */}
          <StyledTableCell>Delivered Date</StyledTableCell>
          <StyledTableCell>Delivered Time</StyledTableCell>
          {/* <StyledTableCell>Assigned To</StyledTableCell> */}
          <StyledTableCell>Rental Type</StyledTableCell>
          <StyledTableCell>Payment Mode</StyledTableCell>
          {/* <StyledTableCell>Action</StyledTableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
      {(order.length > 0 ? order : []).map((data, index) => {
        return(
          <TableRow>
            <StyledTableCell>{index + 1}</StyledTableCell>
            <StyledTableCell>{data.order_id}</StyledTableCell>
            <StyledTableCell>{data.customer_name}</StyledTableCell>
            <StyledTableCell>{data.mobile}</StyledTableCell>
            <StyledTableCell>{data.order_date}</StyledTableCell>
            <StyledTableCell>{data.delivered_date}</StyledTableCell>
            <StyledTableCell>{data.delivered_time}</StyledTableCell>
            {/* <StyledTableCell>{'In Progress'}</StyledTableCell> */}
            <StyledTableCell>{data.order_type==1 ? 'Fixed' : 'Flex'}</StyledTableCell>
            <StyledTableCell>{
              data.payment_mode == 1 ? 'EasyPay' :  
              data.payment_mode == 2 ? 'Credit' : 
              data.payment_mode == 3 ? 'Debit' : 
              data.payment_mode == 4 ? 'PayPal' : 
              data.payment_mode == 5 ? 'Cash' : ''
              }
            </StyledTableCell>
            {/* <StyledTableCell></StyledTableCell> */}
        </TableRow>
        )        
      })
    }                              
    </TableBody>
  </Table>
  )
}