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
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import Add from './Add';
import Edit from './Edit';
import UploadDoc from './UploadDoc';

import FranchiseTabPannel from './TabPanel';
// API CALL
import Staff from '../../../api/franchise/Staff';
import Role from '../../../api/franchise/Role';

import BadgeComp from '../../common/BadgeComp';

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


export default function FranchiseStaff({franchiseId, roleName}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [staffData,setStaffData]= useState();
  const [staffList, setStaffList] = useState({});
  const [role, setRole] = useState([]);
  const [searchText, setSearchText]  = useState('');
  const [position, setPosition] = useState({});
  const [totalCSR,setTotalCSR] = useState();
  const [totalFinance,setTotalFinance] = useState();
  const [totalDelivery,setTotalDelivery] = useState();
  const [totalHR,setTotalHR] = useState();

  
  //value is for tabs  
  const [value, setValue] = React.useState(0);

  let CSR = 0;
  let Finance = 0;
  let Delivery = 0;
  let HR = 0;
  
  // Code for testing pls don't remove -- by SRK 
  // const [uploadOpen,setUploadOpen] = useState(false);

  
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
    padding: {
      padding: theme.spacing(0, 2),
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

  function badgeCount(staff){
    setTotalCSR(0);
    setTotalFinance(0);
    setTotalDelivery(0);
    setTotalHR(0);

    let CSR = 0;
    let Finance = 0;
    let Delivery = 0;
    let HR = 0;

    (staff.length > 0 ? staff : []).map((data, index) =>{
      (data.role.split(',')).find(ele => ele === '3') == '3' ? CSR += 1 : '';
      (data.role.split(',')).find(ele => ele === '4') == '4' ? Finance += 1 : '';
      (data.role.split(',')).find(ele => ele === '5') == '5' ? Delivery += 1 : '';
      (data.role.split(',')).find(ele => ele === '6') == '6' ? HR += 1 : '';

      setTotalCSR(CSR);
      setTotalFinance(Finance);
      setTotalDelivery(Delivery);
      setTotalHR(HR);
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Staff.list({});
        setStaffList(result.staffList);
        badgeCount(result.staffList);            
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
  
  function handleSearchText(event){
    setSearchText(event.target.value);
  }

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
    badgeCount(response);
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


  
  const searchHandler = async () => {
    try {
    if(searchText!=''){
        const result = await Staff.search({searchText: searchText});
        setStaffList(result.staffList);
        setSearchText('');
        badgeCount(result.staffList);     
        
     
    }else{
      const result = await Staff.list({});
      setStaffList(result.staffList);
      setSearchText('');
      badgeCount(result.staffList);          
    }} catch (error) {
      console.log('error',error);
    }
  }

  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>

          <Grid item xs={12} sm={8}>
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
          <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                label="Search"
                label="Search..."
                type="text"
                value={searchText} 
                onKeyPress={(ev) => {
                  if (ev.key ===  'Enter') {
                    searchHandler()
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchText}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton onClick={ searchHandler}><SearchIcon /></IconButton>
                                  </Tooltip>
                                </InputAdornment>,
                }}
                fullWidth
              />              
          </Grid>
          
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
                  
                {/* <Tab label="All" /> */}
                <Tab label={<BadgeComp count={staffList.length} label="All" />} /> 
                <Tab label={<BadgeComp count={totalCSR} label="CSR" />} /> 
                <Tab label={<BadgeComp count={totalDelivery} label="Delivery" />} /> 
                <Tab label={<BadgeComp count={totalFinance} label="Finance" />} />                 
                <Tab label={<BadgeComp count={totalHR} label="HR" />} /> 

                  {/* {
                    (role.length>0 ? role : []).map((ele, index) => {
                      // console.log(ele)
                      return(
                        <Tab label={<Badge className={classes.padding} color="secondary" 
                                    badgeContent={
                                      ele.name == 'CSR' ? CSR :
                                      ele.name =='Finance' ? Finance : 
                                      ele.name =='Delivery' ? Delivery :
                                      ele.name =='HR' ? HR : ''
                        }> {ele.name} </Badge> }/>

                        // <Tab label={ele.name} />
                      )
                    })
                  } */}
                </Tabs>
              </AppBar>
              {
                <FranchiseTabPannel value={value} tabIndex={0} staffList={staffList} currentRole={null} roles={role} handleClickEditOpen={handleClickEditOpen}/>
              }
              {
              (role.length>0 ? role : []).map((ele, index) => {
                // console.log(index, ele)
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
