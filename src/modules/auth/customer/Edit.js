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
import Customer from '../../../api/franchise/Customer';
import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  id: '',
  customer_name : '',
  address : '',
  city : '',
  postcode : '',
  telephone : '',  
  mobile : '',
  email : '',
  gender : '',
  is_working : '',
  dob : '',
  id_type : '',
  id_number: '',
  expiry_date : '',
  is_adult :'',
  id_proof : '',

  alt_c1_name:'',
  alt_c1_address:'',
  alt_c1_contact:'',
  alt_c1_relation:'',
  alt_c2_name: '',
  alt_c2_address: '',
  alt_c2_contact:'',
  alt_c2_relation:'',

  employer_name:'',
  employer_address:'',
  employer_telephone:'',
  employer_email:'',
  employer_tenure:'',

  // is_active:1,
  // created_by: 1,
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
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Edit({ open, handleClose, handleSnackbarClick, inputs, setCustomerList}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [customerList, setDataCustomerList] = React.useState(inputs);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const editCustomer = async () => {
    const response = await Customer.register({
      id: customerList.id,
      customer_name : customerList.customer_name,
      address : customerList.address,
      city : customerList.city,
      postcode : customerList.postcode,
      telephone : customerList.telephone,  
      mobile : customerList.mobile,
      email : customerList.email,
      gender : customerList.gender,
      is_working : customerList.is_working,
      dob : customerList.dob,
      id_type :  customerList.id_type,
      id_number:  customerList.id_number,
      expiry_date :  customerList.expiry_date,
      is_adult : customerList.is_adult,
      id_proof :  customerList.id_proof,

      alt_c1_name: customerList.alt_c1_name,
      alt_c1_address: customerList.alt_c1_address,
      alt_c1_contact: customerList.alt_c1_contact,
      alt_c1_relation: customerList.alt_c1_relation,
      alt_c2_name:  customerList.alt_c2_name,
      alt_c2_address:  customerList.alt_c2_address,
      alt_c2_contact: customerList.alt_c2_contact,
      alt_c2_relation: customerList.alt_c2_relation,

      employer_name: customerList.employer_name,
      employer_address: customerList.employer_address,
      employer_telephone: customerList.employer_telephone,
      employer_email: customerList.employer_email,
      employer_tenure: customerList.employer_tenure,

      is_active: customerList.is_active,
      
    });
    
    handleSnackbarClick(true);
    setCustomerList(response.customerList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  // function validate(values) {
  //   let errors = {};
  //   return errors;
  // };

//  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
//     RESET_VALUES,
//     editCustomer,
//     validate
//   );

const handleInputChange = event => {
  const { name, value } = event.target
  // // console.log(name, value);
  // name =='state' && value =='4' ? setConfirmation(true) : 
  setDataCustomerList({ ...customerList, [name]: value })
}

  
  console.log("inputs---==",customerList);
  
return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add Customer
              </Typography>
              <Button color="inherit" type="submit" onClick={editCustomer}>
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
                      value={customerList.customer_name}
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
                      id="address"
                      name="address"
                      label="Address"
                      type="text"
                      value={customerList.address} 
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
                      value={customerList.city} 
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
                      type="number"
                      value={customerList.postcode}
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
                      value={customerList.telephone} 
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
                      value={customerList.mobile} 
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
                      value={customerList.email} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="Gender">Gender</InputLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={customerList.gender}
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel labelPlacement="start" value="female" control={<Radio />} label="Female" />
                      <FormControlLabel labelPlacement="start" value="male" control={<Radio />} label="Male" />
                      {/* <FormControlLabel labelPlacement="start" value="transgender" control={<Radio />} label="Transgender" /> */}
                    </RadioGroup>
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="is_working">Are you working?</InputLabel>
                    <RadioGroup aria-label="is_working" name="is_working" value={customerList.is_working} onChange={handleInputChange} row>
                      <FormControlLabel value="1" control={<Radio color="primary" />} label="Yes" labelPlacement="start" />
                      <FormControlLabel value="0" control={<Radio color="primary" />} label="No" labelPlacement="start" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="dob">Date Of Birth</InputLabel>
                    <TextField
                      margin="dense"
                      id="dob"
                      name="dob"
                      // label=""
                      type="date"
                      value={customerList.dob} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="id_type">ID Proof</InputLabel>
                    <Select
                         name="id_type"
                         onChange={handleInputChange}
                         value={customerList.id_type}
                         inputProps={{
                           name: 'id_type',
                           id: 'id_type',
                         }}
                         defaultValue='Shah'
                         className={classes.margin}
                         fullWidth
                         label="Select Id Proof"
                         required
                      >
                          <MenuItem value="1">Passport</MenuItem>
                          <MenuItem value="2">Driving License</MenuItem>
                          <MenuItem value="3">Others</MenuItem>

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
                      value={customerList.id_number} 
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
                      value={customerList.expiry_date} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="is_adult">Over 18 Years?</InputLabel>
                    <RadioGroup aria-label="is_adult" name="is_adult" value={customerList.is_adult} onChange={handleInputChange} row>
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="id_proof">Upload Copy of Selected ID*</InputLabel>
                    <TextField
                      margin="dense"
                      id="employment_docs"
                      name="employment_docs"
                      label=""
                      type="file"
                      // value={customerList.id_proof} 
                      // onChange={handleInputChange}
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
                      id="alt_c1_name"
                      name="alt_c1_name"
                      label="Name"
                      type="text"
                      value={customerList.alt_c1_name} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_c1_address"
                      name="alt_c1_address"
                      label="Address"
                      type="text"
                      value={customerList.alt_c1_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_c1_contact"
                      name="alt_c1_contact"
                      label="Contact#"
                      type="number"
                      value={customerList.alt_c1_contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_c1_relation"
                      name="alt_c1_relation"
                      label="Relationship To You"
                      type="text"
                      value={customerList.alt_c1_relation} 
                      onChange={handleInputChange}
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
                      id="alt_c2_name"
                      name="alt_c2_name"
                      label="Name"
                      type="text"
                      value={customerList.alt_c2_name} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_c2_address"
                      name="alt_c2_address"
                      label="Address"
                      type="text"
                      value={customerList.alt_c2_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_c2_contact"
                      name="alt_c2_contact"
                      label="Contact#"
                      type="number"
                      value={customerList.alt_c2_contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="alt_c2_relation"
                      name="alt_c2_relation"
                      label="Relationship To You"
                      type="text"
                      value={customerList.alt_c2_relation} 
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
                      value={customerList.employer_name} 
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
                      value={customerList.employer_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="employer_telephone"
                      name="employer_telephone"
                      label="Employer Telephone#"
                      type="number"
                      value={customerList.employer_telephone} 
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
                      value={customerList.employer_email} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="user_id">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="employer_tenure"
                      name="employer_tenure"
                      label="Tenure of Employer"
                      type="text"
                      value={customerList.employer_tenure} 
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
