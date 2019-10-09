import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { APP_TOKEN } from '../../../api/Constants';
import Edit from './Edit';
import Add from './Add';
import ArchivedList from './ArchivedList';
import Tooltip from '@material-ui/core/Tooltip'; 
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import BadgeComp from '../../common/BadgeComp';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// API CALL

import Product from '../../../../src/api/Category';
import Brand from '../../../api/product/Brand';
import Color from '../../../api/product/Color';
import Status from '../../../api/product/Status';

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

export default function ProductList({roleName}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [receivedData, setReceivedData]= useState([]);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  
  const [openArchived, setArchivedOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [activeProduct,setActiveProduct] = useState();
  const [onholdProduct,setOnholdProduct] = useState();
  const [discontinuedProduct,setDiscontinuedProduct] = useState();
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
      // width: 900
    },
    title: {
      flexGrow: 1,
      fontSize: theme.typography.pxToRem(14),
      color:"white",
      marginTop:theme.spacing(-3),
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
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    padding: {
      padding: theme.spacing(0, 2),
    },
    fonttransform:{
      textTransform:"initial",
      fontSize: theme.typography.pxToRem(13),
    },
    button:{
      color:"white",
      fontSize: theme.typography.pxToRem(10),
    },
    textsize:{
      color:"white",
      fontSize: theme.typography.pxToRem(12),
    }
  }));
    const classes = useStyles();

    useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Product.productlist();
        setProductList(result.productList);
        handleCount(result.productList);

        const brand_result = await Brand.list();
        setBrandList(brand_result.brandList);
        const color_result = await Color.list();
        setColorList(color_result.colorList);
        const status_result = await Status.list();
        setStatusList(status_result.statusList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  function handleCount(productList) {
    let active = 0 ;
    let onhold = 0 ;
    let discontinued = 0; 
    (productList).map( data=> {
      data.status === 1 ? active+=1 : '';
      data.status === 2 ? onhold+=1 : '';
      data.status === 3 ? discontinued+=1 : '';
    })
    setActiveProduct(active);
    setOnholdProduct(onhold);
    setDiscontinuedProduct(discontinued);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickEditOpen(response) {
    setReceivedData(response);
    setEditOpen(true);
  }
  
  function handleEditClose() {
    setEditOpen(false);
    
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function setCategoryListFn(response) {
    setProductList(response);
    handleCount(response);
    
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const brand_result = await Brand.list();
        setBrandList(brand_result.brandList);
        const color_result = await Color.list();
        setColorList(color_result.colorList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }

  
  const searchHandler = async () => {
    try {
    if(searchText!=''){
        const result = await Product.search({searchText: searchText});        
        setProductList(result.productList);        
        setSearchText('');
        handleCount(result.productList);           
    }else{
      const result = await Product.productlist();
      setProductList(result.productList);
      setSearchText('');
      handleCount(result.productList);      
    }} catch (error) {
      console.log('error',error);
    }
  }


  

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  function handleArchivedClickOpen(){
    setArchivedOpen(true);
  }
  function handleArchivedClose() {
    setArchivedOpen(false);
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
  }


  return (
    <div>
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
            Product
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
          </Grid>
         
        <Grid item xs={12} sm={12} md={12}>
          
        <AppBar position="static"  className={classes.appBar}>
            <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
              <Tab label={<BadgeComp count={activeProduct} label="Active" />} /> 
              <Tab label={<BadgeComp count={onholdProduct} label="OnHold" />} /> 
              <Tab label={<BadgeComp count={discontinuedProduct} label="Discontinued" />} /> 
          </Tabs>
          </AppBar>
          <TabPanel value={value} index={value}>
          <Paper style={{ width: '100%' }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Color</StyledTableCell>
                  <StyledTableCell>Brand</StyledTableCell>
                  <StyledTableCell>Invoice Number</StyledTableCell>
                  <StyledTableCell>Rental Price</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { (productList.length > 0 ? productList : []).map((data, index)=>{
                 return(
                  data.status===value+1? <TableRow key={data.id} >
                      <StyledTableCell component="th" scope="row">
                      {index+1}
                      </StyledTableCell>
                      <StyledTableCell>{data.name}</StyledTableCell>
                      
                      { colorList.map((datacolor, index)=>{
                        return(
                          data.color_id===datacolor.id ?
                            <StyledTableCell>{datacolor.color}</StyledTableCell>
                            :''
                            )
                            
                           })
                         }

                      { brandList.map((databrand, index)=>{
                        return(
                          data.brand_id===databrand.id ?
                            <StyledTableCell>{databrand.brand_name}</StyledTableCell>
                            :''
                            )
                            
                           })
                         }
                      <StyledTableCell>{data.invoice}</StyledTableCell>
                      <StyledTableCell>{data.rental}</StyledTableCell>
                      { statusList.map((datastatus, index)=>{
                        return(
                          data.status===datastatus.id ?
                            <StyledTableCell>{datastatus.status}</StyledTableCell>
                            :''
                            )
                            
                           })
                         }
                         <StyledTableCell>

                         <Tooltip title="Edit">
                          <IconButton  size="small" value={data.id} name={data.id}  onClick={(event) => { handleClickEditOpen(data); }} disabled={data.status===3 ? true : false}>                         
                             <EditIcon />  
                          </IconButton>
                        </Tooltip>                                     
                      </StyledTableCell>
                  </TableRow>:''
                 )
                 
                })
              }
              </TableBody>
            </Table>
          </Paper>
          </TabPanel>
        </Grid>
      </Grid>
      
      {open? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} updateProductList = {setCategoryListFn} /> :null}
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputValues={receivedData} updateProductList={setCategoryListFn}/> : null}
      {openArchived ?  <ArchivedList open={openArchived} handleArchivedClose={handleArchivedClose}  />: null}
      
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Category Created successfully!"
        />
      </Snackbar>
    </div>
  );
}