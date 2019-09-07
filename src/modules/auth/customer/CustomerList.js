import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
// import SearchBar from 'material-ui-search-bar-enhanced';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Badge from '@material-ui/core/Badge'; 
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Add from './Add';
import Edit from './Edit';

// API CALL
import Customer from '../../../api/franchise/Customer';
import { fontFamily } from '@material-ui/system';



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


export default function CustomerList({userId, roleName}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [idTypeList, setIdTypeList] = useState([]);
  const [customerListData, setCustomerListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [searchText, setSearchText]  = useState('');
  const [customer, setCustomer] = useState({});
  const [active, setActive]=  useState();
  const [hold, setHold]=  useState();
  const [completed, setCompleted]=  useState();
  
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
  const classes = useStyles();

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
  function handleEditClose() {
    handleBadge(customerListData);
    setEditOpen(false);
  }
 
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  
  function handleFranchiseClick() {
    setShowFranchise(true);
    setShowStaff(false);
  }

  function handleCustomerList(response){
    // console.log("response---", response);
    setCustomerListData(response);
    handleBadge(response);
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }
  // console.log("search text", searchText);
  function handleBadge(customerList){
    let active = 0;
    let hold = 0;
    let completed = 0;

    (customerList).map(data =>{
      data.state==1 ? active += 1 : '';
      data.state==2 ? hold += 1: '';
      data.state==3 ? completed += 1: '';
    })   
    setActive(active)
    setHold(hold);
    setCompleted(completed);
  }

  const searchHandler = async () => {
    try {
    if(searchText!=''){
        const result = await Customer.search({searchText: searchText});
        // console.log(result.customerList);
        setCustomerListData(result.customerList);
        setSearchText('');
     
    }else{
      const result = await Customer.list();
      setCustomerListData(result.customerList);
      setSearchText('');
    }} catch (error) {
      console.log('error',error);
    }
  }

  
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Customer.list();
        setCustomerListData(result.customerList);
        handleBadge(result.customerList);
        
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
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
              Customers
            </Fab>
          </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                label="Search"
                label="Search..."
                type="text"
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
              {/* <IconButton  aria-label="Search" onClick={ searchHandler} >
                <SearchIcon />   
              </IconButton> */}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}> 
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
                 
                 {/* {
                   (customerListData.length>0 ? customerListData : []).map(data=>{
                   data.state === 1 ? a++ : data.state === 2 ? b++ : data.state===3 ? c++ :'';
                 })} */}
                  <Tab label={<Badge className={classes.padding} color="secondary" badgeContent={active}>Active</Badge>} />
                  <Tab label={<Badge className={classes.padding} color="secondary" badgeContent={hold}>Hold</Badge>} />
                  <Tab label={<Badge className={classes.padding} color="secondary" badgeContent={completed}>Completed</Badge>} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={value}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>Created By</StyledTableCell>
                        {/* <StyledTableCell>State</StyledTableCell> */}
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                        {(customerListData.length > 0 ? customerListData : []).map((data,index) =>{
                          
                          return(
                           data.state===value+1? <TableRow key={data.id} >
                            <StyledTableCell> {index + 1}  </StyledTableCell>
                            <StyledTableCell> {data.customer_name}  </StyledTableCell>
                            {/* <StyledTableCell> {data.mobile + ', ' + data.telephone}  </StyledTableCell> */}
                            <StyledTableCell> {data.mobile ===''? data.telephone : data.telephone==='' ? data.mobile : data.mobile + ', ' + data.telephone}  </StyledTableCell>
                            <StyledTableCell> {data.address}  </StyledTableCell>
                            <StyledTableCell> {data.created_by_name}  </StyledTableCell>
                            {/* <StyledTableCell> {data.state===1 ? 'Active' : data.state===2 ? 'Hold' : data.state===3 ? 'Completed':''  }  </StyledTableCell> */}
                            <StyledTableCell> 
                              <Tooltip title="Update">                              
                                <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
                                <CreateIcon/>
                                </IconButton>
                              </Tooltip>
                              {/* <Button variant="contained" color="primary" value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}> Edit </Button> */}
                            </StyledTableCell>
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
      {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} userId={userId} setCustomerList={handleCustomerList}   enquiryData={''} setCustomer={setCustomer}/>: null}
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputValues={customerData} setCustomerList={handleCustomerList} /> : null}
          
    </div>
  );
}
