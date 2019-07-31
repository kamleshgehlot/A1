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

// API CALL
import Category from '../../../../src/api/Category';
import EnquiryAPI from '../../../api/franchise/Enquiry';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
    enquiry_id : '',
      customer_name: '',
      contact: '',
      interested_product_id: '',
      is_active: '',
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


export default function Add({ open, handleClose, handleSnackbarClick,setEnquiryList, convert}) {

  const classes = useStyles();
  const [assignInterest, setAssignInterest] = React.useState([]);
  const [productList, setProductList] = useState([]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const enquiry_id = await EnquiryAPI.getnewid();
        if(enquiry_id.id[0]!=null){
          setInput('enquiry_id',("E_" + (enquiry_id.id[0].id+ 1)));
        }
        else{
          setInput('enquiry_id','E_1');
        }
        const result = await Category.productlist();
        setProductList(result.productList);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
  }, []);
  
  
  function handleChangeMultiple(event) {
    setAssignInterest(event.target.value);
  }
  
  const addEnquiry = async () => {

    setpLoading(true);
    setSavebtn(false);
    // setInput('interested_product_id',assignInterest.join())
// console.log('convert-----',convert);
    const response = await EnquiryAPI.postEnquiry({
      enquiry_id : inputs.enquiry_id,
      customer_name: inputs.customer_name,
      contact: inputs.contact,
      interested_product_id: assignInterest.join(),
      is_active: 1,
      converted_to: 0,
      convert_by_lead:convert
    });
        console.log('sahgdaud--',response);

    assignInterest.length = 0;
    handleSnackbarClick(true);
    setEnquiryList(response.enquiryList);
    handleReset(RESET_VALUES);
    setpLoading(false);
    handleClose(false);
  };

  function validate(values) {
    let errors = {};
    return errors;
  };

 const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    addEnquiry,
    validate
  );
  
  // console.log("inputess",inputs);
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
                Add Enquiry
              </Typography>
              {savebtn? <Button color="inherit" type="submit">
                save
              </Button>:<Button color="inherit" type="submit" disabled>
                save
              </Button>}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>
              <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="enquiry_id"
                      name="enquiry_id"
                      label="Enquiry Id"
                      value={inputs.enquiry_id}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      disabled
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="last_name">User Id</InputLabel> */}
                    <TextField
                      margin="dense"
                      id="customer_name"
                      name="customer_name"
                      label="Customer Name"
                      type="text"
                      value={inputs.customer_name} 
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
                      value={inputs.contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="assign_interest">Interested In*</InputLabel>
                    <Select
                      multiple
                      value={assignInterest}
                      onChange={handleChangeMultiple}
                      inputProps={{
                        name: 'interested_product_id',
                        id: 'interested_product_id',
                        // label:'assign_interest'
                      }}
                      fullWidth
                      required
                    >
                      {
                        (productList.length != '' ? productList : []).map((data)=> {
                          return(
                            <MenuItem value={data.id}>{data.name}</MenuItem>      
                          )
                        })

                      }
                      {/* <MenuItem value={1}>{'Product 1'}</MenuItem>
                      <MenuItem value={2}>{'Product 2'}</MenuItem>
                      <MenuItem value={3}>{'Product 3'}</MenuItem> */}
                      {/* {role.map((ele,index) =>{
                        return(
                        <MenuItem value={ele.id}>{ele.name}</MenuItem>
                        )
                      })} */}

                    </Select>
                  </Grid>
                </Grid>
              </Paper>
            
            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
