import React, { useState, useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
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

export default function FranchiseTabPannel({value, tabIndex, staffList, currentRole, roles, handleClickEditOpen}) {
  
  const useStyles = makeStyles(theme => ({
  }));

  const classes = useStyles();
  console.log("****************tabIndex****************", tabIndex);

    return (
      staffList ?
    <TabPanel value={value} index={tabIndex}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell>User ID</StyledTableCell>
                      <StyledTableCell>Full Name</StyledTableCell>
                      <StyledTableCell>Role/Position</StyledTableCell>
                      <StyledTableCell>Contact</StyledTableCell>
                      <StyledTableCell>Options</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { (staffList.length > 0 ? staffList : []).map((data, index)=>{
                    if(currentRole === null || data.role.indexOf(currentRole.id.toString()) >= 0) {
                      return(
                        <TableRow key={data.id} >
                          <StyledTableCell> {index + 1}  </StyledTableCell>
                          <StyledTableCell> {data.user_id}  </StyledTableCell>
                          <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                          <StyledTableCell> 
                            {
                            ( (data.role && data.role.split(',')) || []).map((a, index) =>{
                              // console.log("index",index);
                              return(
                                roles.map((ele)=>{
                                  return(
                                    (data.role.split(',').length-1)===index ?
                                    data.role.split(',')[index] == ele.id ? ele.name  :''
                                    :
                                    data.role.split(',')[index] == ele.id ? ele.name + ", " :''
                                  )
                                  })  
                              ) 
                              })
                            }
                              
                          </StyledTableCell>
                            <StyledTableCell>{data.contact}</StyledTableCell>
                            <StyledTableCell>
                            <Tooltip title="Update">                              
                              <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
                              <CreateIcon/>
                              </IconButton>
                            </Tooltip>
                              
                            </StyledTableCell>
                        </TableRow>
                      )
                    }
                   
                    })
                  }
                  </TableBody>
                </Table>
              </TabPanel>
  
  
  : 
  null
  ) 
}