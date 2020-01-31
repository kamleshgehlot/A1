import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

// API CALL
import ProductManagerAPI from '../../../../api/ProductManager.js';

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
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  group: {
    // margin: theme.spacing(1, 0),
    fontSize: theme.typography.pxToRem(12),
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },
  dobMsg : {
    marginTop : theme.spacing(-1),
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function CustomerBankDetails({ open, handleClose, orderData, productId, tabValue, setRentedProductList, setRentedOrderList }) {  
  const classes = useStyles();

  const [ploading, setpLoading] = useState(false);
  const [savebtn, setSavebtn] = useState(false);

  const [productStateList, setProductStateList] = useState([]);
  const [proState, setProState] = useState(orderData.product_status);

  useEffect(() => {
    getProductState();
  },[]);

  const getProductState = async () => {
    try{
      const result = await ProductManagerAPI.getProductState({});
      setProductStateList(result.stateList);
    }catch(error){
      console.log('Error...', error);
    }
  }
  
  const handleSubmit = async () =>{
    setpLoading(true);
    setSavebtn(true);
    try{
      const result = await ProductManagerAPI.changeProductState({
        orderId : orderData.id,
        customerId: orderData.customer_id,
        productId : productId,
        tabValue: tabValue,
        newState: proState,
      });
      setRentedProductList(result.productList);
      setRentedOrderList(result.orderList);
      setpLoading(false);
      setSavebtn(false);
      handleClose(false);
    }catch(error){ 
      console.log('Error...', error)
    }
  }

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Update Product State
              </Typography>
            <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="acc_holder_name">Select State *</InputLabel>
                  <Select                      
                    value={proState}
                    onChange={(e)=>{setProState(e.target.value)}}
                    name= 'productState'
                    id= 'productState'
                    fullWidth
                    className={classes.textsize}
                    required
                    error={ proState === '' ? 'State is required' : ''}
                    helperText={proState === '' ? 'State is required' : ''}
                  > 
                    {(productStateList.length > 0 ? productStateList : []).map((data)=>{
                    return(
                      <MenuItem className={classes.textsize} value={data.id}>{data.state_name}</MenuItem>  
                      )
                    })}
                  </Select>
              </Grid>             
              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" className={classes.button} onClick = {handleSubmit} disabled= {savebtn == true}> Submit </Button> 
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}> Close </Button> 
            </Grid>
          </Grid>
          </Paper>
        </div>
      </Dialog>
    </div>
  );
}
