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
import Add from './Add';
import CustomerAdd from '../customer/Add';
// API CALL
import EnquiryAPI from '../../../api/franchise/Enquiry';
import Category from '../../../../src/api/Category';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(18),
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


export default function Enquiry() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enquiryList, setEnquiryList] = useState([]);
  const [enquiryData,setEnquiryData] = useState([]);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [productList, setProductList] = useState([]);

  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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
    const fetchData = async () => {
      try{
        const result = await EnquiryAPI.convertedList();
        console.log('result..',result.enquiryList);
        setEnquiryList(result.enquiryList);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }

  function setEnquiryListFn(response) {
    const fetchData = async () => {
      try {
        const result = await EnquiryAPI.convert({enquiry_id: enquiryData.id});
        console.log('result..',result.enquiryList);
        setEnquiryList(result.enquiryList);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await EnquiryAPI.getAll();
        setEnquiryList(result.enquiryList);

        const result1 = await Category.productlist();
        setProductList(result1.productList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
  }, []);

  // const handleToConvertEnquiry = async () => {
  //   try {
  //     const result = await EnquiryAPI.convertEnquiry();
  //     setEnquiryList(result.enquiryList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>

          <Grid item xs={12} sm={8}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Enquiry
            </Fab>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" size="small"  onClick={handleCompleteEnquiryClickOpen} >Converted Enquiry List</Button>
          </Grid>
          
          <Grid item xs={12} sm={10}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Enq ID</StyledTableCell>
                        <StyledTableCell>Customer Name</StyledTableCell>
                        <StyledTableCell>Contact No.</StyledTableCell>
                        <StyledTableCell>Interested In</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        (enquiryList.length > 0 ? enquiryList : []).map((data, index) => {
                          return(
                            <TableRow>
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
                                        data.interested_product_id.split(',')[index] == ele.id ? ele.name + ", " :''
                                      )
                                      }) 
                                    ) 
                                    })
                                  }
                                  {/* {data.interested_product_id} */}
                              </StyledTableCell>
                              <StyledTableCell>
                              <Button variant="contained" color="primary" onClick={(event) => { openCustomerPage(data); }}>
                                  Convert
                              </Button>
                              </StyledTableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}  setEnquiryList={setEnquiryListFn}  />
      {customerOpen ? <CustomerAdd open={customerOpen} handleClose={closeCustomerPage} handleSnackbarClick={handleSnackbarClick} setCustomerList={setEnquiryListFn} enquiryData={enquiryData} /> : null}
    </div>
  );
}
