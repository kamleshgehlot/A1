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
import useSignUpForm from '../franchise/CustomHooks';

import validate from '../../common/validation/StaffRuleValidtion';
// API CALL
import StaffMaster from '../../../api/StaffMasterAdmin';

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
    marginTop:theme.spacing(3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick,  inputValues, setFranchiseList, positions}) {
  const classes = useStyles();
  // console.log(inputValues)
  
  const [staffList, setStaffList] = React.useState(inputValues);
  // const [errors, setErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const addStaffMaster = async () => {

    // setIsSubmitting(true);
    // console.log('st-------',staffList)
    // setErrors(validate(staffList));
    //  console.log('errors-------',errors)

  // if (Object.keys(errors).length === 0 && isSubmitting) {
       
      const response = await StaffMaster.register({
          id: inputs.id,
          first_name: inputs.first_name,
          last_name:inputs.last_name,
          location:inputs.location,
          contact:inputs.contact,
          email:inputs.email,
          position:inputs.position,
          created_by: 1,
        });
        handleSnackbarClick(true,'Franchise Updated Successfully');
        setFranchiseList(response.staffList);
        handleEditClose(false);
      // }
  
  };
  const { inputs, handleInputChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addStaffMaster,
    validate
  ); 
  useEffect(() => {
    setInputsAll(inputValues);
  }, []);
  // console.log(inputs)
  // const handleInputChange = event => {
  //   const { name, value } = event.target
  //   setStaffList({ ...staffList, [name]: value })
  // }
  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Edit Staff
              </Typography>
              {/* <Button onClick={addStaffMaster} color="inherit">
                Update
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
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
                      required
                      value={inputs.last_name} 
                      onChange={handleInputChange}
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
                      error={errors.email}
                      helperText={errors.email}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="city">Position *</InputLabel>
                    <Select
                      value={inputs.position}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'position',
                        id: 'position',
                        // label:'position'
                      }}
                      fullWidth className={classes.textsize}
                      error={errors.position}
                      helperText={errors.position}
                      // label="position"
                      required
                    > 
                      {
                        positions.map(ele =>{
                          return(
                          <MenuItem className={classes.textsize} value={ele.id}>{ele.position}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained"  onClick={handleSubmit} color="primary" className={classes.button} >
                      Update
                    </Button>  
                    <Button  variant="contained"   onClick={handleEditClose} color="primary" className={classes.button} >
                      Close
                    </Button>
                </Grid>
                </Grid>
              </Paper>
          </div>
        </from>
      </Dialog>
    </div>
  );
}
