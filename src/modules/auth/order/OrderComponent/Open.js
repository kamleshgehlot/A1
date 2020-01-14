import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CancelIcon from '@material-ui/icons/Cancel';
import CommentIcon from '@material-ui/icons/Comment';
import DoneIcon from '@material-ui/icons/Done';
import ViewArrayIcon from '@material-ui/icons/ViewArray'
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import {getDateInDDMMYYYY} from '../../../../utils/datetime';
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


export default function Open({order, value, roleName, handleAssignToFinance, handlePaymentStatus, handleAssignToDelivery,
  uploadFileSelector, handleDeliveryDoc, handleDelivered, handleEditOpen, createAndDownloadPdf, handleUploadFile, 
  handleClickViewOpen, handleOrderCancellationOpen,  handleDeliveredProductOpen, handleOrderView, handleViewDeliveredDetailOpen, handleOrderArchive,
  page, rowsPerPage, handleChangePage, handleChangeRowsPerPage
}) {
  const styleClass = useCommonStyles();
  
return (  
  <Table stickyHeader >
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Order No.</StyledTableCell>
        <StyledTableCell>Customer Name</StyledTableCell>
        <StyledTableCell>Contact</StyledTableCell>
        {roleName != 'Delivery' ? 
          <StyledTableCell>Order Date</StyledTableCell>
        : ''}
        {roleName != 'Delivery' ? 
        <StyledTableCell>Order Status</StyledTableCell>
        : ''}
        {roleName === 'Delivery' ? 
          <StyledTableCell>Delivery Date</StyledTableCell>
        : ''}
        {roleName === 'Delivery' ? 
          <StyledTableCell>Delivery Time</StyledTableCell>
        : ''}
        {/* <StyledTableCell>Assigned To</StyledTableCell> */}
        <StyledTableCell>Rental Type</StyledTableCell>
        <StyledTableCell>Payment Mode</StyledTableCell>
        <StyledTableCell>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {(order.length > 0 ? order : []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
       return(
        <TableRow key={Math.random()}>
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell>{data.order_id}</StyledTableCell>
          <StyledTableCell>{data.first_name + ' ' + data.last_name}</StyledTableCell>
          <StyledTableCell>{data.mobile}</StyledTableCell>
          {roleName != 'Delivery' ? 
            <StyledTableCell>{getDateInDDMMYYYY(data.order_date)}</StyledTableCell>
          : ''}
          {roleName != 'Delivery' ? 
            <StyledTableCell>{data.order_status_name}</StyledTableCell>
          : ''}
          {roleName === 'Delivery' ? 
            <StyledTableCell>{data.delivery_date}</StyledTableCell>
          : ''}
          {roleName === 'Delivery' ? 
            <StyledTableCell>{data.delivery_time}</StyledTableCell>
          : ''}
          {/* <StyledTableCell>{'In Progress'}</StyledTableCell> */}
          <StyledTableCell>{data.order_type==1 ? 'Fix' : 'Flex'}</StyledTableCell>
          <StyledTableCell>{data.payment_mode_name} </StyledTableCell>     
          {roleName === 'CSR' ? 
              <StyledTableCell>
                
                  <Tooltip title="Update">
                    <span><IconButton size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }} disabled= {data.assigned_to===4}>
                      <EditIcon />  
                    </IconButton></span>
                  </Tooltip>

                  <Tooltip title="Download PDF">
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { createAndDownloadPdf(data); }}>
                      <PrintIcon /> 
                    </IconButton></span>
                  </Tooltip>
                  
                  <input multiple accept="image/*" className={styleClass.input} id="upload_document" type="file" onChange={uploadFileSelector}/>
                    <label htmlFor="upload_document">
                      <Tooltip title="Upload Documents">                              
                        <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} aria-label="upload picture" component="span" onClick={(event) => { handleUploadFile(data.id); }}>
                          <CloudUpload />
                        </IconButton></span>
                      </Tooltip>
                    </label>
                  <Tooltip title="Assign to Finance"  disabled= {data.doc_upload_status===0}>
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handleAssignToFinance(data); }} disabled= {data.doc_upload_status===0}>
                      <SendIcon />
                    </IconButton></span>
                  </Tooltip>
                  <Tooltip title="Archive Order">
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handleOrderArchive(data); }} >
                      <DeleteIcon />
                    </IconButton></span>
                  </Tooltip>
                  
          </StyledTableCell>
        : roleName === 'Finance' ? 
          <StyledTableCell>
                  <Tooltip title="View Order Detail">
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handleOrderView(data); }} >
                      <ViewArrayIcon />  
                    </IconButton></span>
                  </Tooltip>
                  <Tooltip title="View Comment">
                    <span><IconButton  size="small" className={styleClass.fab}  value={data.id} name={data.id} onClick={(event) => { handleClickViewOpen(data.id); }} >
                      <CommentIcon />
                    </IconButton></span>
                  </Tooltip>
                  <Tooltip title="Make Payment">
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handlePaymentStatus(data); }} >
                      <PaymentIcon />  
                    </IconButton></span>
                  </Tooltip>
                  <Tooltip title="Assign to Delivery">
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handleAssignToDelivery(data.id); }} disabled= {data.order_status !==4  || data.assigned_to===5}>
                      <SendIcon />
                    </IconButton></span>
                  </Tooltip>
                  <Tooltip title="View Delivered Product Detail">
                    <span><IconButton  size="small" className={styleClass.fab}  value={data.id} name={data.id} onClick={(event) => { handleViewDeliveredDetailOpen(data); }} disabled = {data.order_status !== 6}>
                      <DoneIcon />
                    </IconButton></span>
                  </Tooltip>
                  <Tooltip title="Cancel Order">
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => { handleOrderCancellationOpen(data); }} >
                      <CancelIcon />  
                    </IconButton></span>
                  </Tooltip>
          </StyledTableCell>
        : roleName === 'Delivery' ? 
          <StyledTableCell>
                <Tooltip title="View Comment">
                      <span><IconButton  size="small" className={styleClass.fab}  value={data.id} name={data.id} onClick={(event) => { handleClickViewOpen(data.id); }} >
                        <CommentIcon />
                      </IconButton></span>
                </Tooltip>
                <Tooltip title="Download Form">
                  <a href={API_URL + "/api/download?path=order/" + data.uploaded_doc }  download >
                  {/* <a href={"server\\files\\order\\" + data.uploaded_doc }  download > */}
                  {/* {inputs.id_proof} */}
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} >
                      <PrintIcon />
                    </IconButton></span>
                  </a>
                </Tooltip>
                <input multiple accept="image/*" className={styleClass.input} id="upload_delivery_doc" type="file" onChange={uploadFileSelector} disabled  = {data.order_status >=6 ? true : false} />
                <label htmlFor="upload_delivery_doc">
                  <Tooltip title="Upload">                              
                    <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} aria-label="upload picture" component="span" onClick={(event) => { handleDeliveryDoc(data.id); }} disabled = {data.order_status >=6 ? true : false}>
                      <CloudUpload />
                    </IconButton></span>
                  </Tooltip>
                </label>                                
                <Tooltip title="proceed to Delivered">
                  <span><IconButton  size="small" className={styleClass.fab} value={data.id} name={data.id} onClick={(event) => {  handleDeliveredProductOpen(data); }} disabled={(data.delivery_doc_uploaded !==1 || data.order_status >=6) ? true : false}>                    
                    <SendIcon />
                  </IconButton></span>
                </Tooltip>                                 
          </StyledTableCell>
          : ''}
      </TableRow>)
     })
   }
              
    </TableBody>
    <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            colSpan={9}
            count={order.length}
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