import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles,  emphasize, useTheme  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import BasicSelect from '@material-ui/core/Select';

import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from '../../common/StyleComman'; 
import validate from '../../common/validation/LeadRuleValidation';
// API CALL
import Customer from '../../../api/franchise/Customer';
import AutoSuggestDropdown from './AutoSuggestDropdown';
import  Placeholder from './autofill';

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
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  cn:{
    width:'100%',
    border:'0px'
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
  },
}));



const useStylesCustomer = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
}));
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddLead({ open, handleClose, handleSnackbarClick, setLeadList}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const classesCustomer = useStylesCustomer();

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

  const [customerListData, setCustomerListData] = useState([]);
  const [single, setSingle] = React.useState(null);
  
  const theme = useTheme();
  function handleChangeSingle(value) {
    setSingle(value);
    setInput('customer_contact',value.value);
    console.log('value===',value)
  }

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

  const customerName =
  (customerListData.length > 0 ? customerListData : []).map(suggestion => ({
  
    value: suggestion.mobile,
    label: suggestion.customer_name,}));
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Lead.franchiseList();
        setFranchiseList(result.franchiseList);
        // console.log('usrlist---',result.franchiseList);
        const resultCustomer = await Customer.list();
        setCustomerListData(resultCustomer.customerList);
        console.log('resultCustomer.customerList====',resultCustomer.customerList)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, []);

  // function NoOptionsMessage(props) {
  //   return (
  //     <Typography
  //       color="textSecondary"
  //       className={props.selectProps.classesCustomer.noOptionsMessage}
  //       {...props.innerProps}
  //     >
  //       {props.children}
  //     </Typography>
  //   );
  // }
  
  // NoOptionsMessage.propTypes = {
  //   /**
  //    * The children to be rendered.
  //    */
  //   children: PropTypes.node,
  //   /**
  //    * Props to be passed on to the wrapper.
  //    */
  //   innerProps: PropTypes.object.isRequired,
  //   selectProps: PropTypes.object.isRequired
  // };
  
  // function inputComponent({ inputRef, ...props }) {
  //   return <div ref={inputRef} {...props} />;
  // }
  
  // inputComponent.propTypes = {
  //   inputRef: PropTypes.oneOfType([
  //     PropTypes.func,
  //     PropTypes.shape({
  //       current: PropTypes.any.isRequired
  //     })
  //   ])
  // };
  
  // function Control(props) {
  //   const {
  //     children,
  //     innerProps,
  //     innerRef,
  //     selectProps: { classesCustomer, TextFieldProps }
  //   } = props;
  
  //   return (
  //     <TextField
  //       fullWidth
  //       InputProps={{
  //         inputComponent,
  //         inputProps: {
  //           className: classesCustomer.input,
  //           ref: innerRef,
  //           children,
  //           ...innerProps
  //         }
  //       }}
  //       {...TextFieldProps}
  //     />
  //   );
  // }
  
  // Control.propTypes = {
  //   /**
  //    * Children to render.
  //    */
  //   children: PropTypes.node,
  //   /**
  //    * The mouse down event and the innerRef to pass down to the controller element.
  //    */
  //   innerProps: PropTypes.shape({
  //     onMouseDown: PropTypes.func.isRequired
  //   }).isRequired,
  //   innerRef: PropTypes.oneOfType([
  //     PropTypes.oneOf([null]),
  //     PropTypes.func,
  //     PropTypes.shape({
  //       current: PropTypes.any.isRequired
  //     })
  //   ]).isRequired,
  //   selectProps: PropTypes.object.isRequired
  // };
  
  // function Option(props) {
  //   return (
  //     <MenuItem
  //       ref={props.innerRef}
  //       selected={props.isFocused}
  //       component="div"
  //       style={{
  //         fontWeight: props.isSelected ? 500 : 400
  //       }}
  //       {...props.innerProps}
  //     >
  //       {props.children}
  //     </MenuItem>
  //   );
  // }
  
  // Option.propTypes = {
  //   /**
  //    * The children to be rendered.
  //    */
  //   children: PropTypes.node,
  //   /**
  //    * props passed to the wrapping element for the group.
  //    */
  //   innerProps: PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     key: PropTypes.string.isRequired,
  //     onClick: PropTypes.func.isRequired,
  //     onMouseMove: PropTypes.func.isRequired,
  //     onMouseOver: PropTypes.func.isRequired,
  //     tabIndex: PropTypes.number.isRequired
  //   }).isRequired,
  //   /**
  //    * Inner ref to DOM Node
  //    */
  //   innerRef: PropTypes.oneOfType([
  //     PropTypes.oneOf([null]),
  //     PropTypes.func,
  //     PropTypes.shape({
  //       current: PropTypes.any.isRequired
  //     })
  //   ]).isRequired,
  //   /**
  //    * Whether the option is focused.
  //    */
  //   isFocused: PropTypes.bool.isRequired,
  //   /**
  //    * Whether the option is selected.
  //    */
  //   isSelected: PropTypes.bool.isRequired
  // };
  
  // function Placeholder(props) {
  //   const { selectProps, innerProps = {}, children } = props;
  //   return (
  //     <Typography
  //       color="textSecondary"
  //       className={selectProps.classesCustomer.placeholder}
  //       {...innerProps}
  //     >
  //       {children}
  //     </Typography>
  //   );
  // }
  
  // Placeholder.propTypes = {
  //   /**
  //    * The children to be rendered.
  //    */
  //   children: PropTypes.node,
  //   /**
  //    * props passed to the wrapping element for the group.
  //    */
  //   innerProps: PropTypes.object,
  //   selectProps: PropTypes.object.isRequired
  // };
  
  // function SingleValue(props) {
  //   return (
  //     <Typography
  //       className={props.selectProps.classesCustomer.singleValue}
  //       {...props.innerProps}
  //     >
  //       {props.children}
  //     </Typography>
  //   );
  // }
  
  // SingleValue.propTypes = {
  //   /**
  //    * The children to be rendered.
  //    */
  //   children: PropTypes.node,
  //   /**
  //    * Props passed to the wrapping element for the group.
  //    */
  //   innerProps: PropTypes.any.isRequired,
  //   selectProps: PropTypes.object.isRequired
  // };
  
  // function ValueContainer(props) {
  //   return (
  //     <div className={props.selectProps.classesCustomer.valueContainer}>
  //       {props.children}
  //     </div>
  //   );
  // }
  
  // ValueContainer.propTypes = {
  //   /**
  //    * The children to be rendered.
  //    */
  //   children: PropTypes.node,
  //   selectProps: PropTypes.object.isRequired
  // };
  
  // const components = {
  //   Control,
  //   NoOptionsMessage,
  //   Option,
  //   Placeholder,
  //   SingleValue,
  //   ValueContainer
  // };
  
 
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };
  
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
      customer_name: inputs.customer_name,
      customer_contact: inputs.customer_contact,
      
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
              <Typography variant="h6" className={classes.title}>
                Add Lead
              </Typography>
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
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
                      <BasicSelect
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
                        <MenuItem className={classes.textsize} value={'0'}>{'All'}</MenuItem> 
                      </BasicSelect>
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
                  <Grid item xs={12} sm={6}>
                    <AutoSuggestDropdown customerListData={customerListData}/>

                    {/* <InputLabel  className={classes.textsize} htmlFor="customer_name">Customer Name </InputLabel> */}
                      
                    {/* <NoSsr>
                       <Select
                        className={classes.cn }
                        styles={selectStyles}
                        inputId="customer_name"
                        TextFieldProps={{
                          InputLabelProps: {
                            htmlFor: 'customer_name',
                            shrink: true,
                          },
                        }}
                        fullWidth
                        options={customerName}
                        // components={components}
                        value={single}
                        onChange={handleChangeSingle}
                      />                     
                      {/* <Select 
                      id="customer_name"
                      name="customer_name"
                      margin="dense"
                      classes={classesCustomer}
                      styles={selectStyles}
                      value={single}
                      
                      autoComplete='off'
                      TextFieldProps={{
                        label: 'Country',
                        InputLabelProps: {
                          htmlFor: 'customer_name',
                          shrink: true,
                        },
                        form: {
                          autocomplete: "off",
                        }
                      }}
                      fullWidth onChange={handleChangeSingle}
                       options={ customerName } /> 
                       </NoSsr>  */}
                    {/* <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="customer_name"
                      name="customer_name"
                      // label="First Name"
                      value={inputs.customer_name}
                      onChange={handleInputChange}
                      error={errors.customer_name}
                      helperText={errors.customer_name}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="customer_contact">Customer Contact </InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="customer_contact"
                      name="customer_contact"
                      value={inputs.customer_contact}
                      onChange={handleInputChange}
                      error={errors.customer_contact}
                      helperText={errors.customer_contact}
                      fullWidth
                      // required
                      type="number"
                      // placeholder="Franchise Name"
                      margin="dense"
                      onInput={(e)=>{ 
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    }}
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
