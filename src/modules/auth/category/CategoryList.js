import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import MuiVirtualizedTable from '../../common/MuiVirtualizedTable';
import Grid from '@material-ui/core/Grid';
import { APP_TOKEN } from '../../../api/Constants';
import { store, useStore } from '../../../store/hookStore';
import UserList from '../layout/franchise/UserList';
import Edit from './Edit';
import Add from './Add';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';

// API CALL
import Category from '../../../../src/api/Category';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

export default function CategoryList(props) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editid,setData]= useState();
  
  const [productList, setProductList] = useState([]);
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

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
  }));
  const classes = useStyles();


    useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Category.productlist();
        setProductList(result.productList);
        console.log(result.productList);
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


  function handleClickEditOpen(val) {
    setData(val);
    setEditOpen(true);
    console.log(val);
  }

  
  function handleEditClose() {
    setEditOpen(false);
  }

  function setCategoryListFn(categoryList) {
    setCategoryList(categoryList);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="Add"
            className={classes.margin}
            onClick={handleClickOpen}
          >
            <AddIcon className={classes.extendedIcon} />
            Add Product
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ width: '100%' }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S. No.</StyledTableCell>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Color</StyledTableCell>
                  <StyledTableCell>Brand</StyledTableCell>
                  <StyledTableCell>Buying Price</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Specification</StyledTableCell>
                  <StyledTableCell>Brought from</StyledTableCell>
                  <StyledTableCell>Invoice Number</StyledTableCell>
                  <StyledTableCell>Rental Price</StyledTableCell>
                  <StyledTableCell>Meta Keywords</StyledTableCell>
                  <StyledTableCell>Meta Description</StyledTableCell>
                  <StyledTableCell>Edit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               { productList.map((data, index)=>{
                 return(
                  <TableRow key={data.id} >
                      <StyledTableCell component="th" scope="row">
                      {data.id}
                      </StyledTableCell>
                      <StyledTableCell>{data.name}</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>{data.buying_price}</StyledTableCell>
                      <StyledTableCell>{data.description}</StyledTableCell>
                      <StyledTableCell>{data.specification}</StyledTableCell>
                      <StyledTableCell>{data.brought}</StyledTableCell>
                      <StyledTableCell>{data.invoice}</StyledTableCell>
                      <StyledTableCell>{data.rental}</StyledTableCell>
                      <StyledTableCell>{data.meta_keywords}</StyledTableCell>
                      <StyledTableCell>{data.meta_description}</StyledTableCell>
                      <StyledTableCell>
                        <Button variant="contained" color="primary" key={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(index); }}>
                        Edit
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
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}/>
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} dataid={editid} datarow={categoryList[editid]} setCategoryList={setCategoryListFn}/> : null}
      
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
