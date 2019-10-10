import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import MasterAdmin from './MasterAdmin';
import Admin from './Admin';
import CSR from './CSR';
import Finance from './Finance';
import Delivery from './Delivery';
import MasterStaff from './MasterStaff';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  }
}));


export default function MainDashboard({roleName, roleId, handleLeadClick }) {
  const classes = useStyles();
  // const [roleId, setRoleId] = useState();
// console.log('dash rolenam',roleName, roleId)
  // useEffect(() => {
  //   let roleId='';

  //   switch (roleName[0]) {
  //     case 'Super Admin': roleId = 1;
  //       break;
  //     case 'Admin': roleId = 2;
  //       break;
  //     case 'CSR' :  roleId = 3;
  //       break;
  //     case 'Finance' :  roleId = 4;
  //       break;
  //     case 'Delivery' :  roleId = 5;
  //       break;
  //     case 'HR' :  roleId = 6;
    
  //     default: break;
  //   }
  //   setRoleId(roleId);
  // });

  return (    
    <div className={classes.root}>      
       {roleName === "Super Admin" && <MasterAdmin roleName={roleName} roleId={roleId} />}
       {roleName === "Admin" && <Admin roleName={roleName} roleId={roleId} />}
       {roleName === "CSR" && <CSR roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}/>}
       {roleName === "Finance" && <Finance roleName={roleName} roleId={roleId} />}
       {roleName === "Delivery" && <Delivery roleName={roleName} roleId={roleId} />}
       {roleId === 0 && <MasterStaff roleName={roleName} roleId={roleId} />}
    </div>
  );
}
