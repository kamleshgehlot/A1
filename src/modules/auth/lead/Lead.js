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
import AddLead from './Add';
import Comment from './Comment';
import Add from '../enquiry/Add';
// import Edit from './Edit';
// import UploadDoc from './UploadDoc';

// API CALL
import LeadAPI from '../../../api/Lead';
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


export default function Lead() {
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseListd, setFranchiseList] = useState({});
  const [leadData,setLeadData]= useState();
  const [enquiryList, setEnquiryList] = useState({});
  const [openEnquiry, setEnquiryOpen] = useState(false);
  const [openView, setViewOpen] = useState(false);
  const [leadList, setLeadList] = useState({});
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
    button:{
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
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
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await LeadAPI.list();
        setLeadList(result.leadList);
        // console.log('sahgdaud--',result.leadList);
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
        const result = await LeadAPI.franchiseList();
        setFranchiseList(result.franchiseList);
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
  
  function handleClickViewOpen(data) {
    setLeadData(data);
    setViewOpen(true);
  }
  function handleViewClose() {
    setViewOpen(false);
  }
  function handleClickEnquiryOpen(data) {
    // console.log('leadsenq---',data);
    setEnquiryOpen(true);
  }
  function handleEnquiryClose() {
    setEnquiryOpen(false);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  function setLeadListFn(response) {
    setLeadList(response);
  }

  function setEnquiryListFn(response) {
    setEnquiryList(response);
    console.log('rsfuyi--',response);
  }
  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>

          <Grid item xs={12} sm={10}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Lead
            </Fab>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Complete"
              className={classes.fonttransform}
              // onClick={handleCompleteLeadClickOpen}
            >
              Converted
            </Fab>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Lead ID</StyledTableCell>
                        <StyledTableCell>Franchise</StyledTableCell>
                        {/* <StyledTableCell>Doc/Photo</StyledTableCell> */}
                        <StyledTableCell>Created by</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      
                        {roleName != 'Super Admin' 
                        && (   <StyledTableCell>Convert To</StyledTableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { (leadList.length > 0 ? leadList : []).map((data, index)=>{
                        return(
                          <TableRow >
                          <StyledTableCell> {index+1}  </StyledTableCell>
                            <StyledTableCell> {data.lead_id}  </StyledTableCell>
                            {data.franchise_id!=0 ?   (franchiseListd.length > 0 ? franchiseListd : []).map((dataf, index1)=>{
                                  
                                  return(
                                    data.franchise_id===dataf.id ?
                                    <StyledTableCell> {dataf.name} </StyledTableCell>
                                      :''
                                      )
                                      
                                }) : <StyledTableCell> {data.franchise_name}</StyledTableCell>
                              }
                              {/* <StyledTableCell></StyledTableCell> */}
                              {data.f_id!=0 ?   (franchiseListd.length > 0 ? franchiseListd : []).map((datafr, index1)=>{
                                  
                                  return(
                                    data.f_id===datafr.id ?
                                    <StyledTableCell> {datafr.name +'  ('+ datafr.city + ' ,' + datafr.suburb + ' )'} </StyledTableCell>
                                      :''
                                      )
                                      
                                }) : <StyledTableCell> Master Admin</StyledTableCell>
                              }
                            <StyledTableCell>{data.message}</StyledTableCell>
                            <StyledTableCell>
                              <Button variant="contained" color="primary"  value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickViewOpen(data); }}>
                                View
                              </Button>
                            </StyledTableCell>
                            {roleName != 'Super Admin' 
                        && (  <StyledTableCell>
                                          <Button variant="contained" color="primary"  value={data.id} name={data.id} className={classes.button} onClick={(event) => { handleClickEnquiryOpen(data); }}>
                                            Enquiry
                                          </Button>
                                          <Button variant="contained" color="primary" key={data.id} value={data.id} name={data.id} className={classes.button}>
                                            Order
                                          </Button>
                        </StyledTableCell> )}
                          </TableRow>
                        )
                        })
                      }
                    </TableBody>
                  </Table>
               </Paper>
          </Grid>
        </Grid>
      {open? <AddLead open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}  setLeadList={setLeadListFn}/>:null}
      
      {openEnquiry ?<Add open={openEnquiry} handleClose={handleEnquiryClose} handleSnackbarClick={handleSnackbarClick}  setEnquiryList={setEnquiryListFn}/> :null}
      {openView ?<Comment open={openView} handleViewClose={handleViewClose} handleSnackbarClick={handleSnackbarClick} inputss={leadData}  /> :null}

    </div>
  );
}
