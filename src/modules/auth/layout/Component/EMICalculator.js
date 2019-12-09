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
import Tooltip from '@material-ui/core/Tooltip'; 
import Paper from '@material-ui/core/Paper';

import {useCommonStyles} from '../../../common/StyleComman';
import useSignUpForm from '../../franchise/CustomHooks.js';

// API CALL
import staticContentAPI from '../../../../api/StaticContent.js';


const RESET_VALUES = {
 unpaid_int_bal : '',
 frequency : '',
 duration : '',
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
  closeIcon: {
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
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
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
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
    marginTop:theme.spacing(3),
    marginLeft:theme.spacing(1),
    marginBottom:theme.spacing(3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EMICalculator({ open, handleClose}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [discountList,setDiscountList] = useState([]);
  const [installment,setInstallment] = useState([]);

  useEffect(() => {
    fetchDiscountRateList();
  },[]);

  const fetchDiscountRateList = async () => {
    const result = await staticContentAPI.getDiscountRateList({});
    setDiscountList(result.discountRateList);
  }
// console.log(discountList);
  const { inputs, handleInputChange, handleNumberInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    () => {},
    {}
  );

  useEffect(() => {
    if(inputs.duration != '' && inputs.frequency != '' && inputs.unpaid_int_bal != ''){
      {(discountList != undefined && discountList != null && discountList.length > 0 ? discountList : []).map(data => {                        
        if(inputs.duration === data.duration_in_year){
          if(inputs.frequency === 1){
            setInstallment(Number(inputs.unpaid_int_bal) / data.weekly_discount_rate);
          }else if(inputs.frequency === 2){
            setInstallment(Number(inputs.unpaid_int_bal) / data.fortnightly_discount_rate);
          }
        }
      })}      
    }
  },[inputs.duration, inputs.frequency, inputs.unpaid_int_bal]);

  return (
    <div>
      <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>        
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}> EMI Calculator </Typography>
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
          <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <InputLabel className={classes.textsize} htmlFor="unpaid_int_bal">Initial Unpaid Balance</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="unpaid_int_bal"
                      name="unpaid_int_bal"
                      value={inputs.unpaid_int_bal}
                      onChange={handleInputChange}
                      // error={errors.unpaid_int_bal}
                      // helperText={errors.unpaid_int_bal}
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel className={classes.textsize}  htmlFor="duration">Duration *</InputLabel>
                    <Select
                      value={parseInt(inputs.duration)}
                      onChange={handleInputChange}
                      name ='duration'
                      id = 'duration'
                      fullWidth
                      className={classes.textsize}
                    >
                      {(discountList != undefined && discountList != null && discountList.length > 0 ? discountList : []).map(data => {                        
                        return (
                          <MenuItem className={classes.textsize} value={data.duration_in_year} >{data.duration_period}</MenuItem>
                        );
                      })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel className={classes.textsize}  htmlFor="frequency">Payment Frequency *</InputLabel>
                  <Select
                    value={inputs.frequency}
                    onChange={handleInputChange}
                    name = 'frequency'
                    id = 'frequency'
                    fullWidth
                    className={classes.textsize}
                  >
                    <MenuItem className={classes.textsize} value={1}>Weekly</MenuItem>
                    <MenuItem className={classes.textsize} value={2}>Fortnightly</MenuItem>
                  </Select>
                </Grid>               
                <Grid item xs={12} sm={12}>
                  <InputLabel className={classes.textsize} htmlFor="installment_amt">Installment Amount</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="installment_amt"
                      name="installment_amt"
                      value={Number(installment).toFixed(2)}
                      // onChange={handleInputChange}
                      fullWidth
                      disabled
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant="contained"  color="primary" className={classes.button} onClick={handleClose}> Close </Button>
                </Grid>
              </Grid>
            </Paper>
        </div>
      </Dialog>
    </div>
  );
}