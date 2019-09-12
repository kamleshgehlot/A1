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
import { API_URL } from '../../../api/Constants';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import BadgeComp  from '../../common/BadgeComp';
import Snackbar from '@material-ui/core/Snackbar';

import Add from './Add';
import Edit from './Edit';
import PaymentStatus from './PaymentStatus';
import FlexTypeDD from './FlexTypeDoc';
import FixedTypeDD from './FixedOrderDoc';

import Open from './OrderComponent/Open';
import Finance from './OrderComponent/Finance';
import UnderDelivery from './OrderComponent/UnderDelivery';
import Delivered from './OrderComponent/Delivered';
import Completed from './OrderComponent/Completed';

import ConfirmationDialog from '../ConfirmationDialog.js';
import ProcessDialog from '../ProcessDialog.js';
import CommentDialog from '../CommentDialog.js';
import CommentView from './CommentView.js';

// API CALL
import OrderAPI from '../../../api/franchise/Order';


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
  }
}));


export default function Order({roleName}) {  
  const classes = useStyles();
  const userId = APP_TOKEN.get().userId;

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [orderRecData,setOrderRecData] = useState([]);
  const [editableData,setEditableData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [nextStep, setNextStep] = React.useState('');
  const [uploadType, setUploadType] = useState('');
  const [orderId, setOrderId] = useState();
  const [budgetData,setBudgetData] = useState([]);
  const [orderListData,setOrderListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [fixedPaymentData, setFixedPaymentData] = useState(null);
  const [flexPaymentData, setFlexPaymentData] = useState(null);
  const [orderIdForUpload,setOrderIdForUpload] = useState(null);
  const [order,setOrder] = useState([]);
  const [snackbarContent, setSnackbarContent] = useState([]);
  const [commentBoxOpen,setCommentBoxOpen]  = useState(false);
  const [openCommentView, setOpenCommentView]  = useState(false);
  const [commentData,setCommentData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [processDialog,setProcessDialog] = useState(false);
  
  //Tab Data for corresponding role 
  const [openTab,setOpenTab] = useState([]);
  const [financeTab,setFinanceTab] = useState([]);
  const [underDeliveryTab,setUnderDeliveryTab] = useState([]);
  const [deliveredTab,setDeliveredTab] = useState([]);
  const [completedTab,setCompletedTab] = useState([]);
  
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

  function handleClickOpen(){
    setOpen(true);
  }

  function handleClose(result){
    setOpen(false);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handlePaymentStatusClose(){
    const fetchData = async () => {
      try {        
        const result = await OrderAPI.getAll();
        setOrder(result.order);
        handleTabsData(result.order);
      } catch (error) {
        console.log(error);
      }
  };
    fetchData();
    setPaymentStatusOpen(false);
  }
  
  const uploadFileSelector = async (event) =>{
    setProcessDialog(true);
    try {      
        let formData = new FormData();
        formData.append('data', JSON.stringify(orderIdForUpload));

        if(uploadType === 'Documents'){
          for (var x = 0; x < document.getElementById('upload_document').files.length; x++) {
            formData.append('avatar', document.getElementById('upload_document').files[x])
            if(document.getElementById('upload_document').files.length !=0) {
              const result = await OrderAPI.uploadDocument({formData: formData});      
              setProcessDialog(false);  
              setOrderIdForUpload(null);
              if(result.order.length>0){        
                setOrder(result.order);
                handleTabsData(result.order);
              }
              if(result.isUploaded === 1){
                if(processDialog===false){
                  setSnackbarContent({message:"Successfully Uploaded.", variant: "success"});
                  setSnackbarOpen(true);
                }
              }else if(result.isUploaded === 0){
                if(processDialog===false){
                  setSnackbarContent({message:"Upload Failed", variant: "error"});
                  setSnackbarOpen(true);
                }
              }
            }
          }
        }else if(uploadType === 'DeliveredDoc'){
          for (var x = 0; x < document.getElementById('upload_delivery_doc').files.length; x++) {
            formData.append('avatar', document.getElementById('upload_delivery_doc').files[x])
          }

          if(document.getElementById('upload_delivery_doc').files.length !=0) {
            const result = await OrderAPI.uploadDeliveryDoc({formData: formData});
            setProcessDialog(false);  
            setOrderIdForUpload(null);
            if(result.order.length>0){        
              setOrder(result.order);
              handleTabsData(result.order);
            }
            if(result.isUploaded === 1){
              if(processDialog===false){
                setSnackbarContent({message:"Successfully Uploaded.", variant: "success"});
                setSnackbarOpen(true);
              }
            }else if(result.isUploaded === 0){
              if(processDialog===false){
                setSnackbarContent({message:"Upload Failed", variant: "error"});
                setSnackbarOpen(true);
              }
            }            
          }
        }
      } catch (error) {
        console.log(error);
      }
  };
  
  function handleProcessDialogClose(){
    setProcessDialog(false);
  }

  function handleCommentBoxClose(){
    setCommentBoxOpen(false);
  }
  

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
    
    setCommentData({order_id: data, user_id: userId, roleName: roleName});
    setCommentBoxOpen(true);

    if(commentBoxOpen===false){
      setOrderId(data);
      setNextStep('Delivered');
      setConfirmation(true);
    }
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
              setCommentData({order_id: orderId, user_id: userId, roleName: roleName});
              setCommentBoxOpen(true);
              handleTabsData(result.order);              
            }
          else if(nextStep === 'Delivery'){
            const result = await OrderAPI.assignToDelivery({assigned_to: 5, id: orderId});
            setOrder(result.order);
            setCommentData({order_id: orderId, user_id: userId, roleName: roleName});
            setCommentBoxOpen(true);
            handleTabsData(result.order);
          }else if(nextStep === 'Delivered'){
            const result = await OrderAPI.delivered({assigned_to: 5, id: orderId, delivered_at: new Date().toString()});
            setOrder(result.order);
            // setCommentData({order_id: orderId, user_id: userId, roleName: roleName});
            // setCommentBoxOpen(true);
            handleTabsData(result.order);
          }
        } catch (error) {
          console.log(error);
        }
    };
    fetchData();
    }
    setConfirmation(false);
  }

  function handleClickViewOpen(orderId) {
    setOrderId(orderId)
    setOpenCommentView(true);
  }

  function handleViewClose() {
    setOpenCommentView(false);
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
    handleTabsData(response.order);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await OrderAPI.getAll();
        setOrder(result.order);      
        handleTabsData(result.order);
      } catch (error) {
        console.log(error);
      }
  };
    fetchData();
  },[roleName]);

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
    handleTabsData(order);
  }  

  function handleTabsData(order){  
    let open = [];
    let finance = [];
    let underDelivery = [];
    let delivered = [];
    let completed = [];

    if(roleName === 'CSR'){
      (order.length > 0 ? order : []).map((data, index) => {        
        if(data.assigned_to !== 4 && data.assigned_to !== 5){
          open.push(data);
          }
        if(data.assigned_to === 4){
          finance.push(data);
          }
        if(data.assigned_to === 5 && data.order_status ===5){
          underDelivery.push(data);
          }
        if(data.order_status === 6){
          delivered.push(data);
          }
        if(data.order_status === 8){
          completed.push(data);
          }
        });
    }else if (roleName === 'Finance'){
      (order.length > 0 ? order : []).map((data, index) => {        
        if((data.assigned_to === 4 || data.assigned_to === 5) && data.order_status !==8 ){
          open.push(data);
          }
        if(data.assigned_to === 5 && data.order_status ===5){
          underDelivery.push(data);
          }
        if(data.order_status === 6){
          delivered.push(data);
          }
        if(data.order_status === 8){
          completed.push(data);
          }
        });
    }else if (roleName === 'Delivery'){
      (order.length > 0 ? order : []).map((data, index) => {        
        if(data.assigned_to === 5 && data.order_status ===5){
          open.push(data);
          }
        if(data.order_status >= 6){
          delivered.push(data);
          }
        });
    }
    setOpenTab(open);
    setFinanceTab(finance);
    setUnderDeliveryTab(underDelivery);
    setDeliveredTab(delivered);
    setCompletedTab(completed);
  }


  return (
    // <div ref={ref}>
    <div>

     <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {roleName === 'CSR' ? 
            <Fab variant="extended" size="small" aria-label="Add" className={classes.fonttransform} onClick={handleClickOpen}>
              <AddIcon className={classes.extendedIcon} />  Order
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
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>

                <Tabs value={value} onChange={handleTabChange} className={classes.textsize}>
                                              <Tab label={<BadgeComp count={openTab.length} label="Open" />} />
                  {roleName ==='CSR'      ?   <Tab label={<BadgeComp count={financeTab.length} label="Finance" />} />         : '' }
                  {roleName !='Delivery'  ?   <Tab label={<BadgeComp count={underDeliveryTab.length} label="Under Delivery" />} />  : ''}
                                              <Tab label={<BadgeComp count={deliveredTab.length} label="Delivered" />}  /> 
                  {roleName !=='Delivery' ?   <Tab label={<BadgeComp count={completedTab.length} label="Completed" />} />       : ''}
                </Tabs>

              </AppBar> 
              
              {roleName === 'CSR' ? <div>
                <TabPanel value={value} index={0}>
                  { openTab && <Open order={openTab} value={value} roleName={roleName} 
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus} 
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector} 
                  handleDeliveryDoc={handleDeliveryDoc} handleDelivered={handleDelivered} handleEditOpen={handleEditOpen}
                  createAndDownloadPdf ={createAndDownloadPdf } handleUploadFile={handleUploadFile} 
                  handleClickViewOpen = {handleClickViewOpen}/> }
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {financeTab && <Finance order= {financeTab} roleName={roleName} />}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {underDeliveryTab && <UnderDelivery order= {underDeliveryTab} roleName={roleName} />}
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {deliveredTab && <Delivered order= {deliveredTab} roleName={roleName} />}
                </TabPanel>
                <TabPanel value={value} index={4}>
                  {completedTab && <Completed order= {completedTab} roleName={roleName} />}
                </TabPanel>
              </div> : ''}

              {roleName === 'Finance' ? <div>
                <TabPanel value={value} index={0}>
                    { openTab && <Open order={openTab} value={value} roleName={roleName} 
                    handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus} 
                    handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector} 
                    handleDeliveryDoc={handleDeliveryDoc} handleDelivered={handleDelivered} handleEditOpen={handleEditOpen}
                    createAndDownloadPdf ={createAndDownloadPdf } handleUploadFile={handleUploadFile}
                    handleClickViewOpen = {handleClickViewOpen} /> }
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {underDeliveryTab && <UnderDelivery order= {underDeliveryTab} roleName={roleName} />}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {deliveredTab && <Delivered order= {deliveredTab} roleName={roleName} />}
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {completedTab && <Completed order= {completedTab} roleName={roleName} />}
                </TabPanel>
              </div> : ''}

              {roleName === 'Delivery' ? <div>
                <TabPanel value={value} index={0}>
                    { openTab && <Open order={openTab} value={value} roleName={roleName} 
                    handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus} 
                    handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector} 
                    handleDeliveryDoc={handleDeliveryDoc} handleDelivered={handleDelivered} handleEditOpen={handleEditOpen}
                    createAndDownloadPdf ={createAndDownloadPdf } handleUploadFile={handleUploadFile} 
                    handleClickViewOpen = {handleClickViewOpen} /> }
                </TabPanel>                
                <TabPanel value={value} index={1}>
                  {deliveredTab && <Delivered order= {deliveredTab} roleName={roleName} />}
                </TabPanel>                
              </div> : ''}

              </Paper>
          </Grid>
        </Grid>

        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant={snackbarContent.variant}
          message={snackbarContent.message}
        />
      </Snackbar>

     {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} handleOrderRecData= {handleOrderRecData} convertLead={0} /> : null }
     {paymentStatusOpen ? <PaymentStatus open={paymentStatusOpen} handleClose={handlePaymentStatusClose} handleSnackbarClick={handleSnackbarClick} orderData = {orderData}  /> : null }
     {editOpen? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick}  handleOrderRecData= {handleOrderRecData} editableData={editableData} /> : null}
     {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={"Send to finance ?"} content={"Do you really want to send selected order to next ?"} />: null }
     {processDialog ? <ProcessDialog open = {processDialog} handleProcessDialogClose={handleProcessDialogClose}/> : null }          
     {commentBoxOpen? <CommentDialog open = {commentBoxOpen} handleCommentBoxClose = {handleCommentBoxClose} orderData={commentData} /> : null }
     {openCommentView ?<CommentView open={openCommentView} handleViewClose={handleViewClose} orderId={orderId}  /> :null}
    </div>
  );
}
