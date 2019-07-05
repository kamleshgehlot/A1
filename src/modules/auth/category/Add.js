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

import AddMainCategory from './AddMainCategory';
import AddCategory from './AddCategory';
import AddSubcategory from './AddSubcategory';
import AddProduct from './AddProduct';
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
    marginTop: theme.spacing(2),
    textAlign: "center",
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

export default function Add({ open, handleClose, handleSnackbarClick, updateProductList}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newDataList, setNewDataList] = useState([]);
  const [newCatDataList, setNewCatDataList] = useState([]);
  const [newSubCatDataList, setNewSubCatDataList] = useState([]);
  
  const [productCatList, setProductCatList] = useState([]);

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [mainOpen, setMainOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [subcatOpen, setSubCatOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const categoryadd = async () => {
    const response = await Category.add({
      // cancelToken: this.isTokenSource.token,

      // category: inputs.category,
      // type: inputs.type,
      // parentid: inputs.parentid,
      // position: inputs.position,
      // description: inputs.description,
      // image: inputs.image,
      // meta_keywords: inputs.meta_keywords,
      // meta_description: inputs.meta_description,
      // active: inputs.active,
    });

    handleSnackbarClick(true);
    setCategoryList(response.categoryList);
    handleReset(RESET_VALUES);
    handleClose(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Category.list();
        setCategoryList(result.categoryList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  function newData(newdata){
    setNewDataList(newdata);
    console.log(newdata);

  }
  function updatedData(response){
    
    setCategoryList(response);

    (response).map(ele =>{
      return(
      // ele.category == newDataList.maincategory ? console.log( ele.id ): ''
      console.log(newDataList)
      )
    });
  }

  function productData(newdata){
    console.log("newdat",newdata);
    updateProductList(newdata);
    // setProductList(newdata);
    // updateProductList(newdata);
    handleClose(false);
  }
  function newCatData(newdata){
    setNewCatDataList(newdata);
    console.log(newdata);

  }
  function updatedCatData(response){
    
    setCategoryList(response);

    (response).map(ele =>{
      return(
      // ele.category == newDataList.maincategory ? console.log( ele.id ): ''
      console.log(newCatDataList)
      )
    });
  }

  
  function newSubCatData(newdata){
    setNewSubCatDataList(newdata);
    console.log(newdata);

  }
  function updatedSubCatData(response){
    
    setCategoryList(response);

    (response).map(ele =>{
      return(
      // ele.category == newDataList.maincategory ? console.log( ele.id ): ''
      console.log(newSubCatDataList)
      )
    });
  }
  const handleSelectInputChange = e =>{
    console.log(e.target.value);
    console.log('name',e.target.name);
    handleInputChange(e);
    if(e.target.value==='0'){
      setMainOpen(true);
    }
    else{
      setProductCatList({
        ...productCatList, 'maincategory': e.target.value
      });
    }
  };
  
  const handleSelectCatInputChange = e =>{
    console.log(e.target.value);
    handleInputChange(e);
    if(e.target.value==='0'){
      setCatOpen(true);
    }
    else{
      setProductCatList({
        ...productCatList, 'category': e.target.value
      });
    }
  };
  
  const handleSelectSubcatInputChange = e =>{
    console.log(e.target.value);
    handleInputChange(e);
    if(e.target.value==='0'){
      setSubCatOpen(true);
    }
    else{
      setProductCatList({
        ...productCatList, 'subcategory': e.target.value
      });
    }
  };

  function openProductDialog(){
    setProductOpen(true);
  }
  function handleProductClose() {
    setProductOpen(false);
  }
  function handleMainClose() {
    setMainOpen(false);
  }
  function handleCatClose() {
    setCatOpen(false);
  }
  function handleSubCatClose() {
    setSubCatOpen(false);
  }

  function validate(values) {
    let errors = {};

    return errors;
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    categoryadd,
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
              {/* <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel1a-header"
              > */}
                <Typography className={classes.heading}>Category Details</Typography>
              {/* </ExpansionPanelSummary> */}

              
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="city_selection">Select Main Category</InputLabel>
                    <Select
                        name="maincat"
                        onChange={handleSelectInputChange}
                        value={inputs.maincat}
                        inputProps={{
                          name: 'maincat',
                          id: 'maincat',
                        }}
                        defaultValue='Shah'
                        className={classes.margin}
                        fullWidth
                        label="Main Category"
                        required
                      >
                        { categoryList.map((data, index)=>{
                          
                              return(data.type===1 ? 
                            <MenuItem value={data.id}>{data.category}</MenuItem>
                            :''
                              )
                          })
                        }
                        <MenuItem value="0" >Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="city_selection">Select Category</InputLabel>
                    <Select
                        name="cat"
                        onChange={handleSelectCatInputChange}
                        value={inputs.cat}
                        inputProps={{
                          name: 'cat',
                          id: 'cat',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Category Type"
                        required
                      >
                       { categoryList.map((data, index)=>{
                          
                          return(data.type===2 ? 
                        <MenuItem value={data.id}>{data.category}</MenuItem>
                        :''
                          )
                      })
                    }
                    <MenuItem value="0">Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="city_selection">Select Sub Category</InputLabel>
                    <Select
                        name="subcat"
                        onChange={handleSelectSubcatInputChange}
                        value={inputs.subcat}
                        inputProps={{
                          name: 'subcat',
                          id: 'subcat',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Sub Category"
                        required
                      >
                      { categoryList.map((data, index)=>{
                         
                         return(data.type===3 ? 
                       <MenuItem value={data.id}>{data.category}</MenuItem>
                       :''
                         )
                     })
                   }
                   <MenuItem value="0">Others</MenuItem>
                    </Select>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" onClick={openProductDialog} className={classes.button} 
                      >
                     Add Product
                    </Button>
                    
                  </Grid>
                
              </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel> 
            <AddMainCategory open={mainOpen} handleClose={handleMainClose}  updatedData={updatedData} newData={newData}/>
             
            <AddCategory open={catOpen} handleClose={handleCatClose} updatedCatData={updatedCatData} newCatData={newCatData} />           
            <AddSubcategory open={subcatOpen} handleClose={handleSubCatClose} updatedSubCatData={updatedSubCatData} newSubCatData={newSubCatData}  />       
            <AddProduct open={productOpen} handleClose={handleProductClose} productCatList={productCatList} productData={productData} />   
         {/* Category creation old code  */}
          {/* <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="franchaise_name">Category Name </InputLabel>
                    <TextField
                    id="category"
                    name="category"
                    value={inputs.category}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="city_selection">Select Category Type</InputLabel>
                  <Select
                      name="type"
                      onChange={handleInputChange}
                      value={inputs.type}
                      inputProps={{
                        name: 'type',
                        id: 'type',
                      }}
                      fullWidth
                      label="Category Type"
                      required
                    >
                      <MenuItem value="1">Main Category</MenuItem>
                      <MenuItem value="2">Category</MenuItem>
                      <MenuItem value="3">Sub Category</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                  <InputLabel htmlFor="franchaise_name">Position</InputLabel>
                  <TextField
                      id="position"
                      name="position"
                      value={inputs.position}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                   <Grid item xs={12} sm={6}>

                    <InputLabel htmlFor="company_name">Image </InputLabel>
                    <TextField
                      id="image"
                      label="Image"
                      type="file"
                      margin="normal"
                      fullWidth
                    />

                </Grid> 
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="metak">Meta Keywords</InputLabel>
                  <TextField
                      id="meta_keywords"
                      name="meta_keywords"
                      value={inputs.meta_keywords}
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInputChange}
                    />

                </Grid>
                  <Grid item xs={12} sm={6}>

                  <InputLabel htmlFor="metad">Meta Description</InputLabel>
                  <TextField
                      id="meta_description"
                      name="meta_description"
                      value={inputs.meta_description}
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleInputChange}
                    />

                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <TextField
                      id="description"
                      name="description"
                      value={inputs.description}
                      multiline
                      fullWidth
                      rows="4"
                      onChange={handleInputChange}
                    />
                  </Grid>

              </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel> */}
          </div>
      </form>
      </Dialog>
    </div>
  );
}
