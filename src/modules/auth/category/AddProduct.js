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
import InputAdornment from '@material-ui/core/InputAdornment';
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

// API CALL
import Category from '../../../api/Category';
import Brand from '../../../api/product/Brand';
import Color from '../../../api/product/Color';
import Status from '../../../api/product/Status';
import useSignUpForm from '../franchise/CustomHooks';

import { store, useStore } from '../../../store/hookStore';

const RESET_VALUES = {
  productname:'',
  color:'',
  brand:'',
  productprice:'',
  description:'',
  specification:'',
  brought_from:'',
  invoice:'',
  rental:'',
  meta_keywords:'',
  meta_description:'',
  status:''
  
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
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
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  margin:{
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));




const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProduct(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  
  const [isError, setIsError] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [rental, setRental] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  const categoryadd = async () => {
    const response = await Category.addproduct({
      maincat:props.productCatList.maincategory,
      category:props.productCatList.category,
      subcat:props.productCatList.subcategory,
      name:inputs.productname,
      color_id:inputs.color,
      brand_id:inputs.brand,
      buying_price:inputs.productprice,
      description:inputs.description,
      specification:inputs.specification,
      brought:inputs.brought_from,
      invoice:inputs.invoice,
      rental:rental,
      meta_keywords:inputs.meta_keywords,
      meta_description:inputs.meta_description,
      status:inputs.status,
    });
    props.productData(response.categoryList);
    props.handleClose(false);
  };

  function validate(values) {
    let errors = {};

    return errors;
  };
  function handleReset() {
    cleanInputs()
    console.log(inputs);
  };
  
  const { inputs, handleInputChange, handleSubmit,  setInput ,cleanInputs} = useSignUpForm(
    RESET_VALUES,
    categoryadd,
    validate
  );

  function handleRentalChange(e){
    if(!(e.target.value <='0')){
      setRental(e.target.value)
    }
  }
  return (
    <div>
      <Dialog maxWidth="lg" open={props.open} onClose={props.handleClose}>
        <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add Product
              </Typography>
              {/* <Button color="inherit" onClick={handleSubmit}>
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>

          <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="product_name">Enter Product Title/Name</InputLabel> */}
                    
                    <TextField
                      id="productname"
                      name="productname"
                      label="Enter Product Title/Name"
                      value={inputs.productname}
                      fullWidth
                      type="text"
                      margin="dense"
                      required
                      // onKeyPress={(e) => {
                      //   var inputValue = e.which;
                      //   // allow letters and whitespaces only.
                      //   if((inputValue >= 65 && inputValue <= 90) || (inputValue >= 97 && inputValue <= 122) || (inputValue= 32 && inputValue != 0)) {
                         
                      //     console.log('key---',inputValue);
                      //   }
                        
                      // }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="choose_color">Choose Color</InputLabel>
                    <Select
                        name="color"
                        onChange={handleInputChange}
                        value={inputs.color}
                        inputProps={{
                          name: 'color',
                          id: 'color',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Choose Color"
                        required
                      >
                        { (colorList || []).map((data, index)=>{
                          return(
                        <MenuItem value={data.id}>{data.color}</MenuItem>
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="city_selection">Choose Brand</InputLabel>
                    <Select
                        name="brand"
                        onChange={handleInputChange}
                        value={inputs.brand}
                        inputProps={{
                          name: 'brand',
                          id: 'brand',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Choose Brand"
                        required
                      >
                        { (brandList || []).map((data, index)=>{
                          return(
                            <MenuItem value={data.id}>{data.brand_name}</MenuItem>
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="productprice">Enter Product Buying Price</InputLabel> */}
                    <TextField
                      id="productprice"
                      name="productprice"
                      label="Enter Product Buying Price"
                      value={inputs.productprice}
                      onChange={handleInputChange}
                      fullWidth
                      type="number"
                      margin="dense"
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="description">Enter Product Description</InputLabel> */}
                    <TextField
                        id="description"
                        name="description"
                        fullWidth
                        multiline
                        margin="dense"
                        type="text"
                        label="Enter Product Description"
                        value={inputs.description}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="specification">Enter Product Specification</InputLabel> */}
                    <TextField
                        id="specification"
                        multiline
                        fullWidth
                        name="specification"
                        margin="dense"
                        type="text"
                        label="Enter Product Specification"
                        value={inputs.specification}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="product_name">Brought From</InputLabel> */}
                    <TextField
                      id="brought_from"
                      name="brought_from"
                      value={inputs.brought_from}
                      onChange={handleInputChange}
                      fullWidth
                      margin="dense"
                      type="text"
                      label="Brought From"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="product_name">Invoice Number</InputLabel> */}
                    <TextField
                      id="invoice"
                      name="invoice"
                      value={inputs.invoice}
                      onChange={handleInputChange}
                      fullWidth
                      margin="dense"
                      type="text"
                      label="Invoice Number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="product_name">Rental Price </InputLabel> */}
                    <TextField
                      id="rental"
                      name="rental"
                      value={rental}
                      onChange={handleRentalChange}
                      fullWidth
                      required
                      margin="dense"
                      type="number"
                      label="Rental Price"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="product_name">Meta Keywords</InputLabel> */}
                    <TextField
                      id="meta_keywords"
                      name="meta_keywords"
                      value={inputs.meta_keywords}
                      onChange={handleInputChange}
                      fullWidth
                      margin="dense"
                      type="text"
                      label="Meta Keywords"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="specification">Meta Description</InputLabel> */}
                    <TextField
                        id="meta_description"
                        name="meta_description"
                        multiline
                        margin="normal"
                        fullWidth
                        value={inputs.meta_description}
                        onChange={handleInputChange}
                        margin="dense"
                        type="text"
                        label="Meta Description"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="city_selection">Choose Status</InputLabel>
                    <Select
                        name="status"
                        onChange={handleInputChange}
                        value={inputs.status}
                        inputProps={{
                          name: 'status',
                          id: 'status',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Choose Status"
                        required
                      >
                        { (statusList || []).map((datastatus, index)=>{
                          
                          return(datastatus.id!=3 ?
                        <MenuItem value={datastatus.id}>{datastatus.status}</MenuItem>:''
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button} 
                      >
                      Save
                    </Button>
                    {/* <Button variant="contained" color="primary" onClick={handleReset} className={classes.button}>
                      Clear
                    </Button> */}
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
