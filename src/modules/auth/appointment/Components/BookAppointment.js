import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import {TablePaginationActions} from '../../../common/Pagination';


// Component
import {useCommonStyles} from '../../../common/StyleComman.js';
import useSignUpForm from '../../franchise/CustomHooks';
import validate from '../../../common/validation/AppointmentTimeslotDialog';
import {getDate, getCurrentDate, getTimeinDBFormat, get12HourTime } from '../../../../utils/datetime';


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

const useStyles = makeStyles(theme => ({
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
  },
  textHeading:{
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),   
    width: "100%",
  },
}));


const RESET_VALUES = {
  appointment_date : new Date(),
  meeting_time : 15,
};


export default function BookAppointment({handleMainPage, userData}) {
  const classes = useStyles();
  
  const { inputs, handleDateChange, handleInputChange, handleSubmit, handleRandomInput, setInput, errors } = useSignUpForm(    
    RESET_VALUES,
    () => {},
    {},
  );

  return (
      <Grid container spacing={2} alignItems = "center">
        <Grid item xs={12} sm={12}>
          <div style = {{display: 'flex'}}>
            <Tooltip title="Back to Home">
              <IconButton  size="small" component="span" onClick = {handleMainPage}> <BackArrowIcon/> </IconButton>
            </Tooltip>
            <Typography variant="h6" className={classes.labelTitle}> Book Appointment </Typography>
          </div>
          <Divider variant="fullWidth" />
        </Grid>          
        <Grid item xs={12} sm={4}>
          <InputLabel  className={classes.textHeading} htmlFor="meeting_time">Meeting Time</InputLabel>
            <Select              
              value= {inputs.meeting_time}
              onChange={handleInputChange}
              // style= {{'marginTop':'4px'}}
              inputProps={{
                name: 'meeting_time',
                id: 'meeting_time',                                         
              }}
              fullWidth
              required
              className={classes.textsize} 
            >
              <MenuItem  className={classes.textsize} value={15}>{'15 Minutes'}</MenuItem>
              <MenuItem  className={classes.textsize} value={30}>{'30 Minutes'}</MenuItem>
              <MenuItem  className={classes.textsize} value={45}>{'45 Minutes'}</MenuItem>
              <MenuItem  className={classes.textsize} value={60}>{'1 Hour'}</MenuItem>
            </Select>        
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel  className={classes.textHeading} htmlFor="appointment_date">Appointment Date</InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="dense"
              id="appointment_date"
              name="appointment_date"
              format="dd-MM-yyyy"
              placeholder="DD-MM-YYYY"
              disablePast = {true}
              value={inputs.appointment_date}
              InputProps={{
                classes: {
                  input: classes.textsize,
                },
              }}
              fullWidth
              onChange={(date) => {handleDateChange('appointment_date', date)}}
            />
          </MuiPickersUtilsProvider>       
        </Grid>
      </Grid>
  )
}