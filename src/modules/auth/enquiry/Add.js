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
  }
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
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [mainCategory, setMainCategory] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enquiry_id = await EnquiryAPI.getnewid();
        console.log('en',enquiry_id);
        let zero = 0;
        if(enquiry_id[0]!=null){  
          zero = 6 - (enquiry_id[0].id.toString().length); 
          let enquiryId='';
          for(let i=0; i< zero ; i++){
            enquiryId += '0';
          }
         setInput('enquiry_id',('E' + enquiryId + (enquiry_id[0].id + 1)));
        }else{
          setInput('enquiry_id','E000001');
        }

        const category_list = await Category.mainCategoryList();
        setMainCategoryList(category_list.mainCategoryList);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
  }, []);
  
  

  function handleMainCategory(event) {
    setMainCategory(event.target.value);
    setCategoryList('');
    setSubCategoryList('');    
    setProductList('');

    const fetchData = async () => {
      try {
        const result = await Category.categoryList({maincategory: event.target.value});
        setCategoryList(result.categoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  }

  function handleCategory(event) {
    setCategory(event.target.value);
    setSubCategoryList('');    
    setProductList('');


    const fetchData = async () => {
      try {
        const result = await Category.subCategoryList({category: event.target.value});
        setSubCategoryList(result.subCategoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  }
  function handleSubCategory(event) {
    console.log(event.target.value)
    setSubCategory(event.target.value);
    setProductList('');

    const fetchData = async () => {
      try {
        const result = await Category.RelatedproductList({subcategory: event.target.value});
        console.log('rrr',result)
        setProductList(result.productList);
        // const result = await Category.productList({subCategory: event.target.value});
        // setSubCategoryList(result.subCategoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  }


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
      interested_product_id: assignInterest,
      is_active: 1,
      converted_to:1,
      convert_by_lead:convert
    });
        // console.log('sahgdaud--',response);

    // assignInterest.length = 0;
    setAssignInterest('');
    handleSnackbarClick(true);
    setEnquiryList(response.enquiryList);
    handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
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
      <Dialog maxWidth="sm" open={open} onClose={handleClose} TransitionComponent={Transition}>
      <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Add Enquiry
              </Typography>
              {/* {savebtn? <Button color="inherit" type="submit">
                save
              </Button>:<Button color="inherit" type="submit" disabled>
                save
              </Button>} */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>
              <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="first_name">Enquiry Id</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="enquiry_id"
                      name="enquiry_id"
                      // label="Enquiry Id"
                      value={inputs.enquiry_id}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      disabled
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="last_name">Customer Name</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="customer_name"
                      name="customer_name"
                      // label="Customer Name"
                      type="text"
                      value={inputs.customer_name} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="contact">Contact *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="contact"
                      name="contact"
                      // label="Contact"
                      type="number"
                      value={inputs.contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                    <Select
                      // multiple
                      value={mainCategory}
                      onChange={handleMainCategory}
                      name= 'main_category'
                      id= 'main_category'
                      className={classes.drpdwn}
                      // label='customer'
                      fullWidth
                      required
                    > 
                    {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data,index)=>{
                      return(
                         <MenuItem className={classes.textsize}  value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="category">Category*</InputLabel>
                    <Select
                      // multiple
                      value={category}
                      onChange={handleCategory}
                      name= 'category'
                      id= 'category'
                      // label='customer'
                      fullWidth
                      className={classes.drpdwn}
                      required
                      disabled = {mainCategory ==""}
                    >    
                     {(categoryList.length > 0 ? categoryList : []).map((data,index)=>{
                      return(
                         <MenuItem className={classes.textsize}  value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                    <Select
                      // multiple
                      value={subCategory}
                      onChange={handleSubCategory}
                      name= 'sub_category'
                      id= 'sub_category'
                      className={classes.drpdwn}
                      // label='customer'
                      fullWidth
                      required
                      disabled = {category ==""}
                    >    
                    {(subCategoryList.length > 0 ? subCategoryList : []).map((data,index)=>{
                      return(
                         <MenuItem className={classes.textsize}  value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="assign_interest">Interested In*</InputLabel>
                    <Select
                      // multiple
                      value={assignInterest}
                      onChange={handleChangeMultiple}
                      inputProps={{
                        name: 'interested_product_id',
                        id: 'interested_product_id',
                        // label:'assign_interest'
                      }}
                      className={classes.textsize}
                      disabled = {subCategory ==""}
                      fullWidth
                      required
                    >
                      {
                        (productList.length != '' ? productList : []).map((data)=> {
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.name}</MenuItem>      
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
