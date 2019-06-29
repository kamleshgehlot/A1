import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// API CALL
import UserAPI from '../../../api/User';

import LocationAPI from '../../../api/Location';

import useSignUpForm from './CustomHooks';

import { store, useStore } from '../../../store/hookStore';

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

  user_id: '',
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

export default function Add({ open, handleClose, handleSnackbarClick }) {
  const [franchiseList, setFranchiseList] = useStore();
  const [cityList, setCityList] = useStore([]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LocationResult = await LocationAPI.list();
        console.log('Fetched Data', LocationResult.cityList);
        setCityList(LocationResult.cityList);
        console.log('Fetched Data', cityList);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, [cityList, setCityList]);

  // const signup = async () => {
  //   const response = await UserAPI.add({
  //     // cancelToken: this.isTokenSource.token,
  //     name: inputs.name,
  //     location: inputs.location,
  //     contact: inputs.contact,
  //     abn: inputs.abn,
  //     user_name: inputs.user_name,
  //     user_id: inputs.user_id,
  //     password: inputs.password,
  //     name: inputs.name,
  //     role_id: 2,
  //   });

  // Shahrukh code start here

  const signup = async () => {
    const response = await UserAPI.add({
      // cancelToken: this.isTokenSource.token,

      city: inputs.city,
      suburb: inputs.suburb,
      franchise_name: inputs.franchise_name,
      uid: inputs.uid,

      city_code: inputs.city_code,
      abn: inputs.abn,

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

      user_id: inputs.user_id,
      password: inputs.password,
      role_id: 2,
    });

    handleSnackbarClick(true);
    setFranchiseList(response.userList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    signup,
  );

  function handleNameBlurChange(e) {
    let value = inputs.name;

    if (value.split(' ').length > 1) {
      value = value.split(' ')[1].toLowerCase();
    }

    // if(value !== '') {
    //   const output = Array.from(value.toLowerCase());

    //   if(output.length > 6) {
    //     setInput('user_id', '_' + output[0] + output[2] + output[4] + output[6]);
    //   } else {
    setInput(
      'user_id',
      `${inputs.user_name.substring(0, 4)}_${value.substring(0, 4).toLowerCase()}`,
    );
    // }
    // }
  }

  console.log('data result...', cityList);
  return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <from onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Franchise Creation Panel
              </Typography>
              <Button color="inherit" type="submit">
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
                    <InputLabel htmlFor="city_selection">Select City *</InputLabel>
                    <Select
                      value={inputs.location}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'city',
                        id: 'city_selection',
                      }}
                      fullWidth
                      label="City"
                      required
                    >
                      {cityList.length > 0 &&
                        cityList.map(data => {
                          return (
                            <MenuItem value={data.id}>{data.city}</MenuItem>
                            // console.log('from : ', data.city)
                          );
                        })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="suburb_selection">Suburb *</InputLabel>
                    <Select
                      value=""
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'suburb',
                        id: 'suburb_selection',
                      }}
                      fullWidth
                      label="Suburb"
                      required
                    >
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
                      onChange={handleInputChange}
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
