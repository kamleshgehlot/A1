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
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  id: '',
  full_name : '',
  address : '',
  city : '',
  postcode : '',
  telephone : '',  
  mobile : '',
  email : '',
  gender : '',
  working : '',
  dob : '',
  id_proof : '',
  id_number : '',
  expiry_date : '',
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


export default function Add({ open, handleClose, handleSnackbarClick}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [temp, setTemp] = React.useState([]);

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

    const response = await Staff.register({
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
      created_by: 1,
    });
    assignRole.length = 0;
    handleSnackbarClick(true);
    setFranchiseList(response.staffList);
    handleReset(RESET_VALUES);
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
  
  function handleNameBlurChange(e) {
    setInput('user_id', generate(inputs.first_name, inputs.last_name));
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
                Add Customer
              </Typography>
              <Button color="inherit" type="submit">
                save
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
                <Typography className={classes.heading}>Personal Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="customer_name"
                      name="customer_name"
                      label="Full Name"
                      value={inputs.customer_name}
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
                      id="customer_address"
                      name="customer_address"
                      label="Address"
                      type="text"
                      value={inputs.customer_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="city"
                      name="city"
                      label="City"
                      type="text"
                      value={inputs.city} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="location">Location *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="postcode"
                      name="postcode"
                      label="Postcode"
                      type="text"
                      value={inputs.postcode}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="telephone"
                      name="telephone"
                      label="Telephone"
                      type="number"
                      value={inputs.telephone} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="mobile"
                      name="mobile"
                      label="Mobile"
                      type="number"
                      value={inputs.mobile} 
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
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="email">Gender</InputLabel>
                    <RadioGroup aria-label="gender" name="gender" value={inputs.gender} onChange={handleChange} row>
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                        labelPlacement="male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                        labelPlacement="female"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="email">Are you working?</InputLabel>
                    <RadioGroup aria-label="working" name="working" value={inputs.working} onChange={handleChange} row>
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="no"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="dob">Date Of Birth</InputLabel>
                    <TextField
                      margin="dense"
                      id="dob"
                      name="dob"
                      label=""
                      type="date"
                      value={inputs.dob} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="dob">ID Proof</InputLabel>
                    <Select
                         name="id_proof"
                         onChange={handleInputChange}
                         value={inputs.id_proof}
                         inputProps={{
                           name: 'id_proof',
                           id: 'id_proof',
                         }}
                         defaultValue='Shah'
                         className={classes.margin}
                         fullWidth
                         label="Select Id Proof"
                         required
                      >
                          <MenuItem value="">Passport</MenuItem>
                          <MenuItem value="">Driving License</MenuItem>
                          <MenuItem value="">Others</MenuItem>

                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="id_number"
                      name="id_number"
                      label="ID#"
                      type="text"
                      value={inputs.id_number} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="expiry_date">Expiry Date</InputLabel>
                    <TextField
                      margin="dense"
                      id="expiry_date"
                      name="expiry_date"
                      label=""
                      type="date"
                      value={inputs.expiry_date} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="email">Over 18 Years</InputLabel>
                    <RadioGroup aria-label="working" name="working" value={inputs.working} onChange={handleChange} row>
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="no"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="email">Over 18 Years</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="id_file"
                      name="id_file"
                      label=""
                      type="file"
                      value={inputs.id_file} 
                      onChange={handleInputChange}
                      required
                      fullWidth
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
                <Typography className={classes.heading}>Alternate Contact Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.heading}>Alternate Contact Details #1</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="name1"
                      name="name1"
                      label="Name"
                      type="text"
                      value={inputs.name1} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="address1"
                      name="address1"
                      label="Address"
                      type="text"
                      value={inputs.address1} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_contact1"
                      name="alt_contact1"
                      label="Contact Number"
                      type="number"
                      value={inputs.alt_contact1} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="relation1"
                      name="relation1"
                      label="Relationship To You"
                      type="text"
                      value={inputs.relation1} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.heading}>Alternate Contact Details #2</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="name2"
                      name="name2"
                      label="Name"
                      type="text"
                      value={inputs.name2} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="address2"
                      name="address2"
                      label="Address"
                      type="text"
                      value={inputs.address2} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_contact2"
                      name="alt_contact2"
                      label="Contact Number"
                      type="number"
                      value={inputs.alt_contact2} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="relation2"
                      name="relation2"
                      label="Relationship To You"
                      type="text"
                      value={inputs.relation2} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
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
                <Typography className={classes.heading}>Income Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="employer_name"
                      name="employer_name"
                      label="Employer Name"
                      type="text"
                      value={inputs.employer_name} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="employer_address"
                      name="employer_address"
                      label="Employer Address"
                      type="text"
                      value={inputs.employer_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="employer_telephone_number"
                      name="employer_telephone_number"
                      label="Employer Address"
                      type="number"
                      value={inputs.income_telephone_number} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="employer_email"
                      name="employer_email"
                      label="Email"
                      type="email"
                      value={inputs.employer_email} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="experience"
                      name="experience"
                      label="Length Of time with current employer"
                      type="text"
                      value={inputs.experience} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
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
