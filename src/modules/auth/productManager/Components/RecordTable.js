import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';


// Components


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
 
}));


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

export default function RecordTable({productList, tabValue, handleOrderRecord}) {

  const classes = useStyles();
    

return (  
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell>Product Id</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>No. of Rented Items</StyledTableCell>          
          {/* {tabValue !== 0 &&  */}
          <StyledTableCell>Action</StyledTableCell> 
          {/* } */}
        </TableRow>
      </TableHead>
      <TableBody>
      {(productList.length > 0 ? productList: []).map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row"> {row.id} </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.total_rented}</TableCell>
          {/* {tabValue !== 0 &&  */}
          <TableCell>
            <Tooltip title="View Order Detail">
              <IconButton  size="small"  component="span" onClick = {() => {handleOrderRecord(row)}}>
                <ViewIcon/>
              </IconButton>
            </Tooltip>
          </TableCell>
          {/* } */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}