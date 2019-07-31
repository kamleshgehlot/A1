import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";

import { APP_TOKEN } from '../../../api/Constants';

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
  employment_docs : '',
  
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


export default function Add({ open, handleClose, handleSnackbarClick, franchiseId, role, setFranchiseList}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [temp, setTemp] = React.useState([]);
  const [assignRole, setAssignRole] = React.useState([]);
  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addFranchiseStaff = async () => {
    setpLoading(true);
    const data = {
      franchise_id: franchiseId,
      id: '',
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      location: inputs.location,
      contact: inputs.contact,
      email: inputs.email,
      
      pre_company_name: inputs.pre_company_name,
      pre_company_address: inputs.pre_company_address,
      pre_company_contact: inputs.pre_company_contact,
      pre_position: inputs.pre_position,
      duration: inputs.duration,
      // resume:  inputs.resume,
      // cover_letter: inputs.cover_letter,
      employment_docs: inputs.employment_docs,
      
      user_id: inputs.user_id,
      password: inputs.password,
      role: assignRole.join(),
      created_by: 1,
    };

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('employment_docs').files.length; x++) {
      formData.append('avatar', document.getElementById('employment_docs').files[x])
    }
    
    const response = await Staff.register( { formData: formData } );
    assignRole.length = 0;
    handleSnackbarClick(true);
    setFranchiseList(response.staffList);
    handleReset(RESET_VALUES);
    setpLoading(false);
    handleClose(false);
    
  };

  function validate(values) {
    let errors = {};

    return errors;
  };

 const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    addFranchiseStaff,
    validate
  );
  
  
  function handleChangeMultiple(event) {
    setAssignRole(event.target.value);
    // inputs['role']=assignRole;
  }
  
  function handleNameBlurChange(e) {
    setInput('user_id', generate(inputs.first_name, inputs.last_name));
  }

  function generate(first_name, last_name) {
    const ts = new Date().getTime().toString();
    const parts = ts.split( "" ).reverse();
    let id = "";
    
    for( let i = 0; i < 4; ++i ) {
      let index = Math.floor( Math.random() * (5) );
      id += parts[index];	 
    }
    
    const uid = APP_TOKEN.get().uid;

    return first_name.substring(0, 4).toLowerCase() + '_' + uid.split('_')[1] + '_' + id;
  }
  
  function handlePasswordBlurChange() {
    
    inputs['password']=='' ? 
    setInput('password', GeneratePassword())
    :''
  }

  function GeneratePassword() {
    return Math.random().toString(36).slice(-8);
  }

return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add Staff
              </Typography>
              <Button color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
                  
                  <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
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
                      value={inputs.first_name}
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
                      value={inputs.last_name} 
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
                      value={inputs.location}
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
                      value={inputs.contact} 
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
                      value={inputs.email} 
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
                      value={inputs.pre_company_name} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
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
                      value={inputs.pre_company_address} 
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
                      value={inputs.pre_company_contact} 
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
                      value={inputs.pre_position} 
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
                      value={inputs.duration} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
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
                      multiple
                      type="file"
                      value={inputs.employment_docs} 
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
                      value={inputs.user_id} 
                      // onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">Password</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      onFocus={handlePasswordBlurChange}
                      value={inputs.password} 
                      required
                      fullWidth
                      // error={errors.password}
                      // helperText={errors.password ? errors.password : ' '}
                      // disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="assign_role">Assign Role</InputLabel>

                    <Select
                      multiple
                      value={assignRole}
                      onChange={handleChangeMultiple}
                      inputProps={{
                        name: 'assign_role',
                        id: 'assign_role',
                        // label:'assign_role'
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
        </form>
        

      </Dialog>
    </div>
  );
}
