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
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

// API CALL
import EnquiryAPI from '../../../api/franchise/Enquiry';
import Category from '../../../../src/api/Category';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  tbrow:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
  },
  dropdwn:{
      marginTop:theme.spacing(2.5),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
   
    color: theme.palette.common.black,
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

export default function ConvertedEnquiry({open, handleClose,handleSnackbarClick}) {
  
  const [enquiryList, setEnquiryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const classes = useStyles();

useEffect(() => {
  const fetchData = async () => {
    try{
      const result = await EnquiryAPI.convertedList();
      console.log('result..',result.enquiryList);
      setEnquiryList(result.enquiryList);

      const result1 = await Category.productlist();
        setProductList(result1.productList);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

return (
  <div>
    <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Converted Enquiries
            </Typography>
          </Toolbar>
        </AppBar>

    <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
        <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Enq ID</StyledTableCell>
                        <StyledTableCell>Customer Name</StyledTableCell>
                        <StyledTableCell>Contact No.</StyledTableCell>
                        <StyledTableCell>Interested In</StyledTableCell>
                        {/* <StyledTableCell>Options</StyledTableCell> */}
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
                              {/* <StyledTableCell>
                              <Button variant="contained" color="primary" onClick={(event) => { openCustomerPage(data); }}>
                                  Convert
                              </Button>
                              </StyledTableCell> */}
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
               </Paper>
        </Grid>
      </Grid>
      </Dialog>
  </div>
  );
}
