import React from 'react';
import {  IxMenu, IxMenuItem } from '@siemens/ix-react';
import { Link } from 'react-router-dom';

const IntegratedNavbar = () => {
  const menuStyle = {
    backgroundColor: '#23223d',
    color: 'white',
    textDecoration: 'none',
    height: 'top',
    width: '100%',
  };


  return (
      <IxMenu
        style={menuStyle}
        class="breakpoint-md expanded"
      >
        <Link to="/" style={menuStyle}>
          <IxMenuItem home icon="home">Home</IxMenuItem>
        </Link>

        <Link to="/highlights" style={menuStyle}>
          <IxMenuItem icon="barchart">Highlights</IxMenuItem>
        </Link>

        <Link to="/camera" style={menuStyle}>
          <IxMenuItem icon="photo-camera">Camera</IxMenuItem>
        </Link>

        <Link to="/zone-graph" style={menuStyle}>
          <IxMenuItem icon="ink-pen">Zone Graph</IxMenuItem>
        </Link>
{/* 
        <IxMenuCategory label="Violations" icon="warning">
          <Link to="/violation" style={menuStyle}>
            <IxMenuItem>Hardhat</IxMenuItem>
          </Link>
          
          <Link to="/violation" style={menuStyle}>
            <IxMenuItem>Restricted Zone</IxMenuItem>
          </Link>

          <Link to="/violation" style={menuStyle}>
            <IxMenuItem>Prohibited Object</IxMenuItem>
          </Link>
        </IxMenuCategory> */}
      </IxMenu>
  );
};

export default IntegratedNavbar;
