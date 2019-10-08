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
import Fab from '@material-ui/core/Fab';
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

import { APP_TOKEN } from '../../../api/Constants';
import {useCommonStyles} from '../../common/StyleComman'; 


// API CALL
import Order from '../../../api/franchise/Order';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';
import { parse } from 'path';

const RESET_VALUES = {
  
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
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
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
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Budget({ open, handleBudgetClose, setBudgetList, budgetList, totalBudgetList, isEditable}) {
  const styleClass = useCommonStyles();  
  const classes = useStyles();
  const [inputs, setInputs] = useState(budgetList);
  const [oldBudget, setOldBudget] = useState(0);
  const [oldBudgetList, setOldBudgetList] = useState(totalBudgetList);
  const [surplusBool, setSurplusBool] = useState();
  const [errorSurplus, setErrorSurplus] = useState();
  const [errorAfford, setErrorAfford] = useState();


  function handleInputBlur(e){
    if(e.target.value===''){
      setInputs({
        ...inputs,
        [e.target.name]: 0,
      });
    }
  }

  function handleInputFocus(e){
    if(e.target.value==='0'){
      setInputs({
        ...inputs,
        [e.target.name]: '',
      });
    }
  }
  
  const handlePriceInput = e => {
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (e.target.value === '' || validDecimalNumber.test(e.target.value)) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleinputChange(e){
    // console.log('valueee',e.target.value)
    // if(e.target.value===""){
    //   // setInputs({
    //   //   ...inputs,
    //   //   [e.target.name]: 0,
    //   // });
    // }
    // else{
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  // }

  }

  function handleSubmit(e){
    e.preventDefault();
    let check = false;
    if(inputs.surplus<=0){
      setErrorSurplus('Total Surplus/Defict is cannot be zero or less than zero');
      check=true;
    }
    else{
      setErrorSurplus('');
    }
    if(inputs.afford_amt<=0){
      setErrorAfford('This field is required');
      check=true;
    }else if(inputs.afford_amt > inputs.surplus){
      setErrorAfford('Afford amt. should be less then to surplus');
      check=true;
    }
    else{
      setErrorAfford('');
    }
    if(check===false){
        const data = {
        work: parseFloat(inputs.work),
        benefits : parseFloat(inputs.benefits),
        accomodation : parseFloat(inputs.accomodation),
        childcare : parseFloat(inputs.childcare),
        rent : parseFloat(inputs.rent),
        power : parseFloat(inputs.power),
        telephone : parseFloat(inputs.telephone),
        mobile : parseFloat(inputs.mobile),
        vehicle : parseFloat(inputs.vehicle),
        transport : parseFloat(inputs.transport),
        food : parseFloat(inputs.food),
        credit_card : parseFloat(inputs.credit_card),
        loan : parseFloat(inputs.loan),
        other_expenditure : parseFloat(inputs.other_expenditure),
        income  : parseFloat(inputs.income),
        expenditure : parseFloat(inputs.expenditure),
        surplus  : parseFloat(inputs.surplus),
        afford_amt : parseFloat(inputs.afford_amt),
        pre_order_exp : parseFloat(oldBudget),
      }
      setBudgetList(data);
      handleBudgetClose(false)
    }
  }
 
  useEffect(() => {
    if(inputs.work == 0 &&
      inputs.benefits == 0 &&
      inputs.accomodation == 0 &&
      inputs.childcare == 0 &&
      inputs.rent == 0 &&
      inputs.power == 0 &&
      inputs.telephone == 0 &&
      inputs.mobile == 0 &&
      inputs.vehicle == 0 &&
      inputs.transport == 0 &&
      inputs.food == 0 &&
      inputs.credit_card == 0 &&
      inputs.loan == 0 &&
      inputs.other_expenditure == 0 
      )
    {
      setSurplusBool(false);
    }else{
      setSurplusBool(true);      
    }    
      if(oldBudgetList!= ''){
        let sum = oldBudgetList.reduce((acc, val) =>{
          return (val.is_active == 1 ? acc + val.afford_amt : acc )
      }, 0 );
      setOldBudget(sum);
      // inputs.expenditure = sum;
    }
  });

  if(surplusBool===true){
      inputs.income = parseFloat(inputs.work) + parseFloat(inputs.benefits) + parseFloat(inputs.accomodation) + parseFloat(inputs.childcare);
      inputs.expenditure = parseFloat(inputs.rent) + parseFloat(inputs.power) + parseFloat(inputs.telephone) + parseFloat(inputs.mobile) + parseFloat(inputs.vehicle) + parseFloat(inputs.transport) + parseFloat(inputs.food) + parseFloat(inputs.credit_card) + parseFloat(inputs.loan) + parseFloat(inputs.other_expenditure) + parseFloat(oldBudget);
      inputs.surplus = inputs.income - inputs.expenditure;
      
    }

    

return (
    <div>
      <Dialog maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>              
              <Typography variant="h6" className={classes.title}>
                Budget
              </Typography>
              <IconButton size="small" onClick={handleBudgetClose} className={styleClass.closeIcon}> x </IconButton>
              
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper} >            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                  Weekly Income (After Tax) (A)
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      id="work"
                      name="work"
                      label="Work"
                      value={inputs.work}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      disabled={isEditable === 0}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="benefits"
                      name="benefits"
                      label="Benefits"
                      value={inputs.benefits}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      disabled={isEditable === 0}
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accomodation"
                      name="accomodation"
                      label="Accomodation Allowance"
                      value={inputs.accomodation}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled={isEditable === 0}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="childcare"
                      name="childcare"
                      label="Childcare"
                      value={inputs.childcare}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled={isEditable === 0}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                  Weekly Expenditure (B)
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="rent"
                      name="rent"
                      label="Rent/Mortgage"
                      value={inputs.rent}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      disabled={isEditable === 0}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="power"
                      name="power"
                      label="Power"
                      value={inputs.power}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      disabled={isEditable === 0}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="telephone"
                      name="telephone"
                      label="Landline Phone"
                      value={inputs.telephone}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      disabled={isEditable === 0}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="mobile"
                      name="mobile"
                      label="Mobile Phone"
                      value={inputs.mobile}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      disabled={isEditable === 0}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="vehicle"
                      name="vehicle"
                      label="Vehicle Finance"
                      value={inputs.vehicle}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled={isEditable === 0}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="transport"
                      name="transport"
                      label="Public Transport"
                      value={inputs.transport}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      disabled={isEditable === 0}
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="food"
                      name="food"
                      label="Food"
                      value={inputs.food}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      disabled={isEditable === 0}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled={isEditable === 0}
                      id="credit_card"
                      name="credit_card"
                      label="Credit/Store Cards"
                      value={inputs.credit_card}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="loan"
                      name="loan"
                      label="Loans/Hire Purchase"
                      value={inputs.loan}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      disabled={isEditable === 0}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="other_expenditure"
                      name="other_expenditure"
                      label="Other"
                      value={inputs.other_expenditure}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      disabled={isEditable === 0}
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  { (oldBudgetList.length > 0) ?
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Amt. of Orders Going on Rent:
                    </Typography>
                  </Grid>
                  : null
                  }
                  { (oldBudgetList.length > 0) ?
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                      { oldBudget }
                    </Typography>
                  </Grid>
                  : null
                  }
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Income: {inputs.income}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Expenses: {inputs.expenditure}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    TOTAL SURPLUS/DEFICT (A-B)
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="surplus"
                      name="surplus"
                      // label="Other"
                      value={inputs.surplus}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errorSurplus}
                      helperText={errorSurplus}
                      fullWidth
                      disabled = {surplusBool || isEditable === 0}
                      required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                      How much you can afford to pay on weekly basis?
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="afford_amt"
                      name="afford_amt"
                      // label="Other"
                      value={inputs.afford_amt}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      error={errorAfford}
                      helperText={errorAfford}
                      fullWidth
                      disabled={isEditable === 0}
                      // disabled
                      required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit} disabled={isEditable === 0}>
                      save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleBudgetClose} className={classes.button}>
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
