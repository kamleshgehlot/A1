import React from 'react';

import StyledTreeItem from './StyledTreeItem'

export default function Tab({labelIcon, handleClick, labelText, nodeId, roleId, roleName}) {
  return <StyledTreeItem
          nodeId={nodeId}
          labelText={labelText}
          labelIcon={labelIcon}
          // labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"                  
          onClick={(event) => { handleClick(roleName, roleId); }}
        />   
}