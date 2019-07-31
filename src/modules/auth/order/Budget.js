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
import Fab from '@material-ui/core/Fab';
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
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

const RESET_VALUES = {
  
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
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    marginTop: 15,
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
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Budget({ open, handleBudgetClose}) {

  const classes = useStyles();
  const [inputs,setInputs] = useState([]);
  const [assignRole, setAssignRole] = React.useState([]);
  


  const addFranchiseStaff = async () => {

    const data = {
      // franchise_id: franchiseId,
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
    // setFranchiseList(response.staffList);
    handleReset(RESET_VALUES);
    handleBudgetClose(false);
    
  };

  
  
  function handleInputChange(e){
    console.log('valueee',e.target.value)
    if(e.target.value===""){
      setInputs({
        ...inputs,
        [e.target.name]: 0,
      });
    }
    else{
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  }
  console.log('inputs.',inputs);

  function handleSubmit(e){
    handleBudgetClose(false)
    e.preventDefault();
  }

  useEffect(() => {
    inputs.work = 0;
    inputs.benefits = 0;
    inputs.accomodation = 0;
    inputs.childcare = 0;
    inputs.rent = 0;
    inputs.power = 0;
    inputs.telephone = 0;
    inputs.mobile = 0;
    inputs.vehicle = 0;
    inputs.transport = 0;
    inputs.food = 0;
    inputs.credit_card = 0;
    inputs.loan = 0;
    inputs.other_expenditure =0;
    
  }, []);
  let income = parseInt(inputs.work) + parseInt(inputs.benefits) + parseInt(inputs.accomodation) + parseInt(inputs.childcare);
  let Expenditure = parseInt(inputs.rent) + parseInt(inputs.power) + parseInt(inputs.telephone) + parseInt(inputs.mobile) + parseInt(inputs.vehicle) + parseInt(inputs.transport) + parseInt(inputs.food) + parseInt(inputs.credit_card) + parseInt(inputs.loan) + parseInt(inputs.other_expenditure) ;
  let surplus = income - Expenditure;
  

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
      <Dialog maxWidth="lg" open={open} onClose={handleBudgetClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleBudgetClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Budget
              </Typography>
              <Button color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                  Weekly Income (After Tax) (A)
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="work"
                      name="work"
                      label="Work"
                      value={inputs.work}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="benefits"
                      name="benefits"
                      label="Benefits"
                      value={inputs.benefits}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="accomodation"
                      name="accomodation"
                      label="Accomodation Allowance"
                      value={inputs.accomodation}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="childcare"
                      name="childcare"
                      label="Childcare"
                      value={inputs.childcare}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                  Weekly Expenditure (B)
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="rent"
                      name="rent"
                      label="Rent/Mortgage"
                      value={inputs.rent}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="power"
                      name="power"
                      label="Power"
                      value={inputs.power}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="telephone"
                      name="telephone"
                      label="Landline Phone"
                      value={inputs.telephone}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="mobile"
                      name="mobile"
                      label="Mobile Phone"
                      value={inputs.mobile}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="vehicle"
                      name="vehicle"
                      label="Vehicle Finance"
                      value={inputs.vehicle}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="transport"
                      name="transport"
                      label="Public Transport"
                      value={inputs.transport}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="food"
                      name="food"
                      label="Food"
                      value={inputs.food}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="credit_card"
                      name="credit_card"
                      label="Credit/Store Cards"
                      value={inputs.credit_card}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="loan"
                      name="loan"
                      label="Loans/Hire Purchase"
                      value={inputs.loan}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="other_expenditure"
                      name="other_expenditure"
                      label="Other"
                      value={inputs.other_expenditure}
                      onChange={handleInputChange}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Income = {income}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Expenses = {Expenditure}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    TOTAL SURPLUS/DEFICT (A-B)
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    <TextField
                      id="total_surplus"
                      name="total_surplus"
                      // label="Other"
                      value={surplus}
                      onChange={handleInputChange}
                      fullWidth
                      disabled
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    How much you can afford to pay on weekly basis?
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    <TextField
                      id="afford_amt"
                      name="afford_amt"
                      // label="Other"
                      value={inputs.afford_amt}
                      onChange={handleInputChange}
                      fullWidth
                      // disabled
                      required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Typography>
                  </Grid>
                </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
