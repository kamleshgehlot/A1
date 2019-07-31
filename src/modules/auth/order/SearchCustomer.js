import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

// API CALL
import Customer from '../../../api/franchise/Customer';


const RESET_VALUES = {
  searchText: '',
};

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
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    marginTop: 15,
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
  buttonMargin: {
    margin: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function SearchCustomer({ open, handleClose, handleSnackbarClick, setCustomer}) {

  const classes = useStyles();
  const [searchText, setSearchText]  = useState('');
  const [customerListData, setCustomerListData] = useState([]);
  

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

  const searchHandler = async () => {
    try {
      if(searchText!=''){
          const result = await Customer.search({searchText: searchText});
          // console.log('list---',result.customerList);
          setCustomerListData(result.customerList);
          setSearchText('');
       
      }else{
        const result = await Customer.list();
        setCustomerListData(result.customerList);
        // console.log('list---2',result.customerList);
        setSearchText('');
      }} catch (error) {
        console.log('error',error);
      }
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function handleAddCurrent(response){
    setCustomer(response);
    handleClose();
  }

return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Search Customer
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
        
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="transport"
                      name="transport"
                      // label=""
                      value={searchText}
                      fullWidth
                      required
                      type="text"
                      placeholder="Search Customer"
                      margin="dense"
                      onKeyPress={(ev) => {
                        if (ev.key ===  'Enter') {
                          searchHandler()
                          ev.preventDefault();
                        }
                      }}
                      onChange={handleSearchText}
                      InputProps={{
                        endAdornment: <InputAdornment position='end'><IconButton onClick={ searchHandler}><SearchIcon /></IconButton></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Paper style={{ width: '100%' }}>
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
                      {(customerListData.length > 0 ? customerListData :[] ).map((data,index)=>{
                        console.log('data...',data);
                        return(
                          <TableRow key={data.id} >
                          <StyledTableCell> {index + 1}  </StyledTableCell>
                          <StyledTableCell> {data.customer_name}  </StyledTableCell>
                          <StyledTableCell> {data.mobile ===''? data.telephone : data.telephone==='' ? data.mobile : data.mobile + ', ' + data.telephone}  </StyledTableCell>
                          <StyledTableCell> {data.address}  </StyledTableCell>
                          <StyledTableCell> {data.created_by_name}  </StyledTableCell>
                          {/* <StyledTableCell> {data.state===1 ? 'Active' : data.state===2 ? 'Hold' : data.state===3 ? 'Completed':''  }  </StyledTableCell> */}
                          <StyledTableCell> 
                          <Fab  aria-label="Add" color="primary" size="small" className={classes.fab} onClick={(event) => { handleAddCurrent(data); }}>
                            <AddIcon />
                          </Fab>
                          
                          </StyledTableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
               </Paper>
            </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
