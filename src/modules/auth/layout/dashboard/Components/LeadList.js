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
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import Task from '../../../task/TaskList';
import LeadAPI from '../../../../../api/Lead';
// import useCommonStyles from '../../../../common/StyleComman';


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

const StyledTableCell = withStyles(theme => ({
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  //   fontSize: theme.typography.pxToRem(13),
  // },
  body: {
    fontSize: 11,
  },
}))(TableCell);



export default function LeadList({leadList, roleName}) {
  // const styleClass = useCommonStyles();
  const [showTask, setShowTask] = useState(false);
  const [franchiseListd, setFranchiseList] = useState({});
  
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

  useEffect(()=>{
    const fetch = async () => {
      const result = await LeadAPI.franchiseList();
      setFranchiseList(result.franchiseList);
    }
    fetch();
  },[])
  // const handleTaskOpen = () =>{
  //   setShowTask(true);
  // }
console.log('lead list, ..ds.fa',leadList)

return (  
  // <Paper className={classes.root}>
  <div>
  <div className={classes.tableWrapper}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell> # </TableCell>
          <TableCell> Lead ID </TableCell>
          <TableCell> For Franchise </TableCell>
          <TableCell> Created by </TableCell>
          <TableCell> Message </TableCell>
          <TableCell> Action </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {(leadList.length > 0 ? leadList : []).map((data, index) => {      
      return(
      <TableRow hover role="checkbox" tabIndex={-1} >        
          <StyledTableCell> {index+1}       </StyledTableCell>
          <StyledTableCell> {data.lead_id}  </StyledTableCell>
          {data.franchise_id!=0 ? 
            (franchiseListd.length > 0 ? franchiseListd : []).map((dataf, index1)=>{
              return( data.franchise_id===dataf.id ?
                <StyledTableCell> {dataf.name} </StyledTableCell> :''
                )
            }) : <StyledTableCell> All</StyledTableCell>
          }
          {data.f_id!=0 ?    
            (franchiseListd.length > 0 ? franchiseListd : []).map((datafr, index1)=>{
              return(
                data.f_id===datafr.id ?
                <StyledTableCell> {datafr.name +'  ('+ datafr.city + ' ,' + datafr.suburb + ' )'} </StyledTableCell> :''
                )
            }) : <StyledTableCell> Master Admin</StyledTableCell>
          }
        <StyledTableCell>{data.message}</StyledTableCell>
      </TableRow>
         );
     })}       
      </TableBody>
    </Table>
  </div>
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={leadList.length}
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
  </div>
// </Paper>
  )
}