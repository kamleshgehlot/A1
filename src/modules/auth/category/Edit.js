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
}));


const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [category, setCategory] = useState(props.datarow)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setCategory(props.datarow)
  }, [props]);

  const handleInputChange = event => {
    const { name, value } = event.target

    setCategory({ ...category, [name]: value })
  }

  const handleSubmit = async () => {
    const response = await Category.edit({
      // cancelToken: this.isTokenSource.token,
      id: category.id,
      category: category.category,
      type: category.type,
      position: category.position,
      description: category.description,
      meta_keywords: category.meta_keywords,
      meta_description: category.meta_description,
      active: category.active,
    });

    props.handleSnackbarClick(true, 'Category Updated Successfully.');
    props.setCategoryList(response.categoryList);
    // props.handleReset(RESET_VALUES);
    props.handleEditClose(false);
  };
    
  return (
    <div>
      <Dialog maxWidth="lg" open={props.open} onClose={props.handleEditClose} TransitionComponent={Transition}>
      <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={props.handleEditClose} aria-label="Close">
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
          <ExpansionPanel
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
                    onChange={handleInputChange}
                    fullWidth
                    value={category.category}
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
                      value={category.type}
                      inputProps={{
                        name: 'type',
                        id: 'type',
                      }}
                      fullWidth
                      label="Category Type"
                      required
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem value="Main Category">Main Category</MenuItem>
                      <MenuItem value="Category">Category</MenuItem>
                      <MenuItem value="Sub Category">Sub Category</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                  <InputLabel htmlFor="franchaise_name">Position</InputLabel>
                  <TextField
                      id="position"
                      name="position"
                      value={category.position}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>

                    <InputLabel htmlFor="company_name">Image </InputLabel>
                    <TextField
                      id="image"editdata
                      label="Image"
                      type="file"
                      margin="normal"
                      fullWidth
                    />

                </Grid> */}
                  <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="metak">Meta Keywords</InputLabel>
                  <TextField
                      id="meta_keywords"
                      name="meta_keywords"
                      value={category.meta_keywords}
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
                      value={category.meta_description}
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
                      value={category.description}
                      multiline
                      fullWidth
                      // value={editdata.description}
                      rows="4"
                      onChange={handleInputChange}
                    />
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
