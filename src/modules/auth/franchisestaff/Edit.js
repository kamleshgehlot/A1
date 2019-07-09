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

export default function Edit({open, handleEditClose, handleSnackbarClick,  inputs, setFranchiseList, positions}) {
  const classes = useStyles();
  
  const [staffList, setStaffList] = React.useState(inputs);

  const addStaffMaster = async () => {
    const response = await StaffMaster.register({
      // id: staffList.id,
      // first_name: staffList.first_name,
      // last_name:staffList.last_name,
      // location:staffList.location,
      // contact:staffList.contact,
      // email:staffList.email,
      // position:staffList.position,
      // created_by: 1,
    });
    handleSnackbarClick(true,'Franchise Updated Successfully');
    setFranchiseList(response.staffList);
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
              <Button onClick={addStaffMaster} color="inherit">
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
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {/* <InputLabel htmlFor="location">Location *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="address"
                      name="address"
                      label="Address"
                      type="text"
                      value={staffList.address}
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
                      id="company_name"
                      name="company_name"
                      label="Name of Previous Company"
                      type="text"
                      value={staffList.company_name} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="company_address"
                      name="company_address"
                      label="Address of previous Company"
                      type="text"
                      value={staffList.company_address} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      multiline
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="company_contact"
                      name="company_contact"
                      label="Contact No."
                      type="number"
                      value={staffList.company_contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="city">Position *</InputLabel>
                    <Select
                      value={staffList.position}
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
               
               {
                        positions.map(ele =>{
                          return(
                          <MenuItem value={ele.id}>{ele.position}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="duration"
                      name="duration"
                      label="Duration"
                      type="text"
                      value={staffList.duration} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="last_name">Upload Resume</InputLabel>
                    <TextField
                      margin="dense"
                      id="resume"
                      name="resume"
                      label=""
                      type="file"
                      value={staffList.resume} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="last_name">Upload Cover Letter</InputLabel>
                    <TextField
                      margin="dense"
                      id="cover"
                      name="cover"
                      label=""
                      type="file"
                      value={staffList.cover} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="last_name">Upload Employement Docs</InputLabel>
                    <TextField
                      margin="dense"
                      id="employment_doc"
                      name="employment_doc"
                      label=""
                      type="file"
                      value={staffList.employment_doc} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
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
                    <InputLabel htmlFor="last_name">User Id</InputLabel>
                    <TextField
                      margin="dense"
                      id="user_id"
                      name="user_id"
                      label=""
                      type="text"
                      value={staffList.user_id} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="last_name">Password</InputLabel>
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label=""
                      type="text"
                      value={staffList.password} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      // onFocus={handlePasswordBlurChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="city">Assign Role</InputLabel>
                    <Select
                      value={staffList.assign_role}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'assign_role',
                        id: 'assign_role',
                        label:'assign_role'
                      }}
                      
                      fullWidth
                      label="assign_role"
                      required
                    >
               
                      <MenuItem value={1}>CSR</MenuItem>
                      <MenuItem value={2}>Finance</MenuItem>
                      <MenuItem value={3}>Delivery</MenuItem>
                      <MenuItem value={4}>HR</MenuItem>


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
              </ExpansionPanelDetails>
            </ExpansionPanel>
              
          </div>
        </from>
      </Dialog>
    </div>
  );
}
