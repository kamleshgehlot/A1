import React, {Fragment} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import ViewArrayIcon from '@material-ui/icons/ViewArray'
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';


import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import {getDateInDDMMYYYY} from '../../../../utils/datetime';
import {TablePaginationActions} from '../../../common/Pagination';

// Component
import { API_URL } from '../../../../api/Constants';


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
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },
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

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderRecord({open, handleClose, tabValue, orderList, handleOrderView, handleDownloadDocument}) {
  const classes = useStyles();

  return (
    <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Order List
          </Typography>              
          <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
        </Toolbar>
      </AppBar>
      <Paper className = {classes.paper}> 
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Order No.</StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  <StyledTableCell>Order Date</StyledTableCell>                  
                  <StyledTableCell>Product Status</StyledTableCell>
                  <StyledTableCell>Rental Type</StyledTableCell>
                  <StyledTableCell>Payment Mode</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(orderList.length > 0 ? orderList : []).map((data, index) => {          
                    return(
                      <TableRow key={Math.random()}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.order_id}</TableCell>
                        <TableCell>{data.first_name + ' ' + data.last_name}</TableCell>
                        <TableCell>{data.mobile}</TableCell>
                        <TableCell>{getDateInDDMMYYYY(data.order_date)}</TableCell>
                        <TableCell>{data.product_state}</TableCell>
                        <TableCell>{data.order_type==1 ? 'Fix' : 'Flex'}</TableCell>
                        <TableCell>{data.payment_mode_name} </TableCell>     
                        <TableCell>
                          <Tooltip title="View Order Detail">
                            <span><IconButton  size="small" onClick={(event) => { handleOrderView(data); }} >
                              <ViewArrayIcon />  
                            </IconButton></span>
                          </Tooltip>
                          {tabValue !== 0 &&
                           <Fragment>
                              <Tooltip title="Download Delivered Doc">
                                {(data.delivery_document != null && data.delivery_document != undefined && data.delivery_document != "") ? 
                                  <a href={API_URL + "/api/download?path=DeliveredDoc/" + data.delivery_document }  download >
                                    <span><IconButton  size="small" >
                                      <PrintIcon />
                                    </IconButton></span>
                                  </a> :
                                  <span><IconButton  size="small" >
                                    <PrintIcon />
                                  </IconButton></span>
                                }
                              </Tooltip>
                              <Tooltip title="Update Product Status">
                                <IconButton  size="small" >
                                  <PrintIcon/>
                                </IconButton>
                              </Tooltip>        
                            </Fragment>
                            }
                          </TableCell>                                                  
                      </TableRow>
                    )}
                )}
              </TableBody>
            </Table>
          </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" onClick={handleClose}> Close </Button> 
        </Grid>
      </Grid>
    </Paper>
  </Dialog>
  ) 
}