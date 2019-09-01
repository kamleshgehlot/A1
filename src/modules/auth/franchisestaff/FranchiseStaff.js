import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Add from './Add';
import Edit from './Edit';
import UploadDoc from './UploadDoc';

import FranchiseTabPannel from './TabPanel';
// API CALL
import Staff from '../../../api/franchise/Staff';
import Role from '../../../api/franchise/Role';

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


export default function FranchiseStaff(franchiseId) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [staffData,setStaffData]= useState();
  const [staffList, setStaffList] = useState({});
  const [role, setRole] = useState([]);
  const [position, setPosition] = useState({});
  //value is for tabs  
  const [value, setValue] = React.useState(0);
  
  // Code for testing pls don't remove -- by SRK 
  // const [uploadOpen,setUploadOpen] = useState(false);

  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;
  
  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
    
  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      // width: 1010
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
    button:{
      color:"white",
    fontSize: theme.typography.pxToRem(10),
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
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


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Staff.list({franchise_id: franchiseId.franchiseId});
        setStaffList(result.staffList);
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

  // Code for testing pls don't remove -- by SRK 
  // function handleUploadClose() {
  //   setUploadOpen(false);
  // }
  // function handleUploadOpen(){
  //   setUploadOpen(true);
  // }


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
  // console.log("data.role......", staffList)


  
  function handleTabChange(event, newValue) {
    setValue(newValue);
    // console.log('setValue...',value)
  }
  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
            <Fab
              variant="extended"
              size="small"
              // color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Franchise Staff
            </Fab>
            </Grid>
            {/* 
            Code for testing pls don't remove -- by SRK 
            <Grid item xs={12} sm={6}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Upload"
              className={classes.fonttransform}
              onClick={handleUploadOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Upload
            </Fab>

            </Grid> */}
          
          <Grid item xs={12} sm={9}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
                  
                <Tab label="All" />
                {
                    (role.length>0 ? role : []).map((ele, index) => {
                      return(
                        <Tab label={ele.name} />
                      )
                    })
                  }
                </Tabs>
              </AppBar>
              {
                <FranchiseTabPannel value={value} tabIndex={0} staffList={staffList} currentRole={null} roles={role} handleClickEditOpen={handleClickEditOpen}/>
              }
              {
              (role.length>0 ? role : []).map((ele, index) => {
                return(
                  <FranchiseTabPannel value={value} tabIndex={index + 1} staffList={staffList} currentRole={ele} roles={role} handleClickEditOpen={handleClickEditOpen}/>
                )
              })
              }
            </Paper>
          </Grid>
        </Grid>
      {open? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} franchiseId={franchiseId.franchiseId} role={role} setFranchiseList={setFranchiseListFn} /> :null}
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} franchiseId={franchiseId.franchiseId} role={role} inputValues={staffData} setFranchiseList={setFranchiseListFn} /> : null}
          
      {/* 
      Code for testing pls don't remove -- by SRK 
      { uploadOpen ? <UploadDoc open={uploadOpen} handleClose={handleUploadClose} /> : null } */}
    </div>
  );
}
