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
import ConfirmationDialog from '../ConfirmationDialog.js';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LinearProgress from '@material-ui/core/LinearProgress';
import useSignUpForm from '../franchise/CustomHooks';
import validateEdit from '../../common/validation/FranchiseEditValidation';
import {useCommonStyles} from '../../common/StyleComman';
// API CALL

import UserAPI from '../../../api/User';

import LocationAPI from '../../../api/Location';

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

  user_name:'',
  uid: '',
  password: '',
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
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick,  inputValues, setFranchiseList, setFranchiseId}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [cityList, setCityList] = useState([]);
  const [expanded, setExpanded] = React.useState('panel1');
  const [franchise, setFranchise] = React.useState(inputValues);
  const [directorList, setDirectorList] =useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  
    // console.log(franchise);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // console.log("inputs--",franchise)
  // console.log("selected area--",selectedArea)
   useEffect(() => {
    const fetchData = async () => {
      try {
        const LocationResult = await LocationAPI.list();
        setCityList(LocationResult.cityList);
        // console.log('franchise-----',franchise)
        const result = await LocationAPI.arealist({
          city_name : inputValues.city,
          city_code : inputValues.city_code,
          suburb : inputValues.suburb,
        });
        setSelectedArea(result.selectedArea);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchData();
  }, []);

  const handleStateChange = event => {
    const { name, value } = event.target
    console.log(name, value); 
    name =='state' && value =='4' ? setConfirmation(true) : 
    setInput(name,value)
  }

  function handleConfirmationDialog (response){
    setInput('state',response)
    // console.log(franchise);
    setConfirmation(false);
  }
  // function confirmDialogResponse(response){

  // }

  // const setInput = (name, value) => {
  //   setFranchise({ ...franchise, [name]: value });
  // };
  
  const editFranchise = async () => {
    setpLoading(true);
    setSavebtn(false);
    const response = await UserAPI.add({
      // cancelToken: this.isTokenSource.token,
      
      id: inputs.franchise_id,
      city: inputs.city,
      suburb: inputs.suburb,
      franchise_name: inputs.franchise_name,

      city_code: inputs.city,
      abn: "1234",

      company_name: inputs.company_name,
      nbzn: inputs.nbzn,
      company_location: inputs.company_location,

      director_id: inputs.director_id,
      director: inputs.director,
      email: inputs.email,
      contact: inputs.contact,
      alt_contact: inputs.alt_contact,
      website: inputs.website,

      accountant_id: inputs.accountant_id,
      accountant_name: inputs.accountant_name,
      accountant_email: inputs.accountant_email,
      accountant_contact: inputs.accountant_contact,

      user_name : inputs.director,
      user_id: inputs.user_id,
      password: inputs.password,
      state: inputs.state,

      designation: "2",
      role_id: "2",
      company_id: inputs.company_id,
    });

    let franchiseIdTemp = [];

    response.userList.map(data => {
      const found = franchiseIdTemp.some(el => el.franchise_id === data.franchise_id);

      if(!found) {
        franchiseIdTemp.push({
          director_id: data.director_id,
          franchise_id: data.franchise_id,
          franchise_name: data.franchise_name,
          company_name: data.company_name,
          suburb: data.suburb,
          city: data.city,
          status: data.state
        });
      }
    });

    setFranchiseId(franchiseIdTemp);
    
    handleSnackbarClick(true,'Franchise Updated Successfully');
    setFranchiseList(response.userList);
    // handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
    handleEditClose(false);
  };

  function handlePasswordBlurChange() {
    setInput('password', GeneratePassword());
  }

  function GeneratePassword() {
    return Math.random().toString(36).slice(-8);
  }

  function handleEmailVerification(event){
    // console.log(event.target.value);
    const email = event.target.value;
    // console.log('email--',email)
    // const validEmail =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (!validEmail.test(email)) {
    //   errors.demail = 'Email Address is invalid';
    // }
    // else{
      
    //   errors.demail = '';
    // }
    // console.log('email--',errors.demail)

    const checkEmail = async () => {
      const response = await UserAPI.verifyEmail({email : email});
      
      if(response.isVerified!=''){
      // SetChkEmail(response.isVerified[0].email);
      errors.demail = 'Email already registered';
      // alert('Email already registered');
      }
    }
    checkEmail();
  }

  
  const { inputs, handleNumberInput, handleInputChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    editFranchise,
    validateEdit
  );  
  useEffect(() => {
    setInputsAll(inputValues);
  }, []);
  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Edit Franchise
              </Typography>
              <IconButton size="small" onClick={handleEditClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            {/* Franchise Details */}
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
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
                <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="franchaise_name">Franchise Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="franchise_name"
                      name="franchise_name"
                      // label="Franchise Name"
                      // margin="dense"
                      type="text"
                      value={inputs.franchise_name}
                      onChange={handleInputChange}
                      error={errors.franchise_name}
                      helperText={errors.franchise_name}
                      // onBlur={handleNameBlurChange}/
                      fullWidth
                      // required
                      // disabled                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="status">Status *</InputLabel>
                    <Select
                      value={inputs.state}
                      onChange={handleStateChange}
                      inputProps={{
                        name: 'state',
                        id: 'state',
                      }}
                      margin="normal"
                      fullWidth
                      // label="Status"
                      // required
                       className={classes.textsize}
                    >
                    {inputs.state=== 1 ? <MenuItem className={classes.textsize} value={1}>Open</MenuItem> : ''}
                      <MenuItem className={classes.textsize} value={2}>Active</MenuItem>
                      <MenuItem className={classes.textsize} value={3}>Inactive</MenuItem>
                      <MenuItem className={classes.textsize} value={4}>Close</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="city">Select City *</InputLabel>
                    <Select
                      value={inputs.city}
                      onChange={handleInputChange} className={classes.textsize}
                      inputProps={{
                        name: 'city',
                        id: 'city',
                      }}
                      fullWidth
                      error={errors.city}
                      helperText={errors.city ? errors.city : ' '}
                      // label="City"
                      // required
                      disabled
                    >
                      {cityList.length > 0 &&
                        cityList.map(data => {
                          return (
                            <MenuItem className={classes.textsize} value={data.city}>{data.city+ ' - ' + data.city_code}</MenuItem>
                          );
                        })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="suburb_selection">Area *</InputLabel>
                    <Select
                      value={inputs.suburb}
                      onChange={handleInputChange} className={classes.textsize}
                      name= 'suburb'
                      id= 'suburb_selection'
                      fullWidth
                      // label="Area"
                      // required
                      error={errors.suburb}
                      helperText={errors.suburb ? errors.suburb : ' '}
                    >
                    {(selectedArea.length>0 ? selectedArea : []).map((area, index) => {
                        return(
                          <MenuItem className={classes.textsize} value={area.area_name}>{area.area_name}</MenuItem>
                        )
                      })
                    }

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
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="company_name">Company Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="company_name"
                      name="company_name"
                      // label="Company Name"
                      value={inputs.company_name}
                      error={errors.company_name}
                      helperText={errors.company_name}
                      fullWidth
                      margin="dense"
                      // required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="nbzn">Company NZBN *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="nbzn"
                      name="nbzn"
                      // label="Company's NBZN"
                      value={inputs.nbzn}
                      error={errors.nbzn}
                      helperText={errors.nbzn}
                      fullWidth
                      margin="dense"
                      // required
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,13)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="company_location">Company Location *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="company_location"
                      name="company_location"
                      // label="Company Location"
                      value={inputs.company_location}
                      error={errors.company_location}
                      helperText={errors.company_location}
                      margin="dense"
                      // required
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {/* <Paper className={classes.paper}> */}
                  {/* <Grid container spacing={3}> */}
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="director">Director Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="director"
                      name="director"
                      // label="Director Name"
                      value={inputs.director}
                      error={errors.director}
                      helperText={errors.director}
                      fullWidth
                      margin="dense"
                      // required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="email">Email Address *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="email"
                      name="email"
                      // label="Email"
                      value={inputs.email}
                      error={errors.email}
                      helperText={errors.email}
                      margin="dense"
                      // required
                      type="email"
                      fullWidth
                      // disabled
                      onBlur={handleEmailVerification}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="contact">Contact # *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="contact"
                      name="contact"
                      // label="Contact #"
                      value={inputs.contact}
                      error={errors.contact}
                      helperText={errors.contact}
                      margin="dense"
                      // required
                      fullWidth
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="alt_contact">Alternative #</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="alt_contact"
                      name="alt_contact"
                      // label="Alternative Contact"
                      value={inputs.alt_contact}
                      margin="dense"
                      // required
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    type="text"                      
                    onChange={handleNumberInput}
                    />
                  </Grid>
                   
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="franchaise_name">Unique Id</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="user_id"
                      name="user_id"
                      // label="User Id"
                      margin="dense"
                      // required
                      type="text"
                      value={inputs.user_id} 
                      // onChange={handleInputChange}
                      // onBlur={handlePasswordBlurChange}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="password">Password</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="password"
                      name="password"
                      // label="Password"
                      // onChange={handleInputChange}
                      // onFocus={handlePasswordBlurChange}
                      value={inputs.password} 
                      // required
                      fullWidth
                      // error={errors.password}
                      // helperText={errors.password ? errors.password : ' '}
                      disabled
                    />
                  </Grid>
                  {/* {console.log('franchise',franchise)} */}
                  {/* <Grid item xs={3} sm={1}>
                  <Fab size="small" color="secondary" aria-label="Add"  className={classes.margin}>
                    <AddIcon />
                  </Fab>
                  </Grid> */}
                  </Grid>
                  {/* <Table >
                    <TableHead>
                      
                      {
                        (directorList || []).map((list, index) =>{
                          return(
                            <TableRow>
                              <StyledTableCell>{index}</StyledTableCell>
                              <StyledTableCell>{list.director}</StyledTableCell>
                              <StyledTableCell>{list.email}</StyledTableCell>
                              <StyledTableCell>{list.contact}</StyledTableCell>
                              <StyledTableCell>{list.alt_contact}</StyledTableCell>
                              <StyledTableCell>{list.uid}</StyledTableCell>
                              <StyledTableCell>{list.password}</StyledTableCell>
                              <StyledTableCell>
                              <IconButton className={classes.deleteBtn} aria-label="Delete" onClick={(event) => { handleRemoveDirector(index); }}>
                                <DeleteIcon />
                              </IconButton>
                              </StyledTableCell>
                            </TableRow>
                          )
                        })
                      }

                    </TableHead>
                    </Table> */}
                  {/* </Paper> */}
                  
                {/* </Grid> */}
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
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="accountant_name">Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_name"
                      name="accountant_name"
                      // label="Name"
                      value={inputs.accountant_name}
                      error={errors.accountant_name}
                      helperText={errors.accountant_name}
                      // placeholder="Accountant name"
                      fullWidth
                      margin="dense"
                      // required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="accountant_email">Email Address*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_email"
                      name="accountant_email"
                      // label="Email Address"
                      value={inputs.accountant_email}
                      error={errors.accountant_email}
                      helperText={errors.accountant_email}
                      // placeholder="Email"
                      fullWidth
                      margin="dense"
                      // required
                      // disabled
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="accountant_contact">Contact #*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_contact"
                      name="accountant_contact"
                      // label="Contact #"
                      value={inputs.accountant_contact}
                      error={errors.accountant_contact}
                      helperText={errors.accountant_contact}                                            
                      fullWidth
                      margin="dense"                      
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="website">Website</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="website"
                      name="website"
                      // label="Website"
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
            
            <Grid item xs={12} sm={12}>
            {savebtn? <Button variant="contained"  onClick={handleSubmit} color="primary" className={classes.button} >
                    Update
                  </Button> : <Button  variant="contained"  onClick={handleSubmit} color="primary" className={classes.button}  disabled>
                    Update
                  </Button>} 
                  <Button  variant="contained"   onClick={handleEditClose} color="primary" className={classes.button} >
                    Close
                  </Button>
                  </Grid>
          </div>
        </form>
      </Dialog>
      {/* {console.log(confirmation)} */}
      <ConfirmationDialog open = {confirmation} lastValue={4} handleConfirmationClose={handleConfirmationDialog}  currentState={inputs.state} title={"Close to Frachise ?"} content={"Do you really want to close the franchise ?"} />
    </div>
  );
}
