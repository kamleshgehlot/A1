import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
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
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Add from './Add';
import Edit from './Edit';
import EditBudget from '../order/EditBudget';
import CommentIcon from '@material-ui/icons/Comment';
import TablePagination from '@material-ui/core/TablePagination';
import CustomerBankDetails from './CustomerBankDetails';

// API CALL
import Customer from '../../../api/franchise/Customer';
import Order from '../../../api/franchise/Order';
import { fontFamily } from '@material-ui/system';

import Active from './components/Active';
import Hold from './components/Hold';
import FinancialHardship from './components/FinancialHardship';
import BornToday from './components/BornToday';
import MissedPayment from './components/MissedPayment';
import ViewOrder from '../order/Edit';

import CommentView from './CommentView';
import BadgeComp from '../../common/BadgeComp';

import BudgetHistory from '../order/BudgetHistory';
import {getCurrentDate, isBirthDate, getCurrentDateInYYYYMMDD, getCurrentDateDBFormat, getCurrentDateDDMMYYYY, getDate, getDateInDDMMYYYY} from '../../../utils/datetime';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 800,
    overflow: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
   padding: {
    padding: theme.spacing(0, 2),
  },
  drawerPaper: {
    width: drawerWidth,
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
    
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor:'gray',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function CustomerList({userId, roleName}) {

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customerListData, setCustomerListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [searchText, setSearchText]  = useState('');
  const [customer, setCustomer] = useState({});



  const [budgetOpen, setBudgetOpen] = useState(false);
  const [budgetList,setBudgetList] = useState(null);
  const [totalBudgetList,setTotalBudgetList] = useState(null);  
  const [customerId, setCustomerId] = useState();
  const [budgetHistoryOpen,setBudgetHistoryOpen] = useState(false);
  const [openCommentView, setOpenCommentView]  = useState(false);
  const [value, setValue] = React.useState(0); 
  const [bankDetailOpen, setBankDetailOpen] = useState(false);
  const [bankDetailArray, setBankDetailArray] = useState([]);

  const [activeTab, setActiveTab] = useState([]);
  const [holdTab, setHoldTab] = useState([]);
  const [financialHardshipTab, setFinancialHardshipTab] = useState([]);
  const [bornTodayTab, setBornTodayTab] = useState([]);
  const [missedPaymentTab, setMissedPaymentTab] = useState([]);
  const [editableData,setEditableData] = useState({});
  const [viewOrder,setViewOrder] = useState(false);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };    


  useEffect(() => {   
    fetchCustomerList();    
  }, []);


  const fetchCustomerList = async () => {   
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await Customer.list();
      setCustomerListData(result.customerList);
      handleTabsData(result.customerList);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickEditOpen(data) {
    setCustomerData(data),
    setEditOpen(true);
  }

  const handleHistoryOpen = async (data) => {
    setCustomerId(data.id);
    setBudgetHistoryOpen(true);    
  }

  function handleHistoryClose(){
    setBudgetHistoryOpen(false);
  }
  
  
  const handleOpenEditBudget = async (data) =>{      
    const budget = await Order.getExistingBudget({customer_id: data.id});
    setBudgetList(budget[0]);
    setTotalBudgetList(budget);
    setCustomerId(data.id);
    setBudgetOpen(true);
  }

  const handleBudgetClose = async () => {
    setBudgetOpen(false);
  }

  const handleClickCommentOpen = (data) => {
    setCustomerId(data.id);
    setOpenCommentView(true);
  }

  
  function handleBankDetailClose(){
    setBankDetailOpen(false);
  }
  
  const handleBankDetailOpen = async(data) => {
    const bankDetails = await Customer.getCustomerBankDetail({customer_id: data.id});
    if(bankDetails == "" || bankDetails == undefined || bankDetails == [] ){
      setBankDetailArray([]);
    }else if(bankDetails.length > 0){
      setBankDetailArray(bankDetails[0]);
    }
    setCustomerId(data.id);
    setBankDetailOpen(true);
  }


  const handleViewClose = () => {
    setOpenCommentView(false);
  }

  function handleEditClose() {
    // handleTabsData(customerListData);
    setEditOpen(false);
  }
 
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  

  function handleCustomerList(response){
    setCustomerListData(response);
    handleTabsData(response);    
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }
  
  async function handleOrderView (data){
    const result = await Order.getSingleOrderData({order_id: data.order_id});
    setEditableData(result[0]);
    setViewOrder(true);
  }

  async function handleOrderViewFromBudget (data){
    const result = await Order.getSingleOrderData({order_id: data.o_id});
    setEditableData(result[0]);
    setViewOrder(true);
  }


  function handleOrderViewClose(){
    setViewOrder(false);
  }


  const searchHandler = async () => {
    try {
    if(searchText!=''){
        const result = await Customer.search({searchText: searchText});
        setCustomerListData(result.customerList);
        handleTabsData(result.customerList);    
        setSearchText('');
     
    }else{
      const result = await Customer.list();
      setCustomerListData(result.customerList);
      handleTabsData(result.customerList);    
      setSearchText('');
    }} catch (error) {
      console.log('error',error);
    }
  }


  const handlePaymentFilter = async (searchText,  fromPaymentDate, toPaymentDate) => {
    
    if(searchText!='' || (fromPaymentDate !== null && toPaymentDate !== null)){
      let fromDate = getDate(fromPaymentDate);
      let toDate = getDate(toPaymentDate);

      const paymentData = await filterMissedPaymentData({searchText: searchText, fromPaymentDate: fromDate, toPaymentDate: toDate });
      setMissedPaymentTab(paymentData);
    }else{
      const paymentData = await fetchMissedPaymentData();
      setMissedPaymentTab(paymentData);
    }
  }

  const fetchMissedPaymentData = async () =>{
    const result = await Order.fetchMissedPaymentData({});
    return result;
  }

  const filterMissedPaymentData = async (searchText) =>{
    const result = await Order.filterMissedPaymentData({searchText : searchText});      
    return result;
  }
  
  async function handleTabsData(customerList){
    const paymentData = await fetchMissedPaymentData();

    let activeList = [];
    let holdList = [];
    let financialHardshipList = [];
    let bornToday = [];

    (customerList.length > 0 ? customerList : []).map((data, index) => {
      
      if(isBirthDate(data.dob)){
        bornToday.push(data);
      }
      if(data.state == 1 ){
        activeList.push(data);
      }
      if(data.state == 2 ){
        holdList.push(data);
      }
      if(data.state == 3 ){
        financialHardshipList.push(data);
      } 
    });
    
    setActiveTab(activeList);
    setHoldTab(holdList);
    setFinancialHardshipTab(financialHardshipList);
    setBornTodayTab(bornToday);
    setMissedPaymentTab(paymentData);
  }

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
    setPage(0);
    setRowsPerPage(20);
  }



  return (
    <div>     
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Fab variant="extended" size="small" className={classes.fonttransform} onClick={handleClickOpen}>
              <AddIcon className={classes.extendedIcon} />Customers
            </Fab>
          </Grid>   
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                placeholder ="Type (Id/Name/Address/City/Postcode/Telephone/Mobile/DOB) to Search Customer..."
                type="text"
                autoComplete='off'                
                value={searchText} 
                onKeyPress={(ev) => {
                  if (ev.key ===  'Enter') {
                    searchHandler()
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchText}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton onClick={ searchHandler}><SearchIcon /></IconButton>
                                  </Tooltip>
                                </InputAdornment>,
                }}
                fullWidth
              />              
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                  <Tab label={<BadgeComp count={activeTab.length} label="Open" />} /> 
                  <Tab label={<BadgeComp count={holdTab.length} label="Hold" />} /> 
                  <Tab label={<BadgeComp count={financialHardshipTab.length} label="Financial Hardship" />} /> 
                  <Tab label={<BadgeComp count={bornTodayTab.length} label="Today's Birthday" />} />
                  <Tab label={<BadgeComp count={missedPaymentTab.length} label="Missed Payment" />} />
                </Tabs>
              </AppBar>
              <div >
                <TabPanel value={value} index={0}>
                  {activeTab && <Active customerList={activeTab} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> }
                </TabPanel>              

                <TabPanel value={value} index={1}>
                  {holdTab && <Hold customerList={holdTab} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> }
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {financialHardshipTab && <FinancialHardship customerList={financialHardshipTab} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen}  
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> } 
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {bornTodayTab && <BornToday customerList={bornTodayTab} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen}  
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> } 
                </TabPanel>
                <TabPanel value={value} index={4}>
                  {missedPaymentTab && <MissedPayment missedPaymentData={missedPaymentTab} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen} handleOrderView={handleOrderView} handlePaymentFilter={handlePaymentFilter} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> } 
                </TabPanel>
              </div>
            </Paper>                            
          </Grid>
        </Grid>  

      {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} userId={userId} setCustomerList={handleCustomerList} enquiryData={''} setCustomer={setCustomer} conversionData={""}/>: null}      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputValues={customerData} setCustomerList={handleCustomerList} /> : null}
      {budgetOpen ?<EditBudget open={budgetOpen} handleBudgetClose={handleBudgetClose} setBudgetList={setBudgetList} budgetList={budgetList}   totalBudgetList={totalBudgetList} customer_id={customerId} isEditable={1} handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null }
      {budgetHistoryOpen ? <BudgetHistory open={budgetHistoryOpen} handleClose={handleHistoryClose} handleSnackbarClick={handleSnackbarClick} customer_id={customerId} roleName={roleName} /> : null }
      {openCommentView ?<CommentView open={openCommentView} handleViewClose={handleViewClose} customer_id = {customerId}  /> :null}
      {bankDetailOpen ?<CustomerBankDetails open={bankDetailOpen} handleClose={handleBankDetailClose} handleSnackbarClick={handleSnackbarClick} bankDetailArray={bankDetailArray} setBankDetailArray = {setBankDetailArray} customer_id={customerId} isAddingDirect={true} /> : null }
      {viewOrder ? <ViewOrder open={viewOrder} handleEditClose={handleOrderViewClose} handleSnackbarClick={handleSnackbarClick}  handleOrderRecData= {[]} editableData={editableData} viewOnly={ true } /> : null}
    </div>
  );
}
