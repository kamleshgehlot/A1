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
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from './Add';
// import Edit from './Edit';

// API CALL
import OrderAPI from '../../../api/franchise/Order';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(18),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function Order() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [orderRecData,setOrderRecData] = useState([]);

  const [budgetData,setBudgetData] = useState([]);
  const [orderListData,setOrderListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [fixedPaymentData, setFixedPaymentData] = useState(null);
  const [flexPaymentData, setFlexPaymentData] = useState(null);
  const [order,setOrder] = useState([]);

  
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
    },
    button:{
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    fonttransform:{
      textTransform:"initial"
    },
  }));
  const classes = useStyles();

  function handleClickOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }
  function handleSnackbarClick(){
    //don't remove this function
  }

  function handleOrderRecData(response){
    setBudgetData(response.budgetList);
    setOrderListData(response.orderList);
    setCustomerData(response.customerList);
    setFixedPaymentData(response.fixedPaymentList);
    setFlexPaymentData(response.flexPaymentList);
    setOrder(response.order);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const result = await OrderAPI.getAll();
        setOrder(result.order);
        console.log('order..',result);
      } catch (error) {
        console.log(error);
      }
  };
  fetchData();
  }, []);

  return (
    <div>
     <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
            <AddIcon className={classes.extendedIcon} />
              Order
            </Fab>
          </Grid>
          <Grid item xs={12} sm={3}>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                label="Search"
                type="text"
                // value={searchText} 
                // onKeyPress={(ev) => {
                //   if (ev.key ===  'Enter') {
                //     searchHandler()
                //     ev.preventDefault();
                //   }
                // }}
                // onChange={handleSearchText}
                // inputProps={{
                //   endAdorment:(
                //     <InputAdornment position='start'>
                //       <SearchIcon />  ll 
                //     </InputAdornment>
                //   )
                // }}
                // fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position='end'><IconButton><SearchIcon /></IconButton></InputAdornment>,
                }}
              />
              {/* <IconButton  aria-label="Search" >
                <SearchIcon />   
              </IconButton> */}
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Order No.</StyledTableCell>
                        <StyledTableCell>Order By</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Order Date</StyledTableCell>
                        <StyledTableCell>Order Status</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Rental Type</StyledTableCell>
                        <StyledTableCell>Payment Mode</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log('order--',order)}
                      {/* assigned_to: 4
                      budget_id: 1
                      customer_id: 24
                      customer_name: "kamlesh gethlot"
                      mobile: "9785241520"
                      order_date: "2019-08-03"
                      order_id: "O_95"
                      order_status: 1
                      order_type: 2
                      order_type_id: 1
                      payment_mode: 5
                      product_id: "3"
                      telephone: "" */}
                   {
                    //  budgetList: [{…}]
                    //  fixedPaymentList: [{…}]
                    //  orderList
                     (order.length > 0 ? order : []).map((data, index) => {
                       return(
                        <TableRow>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{data.order_id}</StyledTableCell>
                        <StyledTableCell>{data.customer_name}</StyledTableCell>
                        <StyledTableCell>{data.mobile}</StyledTableCell>
                        <StyledTableCell>{data.order_date}</StyledTableCell>
                        <StyledTableCell>{'Assigned'}</StyledTableCell>
                        <StyledTableCell>{'Finance'}</StyledTableCell>
                        <StyledTableCell>{data.order_type==1 ? 'Fixed' : 'Flex'}</StyledTableCell>
                        <StyledTableCell>{
                          data.payment_mode == 1 ? 'EasyPay' :  
                          data.payment_mode == 2 ? 'Credit' : 
                          data.payment_mode == 3 ? 'Debit' : 
                          data.payment_mode == 4 ? 'PayPal' : 
                          data.payment_mode == 5 ? 'Cash' : ''
                          }
                        </StyledTableCell>
                        <StyledTableCell>
                        {/* onClick={(event) => { handleClickEnquiryOpen(data); }} */}
                        
                        <Button  size="small" color="primary"   >
                           Update
                        </Button>
                        
                        <Button  size="small" color="primary">
                            Remove
                        </Button>
                        
                        </StyledTableCell>
                      </TableRow>
                       )
                     })
                   }
                              
                    </TableBody>
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} handleOrderRecData= {handleOrderRecData}/>
      
      {/* {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} franchiseId={franchiseId.franchiseId} role={role} inputs={staffData} setFranchiseList={setFranchiseListFn} /> : null} */}
          
    </div>
  );
}
