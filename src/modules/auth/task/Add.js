import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';

import validate from '../../common/validation/TaskRuleValidation';
// Helpers
import { APP_TOKEN } from '../../../api/Constants';
// API CALL
import Task from '../../../api/Task';
// import Staff from '../../../api/franchise/Staff';

import Role from '../../../api/franchise/Role';
import FranchiseUsers from '../../../api/FranchiseUsers';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  task_id:'',
      task_description:'',
      assigned_to:'',
      due_date:''
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
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  tbrow:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
  },
  dropdwn:{
      // marginTop:theme.spacing(2.5),
      fontSize: theme.typography.pxToRem(12),
  }
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

export default function Add({ open, handleClose, franchiseId, handleSnackbarClick, setTaskList}) {
  const classes = useStyles();

  const roleName = APP_TOKEN.get().roleName;
  const [taskLast, setTaskLast] = useState({});
  const [taskId, setTaskId] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffListn, setStaffList] = useState([]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const [staffRole, setStaffRole] = useState();
  
  const [otherDisable, setOtherDisable] = useState(true);
  const [role, setRole] = useState([]);
  const [franchiseUsersList, setFranchiseUsersList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Task.last();
        // setTaskLast(result.taskLast[0]);
        // if(result.taskLast[0]!=null){
        //   console.log('taskLast----',result.taskLast[0].id);
        //   generate(result.taskLast[0].id);
        // }
        console.log('en',result);
        let zero = 0;
        if(result[0]!=null){ 
          zero = 6 - (result[0].id.toString().length); 
          let task_id='';
          for(let i=0; i< zero ; i++){
            task_id += '0';
          }
         setInput('task_id',('T' + task_id + (result[0].id + 1)));
        }else{
          setInput('task_id','T000001');
        }
       
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
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
    }, []);

  const addTaskMaster = async () => {
    
    setpLoading(true);
    setSavebtn(false);
    console.log('assign_role---',staffRole);
    const response = await Task.add({
      franchise_id: franchiseId,
      task_id: inputs.task_id,
      task_description:inputs.task_description,
      assign_role:staffRole,
      assigned_to:inputs.assigned_to,
      due_date:inputs.due_date,
    });

    handleSnackbarClick(true);
    setTaskList(response.taskList);
    handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
    handleClose(false);
  };

  // function validate(values) {
  //   let errors = {};

  //   return errors;
  // };

  function handleRoleChange(e){
    setStaffRole(e.target.value);
    let selectedRole = e.target.value;

    try{
   const stafflistForRole = async () => {
    const response = await FranchiseUsers.staffRoleList({
      selectedRole:selectedRole
    });
    console.log('response.staffList====',response.staffList);
    setStaffList(response.staffList);
    setOtherDisable(false);
  };

  
    stafflistForRole();
  }catch(error){
    console.log('event',error)
  }

}

 const { inputs=null, handleInputChange, handleSubmit, handleReset, errors, setInput } = useSignUpForm(
    RESET_VALUES,
    addTaskMaster,
    validate
  );

 

return (
    <div>
      <Dialog maxWidth="lg" open={open}  TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Assign Task
              </Typography>
              {/* <Button color="inherit" type="submit">
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
            {/* Franchise Details */}
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
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow  className={classes.tbrow}>
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
                              value={inputs.task_id}
                              fullWidth
                              disabled className={classes.tbrow}
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
                                value={inputs.task_description}
                                onChange={handleInputChange}
                                error={errors.task_description}
                                helperText={errors.task_description}
                                fullWidth
                                required 
                                className={classes.tbrow}
                                type="text"
                                multiline
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                          </StyledTableCell>
                          <StyledTableCell>

                            <Select
                              value={staffRole}
                              inputProps={{
                                name: 'assign_role',
                                id: 'assign_role',
                              }}
                              onChange={handleRoleChange}
                              className={classes.textsize}
                              fullWidth
                              required
                            >
                                
                                {roleName === 'Admin'?  <MenuItem className={classes.textsize} value={2}>Director</MenuItem>:''}
                              {role.map((ele,index) =>{
                                return(
                                <MenuItem className={classes.textsize} value={ele.id}>{ele.name}</MenuItem>
                                )
                              })}

                            </Select>
                            </StyledTableCell>
                          <StyledTableCell>  
                            <Select
                              value={inputs.assigned_to}
                              onChange={handleInputChange}
                              inputProps={{
                                name: 'assigned_to',
                                id: 'assigned_to',
                                label:'assigned_to'
                              }}
                              
                              required
                              disabled = {otherDisable}
                              fullWidth className={classes.dropdwn}
                              error={errors.assigned_to}
                              helperText={errors.assigned_to}
                              label="assigned_to" required >
                                { (staffListn.length > 0 ? staffListn : []).map((staff, index)=>{
                                  return(
                                    <MenuItem 
                                    className={classes.textsize} value={staff.id}>{staff.name} </MenuItem>
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
                                value={inputs.due_date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                onFocus={pastDate}
                                type="date" className={classes.dropdwn}
                                error={errors.due_date}
                                helperText={errors.due_date}
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>
                            <StyledTableCell>
                            {savebtn? <Button variant="contained" color="primary" className={classes.button}  type="submit">
                                Assign
                              </Button> : <Button variant="contained" color="primary" className={classes.button}  type="submit" disabled>
                                Assign
                              </Button> }
                              <Button variant="contained" color="primary" className={classes.button} onClick={handleClose} type="submit">
                                Close
                              </Button> 
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Paper>

            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
