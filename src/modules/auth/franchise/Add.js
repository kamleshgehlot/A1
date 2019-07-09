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
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(15),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    flexGrow: 1,
    padding: theme.spacing(2),
    // padding: theme.spacing(3, 2),
    textAlign: 'left',
    backgroundColor: '#E5E9EA',
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
  addButton:{
    backgroundColor:'#CBDF90',
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  margin: {
    margin: theme.spacing(1),
  },
  deleteBtn: {
    margin: theme.spacing(1),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add({ open, handleClose, handleSnackbarClick, setFranchiseList }) {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [directorList, setDirectorList] =useState([]);

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

  // function IDGenerator() {
  //   this.length = 4;
  //   this.timestamp = +new Date;
    
  //   var _getRandomInt = function( min, max ) {
  //   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  //   }
  // }


    
  
  const addFranchise = async () => {

    const response = await UserAPI.add({
      // cancelToken: this.isTokenSource.token,
      
      id: '',
      city: inputs.city,
      suburb: inputs.suburb,
      franchise_name: inputs.franchise_name,

      city_code: inputs.city,
      abn: "1234",

      company_name: inputs.company_name,
      nbzn: inputs.nbzn,
      company_location: inputs.company_location,
      // director: inputs.director,
      // email: inputs.email,
      // contact: inputs.contact,
      // alt_contact: inputs.alt_contact,
      directorList: directorList,
      website: inputs.website,

      accountant_name: inputs.accountant_name,
      accountant_email: inputs.accountant_email,
      accountant_contact: inputs.accountant_contact,

      user_name : inputs.director,
      // uid: inputs.uid,
      // password: inputs.password,
      designation: "2",
      role_id: "2",
      state:1,
    });

    handleSnackbarClick(true);
    setFranchiseList(response.userList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = 'password address is required';
    } else if (values.password.length < 8) {
      errors.password = "Your password must be at least 8 characters";
    } else if (values.password.search(/[a-z]/i) < 0) {
        errors.password = "Your password must contain at least one letter.";
    } else if (values.password.search(/[0-9]/) < 0) {
        errors.password = "Your password must contain at least one digit.";
    }

    if (!values.city) {
      errors.city = 'City is required';
    } 

    if (!values.suburb) {
      errors.suburb = 'suburb is required';
    } 

    return errors;
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addFranchise,
    validate
  );

  function handleDirectorList(){
    directorList.push({
      'director': inputs.director,
      'email' : inputs.email,
      'contact': inputs.contact,
      'alt_contact': inputs.alt_contact,
      'uid' : inputs.uid,
      'password': inputs.password
    });
     
    inputs.director = '';
    inputs.email = '';
    inputs.contact = '';
    inputs.alt_contact = '';
    inputs.uid = '';
    inputs.password = '';

    // console.log(directorList);
  }

// console.log(directorList);

  // function handleRemoveDirector(index){
  //   directorList.splice(index, 1);
  //   // console.log(directorList);
  // }

  function handleNameBlurChange(e) {
    setInput('uid', generate(inputs.director, inputs.city));
  }

  function generate(director, city) {
    const ts = new Date().getTime().toString();
    const parts = ts.split( "" ).reverse();
    let id = "";
    
    for( let i = 0; i < 4; ++i ) {
    let index = Math.floor( Math.random() * (5) );
    id += parts[index];	 
    }
    
    return director.substring(0, 4).toLowerCase() + '_' + city.substring(0,4).toLowerCase() + '_' + id;
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
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add Franchise
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
                <Grid item xs={12} sm={12}>
                    {/* <InputLabel htmlFor="franchaise_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="franchise_name"
                      name="franchise_name"
                      label="Franchise Name"
                      value={inputs.franchise_name}
                      onChange={handleInputChange}
                      // onBlur={handleNameBlurChange}
                      fullWidth
                      required
                      // placeholder="Franchise Name"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="city">Select City *</InputLabel>
                    <Select
                      value={inputs.city}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'city',
                        id: 'city',
                        label:'Select City'
                      }}
                      fullWidth
                      label="City"
                      required
                      error={errors.city}
                      helperText={errors.city ? errors.city : ' '}
                    >
                      {cityList.length > 0 &&
                        cityList.map(data => {
                          return (
                            <MenuItem value={data.city}>{data.city+ ' - ' + data.city_code}</MenuItem>
                          );
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
                        label: 'Suburb'
                      }}
                      fullWidth
                      label="Suburb"
                      required
                      error={errors.suburb}
                      helperText={errors.suburb ? errors.suburb : ' '}
                    >
                       <MenuItem value={"East"}>East</MenuItem>
                      <MenuItem value={"West"}>West</MenuItem>
                      <MenuItem value={"North"}>North</MenuItem>
                      <MenuItem value={"South"}>South</MenuItem>
                      <MenuItem value={"Central"}>Central</MenuItem>
                    </Select>
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
                    {/* <InputLabel htmlFor="company_name">Company Name *</InputLabel> */}
                    <TextField
                      id="company_name"
                      name="company_name"
                      label="Company Name"
                      value={inputs.company_name}
                      fullWidth
                      margin="dense"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="nbzn">Company NBZN *</InputLabel> */}
                    <TextField
                      id="nbzn"
                      name="nbzn"
                      label="Company's NBZN"
                      value={inputs.nbzn}
                      fullWidth
                      margin="dense"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {/* <InputLabel htmlFor="company_location">Company Location *</InputLabel> */}
                    <TextField
                      id="company_location"
                      name="company_location"
                      label="Comapny Location"
                      value={inputs.company_location}
                      margin="dense"
                      required
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Paper className={classes.paper}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="director">Director Name *</InputLabel> */}
                    <TextField
                      id="director"
                      name="director"
                      label="Director Name"
                      value={inputs.director}
                      fullWidth
                      type="text"
                      margin="dense"
                      required
                      onBlur={handleNameBlurChange}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="email">Email Address *</InputLabel> */}
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      value={inputs.email}
                      margin="dense"
                      required
                      type="email"
                      fullWidth
                      onChange={handleInputChange}
                      error={errors.email}
                      helperText={errors.email ? errors.email : ' '}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="contact">Contact # *</InputLabel> */}
                    <TextField
                      id="contact"
                      name="contact"
                      label="Contact #"
                      value={inputs.contact}
                      margin="dense"
                      required
                      fullWidth
                      onChange={handleInputChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="alt_contact">Alternative #</InputLabel> */}
                    <TextField
                      id="alt_contact"
                      name="alt_contact"
                      label="Alternative Contact"
                      value={inputs.alt_contact}
                      margin="dense"
                      fullWidth
                      onChange={handleInputChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="franchaise_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="uid"
                      name="uid"
                      label="User Id"
                      type="text"
                      value={inputs.uid} 
                      // onChange={handleInputChange}
                      // onBlur={handlePasswordBlurChange}
                      fullWidth
                      disabled
                      required
                    />
                    
                  </Grid>
                  <Grid item xs={6} sm={5}>
                    {/* <InputLabel htmlFor="password">Password *</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      // onChange={handleInputChange}
                      onFocus={handlePasswordBlurChange}
                      value={inputs.password} 
                      required
                      fullWidth
                      error={errors.password}
                      helperText={errors.password ? errors.password : ' '}
                      // disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={1}>
                  <Fab size="small" color="secondary" aria-label="Add" onClick={handleDirectorList} className={classes.margin}>
                    <AddIcon />
                  </Fab>
                  </Grid>
                  </Grid>
                  <Table >
                    <TableHead>
                      
                      {
                        (directorList || []).map((list, index) =>{
                          return(
                            <TableRow>
                              <StyledTableCell>{index+1}</StyledTableCell>
                              <StyledTableCell>{list.director}</StyledTableCell>
                              <StyledTableCell>{list.email}</StyledTableCell>
                              <StyledTableCell>{list.contact}</StyledTableCell>
                              <StyledTableCell>{list.alt_contact}</StyledTableCell>
                              <StyledTableCell>{list.uid}</StyledTableCell>
                              <StyledTableCell>{list.password}</StyledTableCell>
                              {/* <StyledTableCell>
                              <IconButton className={classes.deleteBtn} aria-label="Delete" onClick={(event) => { handleRemoveDirector(index); }}>
                                <DeleteIcon />
                              </IconButton>
                              </StyledTableCell> */}
                            </TableRow>
                          )
                        })
                      }

                    </TableHead>
                    </Table>
                  </Paper>
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
                    {/* <InputLabel htmlFor="accountant_name">Name *</InputLabel> */}
                    <TextField
                      id="accountant_name"
                      name="accountant_name"
                      label="Name"
                      value={inputs.accountant_name}
                      // placeholder="Accountant name"
                      fullWidth
                      margin="dense"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="accountant_email">Email Address*</InputLabel> */}
                    <TextField
                      id="accountant_email"
                      name="accountant_email"
                      label="Email Address"
                      value={inputs.accountant_email}
                      // placeholder="Email"
                      fullWidth
                      margin="dense"
                      required
                      onChange={handleInputChange}
                      type="email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="accountant_contact">Contact #*</InputLabel> */}
                    <TextField
                      id="accountant_contact"
                      name="accountant_contact"
                      label="Contact #"
                      value={inputs.accountant_contact}
                      // placeholder="Contact"
                      fullWidth
                      type="number"
                      margin="dense"
                      required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="website">Website</InputLabel> */}
                    <TextField
                      id="website"
                      name="website"
                      label="Website"
                      value={inputs.website}
                      // placeholder="Accountant name"
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
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
