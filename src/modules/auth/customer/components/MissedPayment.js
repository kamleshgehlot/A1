import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import DetailsIcon from '@material-ui/icons/Details';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import FilterIcon from '@material-ui/icons/FilterList';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';;
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {TablePaginationActions} from '../../../common/Pagination';
import {getDate, getDateInDDMMYYYY} from '../../../../utils/datetime';
import { Divider } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

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
    color: 'blue',
  },
  typography: {
    padding: theme.spacing(2),
  },
}));


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

export default function MissedPayment({customerList, handleOrderView, handlePaymentFilter, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  
  const styleClass = useCommonStyles();
  const classes = useStyles();
  
  const [searchText, setSearchText] = React.useState('');
  const [paymentDate, setPaymentDate] = React.useState(null);
  

  const handleSearchText = async (e) => {
    setSearchText(e.target.value);
  }
  
  const handlePaymentDate = (date) =>{
    setPaymentDate(date);
    if(date != 'Invalid Date' && date != null){
      setSearchText(getDateInDDMMYYYY(date));
    }
  }

return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}> 
          <TextField
            margin="dense"
            id="search"
            name="search"
            placeholder ="Type (Order#, Customer Name, Payment Date) to Search Record..."
            type="text"
            autoComplete='off'
            value={searchText}
            onKeyPress={(ev) => {
              if (ev.key ===  'Enter') {
                handlePaymentFilter(searchText);
                ev.preventDefault();
              }
            }}
            onChange={handleSearchText}
            InputProps={{
              endAdornment: 
              <InputAdornment position='end'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="dense"
                    id="payment_date"
                    name="payment_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    value={paymentDate}
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                      disableUnderline: true,
                    }}       
                    onChange={handlePaymentDate}
                    error = {''}
                    helperText = {''}
                  />
                </MuiPickersUtilsProvider>    
                <Tooltip title="Search">                
                  <IconButton onClick = {()=> {handlePaymentFilter(searchText)}}><SearchIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {popupState => (
                    <div>
                      <IconButton variant="contained" color="primary" {...bindTrigger(popupState)}>
                        <FilterIcon />
                      </IconButton>
                      <Popover 
                        {...bindPopover(popupState)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                      >
                         <Paper>
                          <Typography className={classes.typography} style={{fontWeight:'bold'}}>Order Type</Typography>
                          <Divider />
                          <List >
                            <ListItem   button onClick={()=> {handlePaymentFilter('$###_Fix_###$')}}>Fix</ListItem>
                            <ListItem   button onClick={()=> {handlePaymentFilter('$###_Flex_###$')}}>Flex</ListItem>
                          </List>                          
                        </Paper>                        
                      </Popover>
                    </div>
                    )}
                  </PopupState>
                </Tooltip>
              </InputAdornment>,
            }}
            fullWidth
          />  
        </Grid>
        <Grid item xs={12} sm={12}>
      <Table stickyHeader  className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>#          </StyledTableCell>
            <StyledTableCell>Order Id   </StyledTableCell>
            <StyledTableCell>Name       </StyledTableCell>
            <StyledTableCell>Contact    </StyledTableCell>
            <StyledTableCell>Email ID   </StyledTableCell>
            <StyledTableCell>Address    </StyledTableCell>
            <StyledTableCell>Payment Due Date</StyledTableCell>
            <StyledTableCell>Created By </StyledTableCell>
            {/* <StyledTableCell>Options    </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>        
            {customerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {            
              return(
                <TableRow key={data.id}>
                    <StyledTableCell> {data.id}           </StyledTableCell>
                    <StyledTableCell>     
                      <IconButton  size="small" className={classes.textsize} value={data.id} name={data.id} component="span"  onClick={(event) => { handleOrderView(data); }}>
                        {data.order_format_id}
                      </IconButton> 
                    </StyledTableCell>
                    <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                    <StyledTableCell> {data.mobile === '' || data.mobile === null || data.mobile === undefined ? data.telephone : data.telephone==='' || data.telephone === null || data.telephone === undefined ? data.mobile : data.mobile + ', ' + data.telephone}  </StyledTableCell>
                    <StyledTableCell> {data.email} { data.is_verified ? <CheckCircleIcon style={{ fill: '#008000' }}/> : <CancelIcon  color="error"/>}</StyledTableCell>
                    <StyledTableCell> {data.address}  </StyledTableCell>
                    <StyledTableCell> {data.payment_date}  </StyledTableCell>
                    <StyledTableCell> {data.created_by_name}  </StyledTableCell>
                    <StyledTableCell>                                   
                </StyledTableCell> 
                </TableRow>
              )
            })
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              colSpan={8}
              count={customerList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>  
      </Grid>
    </Grid> 
    </div>   
  )
}
