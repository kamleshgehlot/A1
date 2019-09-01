import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConfirmationDialog from '../ConfirmationDialog.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import useSignUpForm from '../franchise/CustomHooks';
import validate from '../../common/validation/ProductRuleValidation';

import InputAdornment from '@material-ui/core/InputAdornment';
import AddColor from './AddColor';
import AddBrand from './AddBrand';
// API CALL
import Category from '../../../api/Category';
import Brand from '../../../api/product/Brand';
import Color from '../../../api/product/Color';
import Status from '../../../api/product/Status';

import { store, useStore } from '../../../store/hookStore';

const RESET_VALUES = {
  productname:'',
  color:'',
  brand:'',
  buying_price:'',
  description:'',
  specification:'',
  brought:'',
  invoice:'',
  rental:'',
  meta_keywords:'',
  meta_description:'',
  status:''
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
  // root: {
  //   padding: theme.spacing(3, 2),
  // },
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
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(12),
  },
}));


const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick, inputValues, updateProductList}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [product, setProduct] = useState(inputValues);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const [colorOpen, setColorOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStateChange = event => {
    const { name, value } = event.target

    name =='status' && value =='3' ? setConfirmation(true) : 
    setInput(name,value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Brand.list();
        setBrandList(result.brandList);
        const color_result = await Color.list();
        setColorList(color_result.colorList);
        const status_result = await Status.list();
        setStatusList(status_result.statusList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleProductSubmit = async () => {
    
  console.log('inputValues',inputValues);
    setpLoading(true);
    setSavebtn(false);
    const response = await Category.edit({
      // cancelToken: this.isTokenSource.token,
      id: inputs.id,
      maincat: inputs.maincat,
      category: inputs.category,
      subcat: inputs.subcat,
      name: inputs.name,
      color_id: inputs.color_id,
      brand_id: inputs.brand_id,
      buying_price: inputs.buying_price,
      description: inputs.description,
      specification: inputs.specification,
      brought: inputs.brought,
      invoice: inputs.invoice,
      rental: inputs.rental,
      meta_keywords: inputs.meta_keywords,
      meta_description: inputs.meta_description,
      status: inputs.status,
    });

    // handleSnackbarClick(true, 'Category Updated Successfully.');
    updateProductList(response);
    // props.handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
    handleEditClose(false);
  };
  function handleConfirmationDialog (response){
    setInput('status', response )
    setConfirmation(false);
  }

  function handleColorInputChange(e){
    handleInputChange(e);
    if(e.target.value==='0'){
      setColorOpen(true);      
    }
  }
  
  function handleColorClose() {
    setColorOpen(false);
  }
  function handleBrandInputChange(e){
    handleInputChange(e);
    if(e.target.value==='0'){
      setBrandOpen(true);      
    }
  }
  
  function handleBrandClose() {
    setBrandOpen(false);
  } 
   function updatedBrandData(response){   
    setBrandList(response);
     
  } function updatedData(response){   
    setColorList(response);
     
  }
  const { inputs, handleInputChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    handleProductSubmit,
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
              {/* <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Update Product Details
              </Typography>
              {/* {savebtn? <Button color="inherit" onClick={handleSubmit}>
                Update
              </Button>: <Button color="inherit" onClick={handleSubmit} disabled>
                Update
              </Button>} */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>

          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          {/* Franchise Details */}
          <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Enter Product Title/Name</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="name"
                      name="name"
                      value={inputs.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      helperText={errors.name}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="productprice">Enter Product Buying Price</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="buyingprice"
                      name="buying_price"
                      value={inputs.buying_price}
                      onChange={handleInputChange}
                      error={errors.buying_price}
                      helperText={errors.buying_price}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="city">Choose Color</InputLabel>
                    <Select
                      value={inputs.color_id}
                      onChange={handleColorInputChange}
                      inputProps={{
                        name: 'color_id',
                        id: 'color_id',
                      }}
                      fullWidth
                      label="Choose Color"
                      required
                      className={classes.drpdwn}
                      error={errors.color_id}
                      helperText={errors.color_id}
                      // className={classes.textsize}
                    >
                    { colorList.map((data, index)=>{
                          return(
                        <MenuItem className={classes.textsize} value={data.id}>{data.color}</MenuItem>
                          )
                      })
                    }
                    <MenuItem className={classes.textsize} value="0" >Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="brand_id">Choose Brand</InputLabel>
                    <Select
                         className={classes.textsize}
                        onChange={handleBrandInputChange}
                        value={inputs.brand_id}
                        inputProps={{
                          name: 'brand_id',
                          id: 'brand_id',
                        }}
                        className={classes.drpdwn}
                        fullWidth
                        label="Choose Brand"
                        required
                        error={errors.brand_id}
                        helperText={errors.brand_id}
                      >
                        { brandList.map((data, index)=>{
                          return(
                        <MenuItem  className={classes.textsize} className={classes.textsize} value={data.id}>{data.brand_name}</MenuItem>
                          )
                      })
                    }                        <MenuItem className={classes.textsize} value="0" >Others</MenuItem>

                    </Select>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="description">Enter Product Description</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        id="description"
                        name="description"
                        fullWidth
                        margin="normal"
                        multiline
                        value={inputs.description}
                        error={errors.description}
                        helperText={errors.description}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="specification">Enter Product Specification</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        id="specification"
                        multiline
                        fullWidth
                        name="specification"
                        margin="normal"
                        value={inputs.specification}
                        onChange={handleInputChange}
                        error={errors.specification}
                        helperText={errors.specification}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Brought From</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="brought"
                      name="brought"
                      value={inputs.brought}
                      onChange={handleInputChange}
                      error={errors.brought}
                      helperText={errors.brought}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Invoice Number</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="invoice"
                      name="invoice"
                      value={inputs.invoice}
                      onChange={handleInputChange}
                      fullWidth
                      error={errors.invoice}
                      helperText={errors.invoice}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Rental Price </InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="rental"
                      name="rental"
                      value={inputs.rental}
                      error={errors.rental}
                      helperText={errors.rental}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Meta Keywords</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="meta_keywords"
                      name="meta_keywords"
                      value={inputs.meta_keywords}
                      onChange={handleInputChange}
                      // error={errors.meta_keywords}
                      // helperText={errors.meta_keywords}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="specification">Meta Description</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        id="meta_description"
                        name="meta_description"
                        multiline
                        margin="normal"
                        fullWidth
                        value={inputs.meta_description}
                        onChange={handleInputChange}
                        // error={errors.meta_description}
                        // helperText={errors.meta_description}
                      />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="status">Choose Status</InputLabel>
                    <Select
                        
                        onChange={handleStateChange}
                        value={inputs.status}
                        inputProps={{
                          name: 'status',
                          id: 'status',
                        }}
                        fullWidth
                        label="Choose Status"
                        required
                        className={classes.drpdwn}
                        error={errors.status}
                        helperText={errors.status}
                      >
                        { statusList.map((datastatus, index)=>{
                          return(
                        <MenuItem className={classes.textsize} value={datastatus.id}>{datastatus.status}</MenuItem>
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  {savebtn? <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
                    Update
                  </Button>:  <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button} disabled>
                    Update
                  </Button>}
                    <Button variant="contained" color="primary" onClick={handleEditClose} className={classes.button}>
                      Close
                    </Button> 
                  </Grid>
                </Grid>
                </Paper>
                
            { colorOpen ?    <AddColor open={colorOpen} handleClose={handleColorClose}  updatedData={updatedData}/> : null }
            { brandOpen ?    <AddBrand open={brandOpen} handleClose={handleBrandClose}  updatedBrandData={updatedBrandData}/> : null }

          </div>
      </form>
      </Dialog>
      <ConfirmationDialog open = {confirmation} lastValue={3} handleConfirmationClose={handleConfirmationDialog}  currentState={inputs.status}  title={"Discontinued"} content={"Do you really want to discontinue this product ?"} />

    </div>
  );
}
