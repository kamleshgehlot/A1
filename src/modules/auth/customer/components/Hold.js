import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/send';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import DetailsIcon from '@material-ui/icons/Details';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';

import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';

import {TablePaginationActions} from '../../../common/Pagination';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 1000
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  }
}));


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(13),
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);

export default function Hold({customerList, handleClickEditOpen, handleOpenEditBudget, handleClickCommentOpen, handleHistoryOpen , handleBankDetailOpen }) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, customerList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };    
  

return (  
    <Table stickyHeader  className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>#        </StyledTableCell>
          <StyledTableCell>Name       </StyledTableCell>
          <StyledTableCell>Contact    </StyledTableCell>
          <StyledTableCell>Email ID   </StyledTableCell>
          <StyledTableCell>Address    </StyledTableCell>
          <StyledTableCell>Created By </StyledTableCell>
          <StyledTableCell>Options    </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>        
          {customerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,index) => {
          // (customerList.length > 0 ? customerList : []).map((data, index) => {
            return(
              <TableRow key={data.id}>
                  <StyledTableCell> {data.id}         </StyledTableCell>
                  <StyledTableCell> {data.customer_name}  </StyledTableCell>
                  <StyledTableCell> {data.mobile === '' || data.mobile === null || data.mobile === undefined ? data.telephone : data.telephone==='' || data.telephone === null || data.telephone === undefined ? data.mobile : data.mobile + ', ' + data.telephone}  </StyledTableCell>
                  <StyledTableCell> {data.email} { data.is_verified ? <CheckCircleIcon style={{ fill: '#008000' }}/> : <CancelIcon  color="error"/>}</StyledTableCell>
                  <StyledTableCell> {data.address}  </StyledTableCell>
                  <StyledTableCell> {data.created_by_name}  </StyledTableCell>
                  <StyledTableCell>                              
                    <Tooltip title="Update">                              
                      <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
                      <CreateIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Budget">                              
                      <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleOpenEditBudget(data); }}>
                      <AccountBalanceIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Bank Detail">                              
                      <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleBankDetailOpen(data); }}>
                      <DetailsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                      <IconButton  size="small" className={classes.fab}  value={data.id} name={data.id} onClick={(event) => { handleClickCommentOpen(data); }} >
                        <CommentIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Budget History">                              
                      <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleHistoryOpen(data); }}>
                        <UpdateIcon />
                      </IconButton>
                    </Tooltip>
               </StyledTableCell>
               </TableRow>
             )
          })
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            colSpan={7}
            count={customerList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>    
  )
}