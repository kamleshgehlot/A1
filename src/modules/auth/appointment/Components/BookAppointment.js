import React, {useState, useEffect} from 'react';

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
import Button from '@material-ui/core/Button';
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
import Paper from '@material-ui/core/Paper';
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
import { MuiPickersUtilsProvider, KeyboardTimePicker, DatePicker, KeyboardDatePicker} from '@material-ui/pickers';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import TextField from '@material-ui/core/TextField';
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
import {getDate, setTime, getCurrentDate, getTimeinDBFormat, getTime, get12HourTime } from '../../../../utils/datetime';

import TimingBoard from './TimingBoard.js';

// API
import AppointmentAPI from '../../../../api/Appointment.js';
import moment from 'moment';
import { boolean } from 'yup';


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
  appointment_date : null,
  meeting_time : 15,
};


export default function BookAppointment({handleMainPage, userData}) {
  const classes = useStyles();
  
  const [currentTimeslotList, setCurrentTimeslotList] = useState([]);
  const [timingTable, setTimingTable] = useState([]);

  useEffect(() => {
    getCurrentTimeslot();   
    generateTimingTable(); 
  },[]);

    

  const generateTimingTable = () => {
    let startTime = setTime('08:00');
    let endTime = setTime('20:00');
    let times = [];

    do {
      times.push({
        'original_time' : startTime,
        'time' : getTime(startTime),
        'start_time' : get12HourTime(startTime),
        'end_time' : get12HourTime(moment(startTime).add(15, 'minute')),
      });

      startTime = moment(startTime).add(15, 'minute');
    } while (getTime(startTime) !== getTime(endTime));
    setTimingTable(times);
  }

  const getCurrentTimeslot = async () => {
    try{
      const result = await AppointmentAPI.getCurrentTimeslot({ userId : userData.id });
      setCurrentTimeslotList(result.timeSlot);
      const firstDate = (result.timeSlot.length > 0 ? result.timeSlot : []).find((data) => {
        return data.status === 1
      })
      setInput('appointment_date', firstDate.date);
    }catch(e){
      console.log('getCurrentTimeslot Error...', e);
    }
  }

  const handleDateAvaibility = (date) => {
    const found = (currentTimeslotList.length > 0 ? currentTimeslotList : []).find((data) => {
      return data.date === getDate(date) && data.status === 1;
    })
    return found === undefined;
  }

  
  const { inputs, handleDateChange, handleInputChange, handleSubmit, handleRandomInput, setInput, errors } = useSignUpForm(    
    RESET_VALUES,
    () => {},
    {},
  );

  // useEffect(() => {

  // },[inputs.appointment_date]);

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
          <Typography  className={classes.textHeading} htmlFor="meeting_time">Meeting Time</Typography>
            <Select  
              variant = "outlined"
              value= {inputs.meeting_time}
              onChange={handleInputChange}
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
          <Typography  className={classes.textHeading} htmlFor="appointment_date">Appointment Date</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant = "inline"              
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
              shouldDisableDate = {(date) => { return handleDateAvaibility(date)}}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography  className={classes.textHeading} htmlFor="">TIMING BOARD</Typography>
          <Paper style={{ width: '68%' }}>
            { inputs.appointment_date && 
              <TimingBoard selectedDate = {getDate(inputs.appointment_date)} currentTimeslotList={currentTimeslotList} timingTable = {timingTable} /> 
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography  className={classes.textHeading} htmlFor="">FILL CLIENT's INFORMATION</Typography>
          <Paper style={{ width: '100%' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <InputLabel  className={classes.textHeading} htmlFor="first_name">First Name</InputLabel>
                    <TextField
                      variant="outlined"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="mobile"
                      name="mobile"
                      type="text"
                      // value={inputs.mobile} 
                      // onChange={handleNumberInput}
                      // error={errors.mobile}
                      // helperText={errors.mobile}
                      fullWidth
                      // onInput={(e)=>{ 
                      //   e.target.value =(e.target.value).toString().slice(0,10)
                      // }}
                    />
                  </TableCell>
                  <TableCell>
                    <InputLabel  className={classes.textHeading} htmlFor="last_name">Last Name</InputLabel>
                    <TextField
                      variant="outlined"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      type="text"
                      // value={inputs.last_name} 
                      // onChange={handleNumberInput}
                      // error={errors.last_name}
                      // helperText={errors.last_name}
                      fullWidth
                      // onInput={(e)=>{ 
                      //   e.target.value =(e.target.value).toString().slice(0,10)
                      // }}
                    />
                  </TableCell>
                  <TableCell>
                    <InputLabel  className={classes.textHeading} htmlFor="contact">Contact Number</InputLabel>
                    <TextField
                      variant="outlined"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="contact"
                      name="contact"
                      type="text"
                      // value={inputs.contact} 
                      // onChange={handleNumberInput}
                      // error={errors.contact}
                      // helperText={errors.contact}
                      fullWidth
                      // onInput={(e)=>{ 
                      //   e.target.value =(e.target.value).toString().slice(0,10)
                      // }}
                    />
                  </TableCell>
                  <TableCell>
                    <InputLabel  className={classes.textHeading} htmlFor="reference">Reference</InputLabel>
                    <TextField
                      variant="outlined"
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="reference"
                      name="reference"
                      type="text"
                      // value={inputs.reference} 
                      // onChange={handleNumberInput}
                      // error={errors.reference}
                      // helperText={errors.reference}
                      fullWidth
                      // onInput={(e)=>{ 
                      //   e.target.value =(e.target.value).toString().slice(0,10)
                      // }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.textHeading} htmlFor="reference">Action</Typography>
                    <Button variant="contained"  color="primary"> SUBMIT </Button> 
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>#        </StyledTableCell>
                <StyledTableCell>Client Name       </StyledTableCell>
                <StyledTableCell>Contact    </StyledTableCell>
                <StyledTableCell>Reference    </StyledTableCell>
                <StyledTableCell>Appointment Date    </StyledTableCell>
                <StyledTableCell>Meeting Time    </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>        
               
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={6}
                  count={}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter> */}
          </Table>  
        </Grid>
      </Grid>
  )
}