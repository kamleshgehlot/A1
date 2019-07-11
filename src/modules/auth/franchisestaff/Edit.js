import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';



// API CALL
import Staff from '../../../api/franchise/Staff';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  id: '',
  first_name : '',
  last_name : '',
  location : '',
  contact : '',
  email : '',  
  pre_company_name : '',
  pre_company_address : '',
  pre_company_contact : '',
  pre_position : '',
  duration : '',
  resume : '',
  cover_letter : '',
  employment_doc : '',
  
  user_id : '',
  password : '',
  role : '',
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  root: {
    flexGrow: 1,
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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick, role, inputs, setFranchiseList}) {
  const classes = useStyles();
  
  const [expanded, setExpanded] = React.useState('panel1');
  const [staffList, setStaffList] = React.useState(inputs);
  const [assignRole, setAssignRole] = React.useState([]);
  const [checkRole, setCheckRole] = React.useState(["Delivery","CSR","Finance","HR"]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  
  function handleChangeMultiple(event) {
    setAssignRole(event.target.value);
    staffList['role']=assignRole;
  }

  useEffect(() => {
    
    (staffList.role.split(',')).map((a,index) =>{
      var i = (staffList.role.split(',')[index]);
      assignRole.push(i)
    })
  }, []);

  
  
  const addFranchiseStaff = async () => {
    const response = await Staff.register({
      id: staffList.id,
      first_name: staffList.first_name,
      last_name: staffList.last_name,
      location: staffList.location,
      contact: staffList.contact,
      email: staffList.email,
      
      pre_company_name: staffList.pre_company_name,
      pre_company_address: staffList.pre_company_address,
      pre_company_contact: staffList.pre_company_contact,
      pre_position: staffList.pre_position,
      duration: staffList.duration,
      // resume:  staffList.resume,
      // cover_letter: staffList.cover_letter,
      employment_doc: staffList.employment_doc,
      
      user_id: staffList.user_id,
      password: staffList.password,
      role: assignRole,
      created_by: 1,
    });
    handleSnackbarClick(true,'Franchise Updated Successfully');
    setFranchiseList(response.staffList);
    // handleReset(RESET_VALUES);
    handleEditClose(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target
    setStaffList({ ...staffList, [name]: value })
  }
  return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleEditClose} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit Staff
              </Typography>
              <Button onClick={addFranchiseStaff} color="inherit">
                Update
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            
            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel1a-header"
              >
              <Typography className={classes.heading}>Staff Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      value={staffList.first_name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      type="text"
                      value={staffList.last_name} 
                      onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {/* <InputLabel htmlFor="location">Location *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="location"
                      name="location"
                      label="Location"
                      type="text"
                      value={staffList.location}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="contact"
                      name="contact"
                      label="Contact"
                      type="number"
                      value={staffList.contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="email">Email Id *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email Id"
                      type="email"
                      value={staffList.email} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="email"
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Previous Employer Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="pre_company_name"
                      name="pre_company_name"
                      label="Name of Previous Company"
                      type="text"
                      value={staffList.pre_company_name} 
                      onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="pre_company_address"
                      name="pre_company_address"
                      label="Address of Previous Company"
                      type="text"
                      value={staffList.pre_company_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="pre_company_contact"
                      name="pre_company_contact"
                      label="Contact# of Previous Company"
                      type="number"
                      value={staffList.pre_company_contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  {/* <InputLabel htmlFor="pre_position">Position *</InputLabel> */}
                  <TextField
                      margin="dense"
                      id="pre_position"
                      name="pre_position"
                      label="Position/JobRole in Previous Company"
                      type="text"
                      value={staffList.pre_position} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="duration"
                      name="duration"
                      label="Work Experience"
                      type="text"
                      value={staffList.duration} 
                      onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="employment_docs">Upload Employement Docs</InputLabel>
                    <TextField
                      margin="dense"
                      id="employment_docs"
                      name="employment_docs"
                      label=""
                      type="file"
                      value={staffList.employment_doc} 
                      onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Current Job Role</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="user_id"
                      name="user_id"
                      label="User Id"
                      type="text"
                      value={staffList.user_id} 
                      // onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}> */}
                    {/* <InputLabel htmlFor="last_name">Password</InputLabel> */}
                    {/* <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      // onFocus={handlePasswordBlurChange}
                      value={staffList.password} 
                      required
                      fullWidth
                      // error={errors.password}
                      // helperText={errors.password ? errors.password : ' '}
                      disabled
                    />
                  </Grid> */}
                  
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="assign_role">Assign Role</InputLabel>
                  <Select
                      multiple
                      value={assignRole}
                      onChange={handleChangeMultiple}
                      inputProps={{
                        name: 'assign_role',
                        id: 'assign_role',
                        label:'assign_role'
                      }}
                      fullWidth
                      required
                    >
                    {role.map((ele,index) =>{
                        return(
                        <MenuItem value={ele.id}>{ele.name}</MenuItem>
                        )
                    })}
                    </Select>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
              
          </div>
        </from>
      </Dialog>
    </div>
  );
}
