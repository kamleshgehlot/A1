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
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from './Add';
// import Edit from './Edit';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Role from '../../../api/franchise/Role';

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


export default function Order() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [staffData,setStaffData]= useState();
  const [staffList, setStaffList] = useState({});
  const [role, setRole] = useState([]);
  const [position, setPosition] = useState({});
  
  // const roleName = APP_TOKEN.get().roleName;
  // const userName = APP_TOKEN.get().userName;
  
  // const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  // const [showStaff, setShowStaff] = useState(roleName === 'Admin');

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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
    },
    button:{
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
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

  function handleClickOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }
  function handleSnackbarClick(){
    //don't remove this function
  }

  return (
    <div>
     <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
            <AddIcon className={classes.extendedIcon} />
              Order
            </Fab>
          </Grid>
          <Grid item xs={12} sm={3}>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                label="Search"
                type="text"
                // value={searchText} 
                // onKeyPress={(ev) => {
                //   if (ev.key ===  'Enter') {
                //     searchHandler()
                //     ev.preventDefault();
                //   }
                // }}
                // onChange={handleSearchText}
                // inputProps={{
                //   endAdorment:(
                //     <InputAdornment position='start'>
                //       <SearchIcon />  ll 
                //     </InputAdornment>
                //   )
                // }}
                // fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position='end'><IconButton><SearchIcon /></IconButton></InputAdornment>,
                }}
              />
              {/* <IconButton  aria-label="Search" >
                <SearchIcon />   
              </IconButton> */}
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Order No.</StyledTableCell>
                        <StyledTableCell>Name/Order By</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Order Date</StyledTableCell>
                        <StyledTableCell>Order Status</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Rental Type</StyledTableCell>
                        <StyledTableCell>Payment Mode</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                   
                              
                    </TableBody> */}
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} />
      
      {/* {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} franchiseId={franchiseId.franchiseId} role={role} inputs={staffData} setFranchiseList={setFranchiseListFn} /> : null} */}
          
    </div>
  );
}
