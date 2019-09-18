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
import {useCommonStyles} from '../../common/StyleComman'; 
import validate from '../../common/validation/CustomerRuleValidation';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { API_URL } from '../../../api/Constants';

// API CALL
import Customer from '../../../api/franchise/Customer';
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
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  group: {
    fontSize: theme.typography.pxToRem(12),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Edit({ open, handleEditClose, handleSnackbarClick, inputValues, setCustomerList}) {
  
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [customerList, setDataCustomerList] = React.useState(inputValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [idTypeList, setIdTypeList] = useState([]);
  const [otherIdType, setOtherIdType] = useState(inputValues.id_type ===0 ? false : true);
  const [otherIdTypeValue, setOtherIdTypeValue] = useState(inputValues.other_id_type);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);


  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
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
    
  }, []);


  const editCustomer = async (e) => {
      setpLoading(true);
      setSavebtn(false);
      const data = {
      id: inputs.id,
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
      is_adult : 1,
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

      is_active: inputs.is_active,
      state : inputs.state,
      // updated_by : userId.userId,

      other_id_type: otherIdTypeValue,
      
    }

    let formData = new FormData();
    
    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('id_proof').files.length; x++) {
      formData.append('avatar', document.getElementById('id_proof').files[x])
    }
    // console.log("formadata", formData);
    const response = await Customer.register({ formData: formData });
    
    // handleSnackbarClick(true);
    setCustomerList(response.customerList);
    setpLoading(false);
    setSavebtn(true);
    handleEditClose(false);
  };


// const handleInputChange = event => {
//   const { name, value } = event.target
//   setDataCustomerList({ ...customerList, [name]: value })
// }

function handleIdType(event){
  if(event.target.value===0){
    setOtherIdType(false)
  }else{
    setOtherIdType(true)
    setOtherIdTypeValue('');
  }
  setDataCustomerList({...customerList,  id_type: event.target.value});
  }
  
  function handleDate(date){
    let date1 = new Date(date);
    let yy = date1.getFullYear();
    let mm = date1.getMonth() + 1 ;
    let dd = date1.getDate();
    if(mm< 10){ mm = '0' + mm.toString()}
    if(dd< 10){ dd = '0' + dd.toString()}
    let fullDate = yy+ '-'+mm+'-'+dd;
    handleInputChange({target:{name: 'dob', value: fullDate}})
  }
  function handleExpiryDate(date){
    let date1 = new Date(date);
    let yy = date1.getFullYear();
    let mm = date1.getMonth() + 1 ;
    let dd = date1.getDate();
    if(mm< 10){ mm = '0' + mm.toString()}
    if(dd< 10){ dd = '0' + dd.toString()}
    let fullDate = yy+ '-'+mm+'-'+dd;
    handleInputChange({target:{name: 'expiry_date', value: fullDate}})
  }
  function handleOtherIdType(event){
    setOtherIdTypeValue(event.target.value)
  }
  const { inputs, handleInputChange, handleSubmit, handleNumberInput, handlePriceInput, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    editCustomer,
    validate
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
                Edit Customer
              </Typography>
              <IconButton size="small" onClick={handleEditClose} className={styleClass.closeIcon}> x </IconButton>

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
                <Typography className={(errors.customer_name||errors.address||errors.city||errors.postcode||errors.telephone||errors.mobile||errors.email||errors.dob||errors.id_type||errors.id_number||errors.expiry_date)?classes.errorHeading : classes.heading}>Personal Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {/* {console.log(errors.customer_name,errors.address,errors.city,errors.postcode,errors.telephone,errors.mobile,errors.email,errors.dob,errors.id_type,errors.id_number,errors.expiry_date)} */}
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="first_name">Full Name *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="customer_name"
                      name="customer_name"
                      // label="Full Name"
                      value={inputs.customer_name}
                      onChange={handleInputChange}
                      error={errors.customer_name}
                      helperText={errors.customer_name}
                      fullWidth
                      required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Address</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="address"
                      name="address"
                      // label="Address"
                      type="text"
                      value={inputs.address} 
                      onChange={handleInputChange}
                      error={errors.address}
                      helperText={errors.address}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">City</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="city"
                      name="city"
                      // label="City"
                      type="text"
                      value={inputs.city} 
                      onChange={handleInputChange}
                      error={errors.city}
                      helperText={errors.city}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="postcode">Postcode *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="postcode"
                      name="postcode"
                      // label="Postcode"
                      type="text"
                      value={inputs.postcode}
                      onChange={handleNumberInput}
                      error={errors.postcode}
                      helperText={errors.postcode}
                      required
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,6)
                    }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="telephone">Telephone *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="telephone"
                      name="telephone"
                      // label="Telephone"
                      type="text"
                      value={inputs.telephone} 
                      onChange={handleNumberInput}
                      error={errors.telephone}
                      helperText={errors.telephone}
                      required= {inputs.mobile==='' ? true : false}
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="mobile">Mobile *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="mobile"
                      name="mobile"
                      // label="Mobile"
                      type="text"
                      value={inputs.mobile} 
                      onChange={handleNumberInput}
                      required = {inputs.telephone===''?true : false}
                      error={errors.mobile}
                      helperText={errors.mobile}
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="email">Email Id *</InputLabel>
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
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={errors.gender? classes.errorHeading:classes.textsize}  htmlFor="Gender">Gender</InputLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={inputs.gender}
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel labelPlacement="start" value="female" control={<Radio color="primary" />}
                     label="Female" />
                      <FormControlLabel labelPlacement="start" value="male"  control={<Radio color="primary" />}
                     label="Male" />
                      {/* <FormControlLabel labelPlacement="start" value="transgender" 
            control={<Radio color="primary" />}.
                     label="Transgender" /> */}
                    </RadioGroup>
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={errors.is_working? classes.errorHeading:classes.textsize}  htmlFor="is_working">Are you working?</InputLabel>
                    <RadioGroup 
                      aria-label="is_working" 
                      name="is_working" 
                      className={classes.group}
                      value={parseInt(inputs.is_working)} 
                      onChange={handleInputChange} 
                      row
                    >
                      <FormControlLabel value={1} control={<Radio color="primary" />}
                     label="Yes" labelPlacement="start" />
                      <FormControlLabel value={0}   control={<Radio color="primary" />}
                     label="No" labelPlacement="start" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="dob">Date Of Birth</InputLabel>
                    {/* <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="dob"
                      name="dob"
                      // label=""
                      type="date"
                      value={inputs.dob} 
                      onChange={handleInputChange}
                      error={errors.dob}
                      helperText={errors.dob}
                      required
                      fullWidth
                    /> */}
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="dense"
                                id="dob"
                                name="dob"
                                format="dd/MM/yyyy"
                                disableFuture = {true}
                                value={inputs.dob}
                                fullWidth 
                                InputProps={{
                                  classes: {
                                    input: classes.textsize,
                                  },
                                }}
                                onChange={handleDate}
                                error={errors.dob}
                                helperText={errors.dob}                               
                              />
                            </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="id_type">ID Proof</InputLabel>
                    <Select
                        margin="dense"
                        name="id_type"
                        onChange = {handleIdType}
                        // value={parseInt(inputs.id_type)}
                        value={parseInt(inputs.id_type)}
                        name = 'id_type'
                        id = 'id_type'
                        className={classes.textsize}
                        error={errors.id_type}
                        helperText={errors.id_type}
                        fullWidth
                        label="Select Id Proof"
                        required
                      >
                        {
                          
                          ( idTypeList.length > 0 ? idTypeList : []).map((ele,index) => {
                            return(
                                <MenuItem className={classes.textsize} value={ele.id}>{ele.name}</MenuItem>    
                            )
                          })
                        }
                          {/* <MenuItem value={0}>{'Other'}</MenuItem>     */}
                          >    
                    </Select>
                    </Grid>
                   
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">ID#</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="id_number"
                      name="id_number"
                      // label="ID#"
                      type="text"
                      value={inputs.id_number} 
                      onChange={handleInputChange}
                      error={errors.id_number}
                      helperText={errors.id_number}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="expiry_date">Expiry Date</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="dense"
                                id="expiry_date"
                                name="expiry_date"
                                format="dd/MM/yyyy"
                                disablePast = {true}
                                value={inputs.expiry_date}
                                fullWidth 
                                InputProps={{
                                  classes: {
                                    input: classes.textsize,
                                  },
                                }}
                                onChange={handleExpiryDate}
                                error={errors.expiry_date}
                                helperText={errors.expiry_date}                               
                              />
                            </MuiPickersUtilsProvider>
                    {/* <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="expiry_date"
                      name="expiry_date"
                      label=""
                      type="date"
                      value={inputs.expiry_date} 
                      onChange={handleInputChange}
                      error={errors.expiry_date}
                      helperText={errors.expiry_date}
                      required
                      fullWidth
                    /> */}
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <InputLabel className={errors.is_adult? classes.errorHeading : classes.textsize}  htmlFor="is_adult">Over 18 Years?</InputLabel>
                    <RadioGroup 
                      aria-label="is_adult" 
                      name="is_adult" 
                      value={parseInt(inputs.is_adult)} 
                      onChange={handleInputChange} 
                      className={classes.group} 
                      row
                    >
                      <FormControlLabel value={1} 
            control={<Radio color="primary" />}
                     label="Yes" labelPlacement="start" />
                      <FormControlLabel value={0} 
            control={<Radio color="primary" />}
                     label="No" labelPlacement="start" />                      
                    </RadioGroup>
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="id_proof">Upload Copy of Selected ID*</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="id_proof"
                      name="id_proof"
                      label=""
                      type="file"
                      // value={inputs.id_proof} 
                      onChange={handleInputChange}
                      // required
                      fullWidth
                    />
                  </Grid>
                  {console.log(customerList)}
                  <Grid item xs={12} sm={6}>
                  <InputLabel className={classes.textsize} htmlFor="id_proof">Last Uploaded Document :   </InputLabel>
                    <a href={API_URL + "/api/download?path=customer/" + inputs.id_proof }  download >{inputs.id_proof}</a>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel className={classes.textsize} htmlFor="state">Customer State</InputLabel>
                    <RadioGroup 
                      aria-label="state" 
                      name="state" 
                      className={classes.group}
                      value={parseInt(inputs.state)} 
                      onChange={handleInputChange} 
                      row
                    >
                      <FormControlLabel value={1} 
            control={<Radio color="primary" />} label="Active" labelPlacement="start" />
                      <FormControlLabel value={2} 
            control={<Radio color="primary" />}
                     label="Hold" labelPlacement="start" />
                      <FormControlLabel value={3} 
            control={<Radio color="primary" />}
                     label="Financial Hardship" labelPlacement="start" />
                    </RadioGroup>
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
                <Typography className={(errors.alt_c1_name||errors.alt_c1_address||errors.alt_c1_contact||errors.alt_c1_relation||errors.alt_c2_name||errors.alt_c2_address||errors.alt_c2_contact||errors.alt_c2_relation)?classes.errorHeading :classes.heading}>Alternate Contact Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.heading}>Alternate Contact Details #1</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Name</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_name"
                      name="alt_c1_name"
                      // label="Name"
                      type="text"
                      value={inputs.alt_c1_name} 
                      onChange={handleInputChange}
                      error={errors.alt_c1_name}
                      helperText={errors.alt_c1_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Address</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_address"
                      name="alt_c1_address"
                      // label="Address"
                      type="text"
                      value={inputs.alt_c1_address} 
                      onChange={handleInputChange}
                      error={errors.alt_c1_address}
                      helperText={errors.alt_c1_address}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="contact">Contact#</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_contact"
                      name="alt_c1_contact"
                      // label="Contact#"
                      type="text"
                      value={inputs.alt_c1_contact} 
                      onChange={handleNumberInput}
                      error={errors.alt_c1_contact}
                      helperText={errors.alt_c1_contact}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                      required
                      fullWidth
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Relationship To You</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_relation"
                      name="alt_c1_relation"
                      // label="Relationship To You"
                      type="text"
                      value={inputs.alt_c1_relation}
                      error={errors.alt_c1_relation}
                      helperText={errors.alt_c1_relation} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.heading}>Alternate Contact Details #2</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Name</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_name"
                      name="alt_c2_name"
                      // label="Name"
                      type="text"
                      value={inputs.alt_c2_name} 
                      onChange={handleInputChange}
                      error={errors.alt_c2_name}
                      helperText={errors.alt_c2_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Address</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_address"
                      name="alt_c2_address"
                      // label="Address"
                      type="text"
                      value={inputs.alt_c2_address} 
                      onChange={handleInputChange}
                      error={errors.alt_c2_address}
                      helperText={errors.alt_c2_address}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="contact">Contact#</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_contact"
                      name="alt_c2_contact"
                      // label="Contact#"
                      type="text"
                      value={inputs.alt_c2_contact} 
                      onChange={handleNumberInput}
                      error={errors.alt_c2_contact}
                      helperText={errors.alt_c2_contact}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                      required
                      fullWidth
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Relationship To You</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_relation"
                      name="alt_c2_relation"
                      // label="Relationship To You"
                      type="text"
                      value={inputs.alt_c2_relation} 
                      onChange={handleInputChange}
                      error={errors.alt_c2_relation}
                      helperText={errors.alt_c2_relation}
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
                <Typography className={(errors.employer_name || errors.employer_address || errors.employer_telephone || errors.employer_email || errors.employer_tenure)?classes.errorHeading : classes.heading}>Income Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="user_id">Employer Name</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_name"
                      name="employer_name"
                      // label="Employer Name"
                      type="text"
                      value={inputs.employer_name} 
                      onChange={handleInputChange}
                      error={errors.employer_name}
                      helperText={errors.employer_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="user_id">Employer Address</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_address"
                      name="employer_address"
                      // label="Employer Address"
                      type="text"
                      value={inputs.employer_address} 
                      onChange={handleInputChange}
                      error={errors.employer_address}
                      helperText={errors.employer_address}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="user_id">Employer Telephone#</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_telephone"
                      name="employer_telephone"
                      // label="Employer Telephone#"
                      type="text"
                      value={inputs.employer_telephone} 
                      onChange={handleNumberInput}
                      error={errors.employer_telephone}
                      helperText={errors.employer_telephone}
                      required
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="user_id">Email</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_email"
                      name="employer_email"
                      // label="Email"
                      type="email"
                      disabled
                      value={inputs.employer_email} 
                      onChange={handleInputChange}
                      error={errors.employer_email}
                      helperText={errors.employer_email}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="user_id">Tenure of Employer</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_tenure"
                      name="employer_tenure"
                      // label="Tenure of Employer"
                      type="text"
                      value={inputs.employer_tenure} 
                      onChange={handleInputChange}
                      error={errors.employer_tenure}
                      helperText={errors.employer_tenure}
                      required
                      fullWidth
                    />
                  </Grid>
                 
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
              
              <Grid item xs={12} sm={12}>
                      
                {savebtn? <Button  variant="contained"  color="primary" className={classes.button}  onClick={handleSubmit}>
                  save
                </Button> : <Button  variant="contained"  color="primary" className={classes.button} disabled>
                  save
                </Button>}
                <Button variant="contained" color="primary" onClick={handleEditClose} className={classes.button}>
                  Close
                </Button> 
              </Grid>
              
          </div>
        </form>
      </Dialog>
    </div>
  );
}
