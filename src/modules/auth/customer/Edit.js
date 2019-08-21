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
  updated_by : '',
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
  group: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Edit({ open, handleEditClose, handleSnackbarClick, inputs, setCustomerList}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [customerList, setDataCustomerList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [idTypeList, setIdTypeList] = useState([]);
  const [otherIdType, setOtherIdType] = useState(inputs.id_type ===0 ? false : true);
  const [otherIdTypeValue, setOtherIdTypeValue] = useState(inputs.other_id_type);
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
      e.preventDefault();

      setpLoading(true);
      setSavebtn(false);
      const data = {
      id: customerList.id,
      customer_name : customerList.customer_name,
      address : customerList.address,
      city : customerList.city,
      postcode : customerList.postcode,
      telephone : customerList.telephone,  
      mobile : customerList.mobile,
      email : customerList.email,
      gender : customerList.gender,
      is_working : customerList.is_working,
      dob : customerList.dob,
      id_type :  customerList.id_type,
      id_number:  customerList.id_number,
      expiry_date :  customerList.expiry_date,
      is_adult : customerList.is_adult,
      id_proof :  customerList.id_proof,

      alt_c1_name: customerList.alt_c1_name,
      alt_c1_address: customerList.alt_c1_address,
      alt_c1_contact: customerList.alt_c1_contact,
      alt_c1_relation: customerList.alt_c1_relation,
      alt_c2_name:  customerList.alt_c2_name,
      alt_c2_address:  customerList.alt_c2_address,
      alt_c2_contact: customerList.alt_c2_contact,
      alt_c2_relation: customerList.alt_c2_relation,

      employer_name: customerList.employer_name,
      employer_address: customerList.employer_address,
      employer_telephone: customerList.employer_telephone,
      employer_email: customerList.employer_email,
      employer_tenure: customerList.employer_tenure,

      is_active: customerList.is_active,
      state : customerList.state,
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
    // handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
    handleEditClose(false);
  };


const handleInputChange = event => {
  const { name, value } = event.target
  setDataCustomerList({ ...customerList, [name]: value })
}

function handleIdType(event){
  if(event.target.value===0){
    setOtherIdType(false)
  }else{
    setOtherIdType(true)
    setOtherIdTypeValue('');
  }
  setDataCustomerList({...customerList,  id_type: event.target.value});
  }

  function handleOtherIdType(event){
    setOtherIdTypeValue(event.target.value)
  }


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Edit Customer
              </Typography>
              {/* {savebtn? <Button color="inherit" type="submit" onClick={editCustomer}>
                save
              </Button> : <Button color="inherit" type="submit" onClick={editCustomer} disabled>
                save
              </Button>} */}
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
                      value={customerList.customer_name}
                      onChange={handleInputChange}
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
                      value={customerList.address} 
                      onChange={handleInputChange}
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
                      value={customerList.city} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="location">Postcode *</InputLabel>
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
                      type="number"
                      value={customerList.postcode}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="contact">Telephone *</InputLabel>
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
                      type="number"
                      value={customerList.telephone} 
                      onChange={handleInputChange}
                      required= {customerList.mobile==='' ? true : false}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="contact">Mobile *</InputLabel>
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
                      type="number"
                      value={customerList.mobile} 
                      onChange={handleInputChange}
                      required = {customerList.telephone===''?true : false}
                      fullWidth
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
                      value={customerList.email} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="Gender">Gender</InputLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={customerList.gender}
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel labelPlacement="start" value="female" 
            control={<Radio color="primary" />}
                     label="Female" />
                      <FormControlLabel labelPlacement="start" value="male" 
            control={<Radio color="primary" />}
                     label="Male" />
                      {/* <FormControlLabel labelPlacement="start" value="transgender" 
            control={<Radio color="primary" />}.
                     label="Transgender" /> */}
                    </RadioGroup>
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="is_working">Are you working?</InputLabel>
                    <RadioGroup 
                      aria-label="is_working" 
                      name="is_working" 
                      className={classes.group}
                      value={parseInt(customerList.is_working)} 
                      onChange={handleInputChange} 
                      row
                    >
                      <FormControlLabel value={1} 
            control={<Radio color="primary" />}
                     label="Yes" labelPlacement="start" />
                      <FormControlLabel value={0} 
            control={<Radio color="primary" />}
                     label="No" labelPlacement="start" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="dob">Date Of Birth</InputLabel>
                    <TextField
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
                      value={customerList.dob} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="id_type">ID Proof</InputLabel>
                    <Select
                        margin="dense"
                        name="id_type"
                        onChange = {handleIdType}
                        // value={parseInt(inputs.id_type)}
                        value={parseInt(customerList.id_type)}
                        name = 'id_type'
                        id = 'id_type'
                        className={classes.textsize}
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
                      value={customerList.id_number} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="expiry_date">Expiry Date</InputLabel>
                    <TextField
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
                      value={customerList.expiry_date} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize}  htmlFor="is_adult">Over 18 Years?</InputLabel>
                    <RadioGroup 
                      aria-label="is_adult" 
                      name="is_adult" 
                      value={parseInt(customerList.is_adult)} 
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
                  </Grid>
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
                      // value={customerList.id_proof} 
                      onChange={handleInputChange}
                      // required
                      fullWidth
                    />
                  </Grid>
                  {console.log(customerList)}
                  <Grid item xs={12} sm={6}>
                  <InputLabel className={classes.textsize} htmlFor="id_proof">Last Uploaded Document :   </InputLabel>
                    <a href={"server\\files\\customer\\" + customerList.id_proof }  download >{customerList.id_proof}</a>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel className={classes.textsize} htmlFor="state">Customer State</InputLabel>
                    <RadioGroup 
                      aria-label="state" 
                      name="state" 
                      className={classes.group}
                      value={parseInt(customerList.state)} 
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
                     label="Completed" labelPlacement="start" />
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
                <Typography className={classes.heading}>Alternate Contact Details</Typography>
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
                      value={customerList.alt_c1_name} 
                      onChange={handleInputChange}
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
                      value={customerList.alt_c1_address} 
                      onChange={handleInputChange}
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
                      type="number"
                      value={customerList.alt_c1_contact} 
                      onChange={handleInputChange}
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
                      value={customerList.alt_c1_relation} 
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
                      value={customerList.alt_c2_name} 
                      onChange={handleInputChange}
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
                      value={customerList.alt_c2_address} 
                      onChange={handleInputChange}
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
                      type="number"
                      value={customerList.alt_c2_contact} 
                      onChange={handleInputChange}
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
                      value={customerList.alt_c2_relation} 
                      onChange={handleInputChange}
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
                <Typography className={classes.heading}>Income Details</Typography>
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
                      value={customerList.employer_name} 
                      onChange={handleInputChange}
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
                      value={customerList.employer_address} 
                      onChange={handleInputChange}
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
                      type="number"
                      value={customerList.employer_telephone} 
                      onChange={handleInputChange}
                      required
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
                      value={customerList.employer_email} 
                      onChange={handleInputChange}
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
                      value={customerList.employer_tenure} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                 
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
              
              <Grid item xs={12} sm={12}>
                      
                {savebtn? <Button  variant="contained"  color="primary" className={classes.button}  onClick={editCustomer}>
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
