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
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

export default function Edit({open, handleEditClose, handleSnackbarClick, inputs}) {
  const classes = useStyles();
  
  const [expanded, setExpanded] = React.useState('panel1');
  const [staffList, setStaffList] = React.useState(inputs);
  const [assignRole, setAssignRole] = React.useState([]);
  const [checkRole, setCheckRole] = React.useState(["Delivery","CSR","Finance","HR"]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const addFranchiseStaff = async () => {

    const response = await Staff.register({
      franchise_id: franchiseId,
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
                Edit Customer
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
                      value={customer.customer_name}
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
                      value={customer.customer_address} 
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
                      value={customer.city} 
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
                      value={customer.postcode}
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
                      value={customer.telephone} 
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
                      value={customer.mobile} 
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
                      value={customer.email} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="email">Gender</InputLabel>
                    <RadioGroup aria-label="gender" name="gender" value={customer.gender} onChange={handleChange} row>
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
                    <RadioGroup aria-label="working" name="working" value={customer.working} onChange={handleChange} row>
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
                      value={customer.dob} 
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
                         value={customer.id_proof}
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
                      value={customer.id_number} 
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
                      value={customer.expiry_date} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="email">Over 18 Years</InputLabel>
                    <RadioGroup aria-label="working" name="working" value={customer.working} onChange={handleChange} row>
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
                      value={customer.id_file} 
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
                      value={customer.name1} 
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
                      value={customer.address1} 
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
                      value={customer.alt_contact1} 
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
                      value={customer.relation1} 
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
                      value={customer.name2} 
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
                      value={customer.address2} 
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
                      value={customer.alt_contact2} 
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
                      value={customer.relation2} 
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
                      value={customer.employer_name} 
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
                      value={customer.employer_address} 
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
                      value={customer.income_telephone_number} 
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
                      value={customer.employer_email} 
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
                      value={customer.experience} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
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
