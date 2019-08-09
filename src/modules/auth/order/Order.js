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
import EditIcon from '@material-ui/icons/Edit';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/send';
import Tooltip from '@material-ui/core/Tooltip';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from './Add';
import Edit from './Edit';
import ConfirmationDialog from '../ConfirmationDialog.js';

import axios from 'axios';
import { saveAs } from 'file-saver';

// API CALL
import OrderAPI from '../../../api/franchise/Order';
import PdfAPI from '../../../api/PDF';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(16),
    padding:theme.spacing(1),
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
  const [editableData,setEditableData] = useState({});
  const [confirmation, setConfirmation] = React.useState(false);
  const [orderId, setOrderId] = useState();
  const [budgetData,setBudgetData] = useState([]);
  const [orderListData,setOrderListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [fixedPaymentData, setFixedPaymentData] = useState(null);
  const [flexPaymentData, setFlexPaymentData] = useState(null);
  const [order,setOrder] = useState({});


  

  function createAndDownloadPdf() {
    // const state = {
    //   name: 'Bhagyashree Mathur',
    //   receiptId: 123,
    //   price1: 120,
    //   price2: 125,
    // }
    // axios.post('/create-pdf',state)
    //   .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
    //   .then((res) => {
    //     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    //     saveAs(pdfBlob, 'newPdf.pdf');
    //   })
  }

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
    fab:{
      marginRight: theme.spacing(1),
      fontSize: 12,
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

  function handleDocumentUpload(orderId){

  //   let formData = new FormData();

  //   formData.append('data', JSON.stringify(orderId));
    
  //   for (var x = 0; x < document.getElementById('id_proof').files.length; x++) {
  //     formData.append('avatar', document.getElementById('id_proof').files[x])
  //   }
  //   // console.log("formadata", formData);
  //   const response = await Customer.register({ formData: formData });
    

  //   const fetchData = async () => {
  //     try {
  //       const result = await OrderAPI.uploadDocument({id: orderId});
  //       // setOrder(result.order);
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };
  // fetchData();

  }

  function handleEditOpen(data){
    setEditableData(data);
    setEditOpen(true);
  }

  function handleAssignToFinance(data){;
    setOrderId(data);
    setConfirmation(true);
    // console.log('ddd',orderId);
  }
  

  function handleConfirmationDialog (response){

    // console.log('res..',response);
    if(response === 1){
      const fetchData = async () => {
        try {
  
          const result = await OrderAPI.assignToFinance({assigned_to: 4, id: orderId});
          setOrder(result.order);
        } catch (error) {
          console.log(error);
        }
    };
    fetchData();
    }
    setConfirmation(false);
  }
  // console.log('ordeerm,',order);
  function handleEditClose(){
    setEditOpen(false);
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
      } catch (error) {
        console.log(error);
      }
  };
  fetchData();
  }, []);

  return (
    <div>
     <Grid container spacing={2}>
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
                        {/* <StyledTableCell>Assigned To</StyledTableCell> */}
                        <StyledTableCell>Rental Type</StyledTableCell>
                        <StyledTableCell>Payment Mode</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {console.log('eee',order)} */}
                    {(order.length > 0 ? order : []).map((data, index) => {
                      if(data.assigned_to != 4){
                       return(
                        <TableRow>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{data.order_id}</StyledTableCell>
                        <StyledTableCell>{data.customer_name}</StyledTableCell>
                        <StyledTableCell>{data.mobile}</StyledTableCell>
                        <StyledTableCell>{data.order_date}</StyledTableCell>
                        <StyledTableCell>{'In Progress'}</StyledTableCell>
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
                        <StyledTableCell>
                        {/* */}
                        {/* onClick={(event) => { handleEditOpen(data); }} */}
                        
                        <Tooltip title="Update">
                        <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }} disabled= {data.assigned_to===4}>
                          <EditIcon />  
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Download PDF">
                        <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={createAndDownloadPdf()}>
                          <PrintIcon /> 
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Upload Documents">
                        <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleDocumentUpload(data.id); }} disabled= {data.assigned_to===4}>
                          <CloudUpload />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Assign to Finance">
                        <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleAssignToFinance(data.id); }} disabled= {data.assigned_to===4}>
                          <SendIcon />
                        </IconButton>
                        </Tooltip>
                       
                        {/* <Fab variant="round" tooltip="Update" size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }}>
                            <EditIcon />
                        </Fab>
                        <Fab variant="round" size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }}>
                            <PdfIcon />
                        </Fab>
                        <Fab variant="round" size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }}>
                            <SendIcon />
                        </Fab> */}
                      
                        {/* <Button variant="outlined" size="small" color="primary"  value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }} >
                          Update
                        </Button>                       
                         */}
                        </StyledTableCell>
                      </TableRow>
                       )
                      }
                     })
                   }
                              
                    </TableBody>
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} handleOrderRecData= {handleOrderRecData}/> : null }
     {editOpen? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick}  handleOrderRecData= {handleOrderRecData} editableData={editableData} /> : null}
     {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={"Send to finance ?"} content={"Do you really want to send selected order to finance ?"} />: null }
          
    </div>
  );
}
