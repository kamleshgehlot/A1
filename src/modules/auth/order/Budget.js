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
import {useCommonStyles} from '../../common/StyleComman'; 


import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

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
  buttonMargin: {
    margin: theme.spacing(1),
  },  
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Budget({ open, handleBudgetClose, budgetList, setBudgetList, customer_id}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [inputs, setInputs] = useState(budgetList);
  const [surplusBool, setSurplusBool] = useState();
  const [oldBudgetList,setOldBudgetList] = useState([]);
  const [oldBudget, setOldBudget] = useState(0);
  const [errorSurplus, setErrorSurplus] = useState();
  const [errorAfford, setErrorAfford] = useState();
  const [errorDebitedDay, setErrorDebitedDay] = useState('');
  const [errorPaidDay, setErrorPaidDay] = useState('');

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

  function handleInputChange(e){
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
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
    }else{
      setErrorAfford('');
    }
    if(inputs.paid_day == ""){
      setErrorPaidDay('Paid Day is required');
      check=true;
    }
    else{
      setErrorPaidDay('');
    }
    if(inputs.debited_day == ""){
      setErrorDebitedDay('Debited Day is Required');
      check=true;
    }
    else{
      setErrorDebitedDay('');
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
        vehicle_fuel : parseFloat(inputs.vehicle_fuel),
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
        paid_day : inputs.paid_day,
        debited_day : inputs.debited_day,
      }
      setBudgetList(data);
      handleBudgetClose(false);
    }
  }


  useEffect(() => {
      const fetchData = async () => {
        try {
          const order = await Order.getExistingBudget({customer_id: customer_id});          
          setOldBudgetList(order);
          if(order.length > 0 && budgetList.length === 0 ){
            setInputs(order[0]);
          }
        } catch (error) {
          console.log('Error..',error);
        }
      };
      fetchData();
  }, []);

  
  
  
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
      inputs.vehicle_fuel == 0 &&      
      inputs.transport == 0 &&
      inputs.food == 0 &&
      inputs.credit_card == 0 &&
      inputs.loan == 0 &&
      inputs.other_expenditure == 0)
    {
      setSurplusBool(false);
      
    }else{
      setSurplusBool(true);            
    }
    if(oldBudgetList!= ''){
      let sum = oldBudgetList.reduce((acc, val) =>{
        return (val.is_active == 1 ? acc + val.afford_amt : acc )
      }, 0 );
      setOldBudget(sum * 4);
      inputs.expenditure = (sum * 4);
    }
  });

  if(surplusBool===true){
      inputs.income = parseFloat(inputs.work) + parseFloat(inputs.benefits) + parseFloat(inputs.accomodation) + parseFloat(inputs.childcare);
      inputs.expenditure = parseFloat(inputs.rent) + parseFloat(inputs.power) + parseFloat(inputs.telephone) + parseFloat(inputs.mobile) + parseFloat(inputs.vehicle) + parseFloat(inputs.vehicle_fuel) + parseFloat(inputs.transport) + parseFloat(inputs.food) + parseFloat(inputs.credit_card) + parseFloat(inputs.loan) + parseFloat(inputs.other_expenditure) + parseFloat(oldBudget) ;
      inputs.surplus = inputs.income - inputs.expenditure;
  }



return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleBudgetClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Budget
              </Typography>
              <IconButton size="small" onClick={handleBudgetClose} className={styleClass.closeIcon}> x </IconButton>              
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
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
                      id="vehicle_fuel"
                      name="vehicle_fuel"
                      label="Vehicle Fuel"
                      value={inputs.vehicle_fuel}
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
                      id="transport"
                      name="transport"
                      label="Public Transport"
                      value={inputs.transport}
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
                      id="food"
                      name="food"
                      label="Food"
                      value={inputs.food}
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
                  <Grid item xs={12} sm={12}>
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
                    <InputLabel  className={classes.textsize} htmlFor="paid_day">Day you get paid</InputLabel>
                    <Select
                        margin="dense"
                        name="paid_day"
                        onChange = {handleInputChange}
                        value={inputs.paid_day}
                        name = 'paid_day'
                        id = 'paid_day'
                        className={classes.drpdwn}
                        fullWidth
                        error={errorPaidDay}
                        helperText={errorPaidDay}
                        label="Day you get paid"
                        required
                      >
                        <MenuItem className={classes.textsize} value={'Monday'}>{'Monday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Tuesday'}>{'Tuesday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Wednesday'}>{'Wednesday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Thursday'}>{'Thursday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Friday'}>{'Friday'}</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="paid_day">Day you want to be debited</InputLabel>
                    <Select
                        margin="dense"
                        name="debited_day"
                        onChange = {handleInputChange}
                        value={inputs.debited_day}
                        name = 'debited_day'
                        id = 'debited_day'
                        className={classes.drpdwn}
                        fullWidth
                        error={errorDebitedDay}
                        helperText={errorDebitedDay}
                        label="Day you want to be debited"
                        required
                      >
                        <MenuItem className={classes.textsize} value={'Monday'}>{'Monday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Tuesday'}>{'Tuesday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Wednesday'}>{'Wednesday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Thursday'}>{'Thursday'}</MenuItem>
                        <MenuItem className={classes.textsize} value={'Friday'}>{'Friday'}</MenuItem>
                    </Select>
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
                      {                        
                        "OrderId: " +
                        (oldBudgetList.length > 0 ? oldBudgetList : []).map(data =>{
                          return(
                            data.is_active == 1 ? (data.order_id + '  ($' +(data.afford_amt * 4) + ')')
                          :'')
                        })
                      }
                      {"\nTotal:  $" + oldBudget }
                    </Typography>
                  </Grid>
                  : null
                  }
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Income = {"$" + inputs.income}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Expenses = {"$" + inputs.expenditure}
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
                      fullWidth
                      error={errorSurplus}
                      helperText={errorSurplus}
                      disabled = {surplusBool}
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
                      fullWidth
                      // disabled
                      required
                      error
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      error={errorAfford}
                      helperText={errorAfford}
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
                      
                      <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
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
