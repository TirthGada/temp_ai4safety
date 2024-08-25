import React from 'react';
import './Highlight.css'; // Import your specific styles
import { IxIcon } from '@siemens/ix-react';

const Highlight = () => {
  return (
    <div className="highlight-page">
      <div className="top-section">
        <div className="overview-section">
          <h2>Overview</h2>
        </div>
        <div className="user-info">
          <div className="username">Admin</div>
          <IxIcon name="user-filled" size="16"></IxIcon>
        </div>
      </div>
      <div className="boxes-section">
        {/* Active Cameras Box */}
        <div className="box">
          <p>Active Cameras</p>
          <h1>1</h1>
        </div>
        {/* Violations Box */}
        <div className="box">
          <p>Violations</p>
          <h1>3</h1>
        </div>
        {/* Configuration Box */}
        <div className="box">
          <p>Configuration</p>
          <h1>2</h1>
        </div>
        {/* Placeholder Box */}
        <div className="box">
          <p>Placeholder</p>
          <h1>1</h1>
        </div>
      </div>
      {/* Horizontal rectangle for graph */}
      <div className="graph-section">
   
        <div style={{ width: '30%', display: 'inline-block', verticalAlign: 'top' }}>
          <div className="vertical-box">
            <p>Total Violations</p>
            <h1>X</h1>
          </div>
          <div className="vertical-box">
            <p>Helmet Violations</p>
            <h1>X</h1>
          </div>
          <div className="vertical-box">
            <p>Restricted Zone Entries</p>
            <h1>X</h1>
          </div>
          <div className="vertical-box">
            <p>Prohibited Objects Detected</p>
            <h1>X</h1>
          </div>
        </div>
      </div>
      {/* Additional rectangular boxes */}
      <div className="additional-boxes">
        <div className="additional-box">
          <div className="box-header">
            <h2>Camera 1 (Lawn)</h2>
            <div className="dropdown-box">
              {/* Placeholder for dropdown */}
              <select>
                <option>V1.0</option>
                <option>V2.2</option>
              </select>
            </div>
          </div>
          <p style={{ fontSize: "15px", marginTop: "-10px" }}>Group: Support</p>
          <div className="field-row" style={{ marginTop: '-1px' }}>
            <b>Number of Violations</b>
            <span>1</span>
          </div>
          <div className="field-row" style={{ marginTop: '22px', marginBottom: '8px' }}>
            <b>Up time</b>
            <span>24h 0m 3s</span>
          </div>
          <div className="field-row" style={{ marginTop: '15px' }}>
            <b>Last restarted on</b>
            <span>9-Jan-2022</span>
          </div>
          <div className="field-row">
            <b>Accuracy</b>
            <span>86%</span>
          </div>
        </div>
        <div className="additional-box">
          <div className="box-header" style={{ marginBottom: '30px' }}>
            <h2>Configuration</h2>
            <span style={{ color: "#3751FF", padding: "5px" }}>View all</span>
          </div>
          <div className="field-row">
            <span style={{ color: 'grey' }}>Configure camera</span>
            <div style={{ backgroundColor: '#F0F1F7', borderRadius: '8px' }}>
              <IxIcon name="add" size="16" style={{ padding: '3px' }}></IxIcon>
            </div>
          </div>
          <div className="field-row">
            <div style={{ marginTop: '5px', marginBottom: '5px' }}>
              <input defaultChecked id="checkbox_1_1" name="group_1" type="radio" />
              <span style={{ marginLeft: '15px' }}><b>IP Address</b></span>
            </div>
            <span style={{ marginTop: '-5px', marginBottom: '5px', border: '1px solid', padding: '10px', borderRadius: '10px', color: 'white', backgroundColor: '#49494F' }}>192.168.2.1</span>
          </div>
          <div className="field-row">
            <div style={{ marginTop: '5px', marginBottom: '5px' }}>
              <input defaultChecked id="checkbox_1_1" name="group_1" type="radio" />
              <span style={{ marginLeft: '15px' }}><b>Streaming Protocol</b></span>
            </div>
            <span style={{ marginTop: '-5px', marginBottom: '5px', border: '1px solid', padding: '10px', borderRadius: '10px', color: 'white', backgroundColor: '#49494F' }}>Http</span>
          </div>
          <div className="field-row">
            <div style={{ marginTop: '5px', marginBottom: '5px' }}>
              <input defaultChecked id="checkbox_1_1" name="group_1" type="radio" />
              <span style={{ marginLeft: '15px' }}><b>Keep Alive timeout</b></span>
            </div>
            <span style={{ marginTop: '-5px', marginBottom: '5px', border: '1px solid', padding: '10px', borderRadius: '10px', color: 'white', backgroundColor: '#49494F' }}>3 s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
