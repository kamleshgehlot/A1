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

// API CALL
import Category from '../../../api/Category';
import Brand from '../../../api/product/Brand';
import Color from '../../../api/product/Color';
import useSignUpForm from '../franchise/CustomHooks';

import { store, useStore } from '../../../store/hookStore';

const RESET_VALUES = {
  category: '',
  type: '',
  parentid: '',
  position: '',
  description: '',
  image: '',
  meta_keywords: '',
  meta_description: '',
  active: '',
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
    marginTop: theme.spacing(2),
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

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
// console.log('hellooooo---------',props.productCatList.category);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Brand.list();
        setBrandList(result.brandList);
        console.log("Brand------------",result.brandList);
        const color_result = await Color.list();
        setColorList(color_result.colorList);
        console.log("Color------------",color_result.colorList);
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
      rental:inputs.rental,
      meta_keywords:inputs.meta_keywords,
      meta_description:inputs.meta_description
    });

    // handleSnackbarClick(true);
    // setCategoryList(response.categoryList);
    // handleReset(RESET_VALUES);
    props.productData(response);
    props.handleClose(false);
  };

  function validate(values) {
    let errors = {};

    return errors;
  };
  
  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    categoryadd,
    validate
  );

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
                Product Creation Panel
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
                    <InputLabel htmlFor="product_name">Enter Product Title/Name</InputLabel>
                    <TextField
                      id="productname"
                      name="productname"
                      value={inputs.productname}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                        { colorList.map((data, index)=>{
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
                        { brandList.map((data, index)=>{
                          return(
                        <MenuItem value={data.id}>{data.brand_name}</MenuItem>
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="productprice">Enter Product Buying Price</InputLabel>
                    <TextField
                      id="productprice"
                      name="productprice"
                      value={inputs.productprice}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="description">Enter Product Description</InputLabel>
                    <TextField
                        id="description"
                        name="description"
                        fullWidth
                        margin="normal"
                        multiline
                        value={inputs.description}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="specification">Enter Product Specification</InputLabel>
                    <TextField
                        id="specification"
                        multiline
                        fullWidth
                        name="specification"
                        margin="normal"
                        value={inputs.specification}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product_name">Brought From</InputLabel>
                    <TextField
                      id="brought_from"
                      name="brought_from"
                      value={inputs.brought_from}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product_name">Invoice Number</InputLabel>
                    <TextField
                      id="invoice"
                      name="invoice"
                      value={inputs.invoice}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product_name">Rental Price </InputLabel>
                    <TextField
                      id="rental"
                      name="rental"
                      value={inputs.rental}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product_name">Meta Keywords</InputLabel>
                    <TextField
                      id="meta_keywords"
                      name="meta_keywords"
                      value={inputs.meta_keywords}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="specification">Meta Description</InputLabel>
                    <TextField
                        id="meta_description"
                        name="meta_description"
                        multiline
                        margin="normal"
                        fullWidth
                        value={inputs.meta_description}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button} 
                      >
                      Save
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                      Clear
                    </Button>
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
