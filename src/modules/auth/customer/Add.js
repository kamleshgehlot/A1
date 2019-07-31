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
import LinearProgress from '@material-ui/core/LinearProgress';


import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Customer from '../../../api/franchise/Customer';
import UserAPI from '../../../api/User';
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

  state: '',

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


export default function Add({ open, handleClose, handleSnackbarClick, setCustomerList, enquiryData, setCustomer}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [idTypeList, setIdTypeList] = useState([]);
  const [otherIdType, setOtherIdType] = useState(true);
  const [chkEmail, SetChkEmail] = useState();
  const [otherIdTypeValue, setOtherIdTypeValue] = useState();
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleEmailVerification(event){
    // console.log(event.target.value);
    const email = event.target.value;

    const checkEmail = async () => {
      const response = await UserAPI.verifyEmail({email : email});
      
      if(response.isVerified!=''){
      SetChkEmail(response.isVerified[0].email);
      alert('Email already registred');
      }
    }
    checkEmail();
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const idType = await Customer.idtypelist();
        setIdTypeList(idType.idTypeList);

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();

    enquiryData!= '' ? inputs['customer_name'] = enquiryData.customer_name : ''
    enquiryData!= '' ? inputs['mobile'] = enquiryData.contact : ''
    
  }, []);


   function handleIdType(event){
    if(event.target.value===0){
      setOtherIdType(false)
      
    }else{
      setOtherIdType(true)
      setOtherIdTypeValue('');
    }
    setInput('id_type',event.target.value);
    }

    function handleOtherIdType(event){
      setOtherIdTypeValue(event.target.value)
    }
  

  const addCustomer = async () => {
    if(inputs.email === chkEmail || inputs.employer_email===chkEmail){
      alert('Email already registered')
    }else{

    setpLoading(true);
    setSavebtn(false);
    const data = {
      customer_name : inputs.customer_name,
      address : inputs.address,
      city : inputs.city,
      postcode : inputs.postcode,
      telephone : inputs.telephone,  
      mobile : inputs.mobile,
      email : inputs.email,
      gender : inputs.gender,
      is_working : inputs.is_working,
      dob : inputs.dob,
      id_type :  inputs.id_type,
      id_number:  inputs.id_number,
      expiry_date :  inputs.expiry_date,
      is_adult : inputs.is_adult,
      id_proof :  inputs.id_proof,

      alt_c1_name: inputs.alt_c1_name,
      alt_c1_address: inputs.alt_c1_address,
      alt_c1_contact: inputs.alt_c1_contact,
      alt_c1_relation: inputs.alt_c1_relation,
      alt_c2_name:  inputs.alt_c2_name,
      alt_c2_address:  inputs.alt_c2_address,
      alt_c2_contact: inputs.alt_c2_contact,
      alt_c2_relation: inputs.alt_c2_relation,

      employer_name: inputs.employer_name,
      employer_address: inputs.employer_address,
      employer_telephone: inputs.employer_telephone,
      employer_email: inputs.employer_email,
      employer_tenure: inputs.employer_tenure,

      is_active:1,
      state: 1,
      
      other_id_type: otherIdTypeValue,
    }

    let formData = new FormData();

    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('id_proof').files.length; x++) {
      formData.append('avatar', document.getElementById('id_proof').files[x])
    }
    // console.log("formadata", formData);
    const response = await Customer.register({ formData: formData });
    
    
    handleSnackbarClick(true);
    setCustomerList(response.customerList);
    setCustomer(data);
    handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
    handleClose(false);
    }
  };

  function validate(values) {
    let errors = {};
    return errors;
  };

 const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    addCustomer,
    validate
  );
  // {
  //   inputs.telephone ==='' ? setIsMobileMandatory(true) : setIsMobileMandatory(false)
  //   inputs.mobile ==='' ? setIsTelephoneMandatory(true) : setIsTelephoneMandatory(false)
  // }

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
                Add Customer
              </Typography>
              {savebtn? <Button color="inherit" type="submit">
                save
              </Button>:<Button color="inherit" type="submit" disabled>
                save
              </Button>}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            
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
                      value={inputs.customer_name}
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
                      value={inputs.address} 
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
                      value={inputs.city} 
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
                      value={inputs.postcode}
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
                      value={inputs.telephone} 
                      onChange={handleInputChange}
                      required = {inputs.mobile==='' ? true : false}
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
                      value={inputs.mobile} 
                      onChange={handleInputChange}
                      required = {inputs.telephone===''?true : false}
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
                      onBlur={handleEmailVerification}
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
                      value={inputs.gender}
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
                    <RadioGroup 
                      aria-label="is_working" 
                      name="is_working" 
                      className={classes.group}
                      value={parseInt(inputs.is_working)} 
                      onChange={handleInputChange} 
                      row
                    >
                      <FormControlLabel value={1} control={<Radio />} label="Yes" labelPlacement="start" />
                      <FormControlLabel value={0} control={<Radio />} label="No" labelPlacement="start" />
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
                      value={inputs.dob} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel htmlFor="id_type">ID Proof</InputLabel>
                    <Select
                        margin="dense"
                        name="id_type"
                        //  onChange={handleInputChange}
                        onChange = {handleIdType}
                         value={parseInt(inputs.id_type)}
                         name = 'id_type'
                         id = 'id_type'
                         className={classes.margin}
                         fullWidth
                         label="Select Id Proof"
                         required
                      >
                        {
                          
                          ( idTypeList.length > 0 ? idTypeList : []).map((ele,index) => {
                            return(
                                <MenuItem value={ele.id}>{ele.name}</MenuItem>    
                            )
                          })
                        }

                          <MenuItem value={0}>{'Other'}</MenuItem>    
                    </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                      margin="dense"
                      id="otherIdTypeValue"
                      name="otherIdTypeValue"
                      label="Enter type of ID Proof"
                      type="text"
                      value={otherIdTypeValue} 
                      onChange={handleOtherIdType}
                      required
                      disabled = {otherIdType}
                      fullWidth
                    />
                    </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="id_number"
                      name="id_number"
                      label="ID#"
                      type="text"
                      value={inputs.id_number} 
                      onChange={handleInputChange}
                      // required
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
                      value={inputs.expiry_date} 
                      onChange={handleInputChange}
                      // required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="is_adult">Over 18 Years?</InputLabel>
                    <RadioGroup 
                      aria-label="is_adult" 
                      name="is_adult" 
                      className={classes.group}
                      value={parseInt(inputs.is_adult)} 
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Yes"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="No"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="id_proof">Upload Copy of Selected ID*</InputLabel>
                    <TextField
                      margin="dense"
                      id="id_proof"
                      name="id_proof"
                      label=""
                      type="file"
                      value={inputs.id_proof} 
                      onChange={handleInputChange}
                      // required
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
                      value={inputs.alt_c1_name} 
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
                      value={inputs.alt_c1_address} 
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
                      value={inputs.alt_c1_contact} 
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
                      value={inputs.alt_c1_relation} 
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
                      value={inputs.alt_c2_name} 
                      onChange={handleInputChange}
                      // required
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
                      value={inputs.alt_c2_address} 
                      onChange={handleInputChange}
                      // required
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
                      value={inputs.alt_c2_contact} 
                      onChange={handleInputChange}
                      // required
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
                      value={inputs.alt_c2_relation} 
                      onChange={handleInputChange}
                      // required
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
                      value={inputs.employer_name} 
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
                      value={inputs.employer_address} 
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
                      value={inputs.employer_telephone} 
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
                      value={inputs.employer_email} 
                      onChange={handleInputChange}
                      onBlur={handleEmailVerification}
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
                      value={inputs.employer_tenure} 
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
