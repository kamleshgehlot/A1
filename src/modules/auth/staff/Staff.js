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

// API CALL
import StaffAPI from '../../../api/StaffMasterAdmin';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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


export default function Staff(props) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [staffData,setStaffData]= useState();
  const [staffList, setStaffList] = useState({});
  const [position, setPosition] = useState({});


  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
    
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
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await StaffAPI.list();
        setStaffList(result.staffList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const positions = async () => {
      try {
        const positionResult = await StaffAPI.positionList();
        setPosition(positionResult.staffPosition);
      } catch (error) {
        console.log('Error',error);
      }
    };
    positions();
  }, []);

  

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickEditOpen(data) {
    setStaffData(data),
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  ////////////////////////////////////////
  function setFranchiseListFn(response) {
    setStaffList(response);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  
  function handleFranchiseClick() {
    setShowFranchise(true);
    setShowStaff(false);
  }
  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>

              <Grid item xs={12} sm={12}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Staff
            </Fab>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell>Position</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                    { (staffList.length > 0 ? staffList : []).map((data, index)=>{
                      return(
                        <TableRow key={data.id} >
                          <StyledTableCell> {data.id}  </StyledTableCell>
                            <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                            <StyledTableCell>

                            {data.position}
                            {/* {
                              positions.map(ele =>{
                                return(
                                <MenuItem value={ele.id}>{ele.position}</MenuItem>
                                )
                              })
                            } */}

                            {/* {
                              position.map((pos, index) =>{
                              if(pos.id===data.position)
                                return pos.position
                              }) 
                            } */}
                            </StyledTableCell>
                            <StyledTableCell>{data.contact}</StyledTableCell>
                            <StyledTableCell>{data.email}</StyledTableCell>
                            <StyledTableCell>
                            <Button variant="contained" color="primary" key={data.id} value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}>
                              Edit
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
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} setFranchiseList={setFranchiseListFn} positions={position}/>
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputs={staffData} setFranchiseList={setFranchiseListFn} positions={position} /> : null}
          
    </div>
  );
}
