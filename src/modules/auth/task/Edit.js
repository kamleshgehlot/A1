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
export default function Edit({open, handleEditClose, franchiseId, handleSnackbarClick,  inputs, setTaskList}) {
  const classes = useStyles();
  
  const [staffList, setStaffList] = useState({});
  const [taskList, setTasksList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const addTaskMaster = async () => {
    const response = await Task.add({
      franchise_id: franchiseId,
      id: taskList.id,
      task_id: taskList.task_id,
      task_description:taskList.task_description,
      assigned_to:taskList.assigned_to,
      status:taskList.status,
      due_date:taskList.due_date,
    });
    handleSnackbarClick(true,'Task Updated Successfully');
    // console.log('update======',response.taskList);
    setTaskList(response.taskList);
    handleEditClose(false);
  };

  
  const rescheduleTask = async () => {

    console.log('taskList======',taskList);
    const response = await Task.reschedule({
      franchise_id: franchiseId,
      assignid: taskList.assignid,
      task_id: taskList.task_id,
      task_description:taskList.task_description,
      assigned_to:taskList.assigned_to,
      due_date:taskList.due_date,
      new_due_date:taskList.new_due_date,
      status:taskList.status
    });
    handleSnackbarClick(true,'Task Rescheduled Successfully');
    // console.log('update======',response.taskList);
    setTaskList(response.taskList);
    handleEditClose(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
                Edit Task
              </Typography>
              {/* <Button onClick={addTaskMaster} color="inherit">
                Update
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>
                <Grid container spacing={4}>
                <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        {/* <StyledTableCell>status</StyledTableCell> */}
                        {taskList.status===3?<StyledTableCell>New Due Date</StyledTableCell>:''}
                        <StyledTableCell>Options</StyledTableCell>
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
                                required
                                type="text"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                          </StyledTableCell>
                          <StyledTableCell>  
                            <Select
                              value={taskList.assigned_to}
                              onChange={handleInputChange}
                              inputProps={{
                                name: 'assigned_to',
                                id: 'assigned_to',
                                label:'assigned_to'
                              }}
                              
                              fullWidth
                              label="assigned_to"
                              required
                            >
                      
                              { (staffList.length > 0 ? staffList : []).map((data, index1)=>{
                          
                                    return(
                                <MenuItem value={data.id}>{data.first_name + ' ' + data.last_name} </MenuItem>
                                )
                                })
                              }
                            </Select>
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
                                type="date"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>
                            {/* <StyledTableCell> */}
                              
                              {/* <TextField
                                id="status"
                                name="status"
                                // label="Task Id"
                                value={taskList.status}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                type="text"
                                disabled
                                // placeholder="Franchise Name"
                                margin="dense"
                              />  */}
                            {/* </StyledTableCell> */}
                            {taskList.status===3? 
                              <StyledTableCell>
                                <TextField id="new_due_date" name="new_due_date" value={taskList.new_due_date} onChange={handleInputChange}
                                  fullWidth required type="date"  margin="dense" /> 
                              </StyledTableCell>
                            :''}
                            <StyledTableCell>
                              <Button variant="contained" color="primary" className={classes.button} onClick={taskList.status===3? rescheduleTask:addTaskMaster}  type="submit">
                                Update
                              </Button>
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
