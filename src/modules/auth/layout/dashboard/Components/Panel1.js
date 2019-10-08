import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

// Component Call
import TaskList from './TaskList';
import LeadList from './LeadList';
//API Calls
import TaskAPI from '../../../../../api/Task';
import LeadAPI from '../../../../../api/Lead';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  appBar: {
    // position: 'relative',
    // height: theme.spacing(5),
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
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
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(16),
    // marginTop: 15,
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Panel1({roleName, roleId}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [taskList, setTaskList] = React.useState([]);
  const [leadList, setLeadList] = React.useState([]);

  useEffect(() => {

    const fetchData = async () =>{
      if(roleName!='Super Admin' && roleId !=0){
        const result = await TaskAPI.fetchAssignedTask({
          assign_to_role : roleId,
        });   
        setTaskList(result);
        console.log('result task',result);
      }
      

      const resultLead = await LeadAPI.fetchLeads();
      setLeadList(resultLead.leadList);
      console.log('Lead panel',resultLead);
      

    }
    fetchData();
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    {/* <Paper style={{ width: '100%' }}>
      <AppBar position="static"  className={classes.appBar}>
      <Tabs
        // orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.textsize}
      >
        <Tab label="Leads" />
        {roleName != 'Super Admin' &&  <Tab label="Task" />   }
      </Tabs>
      </AppBar> 
       
      <TabPanel value={value} index={0}>
        <LeadList leadList={leadList} roleName={ roleName} />
      </TabPanel>
      {roleName != 'Super Admin'  &&
        <TabPanel value={value} index={1}>
          <TaskList taskList={taskList} roleName={ roleName} />
        </TabPanel>
      }
    </Paper> */}         
    <Paper style={{ width: '45%', height: '250', 'marginRight':'5px', }}>             
      <Grid container spacing={4}  style={{ 'padding': '10px'}}>  
        <Grid item xs={12} sm={12} >   
          <Typography variant="h6" className={classes.labelTitle} color="primary">
              Latest Lead
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12}>   
          <LeadList leadList={leadList} roleName={ roleName} />
        </Grid>
      </Grid>
    </Paper>
  {roleName != 'Super Admin' && roleId != 0 && 
    <Paper style={{ width: '45%', height: '250', 'marginLeft':'5px' }}>  
    {console.log('taskkkkk')}           
      <Grid container spacing={4} style={{ 'padding': '10px'}}>  
        <Grid item xs={12} sm={12}>   
          <Typography variant="h6" className={classes.labelTitle} color="primary">
              Latest Task
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12}>   
          <TaskList taskList={taskList} roleName={ roleName} />   
        </Grid>
      </Grid>
    </Paper>
  }

    </div>
  );
}
