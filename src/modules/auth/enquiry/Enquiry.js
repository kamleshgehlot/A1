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
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import Add from './Add';
import ConvertedEnquiry from './ConvertedEnquiry';
import CustomerAdd from '../customer/Add';
import ConvertInOrder from '../order/Add';
// API CALL
import EnquiryAPI from '../../../api/franchise/Enquiry';
import Category from '../../../../src/api/Category';

import BadgeComp from '../../common/BadgeComp';

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


export default function Enquiry({roleName}) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enquiryList, setEnquiryList] = useState([]);
  const [nonConvertList, setNonConvertList] = useState([]);
  const [enquiryData,setEnquiryData] = useState([]);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [productList, setProductList] = useState([]);
  const [convertedEnquiryOpen, SetConvertedEnquiryOpen] = useState(false);
  const [convertEnquiryId,setConvertEnquiryId]= useState();
  const [convertList,setConvertList] = useState([]);
  const [customer, setCustomer] = useState({});
  
  const [searchText, setSearchText]  = useState('');
  //value is for tabs  
  const [value, setValue] = React.useState(0);
  const drawerWidth = 240;
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
      width: drawerWidth,
      flexShrink: 0,
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
    padding: {
      padding: theme.spacing(0, 2),
    },
    button:{
      color:"white",
      fontSize: theme.typography.pxToRem(10),
      marginRight: theme.spacing(1),
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
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await EnquiryAPI.getAll();
        setEnquiryList(result.enquiryList);
        
        const nonConvertList = await EnquiryAPI.nonConvertList();
        setNonConvertList(nonConvertList.enquiryList);

        const convertList = await EnquiryAPI.convertedList();
        setConvertList(convertList.enquiryList);
        // console.log('result..',convertList.enquiryList);

        
        // console.log('enquiryList',result.enquiryList)
        const result1 = await Category.productlist();
        setProductList(result1.productList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
 
  function openCustomerPage(data) {
    setEnquiryData(data)
    setCustomerOpen(true)
  }
  
  function closeCustomerPage(data) {
    setCustomerOpen(false)
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  function handleCompleteEnquiryClickOpen(){
    SetConvertedEnquiryOpen(true);
    
  }
  function handleCompleteEnquiryClickClose() {
    SetConvertedEnquiryOpen(false)
  }
  
  function handleOrderRecData(response){
    // console.log(response);
  }
 
  function handleClickOrderOpen(data){
    // console.log('data....',data);
    setConvertEnquiryId(data.id);
    setOpenOrder(true);
  }

  function handleOrderClose(){
    setEnquiryList('');
    const fetchData = async () => {
      try {
        const result = await EnquiryAPI.getAll();
        setEnquiryList(result.enquiryList);

        const nonConvertList = await EnquiryAPI.nonConvertList();
        setNonConvertList(nonConvertList.enquiryList);

        const convertList = await EnquiryAPI.convertedList();
        setConvertList(convertList.enquiryList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setOpenOrder(false);
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function setEnquiryListFn(response) {
// console.log('res=---',response);
    const fetchData = async () => {
      try {
        const result = await EnquiryAPI.convert({enquiry_id: enquiryData.id});
        // console.log('result..',result.enquiryList);
        setEnquiryList(result.enquiryList);

        const nonConvertList = await EnquiryAPI.nonConvertList();
        setNonConvertList(nonConvertList.enquiryList);

        const convertList = await EnquiryAPI.convertedList();
        setConvertList(convertList.enquiryList);

      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }
  
console.log(enquiryList);

  const searchHandler = async () => {
    try {
    if(searchText!=''){
      
      const result = await EnquiryAPI.search({searchText: searchText});
      setEnquiryList(result.enquiryList);
      setSearchText('');
    }else{
      const result = await EnquiryAPI.list();
      setEnquiryList(result.enquiryList);
      setSearchText('');
    }} catch (error) {
      console.log('error',error);
    }
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
    // console.log('setValue...',value)
  }

  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Fab
                variant="extended"
                size="small"
                // color="primary"
                aria-label="Add"
                className={classes.fonttransform}
                onClick={handleClickOpen}
              >
                <AddIcon className={classes.extendedIcon} />
                Enquiry
              </Fab>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                label="Search"
                type="text"
                value={searchText} 
                onKeyPress={(ev) => {
                  if (ev.key ===  'Enter') {
                    searchHandler()
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchText}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton onClick={ searchHandler}><SearchIcon /></IconButton>
                                  </Tooltip>
                                </InputAdornment>,
                }}
              />
          </Grid>
         
          {/* <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" size="small"  onClick={handleCompleteEnquiryClickOpen} >Converted Enquiries</Button>
          </Grid> */}
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
                  <Tab label={<BadgeComp count={nonConvertList.length} label="On-going" />} /> 
                  <Tab label={<BadgeComp count={convertList.length} label="Converted" />} /> 
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={value}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Enq ID</StyledTableCell>
                        <StyledTableCell>Customer Name</StyledTableCell>
                        <StyledTableCell>Contact No.</StyledTableCell>
                        <StyledTableCell>Interested In</StyledTableCell>
                        {value===0? <StyledTableCell>Options</StyledTableCell>:''}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        (enquiryList.length > 0 ? enquiryList : []).map((data, index) => {
                          return(
                            value===data.converted_to ?<TableRow>
                              <StyledTableCell>{index+1}</StyledTableCell>
                              <StyledTableCell>{data.enquiry_id}</StyledTableCell>
                              <StyledTableCell>{data.customer_name}</StyledTableCell>
                              <StyledTableCell>{data.contact}</StyledTableCell>
                              <StyledTableCell>
                                  {
                                   ((data.interested_product_id && data.interested_product_id.split(',')) || []).map((a, index) =>{
                                    return(
                                      productList.map((ele)=>{
                                        return(
                                          (data.interested_product_id.split(',').length-1)===index ?
                                          data.interested_product_id.split(',')[index] == ele.id ? ele.name :''
                                          :
                                          data.interested_product_id.split(',')[index] == ele.id ? ele.name + ", " :''
                                        )
                                      }) 
                                    ) 
                                    })
                                  }
                                  {/* {data.interested_product_id} */}
                              </StyledTableCell>
                              {data.converted_to===0? <StyledTableCell>
                                <Button variant="contained" color="primary" className={classes.button} onClick={(event) => { handleClickOrderOpen(data); }}>
                                    Convert
                                </Button>
                              </StyledTableCell>:''}
                            </TableRow>:''
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </TabPanel>
              </Paper>
          </Grid>
        </Grid>
      { open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}  setEnquiryList={setEnquiryListFn}  convertLead={0} /> : null }
      {/* {customerOpen ? <CustomerAdd open={customerOpen} handleClose={closeCustomerPage} handleSnackbarClick={handleSnackbarClick} setCustomerList={setEnquiryListFn} enquiryData={enquiryData} setCustomer={setCustomer} /> : null} */}
      {openOrder ? <ConvertInOrder open={openOrder} handleClose={handleOrderClose} handleSnackbarClick={handleSnackbarClick}  handleOrderRecData= {handleOrderRecData} convertId={convertEnquiryId} converted_name={'enquiry'} /> : null }
      {convertedEnquiryOpen ? <ConvertedEnquiry open={convertedEnquiryOpen} handleClose={handleCompleteEnquiryClickClose} handleSnackbarClick={handleSnackbarClick}  /> : null}
      
    </div>
  );
}
