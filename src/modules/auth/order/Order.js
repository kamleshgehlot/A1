import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Badge from '@material-ui/core/Badge';
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
import EditIcon from '@material-ui/icons/Edit';
import UnselectedCheckBox from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import SelectedCheckBox from '@material-ui/icons/CheckBox';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/send';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import Add from './Add';
import Edit from './Edit';
import PaymentStatus from './PaymentStatus';
import FlexTypeDD from './FlexTypeDoc';
import FixedTypeDD from './FixedOrderDoc';

import ConfirmationDialog from '../ConfirmationDialog.js';

import axios from 'axios';
import { saveAs } from 'file-saver';

// API CALL
import OrderAPI from '../../../api/franchise/Order';
import PdfAPI from '../../../api/PDF';
import { fontSize } from '@material-ui/system';
import { async } from 'q';

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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function Order() {
  const roleName = APP_TOKEN.get().roleName;
  // const userName = APP_TOKEN.get().userName;
  
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [orderRecData,setOrderRecData] = useState([]);
  const [editableData,setEditableData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [nextStep, setNextStep] = React.useState('');
  const [uploadType, setUploadType] = useState('');
  // const [uploadType, setUploadType] = useState('');
  const [orderId, setOrderId] = useState();
  const [budgetData,setBudgetData] = useState([]);
  const [orderListData,setOrderListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [fixedPaymentData, setFixedPaymentData] = useState(null);
  const [flexPaymentData, setFlexPaymentData] = useState(null);
  const [orderIdForUpload,setOrderIdForUpload] = useState(null);
  const [order,setOrder] = useState([]);
  const [deliveryTabIndex, setDeliveryTabIndex] = useState();
  const [completedTabIndex, setCompletedTabIndex] = useState();
  const [deliveredTabIndex, setDeliveredTabIndex] = useState();
  

  

  //value is for tabs  
  const [value, setValue] = React.useState(0);


  function createAndDownloadPdf(data) {
    if(data.order_type === 2){
      const fetchData = async () => {
        try {
          const result = await OrderAPI.getFlexOrderDataForPDF({data: data});
          pdfmake.vfs = pdfFonts.pdfMake.vfs;
          var dd = FlexTypeDD(result,data);
          pdfmake.createPdf(dd).open();
          // pdfmake.createPdf(dd).download('document.pdf');
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    if(data.order_type === 1){
      const fetchData = async () => {
        try {
          const result = await OrderAPI.getFixedOrderDataForPDF({data: data});
          
          pdfmake.vfs = pdfFonts.pdfMake.vfs;
          var dd = FixedTypeDD(result,data);
      //  pdfmake.createPdf(dd).download('document.pdf');
          pdfmake.createPdf(dd).open();

        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

    // pdfmake.createPdf(dd).download();
    // pdfmake.createPdf(dd).print({},window);
    // pdfmake.createPdf(dd).print();
    // const pdfDocGenerator = pdfMake.createPdf(dd);
  }

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      // width: 1000
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
      fontSize: theme.typography.pxToRem(14),
      color:"white",
      marginTop:theme.spacing(-3),
    },
    button:{
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
    },
    input: {
      display: 'none',
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
      textTransform:"initial",
      fontSize: theme.typography.pxToRem(13),
    },
    textsize:{
      fontSize: theme.typography.pxToRem(12),
      color: 'white',
    },
    badge: {
      padding: theme.spacing(0, 2)
    }
  }));


  
  const classes = useStyles();

  function handleClickOpen(){
    setOpen(true);
  }

  function handleClose(result){
    setOpen(false);
  }

  function handlePaymentStatusClose(){
    // setOrder([]);
    const fetchData = async () => {
      try {
        const result = await OrderAPI.getAll();
        setOrder(result.order);
      } catch (error) {
        console.log(error);
      }
  };
    fetchData();
    setPaymentStatusOpen(false);
  }
  
  const uploadFileSelector = async (event) =>{
    
    try {      
        let formData = new FormData();
        formData.append('data', JSON.stringify(orderIdForUpload));

        if(uploadType === 'Documents'){
          for (var x = 0; x < document.getElementById('upload_document').files.length; x++) {
            formData.append('avatar', document.getElementById('upload_document').files[x])

            if(document.getElementById('upload_document').files.length !=0) {
              const result = await OrderAPI.uploadDocument({formData: formData});
              if(result.order.length>0){
                alert('Upload Successfully...');
                setOrder(result.order);
                setOrderIdForUpload(null);
              }
            }
          }
        }else if(uploadType === 'DeliveredDoc'){
          for (var x = 0; x < document.getElementById('upload_delivery_doc').files.length; x++) {
            formData.append('avatar', document.getElementById('upload_delivery_doc').files[x])
          }

          if(document.getElementById('upload_delivery_doc').files.length !=0) {
            const result = await OrderAPI.uploadDeliveryDoc({formData: formData});
            if(result.order.length>0){
              alert('Upload Successfully...');
              setOrder(result.order);
              setOrderIdForUpload(null);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
  };
  
  

  function handleUploadFile(orderId){
    setUploadType('Documents');
    setOrderIdForUpload(orderId);
  }

  function handleDeliveryDoc(orderId){
    setUploadType('DeliveredDoc');
    setOrderIdForUpload(orderId);
  }

  function handleEditOpen(data){
    setEditableData(data);
    setEditOpen(true);
  }

  function handleAssignToFinance(data){;
    setOrderId(data);
    setNextStep('Finance');
    setConfirmation(true);
  }

  function handleAssignToDelivery(data){;
    setOrderId(data);
    setNextStep('Delivery');
    setConfirmation(true);
  }

  function handleDelivered(data){
    setOrderId(data);
    setNextStep('Delivered');
    setConfirmation(true);
  }

  function handlePaymentStatus(data){
    setOrderData(data);
    setPaymentStatusOpen(true);
  }
  

  function handleConfirmationDialog (response){
    if(response === 1){
      const fetchData = async () => {
        try {  
          if(nextStep === 'Finance')
            {
              const result = await OrderAPI.assignToFinance({assigned_to: 4, id: orderId});
              setOrder(result.order);
            }
          else if(nextStep === 'Delivery'){
            const result = await OrderAPI.assignToDelivery({assigned_to: 5, id: orderId});
            setOrder(result.order);
          }else if(nextStep === 'Delivered'){
            const result = await OrderAPI.delivered({assigned_to: 5, id: orderId, delivered_at: new Date().toString()});
            setOrder(result.order);
          }
        } catch (error) {
          console.log(error);
        }
    };
    fetchData();
    }
    setConfirmation(false);
  }
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
    // console.log('date', new Date().toString());

    roleName ==='CSR' ?  setDeliveryTabIndex(2): roleName ==='Finance' ?  setDeliveryTabIndex(1) :'';
    roleName ==='CSR' ?  setDeliveredTabIndex(3) : roleName ==='Finance' ? setDeliveredTabIndex(2) : roleName ==='Delivery' ? setDeliveredTabIndex(1) : '';
    roleName ==='CSR' ?  setCompletedTabIndex(4) : roleName ==='Finance' ? setCompletedTabIndex(3) : '';
  }, []);

  
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

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }


  return (
    // <div ref={ref}>
    <div>
     <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {roleName === 'CSR' ? 
            <Fab
              variant="extended"
              size="small"
              // color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
            <AddIcon className={classes.extendedIcon} />
              Order
            </Fab>
            : '' }
          </Grid>
        
          <Grid item xs={12} sm={4}>
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
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton><SearchIcon /></IconButton>
                                  </Tooltip>
                                </InputAdornment>,
                }}
              />
              {/* <IconButton  aria-label="Search" >
                <SearchIcon />   
              </IconButton> */}
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize}>
                  <Tab label={ <Badge className={classes.badge} color="secondary" badgeContent={order.length}>Open</Badge>}/>
                  {roleName ==='CSR' ? <Tab label="Finance" /> : '' }
                  {roleName !='Delivery' ? <Tab label="Delivery" /> : ''}
                  <Tab label="Delivered" /> 
                  {roleName !=='Delivery' ? <Tab label="Completed" /> : ''}
                </Tabs>
              </AppBar> 
              
              <TabPanel value={value} index={0}>
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
                    {(order.length > 0 ? order : []).map((data, index) => {
                      if(data.assigned_to !== 4 && data.assigned_to !== 5 && roleName==='CSR'){
                       return(
                        <TableRow>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{data.order_id}</StyledTableCell>
                          <StyledTableCell>{data.customer_name}</StyledTableCell>
                          <StyledTableCell>{data.mobile}</StyledTableCell>
                          <StyledTableCell>{data.order_date}</StyledTableCell>
                          <StyledTableCell>{data.order_status_name}</StyledTableCell>
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
                              <Tooltip title="Update">
                                <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }} disabled= {data.assigned_to===4}>
                                  <EditIcon />  
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Download PDF">
                                <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { createAndDownloadPdf(data); }}>
                                  <PrintIcon /> 
                                </IconButton>
                              </Tooltip>
                              
                              <input multiple accept="image/*" className={classes.input} id="upload_document" type="file" onChange={uploadFileSelector}/>
                                <label htmlFor="upload_document">
                                  <Tooltip title="Upload Documents">                              
                                    <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} aria-label="upload picture" component="span" onClick={(event) => { handleUploadFile(data.id); }}>
                                      <CloudUpload />
                                    </IconButton>
                                  </Tooltip>
                                </label>
                              <Tooltip title="Assign to Finance">
                                <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleAssignToFinance(data.id); }} disabled= {data.doc_upload_status===0}>
                                  <SendIcon />
                                </IconButton>
                              </Tooltip>
                       </StyledTableCell>
                      </TableRow>
                      )} else if((data.assigned_to === 4 || data.assigned_to === 5) && data.order_status !==8 && roleName==='Finance'){
                        return(
                          <TableRow>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{data.order_id}</StyledTableCell>
                            <StyledTableCell>{data.customer_name}</StyledTableCell>
                            <StyledTableCell>{data.mobile}</StyledTableCell>
                            <StyledTableCell>{data.order_date}</StyledTableCell>
                            <StyledTableCell>{data.order_status_name}</StyledTableCell>
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
                                <Tooltip title="Payment Status">
                                  <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handlePaymentStatus(data); }} >
                                    <PaymentIcon />  
                                  </IconButton>
                                </Tooltip>
  
                                <Tooltip title="Assign to Delivery">
                                  <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleAssignToDelivery(data.id); }} disabled= {data.order_status !==4  || data.assigned_to===5}>
                                    <SendIcon />
                                  </IconButton>
                                </Tooltip>
                         </StyledTableCell>
                        </TableRow>
                        )
                      }else if(data.assigned_to===5 && roleName ==='Delivery'){
                        if(data.assigned_to === 5 && data.order_status ===5 ){
                          return(
                           <TableRow>
                             <StyledTableCell>{index + 1}</StyledTableCell>
                             <StyledTableCell>{data.order_id}</StyledTableCell>
                             <StyledTableCell>{data.customer_name}</StyledTableCell>
                             <StyledTableCell>{data.mobile}</StyledTableCell>
                             <StyledTableCell>{data.order_date}</StyledTableCell>
                             <StyledTableCell>{data.order_status_name}</StyledTableCell>
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
                                
                                <Tooltip title="Download Form">
                                <a href={"server\\files\\order\\" + data.uploaded_doc }  download >
                                {/* {inputs.id_proof} */}
                                  <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} >
                                    <PrintIcon />
                                  </IconButton>
                                </a>
                                </Tooltip>
                                <input multiple accept="image/*" className={classes.input} id="upload_delivery_doc" type="file" onChange={uploadFileSelector} disabled  = {data.order_status >=6 ? true : false} />
                                <label htmlFor="upload_delivery_doc">
                                  <Tooltip title="Upload">                              
                                    <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} aria-label="upload picture" component="span" onClick={(event) => { handleDeliveryDoc(data.id); }} disabled = {data.order_status >=6 ? true : false}>
                                      <CloudUpload />
                                    </IconButton>
                                  </Tooltip>
                                </label>                                
                                <Tooltip title="Check if Delivered">
                                  <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} onClick={(event) => { handleDelivered(data.id); }} disabled={(data.delivery_doc_uploaded !==1 || data.order_status >=6) ? true : false}>
                                    {data.order_status ===6 ? <SelectedCheckBox /> : data.order_status !==6 ? <UnselectedCheckBox />  : ''}                                   
                                  </IconButton>
                                </Tooltip>                                 
                         </StyledTableCell>
                             {/* <StyledTableCell></StyledTableCell> */}
                         </TableRow>
                          )
                         }
                      }
                     })
                   }
                              
                    </TableBody>
                  </Table>
                </TabPanel>

              {/* finance */}
              { roleName ==='CSR' ? 
              <TabPanel value={value} index={1}>
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
                        {/* <StyledTableCell>Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {(order.length > 0 ? order : []).map((data, index) => {
                      if(data.assigned_to === 4){
                       return(
                        <TableRow>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{data.order_id}</StyledTableCell>
                          <StyledTableCell>{data.customer_name}</StyledTableCell>
                          <StyledTableCell>{data.mobile}</StyledTableCell>
                          <StyledTableCell>{data.order_date}</StyledTableCell>
                          <StyledTableCell>{data.order_status_name}</StyledTableCell>
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
                         
                      </TableRow>
                       )
                      }
                     })
                   }
                              
                    </TableBody>
                  </Table>
                </TabPanel>
                : null }
                
              {/* delivery */}
              
              {roleName === 'CSR' || 'Finance' ?               
              <TabPanel value={value} index={deliveryTabIndex}>
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
                        {/* <StyledTableCell>Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {(order.length > 0 ? order : []).map((data, index) => {
                      if(data.assigned_to === 5 && data.order_status ===5 ){
                       return(
                        <TableRow>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{data.order_id}</StyledTableCell>
                          <StyledTableCell>{data.customer_name}</StyledTableCell>
                          <StyledTableCell>{data.mobile}</StyledTableCell>
                          <StyledTableCell>{data.order_date}</StyledTableCell>
                          <StyledTableCell>{data.order_status_name}</StyledTableCell>
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
                      }
                     })
                   }                              
                    </TableBody>
                  </Table>
                </TabPanel>
                : null }

                
                {/* Delivered */}
                {/* {roleName === 'Delivery' ?     */}
              <TabPanel value={value} index={deliveredTabIndex}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Order No.</StyledTableCell>
                        <StyledTableCell>Customer</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Order Date</StyledTableCell>
                        {/* <StyledTableCell>Order Status</StyledTableCell> */}
                        <StyledTableCell>Delivery Date</StyledTableCell>
                        {/* <StyledTableCell>Assigned To</StyledTableCell> */}
                        <StyledTableCell>Rental Type</StyledTableCell>
                        <StyledTableCell>Payment Mode</StyledTableCell>
                        {/* <StyledTableCell>Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {(order.length > 0 ? order : []).map((data, index) => {
                      if(data.order_status >= 6 && roleName==='Delivery'){
                       return(
                        <TableRow>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{data.order_id}</StyledTableCell>
                          <StyledTableCell>{data.customer_name}</StyledTableCell>
                          <StyledTableCell>{data.mobile}</StyledTableCell>
                          <StyledTableCell>{data.order_date}</StyledTableCell>
                          <StyledTableCell>{data.delivered_at}</StyledTableCell>
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
                      }else if(data.order_status === 6){
                        return(
                          <TableRow>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{data.order_id}</StyledTableCell>
                            <StyledTableCell>{data.customer_name}</StyledTableCell>
                            <StyledTableCell>{data.mobile}</StyledTableCell>
                            <StyledTableCell>{data.order_date}</StyledTableCell>
                            <StyledTableCell>{data.delivered_at}</StyledTableCell>
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
                      }
                     })
                   }                              
                    </TableBody>
                  </Table>
                </TabPanel>                
                {/* : null } */}

                   {/* Completed */}
              {roleName === 'CSR' || 'Finance' ?    
              <TabPanel value={value} index={completedTabIndex}>
                  <Table>
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
                        {/* <StyledTableCell>Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {(order.length > 0 ? order : []).map((data, index) => {
                      if(data.order_status === 8 ){
                       return(
                        <TableRow>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{data.order_id}</StyledTableCell>
                          <StyledTableCell>{data.customer_name}</StyledTableCell>
                          <StyledTableCell>{data.mobile}</StyledTableCell>
                          <StyledTableCell>{data.order_date}</StyledTableCell>
                          <StyledTableCell>{data.order_status_name}</StyledTableCell>
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
                      }
                     })
                   }                              
                    </TableBody>
                  </Table>
                </TabPanel>                
                : null }
              
             
              </Paper>
          </Grid>
        </Grid>
     {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} handleOrderRecData= {handleOrderRecData} convertLead={0} /> : null }
     {paymentStatusOpen ? <PaymentStatus open={paymentStatusOpen} handleClose={handlePaymentStatusClose} handleSnackbarClick={handleSnackbarClick} orderData = {orderData}  /> : null }
     {editOpen? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick}  handleOrderRecData= {handleOrderRecData} editableData={editableData} /> : null}
     {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={"Send to finance ?"} content={"Do you really want to send selected order to next ?"} />: null }
          
    </div>
  );
}
