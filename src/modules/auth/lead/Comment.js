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
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// API CALL
import UserAPI from '../../../api/User';
import Lead from '../../../api/Lead';


const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
   
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(18),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
export default function Comment({open, handleViewClose, handleSnackbarClick, inputs}) {
  const classes = useStyles();
  
  const [expanded, setExpanded] = React.useState('panel1');
  const [staffList, setStaffList] = useState({});
  const [leadList, setLeadList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseList, setFranchiseList] = useState({});

  const addComment = async () => {
    const response = await Lead.comment({
      lead_id: leadList.lead_id,
      comment:inputs.comment,
      comment_by: inputs.comment_by
    });
    handleSnackbarClick(true);
    handleViewClose(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await UserAPI.list();
        setFranchiseList(result.userList);
        console.log('usrlist---',result.userList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, []);

  const handleInputChange = e =>
    setInputs({
    ...inputs,
    [e.target.name]: e.target.value,
  });
  return (
    <div>
      <Dialog maxWidth="lg" open={open} onClose={handleViewClose} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleViewClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                View Lead
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="lead">Lead ID</InputLabel>
                    <TextField
                      id="lead_id"
                      name="lead_id"
                      label=""
                      value={leadList.lead_id}
                      fullWidth
                      required
                      type="text"
                      disabled
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel htmlFor="last_name">Franchise</InputLabel>
                      <Select
                        value={leadList.franchise_id}
                        inputProps={{
                          name: 'franchise_id',
                          id: 'franchise_id',
                          label:'franchise_id'
                        }}
                        className={classes.drpdwn}
                        fullWidth
                        label="franchise_id"
                      >
                      <MenuItem disabled  value="" selected>Select Franchise
                      </MenuItem>
                          {(franchiseList.length > 0 ? franchiseList : []).map(data => {
                          return (
                            <MenuItem value={data.franchise_id} >{data.franchise_name}</MenuItem>
                          );
                        })}
                        <MenuItem value={0}>{'Other'}</MenuItem> 
                      </Select>
                  </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        margin="dense"
                        id="otherFranchiseValue"
                        name="otherFranchiseValue"
                        label="Enter Franchise Name"
                        type="text"
                        value={leadList.franchise_name} 
                        required
                        disabled 
                        fullWidth
                      />
                    </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="contact">Upload Doc/Photo</InputLabel>
                    <TextField
                      margin="dense"
                      id="upload"
                      name="upload"
                      type="file"
                      disabled 
                      value={leadList.upload} 
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="email">Email Id *</InputLabel> */}
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      value={leadList.message}
                      fullWidth
                      required
                      disabled 
                      multiline
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {/* <InputLabel htmlFor="email">Email Id *</InputLabel> */}
                    <TextField
                      id="comment"
                      name="comment"
                      label="Comment"
                      value={leadList.comment}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      multiline
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {/* <InputLabel htmlFor="email">Email Id *</InputLabel> */}
                    <TextField
                      id="comment_by"
                      name="comment_by"
                      label="Comment By"
                      value={leadList.comment_by}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={addComment} type="submit">
                      Post Comment
                    </Button>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel> 
            
            
          </div>
        </from>
      </Dialog>
    </div>
  );
}
