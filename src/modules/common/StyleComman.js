import { makeStyles } from '@material-ui/core/styles';

export const useCommonStyles = makeStyles(theme => ({
  // root: {
  //   display: 'flex',
  //   flexGrow: 1,
  // },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  // },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },
  // toolbar: theme.mixins.toolbar,
  // title: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'left',
  //   color: theme.palette.text.secondary,
  // },
  // table: {
  //   minWidth: 700,
  // },
  fab:{
    marginRight: theme.spacing(1),
    fontSize: 12
  },
  input: {
    display: 'none',
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },
}));

