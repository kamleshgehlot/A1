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
import Role from '../../../api/franchise/Role';
// import Staff from '../../../api/franchise/Staff';
import FranchiseUsers from '../../../api/FranchiseUsers';

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
    height: theme.spacing(5),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
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
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(13),
  },
  body: {
    fontSize: 11,
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
  
  const [staffListn, setStaffList] = useState({});
  const [taskList, setTasksList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseUsersList, setFranchiseUsersList] = useState({});
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const [role, setRole] = useState([]);

  const addTaskMaster = async () => {
    setpLoading(true);
    setSavebtn(false);
    const response = await Task.add({
      franchise_id: franchiseId,
      id: taskList.id,
      task_id: taskList.task_id,
      task_description:taskList.task_description,
      assign_role:taskList.assign_role,
      assigned_to:taskList.assigned_to,
      status:taskList.status,
      due_date:taskList.due_date,
    });
    handleSnackbarClick(true,'Task Updated Successfully');
    // console.log('update======',response.taskList);
    setTaskList(response.taskList);
    setpLoading(false);
    handleEditClose(false);
  };

  
  function pastDate(){
    var dtToday = new Date();
      
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if(month < 10)
          month = '0' + month.toString();
      if(day < 10)
          day = '0' + day.toString();
          var maxDate = year + '-' + month + '-' + day;
          document.getElementById('due_date').setAttribute('min', maxDate);
    }
    
  const rescheduleTask = async () => {

    // console.log('taskList======',taskList);
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
    setSavebtn(true);
    handleEditClose(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await Staff.list();
  //       setStaffList(result.staffList);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);
  function handleRoleChange(e){
    // setStaffRole(e.target.value);
    let selectedRole = e.target.value;
    const { name, value } = e.target
    setTasksList({ ...taskList, [name]: value })
    try{
   const stafflistForRole = async () => {
    const response = await FranchiseUsers.staffRoleList({
      selectedRole:selectedRole
    });
    // console.log('response.staffList====',response.staffList);
    setStaffList(response.staffList);
    // setOtherDisable(false);
  };

  
    stafflistForRole();
  }catch(error){
    console.log('event',error)
  }

}
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await FranchiseUsers.list();
        setFranchiseUsersList(result.franchiseUserList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    try{
      const stafflistForRole = async () => {
       const response = await FranchiseUsers.staffRoleList({
         selectedRole:taskList.assign_role
       });
      //  console.log('response.staffList====',response.staffList);
       setStaffList(response.staffList);
      //  setOtherDisable(false);
     };
       stafflistForRole();
     }catch(error){
       console.log('event',error)
     }
    const roleData = async () => {
      
      try {
        const result = await Role.list();
        setRole(result.role);
      } catch (error) {
        console.log("Error",error);
      }
    };
    roleData();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTasksList({ ...taskList, [name]: value })
  }
  return (
    <div>
      <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Edit Task
              </Typography>
              {/* <Button onClick={addTaskMaster} color="inherit">
                Update
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>
                <Grid container spacing={4}>
                <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Assigned Role</StyledTableCell>
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
                                InputProps={{
                                  classes: {
                                    input: classes.textsize,
                                  },
                                }}
                              id="task_id"
                              name="task_id"
                              // label="Task Id"
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
                                InputProps={{
                                  classes: {
                                    input: classes.textsize,
                                  },
                                }}
                                id="task_description"
                                name="task_description"
                                // label="Task Description"
                                value={taskList.task_description}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                type="text"
                                multiline
                                margin="dense"
                              /> 
                          </StyledTableCell>
                          <StyledTableCell>

                            <Select
                              value={taskList.assign_role}
                              inputProps={{
                                name: 'assign_role',
                                id: 'assign_role',
                              }}
                              onChange={handleRoleChange}
                              className={classes.textsize}
                              fullWidth
                              required
                            >
                              <MenuItem className={classes.textsize} value={2}>Director</MenuItem>
                              {role.map((ele,index) =>{
                                return(
                                <MenuItem className={classes.textsize} value={ele.id}>{ele.name}</MenuItem>
                                )
                              })}

                            </Select>
                            </StyledTableCell>
                          <StyledTableCell>  
                            <Select
                              value={taskList.assigned_to}
                              onChange={handleInputChange}
                              inputProps={{
                                name: 'assigned_to',
                                id: 'assigned_to',
                                // label:'assigned_to'
                              }}
                              className={classes.textsize}
                              fullWidth
                              // label="assigned_to"
                              required
                            >
                      
                                { (staffListn.length > 0 ? staffListn : []).map((staff, index)=>{
                                  return(
                                    <MenuItem className={classes.textsize} value={staff.id}>{staff.name} </MenuItem>
                                )})
                                }
                            </Select>
                          </StyledTableCell>
                            
                            <StyledTableCell>
                              
                              <TextField 
                                InputProps={{
                                  classes: {
                                    input: classes.textsize,
                                  },
                                }}
                                id="due_date"
                                name="due_date"
                                // label="Task Id"
                                value={taskList.due_date}
                                onChange={handleInputChange}
                                fullWidth
                                required 
                                onFocus={pastDate}
                                type="date"
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>
                            {/* <StyledTableCell> */}
                              
                              {/* <TextField className={classes.textsize}
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
                                <TextField 
                                InputProps={{
                                  classes: {
                                    input: classes.textsize,
                                  },
                                }} 
                                id="new_due_date" 
                                name="new_due_date" 
                                value={taskList.new_due_date} 
                                onChange={handleInputChange}
                                fullWidth 
                                required 
                                type="date"  
                                margin="dense" /> 
                              </StyledTableCell>
                            :''}
                            <StyledTableCell>
                            {savebtn?  <Button variant="contained" color="primary" className={classes.button} onClick={taskList.status===3? rescheduleTask:addTaskMaster}  type="submit">
                                Update
                              </Button>: <Button variant="contained" color="primary" className={classes.button} onClick={taskList.status===3? rescheduleTask:addTaskMaster}  type="submit" disabled>
                                Update
                              </Button>}
                              <Button variant="contained" color="primary" className={classes.button} onClick={handleEditClose}  type="submit">
                                Close
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
