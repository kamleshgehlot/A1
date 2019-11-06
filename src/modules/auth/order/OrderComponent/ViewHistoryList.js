import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FolderIcon from '@material-ui/icons/Folder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/send';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import ArchiveIcon from '@material-ui/icons/Archive';

import { API_URL, APP_TOKEN } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';
import { compareAsc } from 'date-fns';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(11),
  },
  msg: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(13),
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
  padding: {
    padding: theme.spacing(0, 2),
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



export default function ViewHistoryList({historyList, roleName}) {
  const classes = useStyles();
  // console.log('hislist',historyList)

  const handleChangeEventTitle = (historyList, index, data) =>{
    return(
      <p>
        {(historyList.length === index + 1) && data.is_active == 1 ? 
          'Budget added when placing a new order (' + data.order_id + ') on ' + 
          data.created_at + ' by ' + data.created_by_name
        : (historyList.length === index + 1) && data.is_active == 0 ?
          'Budget added on ' + data.created_at + ' by ' + data.created_by_name
        : data.is_active == 1 ? 
          'Budget updated when placing a new order (' + data.order_id + ') on ' + 
          data.created_at + ' by ' + data.created_by_name
        : data.is_active == 0 ? 
          'Budget updated on ' + data.created_at + ' by ' + data.created_by_name
        :''} 
      </p>      
    )
  }

  const handleModifiedFields = (innerData, data) =>{

    // const oldIncomeList = JSON.parse(data.other_income);
    // const oldExpensesList = JSON.parse(data.other_expenditure);

    // const newIncomeList = JSON.parse(innerData.other_income);
    // const newExpensesList = JSON.parse(innerData.other_expenditure);

    let incomeString = "";
    let expensesString = "";
    let paidDebitedDaysString = "";

    // console.log('expensesList',oldExpensesList)
    // console.log('newexpensesList',newExpensesList)
    
    
    // let str = "";

    // let a = expensesList.filter(data => 
    //   newExpensesList.some(newData => (data.source_name !==  newData.source_name))
    // );
    
    // console.log('str',a);


    incomeString = 
            (data.benefits !== innerData.benefits ? "benefits: $" + innerData.benefits + " => $" + data.benefits +", ": '') +
            (data.work !== innerData.work ? " work: $" + innerData.work + " => $" + data.work +", ": '') +
            (data.accomodation !== innerData.accomodation ? "accomodation: $" + innerData.accomodation + " => $" + data.accomodation +", ": '') +
            (data.childcare !== innerData.childcare ? "childcare: $" + innerData.childcare + " => $" + data.childcare +", ": '') +
            (data.afford_amt !== innerData.afford_amt ? "afford_amt: $" + innerData.afford_amt + " => $" + data.afford_amt +", ": '');
    
    expensesString = 
            (data.rent !== innerData.rent ? "rent: $" + innerData.rent + " => $" + data.rent +", ": '') +
            (data.power !== innerData.power ? " power: $" + innerData.power + " => $" + data.power +", ": '') +
            (data.telephone !== innerData.telephone ? "telephone: $" + innerData.telephone + " => $" + data.telephone +", ": '') +
            (data.mobile !== innerData.mobile ? "mobile: $" + innerData.mobile + " => $" + data.mobile +", ": '') +
            (data.vehicle !== innerData.vehicle ? "vehicle: $" + innerData.vehicle + " => $" + data.vehicle +", ": '') +
            (data.vehicle_fuel !== innerData.vehicle_fuel ? "vehicle fuel: $" + innerData.vehicle_fuel + " => $" + data.vehicle_fuel +", ": '') +
            (data.transport !== innerData.transport ? "transport: $" + innerData.transport + " => $" + data.transport +", ": '') +
            (data.food !== innerData.food ? "food: $" + innerData.food + " => $" + data.food +", ": '') +
            (data.credit_card !== innerData.credit_card ? "credit_card: $" + innerData.credit_card + " => $" + data.credit_card +", ": '') +
            (data.loan !== innerData.loan ? "loan: $" + innerData.loan + " => $" + data.loan +", ": '');

    paidDebitedDaysString = 
            (data.paid_day !== innerData.paid_day ? "Day when get paid: " + innerData.paid_day + " =>  " + data.paid_day +", ": '') +
            (data.debited_day !== innerData.debited_day ? "Day to be debited: " + innerData.debited_day + " => " + data.debited_day : '');

      return(
        <div>
          { incomeString != "" ? <p> {"Modification in Income: " + incomeString} </p> : ''}
          { expensesString != "" ? <p> {"Modification in Expenditure: " + expensesString} </p> : ''}
          { paidDebitedDaysString != "" ? <p> {"Days to get & debited: " + paidDebitedDaysString} </p> : ''}
        </div>
      )
  }

  return (  
    <List className={classes.root}>
    {(historyList.length > 0 && historyList != "" ? historyList : []).map((data, index) => {            

      return(
        <div>                    
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    className={classes.msg}
                    color="textPrimary"
                  >
                    {handleChangeEventTitle(historyList, index, data)}                                       
                  </Typography>                 
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="header"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    { historyList.length !== (index + 1) && 
                        handleModifiedFields(historyList[index+1], data)
                    }
                    </Typography>
                </React.Fragment>
              }
            />
          </ListItem>     
        <Divider variant="inset" component="li" />  
      </div>           
      )
    })}
    </List>
  )
}