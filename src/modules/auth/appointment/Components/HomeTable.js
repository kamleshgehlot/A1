import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';

import {TablePaginationActions} from '../../../common/Pagination';

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

const useStyles = makeStyles(theme => ({
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
  },
}));

export default function HomeTable({membersList, roleList, anchorEl, setAnchorEl, handleOptionsOpen, 
  handleOptionsClose, handleBookAppointment, handleViewAppointment, handleUpdateTimeSlot, 
  page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  
  const classes = useStyles();    
  
    return (  
    <Grid container spacing={2} alignItems = "center">
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" className={classes.labelTitle}> Franchise Members </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <StyledTableCell>#        </StyledTableCell>
              <StyledTableCell>Name       </StyledTableCell>
              <StyledTableCell>Designation  </StyledTableCell>
              <StyledTableCell>Contact    </StyledTableCell>
              <StyledTableCell>Email Id    </StyledTableCell>
              <StyledTableCell>Options    </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>        
              {membersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,index) => {
                return(
                  <TableRow key={data.id}>
                      <StyledTableCell>  {index + 1}           </StyledTableCell>
                      <StyledTableCell> {data.name}  </StyledTableCell>
                      <StyledTableCell> 
                        {( (data.role_id && data.role_id.split(',')) || []).map((a, index) =>{
                          return(
                            (roleList != undefined && roleList != null && roleList.length > 0 ? roleList : []).map((ele)=>{
                              return(
                                (data.role_id.split(',').length-1)===index ?
                                data.role_id.split(',')[index] == ele.id ? ele.name  :''
                                :
                                data.role_id.split(',')[index] == ele.id ? ele.name + ", " :''
                              )
                              })
                            )
                        })}
                      </StyledTableCell>
                      <StyledTableCell> {data.contact}</StyledTableCell>
                      <StyledTableCell> {data.email}</StyledTableCell>                  
                      <StyledTableCell>
                        <div>
                          <Tooltip title="Options">
                            <IconButton  size="small" component="span" onClick = {(event)=>handleOptionsOpen(event, data)}>
                              <MoreVertIcon/>
                            </IconButton>
                          </Tooltip>
                          <Popover                            
                            open={Boolean(anchorEl)}
                            anchorEl = {anchorEl}
                            onClose={handleOptionsClose}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <List component="nav" >
                              <ListItem button>
                                <ListItemText  primary="Book Appointment" onClick={handleBookAppointment}/>
                              </ListItem>
                              <ListItem button>
                                <ListItemText  primary="View Appointment" onClick = {handleViewAppointment} />
                              </ListItem>
                              <ListItem button>
                                <ListItemText  primary="Update Timeslot" onClick = {handleUpdateTimeSlot} />
                              </ListItem>
                            </List>
                          </Popover>
                        </div>
                  </StyledTableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                colSpan={6}
                count={membersList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>    
      </Grid>
    </Grid>
  )
}