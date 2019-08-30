import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import ArchiveIcon from '@material-ui/icons/Archive';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
//files
import Add from './Add';
import MyTask from './MyTask';
import Edit from './Edit';
import CompletedTask from './CompletedTask';

import StaffEdit from './StaffEdit';
import useSignUpForm from '../franchise/CustomHooks';
// API CALL
import TaskAPI from '../../../api/Task';
// import Staff from '../../../api/franchise/Staff';
import FranchiseUsers from '../../../api/FranchiseUsers';

import Role from '../../../api/franchise/Role';
import StaffTask from '../task/StaffTask';
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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function Task(franchiseId) {
  const [open, setOpen] = useState(false);
  const [openCompleteTask, setCompleteTaskOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  const [staffEditOpen, setStaffEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [taskData,setTaskData]= useState();
  const [taskStatusList, setTaskStatusList]=useState([]);
  const [delId,setDelId]= useState();
  const [tasksList, setTaskList] = useState({});
  const [staffTaskList, setStaffTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [staffList, setStaffList] = useState({});
  const [franchiseUsersList, setFranchiseUsersList] = useState({});
  const [dateToday, setTodayDate]= useState();
  
  const [role, setRole] = useState([]);
  const [showStaffTask, setShowStaffTask] = useState(false);
  const [assignedid,setAssignedid]= useState();
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;
  
  const uid = APP_TOKEN.get().uid;
  //value is for tabs  
  const [value, setValue] = React.useState(0);

  // const [showTask, setShowTask] = useState(roleName === 'Super Admin');
  const [showTask, setShowTask] = useState(roleName === 'Admin');
    
 
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
    fonttransform:{
      textTransform:"initial",
      fontSize: theme.typography.pxToRem(13),
    },
    button:{
      color:"white",
      fontSize: theme.typography.pxToRem(10),
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
    },
    tbrow:{      
      marginTop:theme.spacing(10),
    },
    bgtaskpending:{
      backgroundColor:"yellow",
      padding: theme.spacing(1),
    },
    bgtaskoverdue:{
      backgroundColor:"red",
      padding: theme.spacing(1),
    },
    fab: {
      margin: theme.spacing(1),
    },
    textsize:{
      color:"white",
      fontSize: theme.typography.pxToRem(12),
    },
    drpdwn:{
      color: 'white',
      fontSize: theme.typography.pxToRem(13),
    },
    icon: {
      fill: 'white',
    },
    textsize:{
      fontSize: theme.typography.pxToRem(12),
      color: 'white',
    }
  }));
  const classes = useStyles();
      
//task status list
useEffect(() => {
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await TaskAPI.taskStatus();
      setTaskStatusList(result.taskStatusList);
      // console.log('status list----',result.taskStatusList);
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
      console.log('result.role====-----',result.role);
    } catch (error) {
      console.log("Error",error);
    }
  };
  roleData();
}, []);
  //tasks list
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await TaskAPI.list();
        setTaskList(result.taskList);
        console.log('result.taskList==----',result.taskList);
        setAssignedid(0);
        todayDate();
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
        const result = await TaskAPI.stafftasks();
        setStaffTaskList(result.taskList);
        const currentuser = await FranchiseUsers.user();
        // console.log('stfftask-899-----', currentuser.currentuser);
        setAssignedid(currentuser.currentuser[0].uid);
        currentDate();
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  function currentDate(){
    
    const dtToday=new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    const date= year + '-' + month + '-' + day;
    setTodayDate(date);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await TaskAPI.completedlist();
        // console.log('tasks----------------',result.taskList);
        // console.log('hsgdhgsyd-----',assignedid);
        setCompletedTaskList(result.taskList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  //staff list
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


  function todayDate(){
    const dtToday=new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    const date= year + '-' + month + '-' + day;
    setTodayDate(date);
  }
  function handleClickOpen() {
    setOpen(true);
  }
  function handleCompleteTaskClickOpen(){
    setCompleteTaskOpen(true);
  }
  function handleCompleteTaskClose() {
    setCompleteTaskOpen(false);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickEditOpen(data) {
    setTaskData(data);
    setEditOpen(true);
  }
  function handleClickStaffEditOpen(data) {
    setTaskData(data);
    setStaffEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  
  function handleStaffEditClose() {
    setStaffEditOpen(false);
  }
  ////////////////////////////////////////
  function setTaskListFn(response) {
    setTaskList(response);
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await TaskAPI.stafftasks();
        setStaffTaskList(result.taskList);
        const currentuser = await FranchiseUsers.user();
        // console.log('stfftask-899-----', currentuser.currentuser);
        setAssignedid(currentuser.currentuser[0].uid);
        const complete = await TaskAPI.completedlist();
        setCompletedTaskList(complete.taskList);
        currentDate();
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
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

    setDelId(data.task_id);
    
    handleClickDelete(data.id);
    
  }

  const handleClickDelete = async (id) => {
    const response = await TaskAPI.delete({
      id:id,
      franchise_id: franchiseId,
      task_id:delId,
      
    });
    // handleSnackbarClick(true,'Franchise Updated Successfully');
    // setFranchiseList(response.staffList);
    // handleReset(RESET_VALUES);
    setTaskList(response.taskList);
  };



  function handleStaffTaskClick(){
    setShowStaffTask(true);
  }
  function handleStaffTaskClose() {
    setShowStaffTask(false);
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await TaskAPI.list();
        setTaskList(result.taskList);
        // setAssignedid(0);
        handleCompleteTaskClose();
        todayDate();
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }
  // const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
  //   // RESET_VALUES,
  //   handleClickDelete,
  //   validate
  // );
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  function handleTabChange(event, newValue) {
    setValue(newValue);
    // console.log('setValue...',value)
  }
  return (
    <div>
      {/* {showTask ?  */}
      <Grid container spacing={3}>

          <Grid item xs={12} sm={7}>
            <Fab
              variant="extended"
              size="small"
              // color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Task
            </Fab>
          </Grid>
          {/* <Grid item xs={12} sm={2}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Complete"
              className={classes.fonttransform}
              onClick={handleStaffTaskClick}
            >
              My Task List
            </Fab>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Complete"
              className={classes.fonttransform}
              onClick={handleCompleteTaskClickOpen}
            >
              Completed Tasks
            </Fab>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
            <AppBar position="static"  className={classes.appBar}>
              <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
                <Tab label="All" />
                <Tab label={`My Task (${staffTaskList.length})`} />
                <Tab label={`Completed (${completedTaskList.length})`}  />
                {/* <Tab label="Close" /> */}
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Assign Role</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    { (tasksList.length > 0 ? tasksList : []).map((data, index)=>{
                      return(
                        <TableRow >
                        <StyledTableCell> {index+1}  </StyledTableCell>
                          <StyledTableCell> {data.task_id}  </StyledTableCell>
                          <StyledTableCell> {data.task_description}  </StyledTableCell>
                              <StyledTableCell>{data.assign_role_name}</StyledTableCell>
                            { (franchiseUsersList.length > 0 ? franchiseUsersList : []).map((datastaff, index1)=>{
                                return(
                                  data.assigned_to===datastaff.id ?
                                  <StyledTableCell> {datastaff.name}</StyledTableCell>
                                    :''
                                    )
                                    
                              })
                            }
                            { (taskStatusList.length > 0 ? taskStatusList : []).map((datastatus, index1)=>{
                                return(
                                  data.status===datastatus.id ?
                                  <StyledTableCell> {datastatus.status}</StyledTableCell>
                                    :''
                                    )                                    
                              })
                            }
                          {/* <StyledTableCell><p >{data.status}</p></StyledTableCell> */}
                          <StyledTableCell><p className={dateToday> data.due_date?classes.bgtaskoverdue:classes.bgtaskpending}>{data.due_date}</p></StyledTableCell>
                          <StyledTableCell>
                            <Tooltip title="Update Task">                              
                              <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
                              <CreateIcon/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Archive Task">                              
                              <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickDel(data); }}>
                              <ArchiveIcon />
                              </IconButton>
                            </Tooltip>
                              
                            {/* <Button variant="contained" color="primary"  value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}> */}
                             {/* <CreateIcon/>
                            </Button> */}
                            {/* <Button variant="contained" color="primary" key={data.id} value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickDel(data); }}> */}
                              {/* <ArchiveIcon />
                            </Button> */}
                          </StyledTableCell>
                        </TableRow>
                      )
                      })
                    }
                    </TableBody>
                  </Table>
                  </TabPanel>
                  {/* my task */}
                  <TabPanel value={value} index={1}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>#</StyledTableCell>
                          <StyledTableCell>Task ID</StyledTableCell>
                          <StyledTableCell>Task Description</StyledTableCell>
                          <StyledTableCell>Assigned To</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                          <StyledTableCell>Due Date</StyledTableCell>
                          <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      { (staffTaskList.length > 0 ? staffTaskList : []).map((data, index)=>{
                        return(
                          <TableRow >
                          <StyledTableCell> {index+1}  </StyledTableCell>
                            <StyledTableCell> {data.task_id}  </StyledTableCell>
                            <StyledTableCell> {data.task_description}  </StyledTableCell>
                            
                            { (franchiseUsersList.length > 0 ? franchiseUsersList : []).map((datastaff, index1)=>{
                                  return(
                                    data.assigned_to===datastaff.id ?
                                    <StyledTableCell> {datastaff.name}</StyledTableCell>
                                      :''
                                      )
                                      
                                })
                              }
                              { (taskStatusList.length > 0 ? taskStatusList : []).map((dataTaskStatus, index1)=>{
                                  return(
                                    data.status===dataTaskStatus.id ?
                                    <StyledTableCell> {dataTaskStatus.status}</StyledTableCell>
                                      :''
                                      )
                                      
                                })
                              }
                            <StyledTableCell><p className={dateToday> data.due_date?classes.bgtaskoverdue:classes.bgtaskpending}>{data.due_date}</p></StyledTableCell>
                          
                            <StyledTableCell>
                              <Tooltip title="Update Task">                              
                                <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickStaffEditOpen(data); }}>
                                <CreateIcon/>
                                </IconButton>
                              </Tooltip>
                              
                            </StyledTableCell>
                          </TableRow>
                        )
                        })
                      }
                      </TableBody>
                    </Table>
                  </TabPanel>
                  
                  <TabPanel value={value} index={2}>
                    <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Task ID</StyledTableCell>
                        <StyledTableCell>Task Description</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        <StyledTableCell>Start Date</StyledTableCell>
                        <StyledTableCell>Completion Date</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Document</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log(completedTaskList)}
                    { (completedTaskList.length > 0 ? completedTaskList : []).map((data, index)=>{
                      return(
                      // assignedid!=0? data.assigned_to===assignedid?
                        <TableRow >
                        <StyledTableCell> {index+1}  </StyledTableCell>
                          <StyledTableCell> {data.task_id}  </StyledTableCell>
                          <StyledTableCell> {data.task_description}  </StyledTableCell>
                        
                            { (franchiseUsersList.length > 0 ? franchiseUsersList : []).map((datastaff, index1)=>{
                                return(
                                  data.assigned_to===datastaff.id ?
                                  <StyledTableCell> {datastaff.name}</StyledTableCell>
                                    :''
                                    )
                                    
                              })
                            }
                          
                          { (taskStatusList.length > 0 ? taskStatusList : []).map((datastatus, index1)=>{
                                  return(
                                    data.status===datastatus.id ?
                                    <StyledTableCell> {datastatus.status}</StyledTableCell>
                                      :''
                                      )                                    
                                })
                              }
                          <StyledTableCell>{data.due_date}</StyledTableCell>
                          <StyledTableCell>{data.start_date}</StyledTableCell>
                          <StyledTableCell>{data.completion_date}</StyledTableCell>
                          <StyledTableCell>{data.message}</StyledTableCell>
                          <StyledTableCell>
                            <a href={"server\\files\\taskFile\\" + data.document }  download >{data.document}</a>                          
                          </StyledTableCell>
                          <StyledTableCell>
                          <Tooltip title="Archive Task">                              
                              <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickDel(data); }}>
                              <ArchiveIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                          
                        </TableRow>
                    //     :'':
                    //     <TableRow >
                    //     <StyledTableCell> {data.id}  </StyledTableCell>
                    //       <StyledTableCell> {data.task_id}  </StyledTableCell>
                    //       <StyledTableCell> {data.task_description}  </StyledTableCell>
                        
                    //       { (franchiseUsersList.length > 0 ? franchiseUsersList : []).map((datastaff, index1)=>{
                    //             return(
                    //               data.assigned_to===datastaff.id ?
                    //               <StyledTableCell> {datastaff.name}</StyledTableCell>
                    //                 :''
                    //                 )
                                    
                    //           })
                    //         }
                    //       { (taskStatusList.length > 0 ? taskStatusList : []).map((datastatus, index1)=>{
                    //               return(
                    //                 data.status===datastatus.id ?
                    //                 <StyledTableCell> {datastatus.status}</StyledTableCell>
                    //                   :''
                    //                   )                                    
                    //             })
                    //           }
                    //       <StyledTableCell>{data.due_date}</StyledTableCell>
                    //       <StyledTableCell>{data.start_date}</StyledTableCell>
                    //       <StyledTableCell>{data.completion_date}</StyledTableCell>
                    //       <StyledTableCell>{data.message}</StyledTableCell>
                    //       <StyledTableCell>{data.document}</StyledTableCell>
                          
                    //     </TableRow>
                      )
                      })
                    }
                    </TableBody>
                  </Table>
                  </TabPanel>
               </Paper>
          </Grid>
        </Grid>
      {open? <Add open={open} handleClose={handleClose} franchiseId={franchiseId.franchiseId}  handleSnackbarClick={handleSnackbarClick} setTaskList={setTaskListFn} />:null}
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} franchiseId={franchiseId.franchiseId}  handleSnackbarClick={handleSnackbarClick} inputs={taskData} setTaskList={setTaskListFn}  /> : null}
      {staffEditOpen? <StaffEdit open={staffEditOpen} handleStaffEditClose={handleStaffEditClose} uid={uid.uid}  handleSnackbarClick={handleSnackbarClick} inputs={taskData} setTaskList={setTaskListFn}  uid={uid}/> : null}
      {openCompleteTask ?  <CompletedTask open={openCompleteTask} handleCompleteTaskClose={handleCompleteTaskClose}  assignedid={0} />: null}
      {showStaffTask ? <MyTask open={showStaffTask} handleMyTaskClose={handleStaffTaskClose} />: null}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Task updated successfully!"
        />
      </Snackbar>
    </div>
  );
}
