import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StaffAdd from '../franchise/StaffAdd';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Add from './Add';
import Edit from './Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';

// API CALL
import UserAPI from '../../../api/User';


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


export default function Franchise(props) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseData,setFranchiseData]= useState();
  const [franchiseList, setFranchiseList] = useState({});


  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
    
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

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
    heading: {
      fontSize: theme.typography.pxToRem(25),
      fontWeight: theme.typography.fontWeightBold,
    },
    expand:{
      fontSize: theme.typography.pxToRem(16),
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await UserAPI.list();
        setFranchiseList(result.userList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
// console.log(franchiseList);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setStaffOpen(false);
  }
  
  function handleClickEditOpen(val) {
    setFranchiseData(val),
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  ////////////////////////////////////////
  function setFranchiseListFn(response) {
    setFranchiseList(response);
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
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Franchise
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Franchise</StyledTableCell>
                        <StyledTableCell>director</StyledTableCell>
                        <StyledTableCell>UID</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    </Table>
                    <Table>
                    <TableBody>
            {/* {console.log(franchiseList)}
            {(franchiseList.length > 0 ? franchiseList : []).map((data, index)=>{
              // const franchise_id = franchiseList.franchise_id; 
              // franchiseList.franchise_id == franchise_id ?'' : ''
              return(
                
                <ExpansionPanel
                className={classes.expansionTitle}
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                >
                  <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel1a-header"
                >   <Typography className={classes.expand}>Franchise Details</Typography>
                </ExpansionPanelSummary>
                </ExpansionPanel>
              )
              // const franchise_id = franchiseList.franchise_id; 
            })
            } */}
                      
                      { (franchiseList.length > 0 ? franchiseList : []).map((data, index)=>{
                      
                      // <ExpansionPanelDetails>
                      return(
                        <TableRow key={data.franchise_id} >
                            <StyledTableCell> {data.franchise_id}  </StyledTableCell>
                            <StyledTableCell>{data.franchise_name}</StyledTableCell>
                            <StyledTableCell>{data.director}</StyledTableCell>
                            <StyledTableCell>{data.user_id}</StyledTableCell>
                            <StyledTableCell>{data.email}</StyledTableCell>
                            <StyledTableCell>{data.contact}</StyledTableCell>
                            <StyledTableCell>{
                                data.state===1 ? 'Open' 
                                : data.state===2 ? 'Active' 
                                : data.state===3 ? 'Inactive' 
                                : data.state===4 ? 'Close' 
                                : ''
                            }</StyledTableCell>
                            <StyledTableCell>
                            {data.state===4 ? 
                              <Button disabled  variant="contained" color="primary" key={data.id} value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}>Edit
                              </Button>
                              :<Button  variant="contained" color="primary" key={data.id} value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEditOpen(data); }}>Edit
                              </Button>
                              }
                              
                            </StyledTableCell>
                        </TableRow>
                      )
                      // </ExpansionPanelDetails>
                      })
                    }
                    {/* </ExpansionPanel> */}
                  
                    </TableBody>
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} setFranchiseList={setFranchiseListFn}/>
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputs={franchiseData} setFranchiseList={setFranchiseListFn} /> : null}
    </div>
  );
}
