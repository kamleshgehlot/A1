import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Router, Route, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Home';
import FinanceIcon from '@material-ui/icons/Timeline';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import TaskIcon from '@material-ui/icons/Assignment';
import LeadIcon from '@material-ui/icons/TouchApp';
import OrderIcon from '@material-ui/icons/Store';
import EnquiryIcon from '@material-ui/icons/DialerSip';
import FranchiseIcon from '@material-ui/icons/LocationCity';
import StaffIcon from '@material-ui/icons/PersonPin';
import ProductIcon from '@material-ui/icons/AddShoppingCart';

import DeliveryIcon from '@material-ui/icons/LocalShipping';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/GroupAdd';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem"; 
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import Button from '@material-ui/core/Button';

import Popper from '@material-ui/core/Popper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from "prop-types";

import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import Franchise from '../franchise/Franchise';
import Product from '../category/ProductList';
import Staff from '../staff/Staff';
import FranchiseStaff from '../franchisestaff/FranchiseStaff';
import Task from '../task/Task';
import StaffTask from '../task/StaffTask';
import Customer from '../customer/CustomerList';
import Profile from '../setting/Profile';
import ChangePassword from '../setting/ChangePassword';
import Enquiry from '../enquiry/Enquiry';
import Lead from '../lead/Lead';
import Order from '../order/Order';
import FranchiseDetail from '../setting/FranchiseDetail';
import MainDashboard from './dashboard/MainDashboard';
// Helpers
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import UserAPI from '../../../api/User';
import RoleAPI from '../../../api/franchise/Role';

import MuiVirtualizedTable from '../../common/MuiVirtualizedTable';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(5),
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
  fonttransform:{
    textTransform:"initial",
    color:"white",
    marginTop:theme.spacing(-3),
  },
  menu:{
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
    textTransform:'initial'
  },
  iconwidth:{
    maxWidth:theme.spacing(2),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  treeRoot: {
    // height: 264,
    flexGrow: 1,
    marginTop:theme.spacing(8),
    maxWidth: 250,
    minWidth: 200,
    // backgroundColor: 'red',
  }
}));


const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    "&:focus > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)"
    }
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  label: {
    fontWeight: "inherit",
    color: "inherit"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));

function StyledTreeItem(props) {
  
  const classes = useTreeItemStyles();
  
  const {    
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem

      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired
};


export default function ClippedDrawer(props) {
  const roleName = APP_TOKEN.get().roleName;
  const roleId = APP_TOKEN.get().role_id;
  const userName = APP_TOKEN.get().userName;
  const franchiseId = APP_TOKEN.get().franchiseId;
  const userId = APP_TOKEN.get().userId;
  const uid = APP_TOKEN.get().uid;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showFranchise, setShowFranchise] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDashboard, setShowdashboard] = useState(roleName === 'Super Admin');
  const [showMasterStaff, setShowMasterStaff] = useState(false);
  const [showFranchiseStaff, setShowFranchiseStaff] = useState(false);
  const [showStaffTask, setShowStaffTask] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showFranchiseDetail, setShowFranchiseDetail] = useState(false);
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
  const [showOrder,setShowOrder] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleAs, setRoleAs]= useState('');
  console.log('role id',roleId)
  console.log('role name ',roleName)

  useEffect(()=>{
      const fetchData = async () => {
        try {
          const result = await RoleAPI.getAll();
          // console.log('result',result);
          let roleArray = [];

          // console.log('roleId.split',roleId.split(','));
          

          (result.role).map((role)=>{
            // console.log('role5454',role);
            (roleId.split(',')).map((assignedRole)=>{
              // console.log('ro',assignedRole);

              if(role.id==assignedRole){                
                roleArray.push(role.name);
              }
            }); 
          });
          setRoles(roleArray);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();      
  },[]);
  
// console.log('asdfasfsafa',roles)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef(null);
  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setStaffOpen(false);
  }


  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick(flag, message) {
    setSnackbarOpen(true);
  }
  console.log('roleAs',roleAs);
  function handleDashboardClick(role){
    
    setRoleAs(role);
    setShowFranchise(false);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(true);
  }

  function handleFranchiseClick(role) {
    
    setRoleAs(role);
    setShowFranchise(true);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
  }

  function handleCategoryClick(role) {
    
    setRoleAs(role);
    setShowCategory(true);
    setShowFranchise(false);
    setShowMasterStaff(false);
    setShowStaff(false);
    setShowFranchiseStaff(false);
    setShowTask(false);
    setShowPwd(false);
    setShowProfile(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
  }

  function handleMasterStaffClick(role){
    
    setRoleAs(role);
    setShowMasterStaff(true);
    setShowFranchise(false);
    setShowCategory(false);
    setShowFranchiseStaff(false);
    setShowTask(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
  }

  function handleFranchiseStaffClick(role){
    
    setRoleAs(role);
    setShowFranchiseStaff(true);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowTask(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);

  }
  
  function handleTaskClick(role){
    
    setRoleAs(role);
    setShowTask(true);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
  }
  function handleProfileClick(role){
    
    setRoleAs(role);
    setShowProfile(true);setAnchorEl(null);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowPwd(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);

  }
  function handleChangePasswordClick(role){
    
    setRoleAs(role);
    setShowPwd(true);
    setAnchorEl(null);
    setShowProfile(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);

  }

  function handleFranchiseDetailClick(role){
    
    setRoleAs(role);
    setShowFranchiseDetail(true);
    setShowPwd(false);
    setAnchorEl(null);
    setShowProfile(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowdashboard(false);

  }

  function handleCustomerClick(role){
    
    setRoleAs(role);
    setShowCustomer(true);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowStaffTask(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);

  }
  function handleStaffTaskClick(role){
    
    setRoleAs(role);
    setShowStaffTask(true);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);

  }

  
  function handleEnquiryClick(role){
    
    setRoleAs(role);

    setShowEnquiry(true);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowStaffTask(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);

  }
  function handleLeadsClick(role){
    
    setRoleAs(role);    
    setShowLead(true);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowStaffTask(false);
    setShowOrder(false);
    setShowdashboard(false);
    setShowFranchiseDetail(false);
  }
  function handleOrderClick(role){
    
    setRoleAs(role);
    setShowOrder(true);
    setShowLead(false);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
    setShowStaffTask(false);
  }
  function handleLogout() {
    APP_TOKEN.remove();
    props.history.push('/login');
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}  elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
          Welcome {userName.split(' ')[0]}
          </Typography>
          <Typography variant="h6" className={classes.title} noWrap>
          Welcome To Rentronics
          </Typography>
          {roleName === 'Super Admin' ? <Button color="inherit" className={classes.fonttransform} onClick={handleLogout}>
          Logout
          </Button>:
            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.menu} onClick={handleMenuClick}>
              Settings
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem  className={classes.textsize} onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem className={classes.textsize} onClick={handleChangePasswordClick}>Change Password</MenuItem>
                {roleName === 'Admin' && (  <MenuItem  className={classes.textsize} onClick={handleFranchiseDetailClick}>Franchise Details</MenuItem>)}
                <MenuItem className={classes.textsize} onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {roles.find(role => role === 'Super Admin')
        ?
          <TreeView
            className={classes.treeRoot}
            // defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Super Admin'); }} />
            <StyledTreeItem nodeId="2" labelText="Manage Franchise" labelIcon={FranchiseIcon} onClick={(event) => { handleFranchiseClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="3" labelText="Manage Products Catalogue" labelIcon={ProductIcon} onClick={(event) => { handleCategoryClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="4" labelText="Manage Staff" labelIcon={StaffIcon} onClick={(event) => { handleMasterStaffClick('Super Admin'); }} />
            <StyledTreeItem nodeId="5" labelText="Manage Leads" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Super Admin'); }}/>
          </TreeView>
         :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }

        {roles.find(role => role === 'Admin')
        ?
          <TreeView
            className={classes.treeRoot}
            // defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Super Admin'); }} />
            <StyledTreeItem nodeId="2" labelText="Manage Staff" labelIcon={StaffIcon} onClick={(event) => { handleFranchiseStaffClick('Admin'); }} />
            <StyledTreeItem nodeId="3" labelText="Manage Task" labelIcon={TaskIcon} onClick={(event) => { handleTaskClick('Admin'); }} />
            <StyledTreeItem nodeId="4" labelText="Manage Leads" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Admin'); }}/>
          </TreeView>
          :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }


        {roleId == 0
        ?
          <TreeView
            className={classes.treeRoot}
            // defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Master Staff'); }} />            
            <StyledTreeItem nodeId="4" labelText="Manage Leads" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Master Staff'); }}/>
          </TreeView>
          :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }


        {roles.find(role => role === 'CSR' || role === 'Finance' || role === 'Delivery' || role === 'HR')
        && ( 
          <TreeView
            className={classes.treeRoot}
            // defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick(roles); }} />
            {roles.find(role => role === 'CSR')
            ?  
              <StyledTreeItem nodeId="2" labelText="CSR" labelIcon={PersonAddIcon}>  
                <StyledTreeItem
                  nodeId="5"
                  labelText="Manage Customer"
                  labelIcon={CustomerIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"                  
                  onClick={(event) => { handleCustomerClick('CSR'); }}
                />               
                <StyledTreeItem
                  nodeId="6"
                  labelText="Manage Task"
                  labelIcon={TaskIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleTaskClick('CSR'); }}
                />
                <StyledTreeItem
                  nodeId="7"
                  labelText="Manage Enquiry"
                  labelIcon={EnquiryIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleEnquiryClick('CSR'); }}
                />
                <StyledTreeItem
                  nodeId="8"
                  labelText="Manage Leads"
                  labelIcon={LeadIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleLeadsClick('CSR'); }}
                />
                <StyledTreeItem
                  nodeId="9"
                  labelText="Manage Order"
                  labelIcon={OrderIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleOrderClick('CSR'); }}
                />
              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }

            {roles.find(role => role === 'Finance')            
              ?
              <StyledTreeItem nodeId="3" labelText="Finance" labelIcon={FinanceIcon}>  
                <StyledTreeItem
                  nodeId="10"
                  labelText="Manage Task"
                  labelIcon={TaskIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleTaskClick('Finance'); }}
                />
                <StyledTreeItem
                  nodeId="11"
                  labelText="Manage Leads"
                  labelIcon={LeadIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleLeadsClick('Finance'); }}
                />
                <StyledTreeItem
                  nodeId="12"
                  labelText="Manage Order"
                  labelIcon={OrderIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleOrderClick('Finance'); }}
                />
              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="3" labelText="" labelIcon={AccountCircleIcon} /> }
            

            {roles.find(role => role === 'Delivery')
            ?
              <StyledTreeItem nodeId="4" labelText="Delivery" labelIcon={DeliveryIcon}>  
                <StyledTreeItem
                  nodeId="13"
                  labelText="Manage Task"
                  labelIcon={TaskIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleTaskClick('Delivery'); }}
                />
                <StyledTreeItem
                  nodeId="14"
                  labelText="Manage Leads"
                  labelIcon={LeadIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleLeadsClick('Delivery'); }}
                />
                <StyledTreeItem
                  nodeId="15"
                  labelText="Manage Order"
                  labelIcon={OrderIcon}
                  // labelInfo="90"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={(event) => { handleOrderClick('Delivery'); }}
                />
              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="4" labelText="" labelIcon={AccountCircleIcon} /> }
          </TreeView>
         )}  
      </Drawer>  

      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.toolbar} />
        <List>        
          {roles.find(role => role === 'Super Admin')
            && (<List >
              <ListItem button key="Dashboard" onClick={(event) => { handleDashboardClick('Super Admin'); }}  >
                  <ListItemIcon className={classes.iconwidth}> <BusinessIcon/> </ListItemIcon>
                  <ListItemText  primary="Dashboard" />
                </ListItem>

                <ListItem button key="ManageFranchise" onClick={(event) => { handleFranchiseClick('Super Admin'); }}>
                  <ListItemIcon className={classes.iconwidth}> <BusinessIcon/> </ListItemIcon>
                  <ListItemText  primary="Manage Franchise" />
                </ListItem>
              
                <ListItem button key="ManageProduct"  onClick={(event) => { handleCategoryClick('Super Admin'); }}>
                  <ListItemIcon><CardTravelIcon /> </ListItemIcon>
                  <ListItemText primary="Manage Products Catalogue" />
                </ListItem>

                <ListItem button key="ManageStaff" onClick={(event) => { handleMasterStaffClick('Super Admin'); }}>
                  <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                  <ListItemText primary="Manage Staff" />
                </ListItem>
                <ListItem button key="ManageLeads" onClick={(event) => { handleLeadsClick('Super Admin'); }}>
                    <ListItemIcon> <InsertCommentIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Leads" />
                </ListItem>
            </List>
            )}
            </List>
            
            <List>            
              {roles.find(role => role === 'Admin')
              && (
              <List>
                <ListItem button key="ManageStaff" onClick={(event) => { handleFranchiseStaffClick('Admin'); }} >
                    <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Staff" />
                </ListItem>
            
                <ListItem button key="ManageTask"   onClick={(event) => { handleTaskClick('Admin'); }} >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Task" />
                </ListItem>
            
                <ListItem button key="ManageLeads" onClick={(event) => { handleLeadsClick('Admin'); }} >
                    <ListItemIcon> <InsertCommentIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Leads" />
                </ListItem>
              </List>
              )}
            </List>

            <List>
               {roles.find(role => role === 'CSR')
               && (
               <List>
                 <ListItem button key="ManageCustomer" onClick={(event) => { handleCustomerClick('CSR'); }} >
                     <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                     <ListItemText primary="Manage Customer" />
                 </ListItem>
                
                <ListItem button key="ManageTask" onClick={(event) => { handleTaskClick('CSR'); }}  >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Task" />
                </ListItem>
                
                <ListItem button key="ManageEnquiry"  onClick={(event) => { handleEnquiryClick('CSR'); }} >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Enquiry" />
                </ListItem>
               
                <ListItem button key="ManageLeads"  onClick={(event) => { handleLeadsClick('CSR'); }} >
                    <ListItemIcon> <InsertCommentIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Leads" />
                </ListItem>
               
                <ListItem button key="ManageOrder"   onClick={(event) => { handleOrderClick('CSR'); }} >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Order" />
                </ListItem>
               </List>
               )}
             </List>

             <List>
               {roles.find(role => role === 'Finance')
               && (
               <List>
                <ListItem button key="ManageTask" onClick={(event) => { handleTaskClick('Finance'); }} >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Task" />
                </ListItem>

                <ListItem button key="ManageLeads" onClick={(event) => { handleLeadsClick('Finance'); }} >
                    <ListItemIcon> <InsertCommentIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Leads" />
                </ListItem>
                <ListItem button key="ManageOrder" onClick={(event) => { handleOrderClick('Finance'); }}  >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Order" />
                </ListItem>               
               </List>
               )}
             </List>

             <List>
               {roles.find(role => role === 'Delivery')
               && (
               <List>
                <ListItem button key="ManageTask" onClick={(event) => { handleTaskClick('Delivery'); }}  >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Task" />
                </ListItem>

                <ListItem button key="ManageLeads" onClick={(event) => { handleLeadsClick('Delivery'); }} >
                    <ListItemIcon> <InsertCommentIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Leads" />
                </ListItem>

                <ListItem button key="ManageOrder" onClick={(event) => { handleOrderClick('Delivery'); }} >
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Manage Order" />
                </ListItem>               
               </List>
               )}
             </List>
      </Drawer>   */}
  


      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          showFranchise ? <Franchise roleName={roleAs}/> : null
        }

        {
          showCategory ? <Product roleName={roleAs}/> : null
        }
        {
          showMasterStaff ? <Staff roleName={roleAs}/> : null
        }
        {
          showFranchiseStaff ? <FranchiseStaff  franchiseId={franchiseId} roleName={roleAs}/> : null
        }
        {
          showTask ? <Task franchiseId={franchiseId} roleName={roleAs}/> : null
        }
        {
          showCustomer ? <Customer userId={userId} roleName={roleAs}/> : null
        }
        {
          showProfile ? <Profile roleName={roleAs}/> : null
        }
        {
          showPwd ? <ChangePassword  franchiseId={franchiseId} roleName={roleAs}/> : null
        }
        {
          showStaffTask ? <StaffTask  uid={uid} roleName={roleAs}/> : null
        }
        {
          showEnquiry ? <Enquiry roleName={roleAs}/>:null
        }
        {
          showLead ? <Lead roleName={roleAs}/>:null
        }
        {
          showOrder ? <Order roleName={roleAs}/>:null
        }
        {
          showFranchiseDetail ? <FranchiseDetail roleName={roleAs}/>:null
        }
        {
          showDashboard ? <MainDashboard roleName={roleAs}/>:null
        }
        {/* {props.children} */}
      </main>


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Frenchise Created successfully with Admin User!"
        />
      </Snackbar>
    </div>
  );
}
