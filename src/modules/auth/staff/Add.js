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

// API CALL
import StaffMaster from '../../../api/StaffMasterAdmin';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
  position:'',
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

export default function Add({ open, handleClose, handleSnackbarClick, setFranchiseList, positions}) {
  const classes = useStyles();

  const [ploading, setpLoading] = React.useState(false);
  const addStaffMaster = async () => {
    setpLoading(true);
    const response = await StaffMaster.register({
      id: '',
      first_name: inputs.first_name,
      last_name:inputs.last_name,
      user_id:inputs.user_id,
      password:'1234',
      location:inputs.location,
      contact:inputs.contact,
      email:inputs.email,
      position:inputs.position,
      created_by: 1,
    });

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
    addStaffMaster,
    validate
  );

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
    
    return first_name.substring(first_name.length - 4).toLowerCase() + '_' + id;
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
            {/* Franchise Details */}
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
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
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="city">Position *</InputLabel>
                    <Select
                      value={inputs.position}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'position',
                        id: 'position',
                        label:'position'
                      }}
                      
                      fullWidth
                      label="position"
                      required
                    >
               
                      <MenuItem value={1}>Territory Manager</MenuItem>
                      <MenuItem value={2}>Marketing Manager</MenuItem>
                      <MenuItem value={3}>IT Specialist</MenuItem>
                      <MenuItem value={4}>BDM (Business Development Manager)</MenuItem>
                      <MenuItem value={5}>Accountant</MenuItem>
                      <MenuItem value={6}>Sales Specialist</MenuItem>


                      {/* {console.log(positions)} */}

                      {/* {
                        positions.map(ele =>{
                          return(
                          <MenuItem value={ele.id}>{ele.position}</MenuItem>
                          )
                        })
                      } */}
                    </Select>
                  </Grid>
                </Grid>
              </Paper>

            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
