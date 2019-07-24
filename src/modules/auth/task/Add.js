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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';

// API CALL
import Task from '../../../api/Task';
// import Staff from '../../../api/franchise/Staff';

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
  tbrow:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
  },
  dropdwn:{
      marginTop:theme.spacing(2.5),
  }
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

export default function Add({ open, handleClose, franchiseId, handleSnackbarClick, setTaskList}) {
  const classes = useStyles();

  const [taskLast, setTaskLast] = useState({});
  const [taskId, setTaskId] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffList, setStaffList] = useState({});

  const [franchiseUsersList, setFranchiseUsersList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Task.last();
        // setTaskLast(result.taskLast[0]);
          console.log('taskLast----',result.taskLast[0]);
        if(result.taskLast[0]!=null){
          console.log('taskLast----',result.taskLast[0].id);
          generate(result.taskLast[0].id);
        }
        else{
          const t_id='t_1';
          setTaskId(t_id);
          // console.log('hgrfeuf----',t_id);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  function generate(last_id) {
   const tid=last_id+1;
   const t_id='t_'+tid;
    setTaskId(t_id);
  }
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
    // useEffect(() => {
    //   const fetchData = async () => {
    //     setIsError(false);
    //     setIsLoading(true);
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
    const response = await Task.add({
      franchise_id: franchiseId,
      task_id: taskId,
      task_description:inputs.task_description,
      assigned_to:inputs.assigned_to,
      due_date:inputs.due_date,
    });

    handleSnackbarClick(true);
    setTaskList(response.taskList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  function validate(values) {
    let errors = {};

    return errors;
  };

 const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    addTaskMaster,
    validate
  );

 

return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Assign Task
              </Typography>
              {/* <Button color="inherit" type="submit">
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            {/* Franchise Details */}
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow  className={classes.tbrow}>
                          <StyledTableCell> 
                            <TextField
                              id="task_id"
                              name="task_id"
                              // label="Task Id"
                              value={taskId}
                              fullWidth
                              disabled className={classes.tbrow}
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
                                value={inputs.task_description}
                                onChange={handleInputChange}
                                fullWidth
                                required className={classes.tbrow}
                                type="text"
                                multiline
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
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
                              
                              fullWidth className={classes.dropdwn}
                              label="assigned_to"
                              required
                            >
                                { (franchiseUsersList.length > 0 ? franchiseUsersList : []).map((data, index)=>{
                                  return(
                                    <MenuItem value={data.id}>{data.name} </MenuItem>
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
                                value={inputs.due_date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                onFocus={pastDate}
                                type="date" className={classes.dropdwn}
                                // placeholder="Franchise Name"
                                margin="dense"
                              /> 
                            </StyledTableCell>
                            <StyledTableCell>
                              <Button variant="contained" color="primary" className={classes.button}  type="submit">
                                Assign
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
