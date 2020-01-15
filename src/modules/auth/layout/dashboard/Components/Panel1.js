import React, { useState, useEffect } from 'react';
import { lighten,makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FilterListIcon from '@material-ui/icons/FilterList';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { Title, EventTracker } from '@devexpress/dx-react-chart';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, BarSeries,Tooltip as ChartTooltip } from "@devexpress/dx-react-chart-material-ui";

import { Card,CardContent, FormControl, Select, MenuItem, FormHelperText,Typography,Tabs,Tab,Box,AppBar,Grid,Paper,Divider,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TableSortLabel,Toolbar,Checkbox,IconButton,Tooltip as MatTooltip,FormControlLabel,Switch, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, InputLabel, Button, TextField, Dialog,List,ListItem,ListItemText,ListItemSecondaryAction } from '@material-ui/core';

// Component Call
import TaskList from './TaskList';
import LeadList from './LeadList';
import {TablePaginationActions} from '../../../../common/Pagination';
//API Calls
import Category from '../../../../../../src/api/Category';
import TaskAPI from '../../../../../api/Task';
import LeadAPI from '../../../../../api/Lead';
import {Run} from '../../../../../api/Run';
import {useCommonStyles} from '../../../../common/StyleComman';
import ViewOrder from '../../../order/Edit';
import { API_URL } from '../../../../../api/Constants';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // display: 'flex',
    maxHeight : 150,
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  appBar: {
    // position: 'relative',
    // height: theme.spacing(5),
    zIndex: theme.zIndex.drawer + 1,
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
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(16),
    // marginTop: 15,
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'productname', numeric: false, disablePadding: true, label: 'Product Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'specification', numeric: false, disablePadding: false, label: 'Specification' },
  { id: 'count', numeric: true, disablePadding: false, label: 'No. of Rented Items' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
 
const EnhancedTableToolbar = ({ numSelected,inputs,setInputs,mainCategoryList,setMainCategoryList,categoryList,setCategoryList,subCategoryList,setSubCategoryList,mainCategory,setMainCategory,category,setCategory,subCategory,setSubCategory,productList,setProductList }) => {
  const classes = useToolbarStyles();
  const setInput = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleMainCategory = async (event) => {
    setInput('main_category', event.target.value)
    setMainCategory(event.target.value);
    setCategoryList(false);
    setSubCategoryList(false);
    setProductList(false);
    setCategory(false);
    setSubCategory(false);

    try {
      const result = await Category.categoryList({ maincategory: event.target.value });
      setCategoryList(result.categoryList);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const handleCategory = async(event) => {
    setInput('category', event.target.value)
    setCategory(event.target.value);
    setSubCategoryList(false);
    setProductList(false);
    setSubCategory(false);

    try {
      const result = await Category.subCategoryList({ category: event.target.value });
      setSubCategoryList(result.subCategoryList);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const handleSubCategory = async (event) => {
    setInput('sub_category', event.target.value)
    setSubCategory(event.target.value);
    setProductList(false);

    try {
      const result = await Category.RelatedproductList({subcategory: event.target.value});
      setProductList(result.productList);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="With Customer" {...a11yProps(0)} />
          <Tab label="Under Repair" {...a11yProps(1)} />
          <Tab label="Replaced" {...a11yProps(2)} />
          <Tab label="Faulty / With Customer" {...a11yProps(3)} />
          <Tab label="Faulty / Under Repair" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
    <div className={classes.root}>
      
      <TabPanel value={value} index={0}>
        With Customer
      </TabPanel>
      <TabPanel value={value} index={1}>
        Under Repair
      </TabPanel>
      <TabPanel value={value} index={2}>
        Replaced
      </TabPanel>
      <TabPanel value={value} index={3}>
        Faulty / With Customer
      </TabPanel>
      <TabPanel value={value} index={4}>
        Faulty / Under Repair
      </TabPanel>
    </div>
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >

<ExpansionPanel style={{boxShadow:'none',width:'100%'}}>
        <ExpansionPanelSummary
        style={{backgroundColor:'transparent',padding:0}}
          expandIcon={<MatTooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </MatTooltip>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

        <Typography className={classes.title} variant="h6" id="tableTitle">
          Product Manager
        </Typography>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container spacing={4} style={{ 'padding': '10px'}}>
            <Grid item xs={12} sm={4}>
                  <InputLabel className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                  <Select
                    // multiple
                    value={inputs.main_category}
                    onChange={handleMainCategory}
                    name='main_category'
                    id='main_category'
                    className={classes.drpdwn}
                                                            // label='customer'
                    fullWidth
                    required
                  >
                    <MenuItem className={classes.textsize} value={false}>All</MenuItem>
                    {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data, index) => {
                      return (
                        <MenuItem key={Math.random()} className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel className={classes.textsize} htmlFor="category">Category*</InputLabel>
                  <Select
                    // multiple
                    value={inputs.category}
                    onChange={handleCategory}
                    name='category'
                    id='category'
                    // label='customer'
                    fullWidth
                    className={classes.drpdwn}
                    required
                    disabled={mainCategory == ""}
                                                          >
                    {(categoryList.length > 0 ? categoryList : []).map((data, index) => {
                      return (
                        <MenuItem key={Math.random()} className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                  <Select
                    // multiple
                    value={inputs.sub_category}
                    onChange={handleSubCategory}
                    name='sub_category'
                    id='sub_category'
                    className={classes.drpdwn}
                    // label='customer'
                    fullWidth
                    required
                    disabled={category == ""}
                                                          >
                    {(subCategoryList.length > 0 ? subCategoryList : []).map((data, index) => {
                      return (
                        <MenuItem key={Math.random()} className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {/* {numSelected > 0 ? (
        <MatTooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </MatTooltip>
      ) : (
        <MatTooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </MatTooltip>
      )} */}
    </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Panel1({roleName, roleId, handleLeadClick,  handleTaskClick}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [value, setValue] = React.useState(0);
  const [taskList, setTaskList] = React.useState([]);
  const [leadList, setLeadList] = React.useState([]);
  const [staff,setstaff]=useState([]);
  const [countdata,setcountdata]=useState([]);
  const [newamountdata,setnewamountdata]=useState([]);
  const [duration,setduration]=useState(30);

  const changeDuration=(e)=>{
    setduration(e.target.value);
  }

const [rows,setrows] = useState([]);

const [inputs,setInputs] = useState([]);
const [mainCategoryList, setMainCategoryList] = useState([]);
const [categoryList, setCategoryList] = useState([]);
const [subCategoryList, setSubCategoryList] = useState([]);
const [mainCategory, setMainCategory] = React.useState(false);
const [category, setCategory] = React.useState(false);
const [subCategory, setSubCategory] = React.useState(false);
const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () =>{
      
      if(roleName!='Super Admin' && roleId !=0){
        const result = await TaskAPI.fetchAssignedTask({
          assign_to_role : roleId,
        });   
        setTaskList(result);
      }
      
      const resultLead = await LeadAPI.fetchLeads();
      setLeadList(resultLead.leadList);
 
        let {data} = await Run('orderamount', {franchise:1,duration});setstaff(data);
        let result = await Run('ordercount', {franchise:1,duration});setcountdata(result.data);
        result = await Run('newamount', {franchise:1,duration});setnewamountdata(result.data);
        result = await Run('productmanager', {franchise:1,mainCategory,category,subCategory});
        console.log(result.data);
        setrows(result.data);
        const {mainCategoryList} = await Category.mainCategoryList();setMainCategoryList(mainCategoryList);
      })();
  },[duration,mainCategory,category,subCategory]);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('count');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderdialogOpen, setorderdialogOpen] = React.useState(false);
  const [viewOrder, setViewOrder] = React.useState(false);
  const [orderdialogdata, setorderdialogdata] = React.useState([]);

  const handleorderDialogClose=(e)=>{
    setorderdialogOpen(!orderdialogOpen);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.productid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    function search(searchValue, arrayName,key){
      let answer=false;
      arrayName.forEach(item => {if(item[key]==searchValue)answer=item;});
      return answer;
  }
    if(!name)return;
    let orders=search(name,rows,'productid');
    if(!orders)return;
    orders=orders.orders;
    if(!orders)return;
    console.log(orders);
    setorderdialogdata(orders);
    setorderdialogOpen(true);

    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }

    // setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}  style={{ width: '100%',background:'transparent' }}>
      {/* <h2 className={classes.labelTitle}>Total Orders Count : {order.length}</h2>
      {order.map((d,i)=>{return <p>{d.first_name} {d.last_name} - {d.order_type==1?'Fixed '+d.total_payment_amt:'Flex '+d.bond_amt}</p> })} */}
      {roleName === "Admin" && <>
      <Grid container spacing={4} style={{textAlign:'center'}}>

      <Grid item xs={12} >
      <FormControl>
        <Select value={duration} onChange={changeDuration} displayEmpty>
          <MenuItem value={7}>Last Week</MenuItem>
          <MenuItem value={30}>Last Month</MenuItem>
          <MenuItem value={365}>Last Year</MenuItem>
        </Select>
        <FormHelperText>Report Duration</FormHelperText>
      </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={12} md={6} >
      <Card><CardContent>
      <Chart data={staff} height={220}>
      <ArgumentAxis showGrid />
      <ValueAxis />
          <EventTracker /><ChartTooltip />
      {/* <LineSeries valueField="value" argumentField="argument" /> */}
      <BarSeries valueField="totalreceived" argumentField="staffname" />
    </Chart>
    <h1>Amount receieved in Active Orders</h1>
      </CardContent></Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
      <Card><CardContent>
      <Chart data={staff} height={220}>
      <ArgumentAxis showGrid />
      <ValueAxis />
          <EventTracker /><ChartTooltip />
      <BarSeries valueField="ordercount" argumentField="staffname" />
      {/* <BarSeries valueField="value" argumentField="argument" /> */}
    </Chart>
    <h1>Active Orders</h1>
      </CardContent></Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
      <Card><CardContent>
      <Chart data={newamountdata} height={220}>
      <ArgumentAxis showGrid />
      <ValueAxis />
          <EventTracker /><ChartTooltip />
      {/* <LineSeries valueField="value" argumentField="argument" /> */}
      <BarSeries valueField="totalreceived" argumentField="staffname" />
    </Chart>
    <h1>Amount recieved in New Orders</h1>
      </CardContent></Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} >
      <Card><CardContent>
      <Chart data={countdata} height={220}>
      <ArgumentAxis showGrid />
      <ValueAxis />
          <EventTracker /><ChartTooltip />
      <BarSeries valueField="totalcount" argumentField="staffname" />
      {/* <BarSeries valueField="value" argumentField="argument" /> */}
    </Chart>
    <h1>New Orders</h1>
      </CardContent></Card>
      </Grid>

      </Grid>
      <br />
      <br />
      </>
}

{(roleName === "CSR") &&
  <>
  <Grid container spacing={4} style={{textAlign:'left'}}>
  <Grid item xs={12} sm={12} md={12} >  
  <div className={classes.root}>
  <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} inputs={inputs} setInputs={setInputs} mainCategoryList={mainCategoryList} setMainCategoryList={setMainCategoryList} categoryList={categoryList} setCategoryList={setCategoryList} subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList} mainCategory={mainCategory} setMainCategory={setMainCategory} category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory} productList={productList} setProductList={setProductList} />
               <Table
       className={classes.table}
       aria-labelledby="tableTitle"
       size={'small'}
       aria-label="caption enhanced table"
          >
<caption><Grid container><Grid item xs={12}>Current Page: {page+1}</Grid></Grid></caption>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>{stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.productid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.productid)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.productid}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}</TableCell>
                      <TableCell align="left">{row.description && row.description.substring(0, 20)}</TableCell>
                      <TableCell align="left">{row.specification && row.specification!=row.description && row.specification.substring(0, 50)}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>

</Grid>
      </Grid>
      <br />
      <br />
</>
}

    <Paper >             
      <Grid container spacing={4}  style={{ 'padding': '10px'}}>  
        <Grid item xs={12} sm={12} >   
          <Typography variant="h6" className={classes.labelTitle} color="primary">
              Latest Lead
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12}>   
          <LeadList leadList={leadList} roleName={ roleName} handleLeadClick={handleLeadClick}/>
        </Grid>
      </Grid>
    </Paper>
  {roleName != 'Super Admin' && roleId != 0 && 
    <Paper >  
      <Grid container spacing={4} style={{ 'padding': '10px'}}>  
        <Grid item xs={12} sm={12}>   
          <Typography variant="h6" className={classes.labelTitle} color="primary">
              Latest Task
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12}>   
          <TaskList taskList={taskList} roleName={roleName} handleTaskClick={handleTaskClick} />   
        </Grid>
      </Grid>
    </Paper>
  }

{orderdialogOpen && <Dialog open={orderdialogOpen} fullScreen style={{marginTop:60}}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Orders
              </Typography>              
              <IconButton size="small" onClick={handleorderDialogClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          <List>
{orderdialogdata.map((orderdata,index)=>{return <ListItem button onClick={()=>{setViewOrder(orderdata);}}><ListItemText
                    primary={orderdata.order_id}
                    secondary={(orderdata.created_at && new Date(orderdata.created_at).toLocaleString())+(orderdata.delivery_date ? new Date(orderdata.delivery_date).toLocaleString(): '')+(orderdata.product_color ? orderdata.product_color:'')+(orderdata.product_brand ? orderdata.product_brand:'')+(orderdata.specification ? orderdata.specification:'')}/>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="view" onClick={()=>{setViewOrder(orderdata);}}>
                      <VisibilityIcon />
                    </IconButton>
                    {orderdata.document ? <a href={API_URL + "/api/download?path=DeliveredDoc/" + orderdata.document }  download >
                    <IconButton edge="end" aria-label="CloudDownload">
                      <CloudDownloadIcon />
                    </IconButton>
                    </a>
                    :
                    <IconButton disabled edge="end" aria-label="CloudDownload">
                      <CloudDownloadIcon />
                    </IconButton>
                    }
                    <FormControl style={{marginLeft:20,marginRight:20}}>
                    <InputLabel shrink>Status</InputLabel>
                    <Select value="With Customer" style={{width:150}}>
                      <MenuItem value="With Customer">With Customer</MenuItem>
                      <MenuItem value="Under Repair">Under Repair</MenuItem>
                      <MenuItem value="Replaced">Replaced</MenuItem>
                      <MenuItem value="Faulty / With Customer">Faulty / With Customer</MenuItem>
                      <MenuItem value="Faulty / Under Repair">Faulty / Under Repair</MenuItem>
                    </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                  </ListItem>;})}
</List>
      </Dialog>}

      {viewOrder ? <ViewOrder open={viewOrder} handleEditClose={()=>{setViewOrder(false);}} handleOrderRecData= {[]} editableData={viewOrder} viewOnly={ true } /> : null}

    </div>
  );
}
