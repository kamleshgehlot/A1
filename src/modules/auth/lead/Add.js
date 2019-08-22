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
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";

import LinearProgress from '@material-ui/core/LinearProgress';
import { APP_TOKEN } from '../../../api/Constants';

import validate from '../../common/validation/LeadRuleValidation';
// API CALL
import UserAPI from '../../../api/User';
import Lead from '../../../api/Lead';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  franchise_id: '',
  lead_id: '',
  message: '',
  description:'',
  is_active: ''
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
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddLead({ open, handleClose, handleSnackbarClick, setLeadList}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [temp, setTemp] = React.useState([]);
  const [assignRole, setAssignRole] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const [otherDisable, setOtherDisable] = useState(true);
  const [otherFranchiseValue, setOtherFranchiseValue] = useState();
  
  const [leadId, setLeadId] = useState();
  const [franchiseListd, setFranchiseList] = useState({});

  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Lead.franchiseList();
        setFranchiseList(result.franchiseList);
        // console.log('usrlist---',result.franchiseList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, []);

  
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Lead.last();
        console.log('en',result);
        let zero = 0;
        if(result[0]!=null){  
          zero = 6 - (result[0].id.toString().length); 
          let lead_Id='';
          for(let i=0; i< zero ; i++){
            lead_Id += '0';
          }
         setInput('lead_id',('L' + lead_Id + (result[0].id + 1)));
        }else{
          setInput('lead_id','L000001');
        }
        
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  
  const addLead = async () => {
    setpLoading(true);
    setSavebtn(true);
    let data = {
      franchise_id: inputs.franchise_id,
      lead_id: inputs.lead_id,
      message: inputs.description,
      is_active: 1,
      franchise_name: otherFranchiseValue,
      is_franchise_exist: inputs.is_franchise_exist,
    };

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('upload').files.length; x++) {
      formData.append('avatar', document.getElementById('upload').files[x])
    }
    
    // console.log('inp----',inputs);
    const response = await Lead.add({formData: formData});
    console.log(response);
    setLeadList(response.leadList);
    handleSnackbarClick(true);
    handleReset(RESET_VALUES);
    setSavebtn(false);
    handleClose(false);
  };

  // function validate(values) {
  //   let errors = {};
  //   return errors;
  // };


  function handleFranchise(event){
    // if(event.target.value===0){
    //   setOtherDisable(false);
    //   setInput('is_franchise_exist','0');
    // }else{
    //   setOtherDisable(true)
    //   setOtherFranchiseValue('');
    //   setInput('is_franchise_exist','1');
    // }
    setInput('franchise_id',event.target.value);
    }

    function handleOtherFranchise(event){
      setOtherFranchiseValue(event.target.value)
    }

    const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput,errors } = useSignUpForm(
      RESET_VALUES,
      addLead,
      validate
    );
    

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
                Add Lead
              </Typography>
              {/* {savebtn? <Button color="inherit" type="submit">
                save
              </Button> : <Button color="inherit" type="submit" disabled>
                save
              </Button>} */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
         
          <Grid item xs={12} sm={12}>  
           {ploading ?  <LinearProgress />: null}</Grid>
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="lead">Lead ID</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="lead_id"
                      name="lead_id"
                      label=""
                      value={inputs.lead_id}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="text"
                      disabled
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Franchise</InputLabel>
                      <Select
                        value={inputs.franchise_id}
                        onChange = {handleFranchise}
                        inputProps={{
                          name: 'franchise_id',
                          id: 'franchise_id',
                          label:'franchise_id'
                        }}
                        error={errors.franchise_id}
                        helperText={errors.franchise_id}
                        className={classes.drpdwn}
                        fullWidth
                        label="franchise_id"
                      >
                      <MenuItem disabled className={classes.textsize}  value="" selected>Select Franchise
                      </MenuItem>
                          {(franchiseListd.length > 0 ? franchiseListd : []).map(dataf => {
                          return (
                            <MenuItem className={classes.textsize} value={dataf.id} >{dataf.name}</MenuItem>
                          );
                        })}
                        <MenuItem className={classes.textsize} value={0}>{'All'}</MenuItem> 
                      </Select>
                  </Grid>
                    {/* <Grid item xs={12} sm={3}>
                      <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        margin="dense"
                        id="otherFranchiseValue"
                        name="otherFranchiseValue"
                        label="Enter Franchise Name"
                        type="text"
                        value={otherFranchiseValue} 
                        onChange={handleOtherFranchise}
                        required
                        disabled = {otherDisable}
                        fullWidth
                      />
                    </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="contact">Upload Doc/Photo</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="upload"
                      name="upload"
                      type="file"
                      value={inputs.upload} 
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="Description">Description *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="description"
                      name="description"
                      // label="Description"
                      value={inputs.description}
                      onChange={handleInputChange}
                      error={errors.description}
                      helperText={errors.description}
                      fullWidth
                      required
                      multiline
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    
                    {savebtn? <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
                      save
                    </Button> : <Button  variant="contained"  color="primary" className={classes.button} disabled>
                      save
                    </Button>}
                    <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
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
