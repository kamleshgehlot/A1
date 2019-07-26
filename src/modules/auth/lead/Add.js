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

import { APP_TOKEN } from '../../../api/Constants';

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
  drpdwn:{
    marginTop: theme.spacing(1),
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
  const [franchiseList, setFranchiseList] = useState({});
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
        const result = await UserAPI.list();
        setFranchiseList(result.userList);
        console.log('usrlist---',result.userList);
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
        if(result.leadLast[0]!=null){
          generate(result.leadLast[0].id);
        }
        else{
          const l_id='l_1';
          setLeadId(l_id);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  function generate(last_id) {
   const lid=last_id+1;
   const l_id='l_'+lid;
    setLeadId(l_id);
  }

  const addLead = async () => {
    console.log('inp----',inputs);
    const response = await Lead.add({
      franchise_id: inputs.franchise_id,
      lead_id: leadId,
      message: inputs.description,
      is_active: 1,
      franchise_name: otherFranchiseValue,
      is_franchise_exist: inputs.is_franchise_exist,
    });
    console.log(response);
    setLeadList(response.leadList);
    handleSnackbarClick(true);
    handleClose(false);
  };

  function validate(values) {
    let errors = {};
    return errors;
  };


  function handleFranchise(event){
    if(event.target.value===0){
      setOtherDisable(false);
      setInput('is_franchise_exist','0');
    }else{
      setOtherDisable(true)
      setOtherFranchiseValue('');
      setInput('is_franchise_exist','1');
    }
    setInput('franchise_id',event.target.value);
    }

    function handleOtherFranchise(event){
      setOtherFranchiseValue(event.target.value)
    }
 const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    addLead,
    validate
  );
  

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
                Add Lead
              </Typography>
              <Button color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="lead">Lead ID</InputLabel>
                    <TextField
                      id="lead_id"
                      name="lead_id"
                      label=""
                      value={leadId}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="text"
                      disabled
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel htmlFor="last_name">Franchise</InputLabel>
                      <Select
                        value={inputs.franchise_id}
                        onChange = {handleFranchise}
                        inputProps={{
                          name: 'franchise_id',
                          id: 'franchise_id',
                          label:'franchise_id'
                        }}
                        className={classes.drpdwn}
                        fullWidth
                        label="franchise_id"
                      >
                      <MenuItem disabled  value="" selected>Select Franchise
                      </MenuItem>
                          {(franchiseList.length > 0 ? franchiseList : []).map(data => {
                          return (
                            <MenuItem value={data.franchise_id} >{data.franchise_name}</MenuItem>
                          );
                        })}
                        <MenuItem value={0}>{'Other'}</MenuItem> 
                      </Select>
                  </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
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
                    </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="contact">Upload Doc/Photo</InputLabel>
                    <TextField
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
                    {/* <InputLabel htmlFor="email">Email Id *</InputLabel> */}
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      value={inputs.description}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      multiline
                      type="text"
                      margin="dense"
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
