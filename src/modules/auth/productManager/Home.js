import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
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
import TablePagination from '@material-ui/core/TablePagination';


// API CALL
import ProductManagerAPI from '../../../api/ProductManager.js';
import Order from '../../../api/franchise/Order';


// Components
import BadgeComp from '../../common/BadgeComp';
import {getCurrentDate, isBirthDate, getCurrentDateInYYYYMMDD, getCurrentDateDBFormat, getCurrentDateDDMMYYYY, getDate, getDateInDDMMYYYY} from '../../../utils/datetime';
import ViewOrder from '../order/Edit.js';
import TableRecord from './Components/RecordTable.js';
import OrderRecord from './Components/OrderRecord.js';



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

export default function ProductManager({roleName}) {  
  const classes = useStyles();
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


  const [tabValue, setTabValue] = React.useState(0);
  const [rentedProductList,setRentedProductList] = useState([]);
  const [rentedOrderList,setRentedOrderList] = useState([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [viewOnly, setViewOnly] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
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
    setTabValue(newValue);
    setPage(0);
    setRowsPerPage(20);
    handleTabData(newValue)
  }

  useEffect(() => {
    handleTabData()
  },[])

  const handleTabData = async (tabValue = 0) => {
    try{
      const result = await ProductManagerAPI.getTabRelatedRecord({tabValue: tabValue});
      setRentedProductList(result.productList)
    }catch(error){
      console.log('error...',error);
    }    
  }

  const handleOrderRecord = async (data) => {
    try{
      const result = await ProductManagerAPI.getRentedOrder({productId: data.id, product_state: 1});
      setRentedOrderList(result.orderList)
      setShowOrderDialog(true);
    }catch(error){
      console.log('error...',error);
    }
  }  
  
  const handleCloseOrderDialog = () => {
    setShowOrderDialog(false);
  }

  function handleOrderView(data) {
    setOrderData(data);
    setShowOrder(true);
    setViewOnly(true);
  }

  function handleCloseViewOrder (){
    setShowOrder(false);
    setViewOnly(false);
  }

  

  return (
    <div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={tabValue} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                  <Tab label={<BadgeComp count={0} label="All" />} />
                  <Tab label={<BadgeComp count={0} label="Delivered" />} />
                  <Tab label={<BadgeComp count={0} label="With Customer" />} />
                  <Tab label={<BadgeComp count={0} label="Under Repair" />} />
                  <Tab label={<BadgeComp count={0} label="Replaced" />} />
                  <Tab label={<BadgeComp count={0} label="Faulty/With Customer" />} />
                  <Tab label={<BadgeComp count={0} label="Faulty/Under Repair" />} />
                </Tabs>
              </AppBar>
              <Fragment>
                <TabPanel value={tabValue} index={0}>
                  <TableRecord productList = {rentedProductList} tabValue={tabValue} handleOrderRecord = {handleOrderRecord} /> 
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <TableRecord productList = {rentedProductList} tabValue={tabValue} handleOrderRecord = {handleOrderRecord} /> 
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
               
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
               
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                
                </TabPanel>
              </Fragment>
            </Paper>                            
          </Grid>
        </Grid>
      {showOrderDialog ? <OrderRecord open = {showOrderDialog} handleClose = {handleCloseOrderDialog} tabValue = {tabValue} orderList = {rentedOrderList} handleOrderView= {handleOrderView} /> : null }
      {showOrder ? <ViewOrder open={showOrder} handleEditClose={handleCloseViewOrder} editableData={orderData} viewOnly={viewOnly} /> : null}
    </div>
  );
}
