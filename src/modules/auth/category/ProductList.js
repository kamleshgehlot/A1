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
// import MuiVirtualizedTable from '../../common/MuiVirtualizedTable';
import Grid from '@material-ui/core/Grid';
import { APP_TOKEN } from '../../../api/Constants';
import Edit from './Edit';
import Add from './Add';
import ArchivedList from './ArchivedList';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';

// API CALL
import Category from '../../../../src/api/Category';
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

export default function ProductList(props) {
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
  //value is for tabs  
  const [value, setValue] = React.useState(0);
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

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
        const result = await Category.productlist();
        setProductList(result.productList);
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
  // /////////////////////////////////////

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

  function setCategoryListFn(response) {
    setProductList(response);
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
    // console.log('setValue...',value)
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
          {/* <Grid item xs={12} sm={2}>
            <Fab
              variant="extended"
              size="small"
              // color="primary"
              aria-label="Complete"
              className={classes.fonttransform}
              onClick={handleArchivedClickOpen}
            >
              Archived Products
            </Fab>
          </Grid> */}
        <Grid item xs={12} sm={12} md={10}>
          
        <AppBar position="static"  className={classes.appBar}>
            <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
              
           
            { statusList.map((datastatus, index)=>{
            return(
              <Tab label={datastatus.status} />
                )
                
                })
              }
              {/* <Tab label="Open" />
              <Tab label="Active" />
              <Tab label="Inactive"  />
              <Tab label="Close" /> */}
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
                  {/* <StyledTableCell>Buying Price</StyledTableCell> */}
                  {/* <StyledTableCell>Description</StyledTableCell> */}
                  {/* <StyledTableCell>Specification</StyledTableCell> */}
                  {/* <StyledTableCell>Brought from</StyledTableCell> */}
                  <StyledTableCell>Invoice Number</StyledTableCell>
                  <StyledTableCell>Rental Price</StyledTableCell>
                  {/* <StyledTableCell>Meta Keywords</StyledTableCell> */}
                  {/* <StyledTableCell>Meta Description</StyledTableCell> */}
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
                      {/* <StyledTableCell>{data.buying_price}</StyledTableCell> */}
                      {/* <StyledTableCell>{data.description}</StyledTableCell>
                      <StyledTableCell>{data.specification}</StyledTableCell>
                      <StyledTableCell>{data.brought}</StyledTableCell> */}
                      <StyledTableCell>{data.invoice}</StyledTableCell>
                      <StyledTableCell>{data.rental}</StyledTableCell>
                      {/* <StyledTableCell>{data.meta_keywords}</StyledTableCell> */}
                      {/* <StyledTableCell>{data.meta_description}</StyledTableCell> */}
                      { statusList.map((datastatus, index)=>{
                        return(
                          data.status===datastatus.id ?
                            <StyledTableCell>{datastatus.status}</StyledTableCell>
                            :''
                            )
                            
                           })
                         }
                         <StyledTableCell>
                            {data.status===3 ? 
                              <Button disabled variant="contained" color="primary" key={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}>
                              Edit
                              </Button>
                              :<Button variant="contained" color="primary" key={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}>
                                Edit
                                </Button>
                              }
                              
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
      
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} updateProductList = {setCategoryListFn} />
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputs={receivedData} updateProductList={setCategoryListFn}/> : null}
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