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
import TableRow from '@material-ui/core/TableRow';
import Add from './Add';
import Edit from './Edit';

import useSignUpForm from '../franchise/CustomHooks';
// API CALL
import TaskAPI from '../../../api/Task';
import Staff from '../../../api/franchise/Staff';

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


export default function Task(franchiseId) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [taskData,setTaskData]= useState();
  const [delId,setDelId]= useState();
  const [tasksList, setTaskList] = useState({});
  const [staffList, setStaffList] = useState({});

  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

  // const [showTask, setShowTask] = useState(roleName === 'Super Admin');
  const [showTask, setShowTask] = useState(roleName === 'Admin');
    
 
  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    fonttransform:{
      textTransform:"initial"
    },
    button:{
      marginRight: theme.spacing(2),
    },
    tbrow:{
      
    marginTop:theme.spacing(10),
    },
    bgtask:{
      backgroundColor:"yellow",
      padding: theme.spacing(1),
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await TaskAPI.list();
        setTaskList(result.taskList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
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

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickEditOpen(data) {
    setTaskData(data),
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  ////////////////////////////////////////
  function setTaskListFn(response) {
    setTaskList(response);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  
  function handleTaskClick() {
    setShowTask(true);
    setShowTask(false);
  }
  function handleClickDel(data) {

    setDelId(data.id);
    handleClickDelete(data.id);
    
  }

  const handleClickDelete = async (id) => {
    const response = await TaskAPI.delete({
      id:id,
      franchise_id: franchiseId,
    });
    // handleSnackbarClick(true,'Franchise Updated Successfully');
    // setFranchiseList(response.staffList);
    // handleReset(RESET_VALUES);
    setTaskList(response.taskList);
  };



  // const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
  //   // RESET_VALUES,
  //   handleClickDelete,
  //   validate
  // );
  return (
    <div>
      {/* {showTask ?  */}
      <Grid container spacing={3}>

              <Grid item xs={12} sm={12}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Task
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    { (tasksList.length > 0 ? tasksList : []).map((data, index)=>{
                      return(
                        <TableRow >
                        <StyledTableCell> {data.id}  </StyledTableCell>
                          <StyledTableCell> {data.task_id}  </StyledTableCell>
                          <StyledTableCell> {data.task_description}  </StyledTableCell>
                         
                            { (staffList.length > 0 ? staffList : []).map((datastaff, index1)=>{
                                return(
                                  data.assigned_to===datastaff.id ?
                                  <StyledTableCell> {datastaff.first_name + ' ' + datastaff.last_name}</StyledTableCell>
                                    :''
                                    )
                                    
                              })
                            }
                            
                          
                            
                          <StyledTableCell><p className={classes.bgtask}>{data.due_date}</p></StyledTableCell>
                          <StyledTableCell>
                            <Button variant="contained" color="primary"  value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}>
                              Update
                            </Button>
                            <Button variant="contained" color="primary" key={data.id} value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickDel(data); }}>
                              Delete
                            </Button>
                          </StyledTableCell>
                        </TableRow>
                      )
                      })
                    }
                    </TableBody>
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      <Add open={open} handleClose={handleClose} franchiseId={franchiseId.franchiseId}  handleSnackbarClick={handleSnackbarClick} setTaskList={setTaskListFn} />
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} franchiseId={franchiseId.franchiseId}  handleSnackbarClick={handleSnackbarClick} inputs={taskData} setTaskList={setTaskListFn}  /> : null}
          
    </div>
  );
}
