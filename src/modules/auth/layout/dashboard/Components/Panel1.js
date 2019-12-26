import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { Title, EventTracker } from '@devexpress/dx-react-chart';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, BarSeries,Tooltip } from "@devexpress/dx-react-chart-material-ui";

import { Card,CardContent, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';

// Component Call
import TaskList from './TaskList';
import LeadList from './LeadList';
//API Calls
import TaskAPI from '../../../../../api/Task';
import LeadAPI from '../../../../../api/Lead';
import {Run} from '../../../../../api/Run';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // display: 'flex',
    maxHeight : 150,
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

export default function Panel1({roleName, roleId, handleLeadClick,  handleTaskClick}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [taskList, setTaskList] = React.useState([]);
  const [leadList, setLeadList] = React.useState([]);
  const [order,setOrder]=useState([]);
  const [staff,setstaff]=useState([]);
  const [duration,setduration]=useState(30);

  const changeDuration=(e)=>{
    setduration(e.target.value);
  }

  useEffect(() => {

    const fetchData = async () =>{
      if(roleName!='Super Admin' && roleId !=0){
        const result = await TaskAPI.fetchAssignedTask({
          assign_to_role : roleId,
        });   
        setTaskList(result);
      }
      
      const resultLead = await LeadAPI.fetchLeads();
      setLeadList(resultLead.leadList);

        let {data} = await Run('dashboardorder', {franchise:1,duration});
        let staffdata=[];
        data.forEach(d => {
          if(!staffdata[d.sales_person_id])staffdata[d.sales_person_id]={argument:''+(d.first_name||d.last_name),value:0,count:0,orders:[]};
          let ratio=1;
          if(d.frequency==1)ratio=4;
          else if(d.frequency==2)ratio=2;

          if(staffdata[d.sales_person_id].orders.indexOf(d.order_id)==-1){
            staffdata[d.sales_person_id].orders.push(d.order_id);
            staffdata[d.sales_person_id].count++;
          }
          // staffdata[d.sales_person_id].value+=d.order_type==1?d.total_payment_amt/ratio:d.bond_amt/ratio;
          staffdata[d.sales_person_id].value+=parseFloat(d.total_paid);
        });

        data.forEach(d => {
          if(d.sales_person_id && staffdata[d.sales_person_id].value && (typeof staffdata[d.sales_person_id].value == "number") )
          staffdata[d.sales_person_id].value=staffdata[d.sales_person_id].value.toFixed(2);
        });
        
        console.log(staffdata);
        console.log(data);
        setstaff(staffdata);
        setOrder(data);

    }
    fetchData();
  },[duration]);

  return (
    <div className={classes.root}  style={{ width: '100%',background:'transparent' }}>
      {/* <h2 className={classes.labelTitle}>Total Orders Count : {order.length}</h2>
      {order.map((d,i)=>{return <p>{d.first_name} {d.last_name} - {d.order_type==1?'Fixed '+d.total_payment_amt:'Flex '+d.bond_amt}</p> })} */}
      {roleName === "Admin" && <>
      <Grid container spacing={4} style={{textAlign:'center'}}>

      <Grid item xs={12} >
      <FormControl>
        <Select value={duration} onChange={changeDuration} displayEmpty>
          <MenuItem value={7}>Last Week</MenuItem>
          <MenuItem value={30}>Last Month</MenuItem>
          <MenuItem value={365}>Last Year</MenuItem>
        </Select>
        <FormHelperText>Report Duration</FormHelperText>
      </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={12} md={6} >
      <Card><CardContent>
      <Chart data={staff} height={300}>
      <ArgumentAxis showGrid />
      <ValueAxis />
          <EventTracker /><Tooltip />
      {/* <LineSeries valueField="value" argumentField="argument" /> */}
      <BarSeries valueField="value" argumentField="argument" />
    </Chart>
    <h1>Order Amount</h1>
      </CardContent></Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
      <Card><CardContent>
      <Chart data={staff} height={300}>
      <ArgumentAxis showGrid />
      <ValueAxis />
          <EventTracker /><Tooltip />
      <BarSeries valueField="count" argumentField="argument" />
      {/* <BarSeries valueField="value" argumentField="argument" /> */}
    </Chart>
    <h1>Order Count</h1>
      </CardContent></Card>
      </Grid>

      </Grid>
      <br />
      <br />
      </>
}
    <Paper >             
      <Grid container spacing={4}  style={{ 'padding': '10px'}}>  
        <Grid item xs={12} sm={12} >   
          <Typography variant="h6" className={classes.labelTitle} color="primary">
              Latest Lead
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12}>   
          <LeadList leadList={leadList} roleName={ roleName} handleLeadClick={handleLeadClick}/>
        </Grid>
      </Grid>
    </Paper>
  {roleName != 'Super Admin' && roleId != 0 && 
    <Paper >  
      <Grid container spacing={4} style={{ 'padding': '10px'}}>  
        <Grid item xs={12} sm={12}>   
          <Typography variant="h6" className={classes.labelTitle} color="primary">
              Latest Task
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12}>   
          <TaskList taskList={taskList} roleName={roleName} handleTaskClick={handleTaskClick} />   
        </Grid>
      </Grid>
    </Paper>
  }

    </div>
  );
}
