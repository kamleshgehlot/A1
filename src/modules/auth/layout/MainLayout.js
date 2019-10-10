import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import Franchise from '../franchise/Franchise';
import Product from '../category/ProductList';
import Staff from '../staff/Staff';
import FranchiseStaff from '../franchisestaff/FranchiseStaff';

import Customer from '../customer/CustomerList';
import Profile from '../setting/Profile';
import ChangePassword from '../setting/ChangePassword';
import Enquiry from '../enquiry/Enquiry';
import Lead from '../lead/Lead';
import Order from '../order/Order';
import FranchiseDetail from '../setting/FranchiseDetail';
import MainDashboard from './dashboard/MainDashboard';
import FinanceReport from './report/FinanceReport';
import DeliveryReport from './report/DeliveryReport';

import Tab from './Tab';

// Helpers
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import RoleAPI from '../../../api/franchise/Role';

import TaskList from '../task/TaskList';

import StyledTreeItem from './StyledTreeItem';

const drawerWidth = 220;

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
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  treeRoot: {
    flexGrow: 1,
    marginTop:theme.spacing(8),
    maxWidth: 250,
    minWidth: 200
  }
}));

export default function ClippedDrawer(props) {
  const roleName = APP_TOKEN.get().roleName;
  const roleId = APP_TOKEN.get().role_id;
  const userName = APP_TOKEN.get().userName;
  const franchiseId = APP_TOKEN.get().franchiseId;
  const userId = APP_TOKEN.get().userId;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showFranchise, setShowFranchise] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDashboard, setShowdashboard] = useState(roleName === 'Super Admin');
  const [showMasterStaff, setShowMasterStaff] = useState(false);
  const [showFranchiseStaff, setShowFranchiseStaff] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showFranchiseDetail, setShowFranchiseDetail] = useState(false);
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
  const [showOrder,setShowOrder] = useState(false);
  const [showFinanceReport, setShowFinanceReport]= useState(false);
  const [showDeliveryReport, setShowDeliveryReport]= useState(false);
  const [roles, setRoles] = useState([]);
  const [roleAs, setRoleAs]= useState('');
  const [role_Id, setRole_Id]= useState('');

  useEffect(()=>{
      const fetchData = async () => {
        try {
          const result = await RoleAPI.getAll();
          let roleArray = [];
          (result.role).map((role)=>{
            (roleId.split(',')).map((assignedRole)=>{
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
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleDashboardClick(role,roleId){
    setRoleAs(role);
    setRole_Id(roleId);
    setShowFranchise(false);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
  }

  function handleProfileClick(role){
    
    setRoleAs(role);
    setShowProfile(true);
    setAnchorEl(null);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowOrder(false);
    setShowdashboard(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
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
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
  }

  function handleFinanceReportClick(role){    
    setRoleAs(role);
    setShowFinanceReport(true);
    setShowOrder(false);
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
    setShowDeliveryReport(false);
  }
  
  function handleDeliveryReportClick(role){    
    setRoleAs(role);
    setShowDeliveryReport(true);
    setShowOrder(false);
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
    setShowFinanceReport(false);    
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
            <StyledTreeItem nodeId="1" labelText="Dashboard" color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Super Admin', 1); }} />
            <StyledTreeItem nodeId="2" labelText="Manage Franchise"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={FranchiseIcon} onClick={(event) => { handleFranchiseClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="3" labelText="Manage Products Catalogue"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={ProductIcon} onClick={(event) => { handleCategoryClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="4" labelText="Manage Staff"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={StaffIcon} onClick={(event) => { handleMasterStaffClick('Super Admin'); }} />
            <StyledTreeItem nodeId="5" labelText="Manage Leads"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Super Admin'); }}/>
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
            <StyledTreeItem nodeId="1" labelText="Dashboard"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Admin', 2); }} />
            <StyledTreeItem nodeId="2" labelText="Manage Staff"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={StaffIcon} onClick={(event) => { handleFranchiseStaffClick('Admin'); }} />
            <StyledTreeItem nodeId="3" labelText="Manage Task"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={TaskIcon} onClick={(event) => { handleTaskClick('Admin'); }} />
            <StyledTreeItem nodeId="4" labelText="Manage Leads"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Admin'); }}/>
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
            <StyledTreeItem nodeId="1" labelText="Dashboard"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Master Staff', 0); }} />            
            <StyledTreeItem nodeId="4" labelText="Manage Leads"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Master Staff'); }}/>
          </TreeView>
          :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }


        {roles.find(role => role === 'CSR' || role === 'Finance' || role === 'Delivery' || role === 'HR')
        && ( 
          <TreeView
            className={classes.treeRoot}
            defaultExpanded={["1","2","3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            {roles.find(role => role === 'CSR')
            ?  
              <StyledTreeItem nodeId="1" labelText="CSR"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PersonAddIcon}>  
                <Tab roleName="CSR" roleId="3" nodeId="4" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/> 

                <Tab roleName="CSR" nodeId="5" handleClick={handleCustomerClick} labelIcon={CustomerIcon} labelText="Manage Customer"/> 
                   
                <Tab roleName="CSR" nodeId="6" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 

                <Tab roleName="CSR" nodeId="7" handleClick={handleEnquiryClick} labelIcon={EnquiryIcon} labelText="Manage Enquiry"/> 

                <Tab roleName="CSR" nodeId="8" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 
               
                <Tab roleName="CSR" nodeId="9" handleClick={handleOrderClick} labelIcon={OrderIcon} labelText="Manage Order"/> 
             
              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }

            {roles.find(role => role === 'Finance')            
              ?
              <StyledTreeItem nodeId="2" labelText="Finance"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={FinanceIcon}>  
                 
                 <Tab roleName="Finance" roleId="4" nodeId="10" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/> 
                 
                 <Tab roleName="Finance" nodeId="11" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 
              
                 <Tab roleName="Finance" nodeId="12" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 

                 <Tab roleName="Finance" nodeId="13" handleClick={handleOrderClick} labelIcon={OrderIcon} labelText="Manage Order"/> 

                 <Tab roleName="Finance" nodeId="14" handleClick={handleFinanceReportClick} labelIcon={TaskIcon} labelText="Generate Report"/> 

              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="3" labelText="" labelIcon={AccountCircleIcon} /> }
            

            {roles.find(role => role === 'Delivery')
            ?
              <StyledTreeItem nodeId="3" labelText="Delivery"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={DeliveryIcon}>  

                <Tab roleName="Delivery" roleId="6" nodeId="15" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/> 

                <Tab roleName="Delivery" nodeId="16" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 

                <Tab roleName="Delivery" nodeId="17" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 

                <Tab roleName="Delivery" nodeId="18" handleClick={handleOrderClick} labelIcon={OrderIcon} labelText="Manage Order"/> 

                <Tab roleName="Delivery" nodeId="19" handleClick={handleDeliveryReportClick} labelIcon={TaskIcon} labelText="Generate Report"/> 

              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="4" labelText="" labelIcon={AccountCircleIcon} /> }
          </TreeView>
         )}  
      </Drawer>  

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
          showTask ? <TaskList roleName={roleAs}/> : null
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
          showDashboard ? <MainDashboard roleName={roleAs} roleId={role_Id} />:null
        }
        {
          showFinanceReport ? <FinanceReport roleName={roleAs} /> : null
        }
        {
          showDeliveryReport ? <DeliveryReport roleName={roleAs} /> : null
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
