import React, {useEffect, useState} from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/send';
import TablePagination from '@material-ui/core/TablePagination';

import Task from '../../../task/TaskList';
// import useCommonStyles from '../../../../common/StyleComman';

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



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 200,
    overflow: 'auto',
  },
  tableCellFontSize: {
    fontSize: '12px',
  },
});



export default function TaskList({taskList, roleName}) {
  // const styleClass = useCommonStyles();
  const [showTask, setShowTask] = useState(false);
  
  const handleTaskOpen = () =>{
    setShowTask(true);
  }

  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

return (  
  <div>
    <div className={classes.tableWrapper}>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>Task Id</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Assigned By</TableCell>
        <TableCell>Due Date</TableCell>
        <TableCell>Action</TableCell>        
      </TableRow>
    </TableHead>
    <TableBody>
    {(taskList.length > 0 ? taskList : []).map((data, index) => {      
      return(
        <TableRow hover role="checkbox" tabIndex={-1} >        
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell>{data.task_id}</StyledTableCell>
          <StyledTableCell>{data.task_description}</StyledTableCell>
          <StyledTableCell> {data.task_created_by_name + " (" + data.creator_role + ")"}</StyledTableCell>
          <StyledTableCell>{data.due_date}</StyledTableCell>
          <StyledTableCell> 
            {/* <Button variant="outlined" size="small" color="primary" onClick={handleTaskOpen}>View Task</Button> */}
        </StyledTableCell>
      </TableRow>
      )      
    })
  }                              
    </TableBody>
  </Table>
  </div>
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={taskList.length}
    rowsPerPage={rowsPerPage}
    page={page}
    backIconButtonProps={{
      'aria-label': 'previous page',
    }}
    nextIconButtonProps={{
      'aria-label': 'next page',
    }}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />
  
  { showTask ? <Task roleName={roleName}/> : null }
  </div>
  )
}