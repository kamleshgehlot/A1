import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import BadgeComp from '../../common/BadgeComp';
import Snackbar from '@material-ui/core/Snackbar';

import Add from './Add';
import Edit from './Edit';
import PaymentStatus from './PaymentStatus';

import Open from './OrderComponent/Open';
import Finance from './OrderComponent/Finance';
import UnderDelivery from './OrderComponent/UnderDelivery';
import Delivered from './OrderComponent/Delivered';
import Completed from './OrderComponent/Completed';
import Cancelled from './OrderComponent/Cancelled';
import Archived from './OrderComponent/Archived';

import OrderCancellationForm from './OrderCancellationForm';
import ConfirmationDialog from '../ConfirmationDialog.js';
import YesNoDialog from '../../common/YesNoDialog.js';
import ProcessDialog from '../ProcessDialog.js';
import CommentDialog from '../CommentDialog.js';
import CommentView from './CommentView.js';
import UpdateDeliveredProduct from './UpdateDeliveredProduct.js';
import ViewDeliveredProductDetails from './ViewDeliveredProductDetails';

import RentFlexContract from './Documentation/RentFlexContract';
import RentFixContract from './Documentation/RentFixContract';
import BudgetAssistant from './Documentation/BudgetAssistant';
import FixedOrderForm from './Documentation/FixedOrderForm';
import FlexOrderForm from './Documentation/FlexOrderForm';
import EezyDebitForm from './Documentation/EezyDebitForm';

// API CALL
import OrderAPI from '../../../api/franchise/Order';

import FileReader from '../../../utils/fileReader';

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
    color: "white",
    marginTop: theme.spacing(-3),
  },
  button: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(7),
  },
  input: {
    display: 'none',
  },
  fab: {
    marginRight: theme.spacing(1),
    fontSize: 12,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  fonttransform: {
    textTransform: "initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize: {
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  }
}));


export default function Order({ roleName }) {
  const classes = useStyles();
  const userId = APP_TOKEN.get().userId;

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [nextStep, setNextStep] = React.useState('');
  const [uploadType, setUploadType] = useState('');
  const [orderId, setOrderId] = useState();  
  const [orderIdForUpload, setOrderIdForUpload] = useState(null);
  const [order, setOrder] = useState([]);
  const [snackbarContent, setSnackbarContent] = useState([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [openCommentView, setOpenCommentView] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [processDialog, setProcessDialog] = useState(false);
  const [response, setResponse] = useState([]);
  const [openCancelForm, setOpenCancelForm] = useState(false);
  const [openProductDelivered, setOpenProductDelivered] = useState(false);
  const [openViewDeliveredDetail, setOpenViewDeliveredDetail] = useState(false);
  
  //Tab Data for corresponding role 
  const [tabRecord, setTabRecord] = useState(
    { open: [],
      finance : [], 
      underDelivery : [],
      delivered : [], 
      completed : [], 
      cancelled : [], 
      archived : []
    });

  // const [financeTab, setFinanceTab] = useState([]);
  // const [underDeliveryTab, setUnderDeliveryTab] = useState([]);
  // const [deliveredTab, setDeliveredTab] = useState([]);
  // const [completedTab, setCompletedTab] = useState([]);
  // const [cancelledTab, setCancelledTab] = useState([]);
  // const [archivedTab, setArchivedTab] = useState([]);

  const [viewOnly, setViewOnly] = useState(false);
  const [openConfirmationPDF, setOpenConfirmationPDF] = useState(false);
  const [orderDataForPDF, setOrderDataForPDF] = useState([]);
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };    

  const handleYesNoClose = (isConfirm) => {
    setOpenConfirmationPDF(false);
    createAndDownloadPdf(orderDataForPDF, isConfirm)
  }

  const handlePDFGenerateType = (data) => {
    setOrderDataForPDF(data)
    setOpenConfirmationPDF(true);
  }


  function createAndDownloadPdf(data, eziDebitFormType) {
    if (data.order_type === 2) {
      const fetchData = async () => {
        try {
          const result = await OrderAPI.getFlexOrderDataForPDF({ data: data });
          pdfmake.vfs = pdfFonts.pdfMake.vfs;

          let doc = {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [30, 30, 30, 30],
            content: []
          };
          let flexOrderForm = FlexOrderForm(result, data);
          let rentFlexContract = RentFlexContract(result, data);
          let budgetAssistant = BudgetAssistant(result, data);
          let eezyDebitForm = EezyDebitForm(result, data, eziDebitFormType);


          if (flexOrderForm.content) {
            doc.content.push(flexOrderForm.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (rentFlexContract.content) {
            doc.content.push(rentFlexContract.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (budgetAssistant.content) {
            doc.content.push(budgetAssistant.content);
          }

          if (eezyDebitForm.content) {
            doc.content.push(eezyDebitForm.content);
          }

          pdfmake.createPdf(doc).open();
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    if (data.order_type === 1) {
      const fetchData = async () => {
        try {
          const result = await OrderAPI.getFixedOrderDataForPDF({ data: data });
          pdfmake.vfs = pdfFonts.pdfMake.vfs;

          let doc = {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [30, 30, 30, 30],
            content: []
          };
          let fixedOrderForm = FixedOrderForm(result, data);
          let rentFixContract = RentFixContract(result, data);
          let budgetAssistant = BudgetAssistant(result, data);
          let eezyDebitForm = EezyDebitForm(result, data, eziDebitFormType);

          if (fixedOrderForm.content) {
            doc.content.push(fixedOrderForm.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (rentFixContract.content) {
            doc.content.push(rentFixContract.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (budgetAssistant.content) {
            doc.content.push(budgetAssistant.content);
          }

          if (eezyDebitForm.content) {
            doc.content.push(eezyDebitForm.content);
          }

          pdfmake.createPdf(doc).open();
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

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose(result) {
    setOpen(false);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handlePaymentStatusClose() {
    setPaymentStatusOpen(false);
  }


  const uploadFileSelector = async (event) => {
    setProcessDialog(true);
    try {
      let formData = new FormData();
      formData.append('data', JSON.stringify(orderIdForUpload));

      if (uploadType === 'Documents') {
        for (var x = 0; x < document.getElementById('upload_document').files.length; x++) {
          if (document.getElementById('upload_document').files.length != 0) {

            const data = {
              data: orderIdForUpload,
              file: await FileReader.toBase64(document.getElementById('upload_document').files[x])
            }

            const result = await OrderAPI.uploadDocument(data);
            setProcessDialog(false);
            setOrderIdForUpload(null);
            if (result.order.length > 0) {
              setOrder(result.order);
              handleTabsData(result.order);
            }
            if (result.isUploaded === 1) {
              if (processDialog === false) {
                setSnackbarContent({ message: "Successfully Uploaded.", variant: "success" });
                setSnackbarOpen(true);
              }
            } else if (result.isUploaded === 0) {
              if (processDialog === false) {
                setSnackbarContent({ message: "Upload Failed", variant: "error" });
                setSnackbarOpen(true);
              }
            }
          }
        }
      } else if (uploadType === 'DeliveredDoc') {
        for (var x = 0; x < document.getElementById('upload_delivery_doc').files.length; x++) {
          formData.append('avatar', document.getElementById('upload_delivery_doc').files[x])
        }

        if (document.getElementById('upload_delivery_doc').files.length != 0) {
          const result = await OrderAPI.uploadDeliveryDoc({ formData: formData });
          setProcessDialog(false);
          setOrderIdForUpload(null);
          if (result.order.length > 0) {
            setOrder(result.order);
            handleTabsData(result.order);
          }
          if (result.isUploaded === 1) {
            if (processDialog === false) {
              setSnackbarContent({ message: "Successfully Uploaded.", variant: "success" });
              setSnackbarOpen(true);
            }
          } else if (result.isUploaded === 0) {
            if (processDialog === false) {
              setSnackbarContent({ message: "Upload Failed", variant: "error" });
              setSnackbarOpen(true);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleProcessDialogClose() {
    setProcessDialog(false);
  }

  function handleCommentBoxClose() {
    setCommentBoxOpen(false);
  }


  function handleUploadFile(orderId) {
    setUploadType('Documents');
    setOrderIdForUpload(orderId);
  }

  function handleDeliveryDoc(orderId) {
    setUploadType('DeliveredDoc');
    setOrderIdForUpload(orderId);
  }

  function handleEditOpen(data) {
    setEditableData(data);
    setEditOpen(true);
    setViewOnly(false);
  }

  function handleOrderView(data) {
    setEditableData(data);
    setEditOpen(true);
    setViewOnly(true);
  }

  function handleAssignToFinance(data) {
    setOrderId(data.id);
    setOrderData(data);
    setNextStep('Finance');
    setConfirmation(true);
  }

  function handleAssignToDelivery(data) {
    setOrderId(data);
    setNextStep('Delivery');
    setConfirmation(true);
  }

  function handleDeliveredProdcutClose(data) {
    setOpenProductDelivered(false);
  }

  function handleDeliveredProductOpen(data) {
    setOrderData(data);
    setOpenProductDelivered(true);
  }

  function handleViewDeliveredDetail(data) {
    setOpenViewDeliveredDetail(false);
  }

  function handleViewDeliveredDetailOpen(data) {
    setOrderData(data);
    setOpenViewDeliveredDetail(true);
  }


  function handleDelivered(data) {
    setCommentData({ order_id: data, user_id: userId, roleName: roleName });
    setCommentBoxOpen(true);
    setNextStep('Delivered');
    setOrderId(data);
  }

  if (commentBoxOpen === false && response.isSucceeded === 1 && nextStep === 'Delivered') {
    setResponse('');
    setConfirmation(true);
  }

  function handlePaymentStatus(data) {
    setOrderData(data);
    setPaymentStatusOpen(true);
  }

  function handleOrderCancellationOpen(data) {
    setOrderData(data);
    setOpenCancelForm(true);
  }

  function handleOrderCancellationClose() {
    setOpenCancelForm(false);
  }

  function handleOrderList(response) {
    setOrder(response.order);
    handleTabsData(response.order);
  }


  function handleConfirmationDialog(response) {
    if (response === 1) {
      const fetchData = async () => {
        try {
          if(nextStep === 'Finance')
            {
              const result = await OrderAPI.assignToFinance({
                assigned_to: 4,
                id: orderId, 
                customer_id: orderData.customer_id,                
                order_type : orderData.order_type,
                order_type_id : orderData.order_type_id,
              });
              setOrder(result.order);
              setCommentData({order_id: orderId, user_id: userId, roleName: roleName});
              setCommentBoxOpen(true);
              handleTabsData(result.order);              
            }
          else if(nextStep === 'Delivery'){
            const result = await OrderAPI.assignToDelivery({assigned_to: 5, id: orderId});
            setOrder(result.order);
            setCommentData({ order_id: orderId, user_id: userId, roleName: roleName });
            setCommentBoxOpen(true);
            handleTabsData(result.order);
          }else if(nextStep === 'Delivered'){
            const result = await OrderAPI.delivered({assigned_to: 5, id: orderId, delivered_date: new Date(), delivered_time: new Date()});
            setOrder(result.order);            
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

  function handleEditClose() {
    setEditOpen(false);
  }

  function handleSnackbarClick() {
    //don't remove this function
  }

  function handleOrderRecData(response) {    
    setOrder(response.order);
    handleTabsData(response.order);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await OrderAPI.getAll();
        setOrder(result.order);
        console.log('new Dat.', new Date());
        handleTabsData(result.order);
        // setOpenTab(result.open);
        // setFinanceTab(result.finance);
        // setUnderDeliveryTab(result.underDelivery);
        // setDeliveredTab(result.delivered);
        // setCompletedTab(result.completed);
        // setCancelledTab(result.cancelled);
        // setArchivedTab(result.archived);
        
        // console.log('new Date 2', new Date());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [roleName]);

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
    setPage(0);
    setRowsPerPage(20);
    setValue(newValue);
    handleTabsData(order);
  }

  async function handleOrderArchive(data) {
    const result = await OrderAPI.archiveOrder({ order_id: data.id });
    setOrder(result.order);
    handleTabsData(result.order);
  }


  async function handleOrderViewFromBudget(data) {
    const result = await OrderAPI.getSingleOrderData({ order_id: data.o_id });
    handleOrderView(result[0]);
  }


  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const searchHandler = async () => {
    try {
      if (searchText != '') {
        const result = await OrderAPI.searchOrder({ searchText: searchText });
        setOrder(result.order);
        handleTabsData(result.order);
      } else {
        const result = await OrderAPI.getAll();
        setOrder(result.order);
        handleTabsData(result.order);
      }
    } catch (error) {
      console.log('error', error);
    }
  }



  function handleTabsData(order) {
    let open = [];
    let finance = [];
    let underDelivery = [];
    let delivered = [];
    let completed = [];
    let cancelled = [];
    let archived = [];


    if (roleName === 'CSR') {
      (order.length > 0 ? order : []).map((data, index) => {
        if (data.assigned_to !== 4 && data.assigned_to !== 5 && data.is_active == 1) {
          open.push(data);
        }
        if (data.assigned_to === 4 && data.is_active == 1) {
          finance.push(data);
        }
        if (data.assigned_to === 5 && data.order_status === 5 && data.is_active == 1) {
          underDelivery.push(data);
        }
        if (data.order_status === 6) {
          delivered.push(data);
        }
        if (data.order_status === 8) {
          completed.push(data);
        }
        if ((data.order_status === 9 || data.order_status === 10) && data.is_active == 0) {
          cancelled.push(data);
        }
        if (data.order_status === 11 && data.is_active == 0) {
          archived.push(data);
        }
      });    
    } else if (roleName === 'Finance') {
      (order.length > 0 ? order : []).map((data, index) => {
        if ((data.assigned_to === 4 || data.assigned_to === 5) && data.order_status !== 8 && data.is_active == 1) {
          open.push(data);
        }
        if (data.assigned_to === 5 && data.order_status === 5 && data.is_active == 1) {
          underDelivery.push(data);
        }
        if (data.order_status === 6) {
          delivered.push(data);
        }
        if (data.order_status === 8) {
          completed.push(data);
        }
        if ((data.order_status === 9 || data.order_status === 10) && data.is_active == 0) {
          cancelled.push(data);
        }
      });
    } else if (roleName === 'Delivery') {
      (order.length > 0 ? order : []).map((data, index) => {
        if (data.assigned_to === 5 && data.order_status === 5 && data.is_active == 1) {
          open.push(data);
        }
        if (data.order_status >= 6 && data.order_status != 9 && data.order_status != 10 && data.order_status != 11) {
          delivered.push(data);
        }
      });
    }
    
    setTabRecord(
      { open: open,
        finance : finance, 
        underDelivery : underDelivery,
        delivered : delivered, 
        completed : completed, 
        cancelled : cancelled, 
        archived : archived
      });
    
    // setOpenTab(open);
    // setFinanceTab(finance);
    // setUnderDeliveryTab(underDelivery);
    // setDeliveredTab(delivered);
    // setCompletedTab(completed);
    // setCancelledTab(cancelled);
    // setArchivedTab(archived);
    
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {roleName === 'CSR' ?
            <Fab variant="extended" size="small" aria-label="Add" className={classes.fonttransform} onClick={handleClickOpen}>
              <AddIcon className={classes.extendedIcon} />  Order
            </Fab>
            : ''}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            id="search"
            name="search"
            placeholder="Type (OrderId/Ezidebit UId) to Search Order..."
            type="text"
            autoComplete='off'
            value={searchText}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                searchHandler()
                ev.preventDefault();
              }
            }}
            onChange={handleSearchText}
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                <Tooltip title="Search">
                  <IconButton onClick={searchHandler}><SearchIcon /></IconButton>
                </Tooltip>
              </InputAdornment>,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Paper style={{ width: '100%' }}>
            <AppBar position="static" className={classes.appBar}>

              <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                <Tab label={<BadgeComp count={tabRecord.open.length} label="Open" />} />
                {roleName === 'CSR' ? <Tab label={<BadgeComp count={tabRecord.finance.length} label="Finance" />} /> : ''}
                {roleName != 'Delivery' ? <Tab label={<BadgeComp count={tabRecord.underDelivery.length} label="Before Delivery" />} /> : ''}
                <Tab label={<BadgeComp count={tabRecord.delivered.length} label="Delivered" />} />
                {roleName !== 'Delivery' ? <Tab label={<BadgeComp count={tabRecord.completed.length} label="Completed" />} /> : ''}
                {roleName !== 'Delivery' ? <Tab label={<BadgeComp count={tabRecord.cancelled.length} label="Cancelled" />} /> : ''}
                {roleName === 'CSR' ? <Tab label={<BadgeComp count={tabRecord.archived.length} label="Archived" />} /> : ''}
              </Tabs>
            </AppBar>

            {roleName === 'CSR' ? <div>
              <TabPanel value={value} index={0}>
                {tabRecord && <Open order={tabRecord.open} value={value} roleName={roleName}
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus}
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector}
                  handleDeliveryDoc={handleDeliveryDoc} handleDelivered={handleDelivered} handleEditOpen={handleEditOpen}
                  createAndDownloadPdf={handlePDFGenerateType} handleUploadFile={handleUploadFile}
                  handleClickViewOpen={handleClickViewOpen} handleDeliveredProductOpen={handleDeliveredProductOpen}
                  handleOrderView={handleOrderView} handleOrderArchive={handleOrderArchive} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {tabRecord && <Finance order={tabRecord.finance} roleName={roleName} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {tabRecord && <UnderDelivery order={tabRecord.underDelivery} roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {tabRecord && <Delivered order={tabRecord.delivered} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {tabRecord && <Completed order={tabRecord.completed} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={5}>
                {tabRecord && <Cancelled order={tabRecord.cancelled} roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={6}>
                {tabRecord && <Archived order={tabRecord.archived} roleName={roleName} handleEditOpen={handleEditOpen} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
            </div> : ''}

            {roleName === 'Finance' ? <div>
              <TabPanel value={value} index={0}>
                {tabRecord && <Open order={tabRecord.open} value={value} roleName={roleName}
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus}
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector}
                  handleDeliveryDoc={handleDeliveryDoc} handleDelivered={handleDelivered} handleEditOpen={handleEditOpen}
                  createAndDownloadPdf={handlePDFGenerateType} handleUploadFile={handleUploadFile}
                  handleClickViewOpen={handleClickViewOpen} handleOrderCancellationOpen={handleOrderCancellationOpen}
                  handleDeliveredProductOpen={handleDeliveredProductOpen} handleOrderView={handleOrderView}
                  handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} page={page} rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {tabRecord && <UnderDelivery order={tabRecord.underDelivery} roleName={roleName} 
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {tabRecord && <Delivered order={tabRecord.delivered} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {tabRecord && <Completed order={tabRecord.completed} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {tabRecord && <Cancelled order={tabRecord.cancelled} roleName={roleName}
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
            </div> : ''}

            {roleName === 'Delivery' ? <div>
              <TabPanel value={value} index={0}>
                {tabRecord && <Open order={tabRecord.open} value={value} roleName={roleName}
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus}
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector}
                  handleDeliveryDoc={handleDeliveryDoc} handleDelivered={handleDelivered} handleEditOpen={handleEditOpen}
                  createAndDownloadPdf={handlePDFGenerateType} handleUploadFile={handleUploadFile}
                  handleClickViewOpen={handleClickViewOpen} handleDeliveredProductOpen={handleDeliveredProductOpen}
                  handleOrderView={handleOrderView} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} 
                  handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {tabRecord && <Delivered order={tabRecord.delivered} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen}
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
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

      {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} handleOrderRecData={handleOrderRecData} convertId={0} converstionData={""} handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null}
      {paymentStatusOpen ? <PaymentStatus open={paymentStatusOpen} handleClose={handlePaymentStatusClose} handleSnackbarClick={handleSnackbarClick} orderData={orderData} /> : null}
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} handleOrderRecData={handleOrderRecData} editableData={editableData} viewOnly={viewOnly} handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null}
      {confirmation ? <ConfirmationDialog open={confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog} currentState={0} title={"Send to finance ?"} content={"Do you really want to send selected order to next ?"} /> : null}
      {processDialog ? <ProcessDialog open={processDialog} handleProcessDialogClose={handleProcessDialogClose} /> : null}
      {commentBoxOpen ? <CommentDialog open={commentBoxOpen} handleCommentBoxClose={handleCommentBoxClose} orderData={commentData} setResponse={setResponse} /> : null}
      {openCommentView ? <CommentView open={openCommentView} handleViewClose={handleViewClose} orderId={orderId} /> : null}
      {openCancelForm ? <OrderCancellationForm open={openCancelForm} handleClose={handleOrderCancellationClose} handleSnackbarClick={handleSnackbarClick} orderData={orderData} handleOrderList={handleOrderList} /> : null}
      {openProductDelivered ? <UpdateDeliveredProduct open={openProductDelivered} handleClose={handleDeliveredProdcutClose} handleSnackbarClick={handleSnackbarClick} orderData={orderData} handleOrderList={handleOrderList} roleName={roleName} /> : null}
      {openViewDeliveredDetail ? <ViewDeliveredProductDetails open={openViewDeliveredDetail} handleClose={handleViewDeliveredDetail} handleSnackbarClick={handleSnackbarClick} orderData={orderData} handleOrderList={handleOrderList} roleName={roleName} /> : null}
      {openConfirmationPDF ? <YesNoDialog open={openConfirmationPDF} handleYesNoClose={handleYesNoClose} title={"Ezi Debit Filled or Blank ?"} content={"Select Yes to downlaod auto filled form, No to download empty form."} /> : null}
    </div>
  );
}
