import React, { useState, useEffect } from 'react';
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
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LinearProgress from '@material-ui/core/LinearProgress';
// API CALL
import Task from '../../../api/Task';
import Staff from '../../../api/franchise/Staff';
const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
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
export default function StaffEdit({open, handleEditClose, franchiseId, handleSnackbarClick,  inputs, setTaskList,uid}) {
  const classes = useStyles();
  
  const [staffList, setStaffList] = useState({});
  const [taskList, setTasksList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dateToday, setTodayDate]= useState();
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const addTaskMaster = async () => {
    setpLoading(true);
    setSavebtn(false);
    // console.log('taskList------------',taskList);
    const response = await Task.staffupdate({
      franchise_id: franchiseId,
      id: taskList.id,
      task_id: taskList.task_id,
      message:taskList.message,
      updated_date:taskList.updated_date,
      status:taskList.status,
    });
    handleSnackbarClick(true);
    setTaskList(response.taskList);
    setpLoading(false);
    handleEditClose(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        todayDate();
        const result = await Staff.list();
        setStaffList(result.staffList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTasksList({ ...taskList, [name]: value })
  }
  function todayDate(){
    
    const today=new Date();
    const date= today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setTodayDate(date);
    setTasksList({ ...taskList, updated_date: date })
  }
  return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleEditClose} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Update Task
              </Typography>
              {/* <Button onClick={addTaskMaster} color="inherit">
                Update
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>
                <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
                <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        {/* <StyledTableCell>Updated On</StyledTableCell> */}
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                        <StyledTableCell>Option</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                          <StyledTableCell> 
                            <TextField
                              id="task_id"
                              name="task_id"
                              label="Task Id"
                              value={taskList.task_id}
                              fullWidth
                              disabled
                              type="text"
                              // placeholder="Franchise Name"
                              margin="dense"
                            /> 
                          </StyledTableCell>
                          <StyledTableCell> 
                            <TextField
                                id="task_description"
                                name="task_description"
                                label="Task Description"
                                value={taskList.task_description}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                disabled
                                type="text"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                          </StyledTableCell>                            
                            <StyledTableCell>
                              
                              <TextField
                                id="due_date"
                                name="due_date"
                                // label="Task Id"
                                value={taskList.due_date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                disabled
                                type="date"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>                          
                            {/* <StyledTableCell>
                              
                              <TextField
                                id="updated_date"
                                name="updated_date"
                                // label="Task Id"
                                value={taskList.updated_date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                disabled
                                type="date"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>                      */}
                            <StyledTableCell>
                              
                              <TextField
                                id="message"
                                name="message"
                                // label="Task Id"
                                value={taskList.message}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                multiline
                                type="text"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>
                            <StyledTableCell>
                              <Select
                                value={taskList.status}
                                onChange={handleInputChange}
                                inputProps={{
                                  name: 'status',
                                  id: 'status',
                                  label:'status'
                                }}
                                fullWidth
                                label="status"
                                required
                              >
                                <MenuItem disabled  value="1" selected>Scheduled
                                </MenuItem>
                                <MenuItem value="2">In-progress</MenuItem>
                                <MenuItem value="3">Reschedule </MenuItem>
                                <MenuItem value="4">Completed </MenuItem>
                              </Select>
                            </StyledTableCell>
                            <StyledTableCell>
                            {savebtn? <Button variant="contained" color="primary" className={classes.button} onClick={addTaskMaster}  type="submit">
                                Update
                              </Button> : <Button variant="contained" color="primary" className={classes.button} onClick={addTaskMaster}  type="submit" disabled>
                                Update
                              </Button>}
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Paper>
          </div>
        </from>
      </Dialog>
    </div>
  );
}
