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
  // root: {
  //   padding: theme.spacing(3, 2),
  // },
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
}));


const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick, inputs, updateProductList}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [product, setProduct] = useState(inputs);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target

    name =='status' && value =='3' ? setConfirmation(true) : 
    setProduct({ ...product, [name]: value })
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

  console.log(product);
  const handleSubmit = async () => {
    const response = await Category.edit({
      // cancelToken: this.isTokenSource.token,
      id: product.id,
      maincat: product.maincat,
      category: product.category,
      subcat: product.subcat,
      name: product.name,
      color_id: product.color_id,
      brand_id: product.brand_id,
      buying_price: product.buying_price,
      description: product.description,
      specification: product.specification,
      brought: product.brought,
      invoice: product.invoice,
      rental: product.rental,
      meta_keywords: product.meta_keywords,
      meta_description: product.meta_description,
      status: product.status,
    });

    // handleSnackbarClick(true, 'Category Updated Successfully.');
    updateProductList(response);
    // props.handleReset(RESET_VALUES);
    handleEditClose(false);
  };
  function handleConfirmationDialog (response){
    setProduct({ ...product,'status': response })
    setConfirmation(false);
  }
  return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleEditClose} TransitionComponent={Transition}>
      <form >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Category Update Panel
              </Typography>
              <Button color="inherit" onClick={handleSubmit}>
                Update
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>

          {/* Franchise Details */}
          <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product_name">Enter Product Title/Name</InputLabel>
                    <TextField
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="productprice">Enter Product Buying Price</InputLabel>
                    <TextField
                      id="buyingprice"
                      name="buying_price"
                      value={product.buying_price}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="city">Choose Color</InputLabel>
                    <Select
                      value={product.color_id}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'color_id',
                        id: 'color_id',
                      }}
                      fullWidth
                      label="Choose Color"
                      required
                      className={classes.margin}
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
                    <InputLabel htmlFor="brand_id">Choose Brand</InputLabel>
                    <Select
                        
                        onChange={handleInputChange}
                        value={product.brand_id}
                        inputProps={{
                          name: 'brand_id',
                          id: 'brand_id',
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
                    <InputLabel htmlFor="description">Enter Product Description</InputLabel>
                    <TextField
                        id="description"
                        name="description"
                        fullWidth
                        margin="normal"
                        multiline
                        value={product.description}
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
                        value={product.specification}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="product_name">Brought From</InputLabel>
                    <TextField
                      id="brought"
                      name="brought"
                      value={product.brought}
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
                      value={product.invoice}
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
                      value={product.rental}
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
                      value={product.meta_keywords}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="specification">Meta Description</InputLabel>
                    <TextField
                        id="meta_description"
                        name="meta_description"
                        multiline
                        margin="normal"
                        fullWidth
                        value={product.meta_description}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="status">Choose Status</InputLabel>
                    <Select
                        
                        onChange={handleInputChange}
                        value={product.status}
                        inputProps={{
                          name: 'status',
                          id: 'status',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Choose Status"
                        required
                      >
                        { statusList.map((datastatus, index)=>{
                          return(
                        <MenuItem value={datastatus.id}>{datastatus.status}</MenuItem>
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                </Grid>
                </Paper>
          </div>
      </form>
      </Dialog>
      <ConfirmationDialog open = {confirmation} lastValue={3} handleConfirmationClose={handleConfirmationDialog}  currentState={product.status}  title={"Discontinued"} content={"Do you really want to discontinue this product ?"} />

    </div>
  );
}
