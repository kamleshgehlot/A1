import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import AddLead from './Add';
import Comment from './Comment';
import Add from '../enquiry/Add';
import ConvertedLeads from './ConvertedLeads';

// API CALL
import LeadAPI from '../../../api/Lead';
import UserAPI from '../../../api/User';
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
  const [convertLead,setConvertLead]= useState();
  const [filterId,setFilterId]= useState(4);
  const [enquiryList, setEnquiryList] = useState({});
  const [openEnquiry, setEnquiryOpen] = useState(false);
  const [openConvertedLeads,setConvertedLeads] = useState(false);
  const [openView, setViewOpen] = useState(false);
  const [leadList, setLeadList] = useState({});
  
  const [convertedLeadList, setConvertedLeadList] = useState({});
  //value is for tabs  
  const [value, setValue] = React.useState(0);
  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: 1000
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

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await LeadAPI.list();
        setLeadList(result.leadList);
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
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await LeadAPI.convertedList();
        setConvertedLeadList(result.convertedList);
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
    setConvertLead(data.id);
    setEnquiryOpen(true);
  }
  function handleEnquiryClose() {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await LeadAPI.list();
        setLeadList(result.leadList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    setEnquiryOpen(false);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleConvertedLeadsClickOpen(){
    setConvertedLeads(true);
  }
  function handleConvertedLeadsClose() {
    setConvertedLeads(false);
  }
  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  function setLeadListFn(response) {
    setLeadList(response);
    
    setFilterId('4');
  }

  function setEnquiryListFn(response) {
    setEnquiryList(response);
  }

 
  const handleFilter = async (event) => {
    setFilterId(event.target.value);
    const response = await LeadAPI.filter({
      filter_id:event.target.value
    });
    setLeadList(response.leadList);
  };

  
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
              Lead
            </Fab>
          </Grid>
          {/* <Grid item xs={12} sm={2}>
            <Fab
              variant="extended"
              size="small"
              // color="primary"
              aria-label="Complete"
              className={classes.fonttransform}
              onClick={handleConvertedLeadsClickOpen}
            >
              Converted
            </Fab>
          </Grid> */}
          <Grid item xs={12} sm={9}>
          <AppBar position="static"  className={classes.appBar}>
            <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
              <Tab label="Open" />
              <Tab label="Converted" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Lead ID</StyledTableCell>
                        <StyledTableCell>For Franchise</StyledTableCell>
                        {/* <StyledTableCell>Doc/Photo</StyledTableCell> */}
                        <StyledTableCell>
                          <Select
                            onChange = {handleFilter}
                            inputProps={{
                              name: 'filter',
                              id: 'filter',
                              label:'filter',
                              classes: {
                                  icon: classes.icon,
                              },
                            }}
                            className={classes.drpdwn}
                            value={filterId}
                            label="filter"
                          >
                            <MenuItem className={classes.textsize} value={4}>{'Show All'}</MenuItem> 
                            <MenuItem className={classes.textsize} value={1}>{'Created By Me'}</MenuItem> 
                            <MenuItem className={classes.textsize} value={2}>{'Created For Me'}</MenuItem> 
                            <MenuItem className={classes.textsize} value={3}>{'Created For All'}</MenuItem> 
                          </Select>
                        </StyledTableCell>
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
                                      
                                }) : <StyledTableCell> All</StyledTableCell>
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
                                    </StyledTableCell> )
                            }
                          </TableRow>
                        )
                        })
                      }
                    </TableBody>
                  </Table>
               </Paper>
               </TabPanel>
               
          <TabPanel value={value} index={1}>
          <Paper style={{ width: '100%' }}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Lead ID</StyledTableCell>
                        <StyledTableCell>For Franchise</StyledTableCell>
                        {/* <StyledTableCell>Doc/Photo</StyledTableCell> */}
                        <StyledTableCell>Created by</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Converted By</StyledTableCell>
                        <StyledTableCell>Converted To</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { (convertedLeadList.length > 0 ? convertedLeadList : []).map((data, index)=>{
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
                                      
                                }) : <StyledTableCell> All</StyledTableCell>
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
                            {data.converted_by_f_id!=0 ?(franchiseListd.length > 0 ? franchiseListd : []).map((datafrc, index1)=>{
                                  
                                  return(
                                    data.converted_by_f_id===datafrc.id ?
                                    <StyledTableCell> {datafrc.name +'  ('+ datafrc.city + ' ,' + datafrc.suburb + ' )'} </StyledTableCell>
                                      :''
                                      )
                                      
                                }):<StyledTableCell></StyledTableCell>
                              }
                              <StyledTableCell>{data.converted_to===1? 'Enquiry':'Order'}</StyledTableCell>
                          </TableRow>
                        )
                        })
                      }
                  </TableBody>
                </Table>
            </Paper>

          </TabPanel>
          </Grid>
        </Grid>
      {open? <AddLead open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}  setLeadList={setLeadListFn}/>:null}
      
      {openEnquiry ?<Add open={openEnquiry} handleClose={handleEnquiryClose} handleSnackbarClick={handleSnackbarClick}  setEnquiryList={setEnquiryListFn} convert={convertLead}/> :null}
      {openView ?<Comment open={openView} handleViewClose={handleViewClose} handleSnackbarClick={handleSnackbarClick} inputss={leadData}  /> :null}
      {openConvertedLeads ?  <ConvertedLeads open={openConvertedLeads} handleConvertedLeadsClose={handleConvertedLeadsClose} franchiseListd={franchiseListd} />: null}

    </div>
  );
}
