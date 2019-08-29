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
import UserAPI from '../../../api/User';
import useSignUpForm from '../franchise/CustomHooks';

import validate from '../../common/validation/StaffRuleValidtion';

const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
  password: '',
  position:'',
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
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
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add({ open, handleClose, handleSnackbarClick, setFranchiseList, positions}) {
  const [chkEmail, SetChkEmail] = useState();
  const classes = useStyles(); 

  const [ploading, setpLoading] = React.useState(false);


  const addStaffMaster = async () => {
    
    if(inputs.email === chkEmail){
      alert('Email already registered')
    }
    else{
      setpLoading(true);
      const response = await StaffMaster.register({
        id: '',
        first_name: inputs.first_name,
        last_name:inputs.last_name,
        user_id:inputs.user_id,
        password:inputs.password,
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
    }
  };
  useEffect(() => {
    
    inputs['password']=='' ? 
    setInput('password', GeneratePassword())
    :''
  }, []);
  function handlePasswordBlurChange() {
    inputs['password']=='' ? 
    setInput('password', GeneratePassword())
    :''
  }

  function GeneratePassword() {
    return Math.random().toString(36).slice(-8);
  }

 const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addStaffMaster,
    validate
  );

  function handleEmailVerification(event){
    // console.log(event.target.value);
    const email = event.target.value;

    const checkEmail = async () => {
      const response = await UserAPI.verifyEmail({email : email});
      
      if(response.isVerified!=''){
      SetChkEmail(response.isVerified[0].email);
      alert('Email already registered');
      }
    }
    checkEmail();
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
    
    return first_name.substring(first_name.length - 4).toLowerCase() + '_' + id;
  }

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Add Staff
              </Typography>
              {/* <Button color="inherit" type="submit">
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
                <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
            {/* Franchise Details */}
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">First Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="first_name"
                      name="first_name"
                      // label="First Name"
                      value={inputs.first_name}
                      onChange={handleInputChange}
                      error={errors.first_name}
                      helperText={errors.first_name}
                      fullWidth
                      required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Last Name</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      // label="Last Name"
                      type="text"
                      value={inputs.last_name} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      error={errors.last_name}
                      helperText={errors.last_name}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="location">Location *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="location"
                      name="location"
                      // label="Location"
                      type="text"
                      value={inputs.location}
                      onChange={handleInputChange}
                      error={errors.location}
                      helperText={errors.location}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="contact">Contact *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="contact"
                      name="contact"
                      // label="Contact"
                      type="number"
                      value={inputs.contact} 
                      onChange={handleInputChange}
                      error={errors.contact}
                      helperText={errors.contact}
                      required
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="email">Email Id *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="email"
                      name="email"
                      // label="Email Id"
                      type="email"
                      value={inputs.email} 
                      onChange={handleInputChange}
                      onBlur={handleEmailVerification}
                      error={errors.email}
                      helperText={errors.email}
                      required
                      fullWidth
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="password">Password *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="password"
                      name="password"
                      // onFocus={handlePasswordBlurChange}
                      value={inputs.password} 
                      // error={errors.password}
                      // helperText={errors.password}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="position">Position *</InputLabel>
                    <Select
                      value={inputs.position}
                      onChange={handleInputChange}
                      error={errors.position}
                      helperText={errors.position}
                      inputProps={{
                        name: 'position',
                        id: 'position',
                        // label:'position'
                      }}
                      className={classes.textsize}
                      fullWidth
                      // label="position"
                      required
                    >
               

                      {
                          (positions.length>0 ? positions : []).map((ele, index) => {
                          return(
                          <MenuItem  className={classes.textsize} value={ele.id}>{ele.position}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit}  color="primary" className={classes.button} >
                      Save
                    </Button>  
                    <Button  variant="contained"   onClick={handleClose} color="primary" className={classes.button} >
                      Close
                    </Button>
                </Grid>
                </Grid>
              </Paper>

            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
