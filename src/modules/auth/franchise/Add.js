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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// API CALL
import UserAPI from '../../../api/User';

import LocationAPI from '../../../api/Location';

import useSignUpForm from './CustomHooks';

const RESET_VALUES = {
  city: '',

  suburb: '',
  franchise_name: '',
  uid: '',

  city_code: '',
  abn: '',

  company_name: '',
  nbzn: '',
  company_location: '',
  director: '',
  email: '',
  contact: '',
  alt_contact: '',
  website: '',

  accountant_name: '',
  accountant_email: '',
  accountant_contact: '',

  uid: '',
  password: '',
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
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
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add({ open, handleClose, handleSnackbarClick, franchiseData, setFranchiseListFn }) {
  const classes = useStyles();

  const [cityList, setCityList] = useState([]);
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LocationResult = await LocationAPI.list();
        setCityList(LocationResult.cityList);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    franchiseData !== undefined ? handleReset(franchiseData) : null;
  }, [franchiseData]);

  const signup = async () => {
    const response = await UserAPI.add({
      // cancelToken: this.isTokenSource.token,

      city: inputs.city,
      suburb: inputs.suburb,
      franchise_name: inputs.franchise_name,

      city_code: inputs.city,
      abn: "1234",

      company_name: inputs.company_name,
      nbzn: inputs.nbzn,
      company_location: inputs.company_location,
      director: inputs.director,
      email: inputs.email,
      contact: inputs.contact,
      alt_contact: inputs.alt_contact,
      website: inputs.website,

      accountant_name: inputs.accountant_name,
      accountant_email: inputs.accountant_email,
      accountant_contact: inputs.accountant_contact,

      uid: inputs.uid,
      password: inputs.password,
      role_id: 2,
    });

    handleSnackbarClick(true);
    setFranchiseListFn(response.userList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    signup,
  );

  function handleNameBlurChange(e) {
    setInput('uid', inputs.franchise_name.substring(0, 4).toLowerCase() + '_' + inputs.city.substring(0, 4).toLowerCase());
  }

  function handlePasswordBlurChange() {
    setInput('password', GeneratePassword());
  }

  function GeneratePassword() {
    return Math.random().toString(36).slice(-8);
  }

  return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <from>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Franchise Creation Panel
              </Typography>
              <Button onClick={handleSubmit} color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            {/* Franchise Details */}
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
                <Typography className={classes.heading}>Franchise Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="city">Select City *</InputLabel>
                    <Select
                      value={inputs.city}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'city',
                        id: 'city',
                      }}
                      fullWidth
                      label="City"
                      required
                    >
                      {cityList.length > 0 &&
                        cityList.map(data => {
                          return (
                            <MenuItem value={data.city}>{data.city}</MenuItem>
                            // console.log('from : ', data.city)
                          );
                          // setCityCode(data.city_code);
                        })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="suburb_selection">Suburb *</InputLabel>
                    <Select
                      value={inputs.suburb}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'suburb',
                        id: 'suburb_selection',
                      }}
                      fullWidth
                      label="Suburb"
                      required
                    >
                      <MenuItem value={1}>suburb1</MenuItem>
                      <MenuItem value={2}>suburb2</MenuItem>
                      <MenuItem value={3}>suburb3</MenuItem>

                      {/* {cityList.length > 0 && cityList.map(data => {
                        return(
                        // <MenuItem value={data.id}>{data.city}</MenuItem>
                          console.log("from : ",data.city)
                        )
                      })
                    } */}
                    </Select>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <InputLabel htmlFor="franchaise_name">Franchise Name *</InputLabel>
                    <TextField
                      id="franchise_name"
                      name="franchise_name"
                      value={inputs.franchise_name}
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="franchaise_name">Unique Id</InputLabel>
                    <TextField
                      margin="dense"
                      id="uid"
                      name="uid"
                      label="User Id"
                      type="text"
                      value={inputs.uid} 
                      onChange={handleInputChange}
                      required
                      onBlur={handlePasswordBlurChange}
                      fullWidth
                    />
                    
                    {/* <TextField
                      disabled
                      id="uid"
                      name="uid"
                      className={classes.textField}
                      margin="normal"
                      onChange={handleInputChange}
                    />
                    <TextField
                      disabled
                      id="uid"
                      name="uid"
                      className={classes.textField}
                      margin="normal"
                      onChange={handleInputChange}
                    />
                    <TextField
                      disabled
                      id="uid"
                      name="uid"
                      className={classes.textField}
                      margin="normal"
                      onChange={handleInputChange}
                    /> */}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <InputLabel htmlFor="password">Password *</InputLabel>
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      value={inputs.password}
                      type="text"
                      value={inputs.password} required
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* Company Details */}

            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Company Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="company_name">Company Name *</InputLabel>
                    <TextField
                      id="company_name"
                      name="company_name"
                      value={inputs.company_name}
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="nbzn">Company NBZN *</InputLabel>
                    <TextField
                      id="nbzn"
                      name="nbzn"
                      value={inputs.nbzn}
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="company_location">Company Location *</InputLabel>
                    <TextField
                      id="company_location"
                      name="company_location"
                      value={inputs.company_location}
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="director">Director Name *</InputLabel>
                    <TextField
                      id="director"
                      name="director"
                      value={inputs.director}
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="email">Email Address *</InputLabel>
                    <TextField
                      id="email"
                      name="email"
                      value={inputs.email}
                      margin="normal"
                      required
                      type="email"
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="contact">Contact # *</InputLabel>
                    <TextField
                      id="contact"
                      name="contact"
                      value={inputs.contact}
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="alt_contact">Alternative #</InputLabel>
                    <TextField
                      id="alt_contact"
                      name="alt_contact"
                      value={inputs.alt_contact}
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleInputChange}
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
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Accountant Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="accountant_name">Name *</InputLabel>
                    <TextField
                      id="accountant_name"
                      name="accountant_name"
                      value={inputs.accountant_name}
                      placeholder="Accountant name"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="accountant_email">Email Address*</InputLabel>
                    <TextField
                      id="accountant_email"
                      name="accountant_email"
                      value={inputs.accountant_email}
                      placeholder="Email"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="accountant_contact">Contact #*</InputLabel>
                    <TextField
                      id="accountant_contact"
                      name="accountant_contact"
                      value={inputs.accountant_contact}
                      placeholder="Contact"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="website">Website</InputLabel>
                    <TextField
                      id="website"
                      name="website"
                      value={inputs.website}
                      placeholder="Accountant name"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
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
