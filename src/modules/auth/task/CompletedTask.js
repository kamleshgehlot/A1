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
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

// API CALL
import TaskAPI from '../../../api/Task';
// import Staff from '../../../api/franchise/Staff';

import FranchiseUsers from '../../../api/FranchiseUsers';

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

export default function CompletedTask({open, handleCompleteTaskClose,assignedid}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tasksList, setTaskList] = useState({});
  const [staffList, setStaffList] = useState({});
  const [franchiseUsersList, setFranchiseUsersList] = useState({});
  const [taskStatusList, setTaskStatusList]=useState([]);

  console.log('assign',assignedid);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await TaskAPI.completedlist();
        // console.log('tasks----------------',result.taskList);
        // console.log('hsgdhgsyd-----',assignedid);
        setTaskList(result.taskList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
}, []);
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
return (
  <div>
    <Dialog maxWidth="lg" open={open} onClose={handleCompleteTaskClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCompleteTaskClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Completed Task List
            </Typography>
            {/* <Button color="inherit" type="submit">
              save
            </Button> */}
          </Toolbar>
        </AppBar>

    <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Paper style={{ width: '100%' }}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell>Task ID</StyledTableCell>
                      <StyledTableCell>Task Description</StyledTableCell>
                      {/* <StyledTableCell>Assigned To</StyledTableCell> */}
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Due Date</StyledTableCell>
                      <StyledTableCell>Start Date</StyledTableCell>
                      <StyledTableCell>Completion Date</StyledTableCell>
                      <StyledTableCell>Message</StyledTableCell>
                      <StyledTableCell>Document</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { (tasksList.length > 0 ? tasksList : []).map((data, index)=>{
                    return(
                     assignedid!=0? data.assigned_to===assignedid?
                      <TableRow >
                      <StyledTableCell> {index+1}  </StyledTableCell>
                        <StyledTableCell> {data.task_id}  </StyledTableCell>
                        <StyledTableCell> {data.task_description}  </StyledTableCell>
                      
                          {/* { (franchiseUsersList.length > 0 ? franchiseUsersList : []).map((datastaff, index1)=>{
                              return(
                                data.assigned_to===datastaff.id ?
                                <StyledTableCell> {datastaff.name}</StyledTableCell>
                                  :''
                                  )
                                  
                            })
                          } */}
                        
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
                        <StyledTableCell></StyledTableCell>
                        
                      </TableRow>:'':
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
                        <StyledTableCell></StyledTableCell>
                        
                      </TableRow>
                    )
                    })
                  }
                  </TableBody>
                </Table>
            </Paper>
        </Grid>
      </Grid>
      </Dialog>
  </div>
  );
}
