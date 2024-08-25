import React, { useState, useEffect } from 'react';
import './Home.css';
import { IxCard, IxCardContent, IxTypography, IxIcon } from '@siemens/ix-react';

const Home = () => {
  const violations = [
    {
      id: 1,
      name: 'Violation 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    { id: 2, name: 'Violation 2', description: 'Description for Violation 2' },
    { id: 3, name: 'Violation 3', description: 'Description for Violation 3' },
  ];

  const cameras = ['Cam1', 'Cam2', 'Cam3'];
  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [violationAlerts, setViolationAlerts] = useState([]);
  const [systemType, setSystemType] = useState('CPU');

  useEffect(() => {
    const getRandomBoolean = () => Math.random() >= 0.5;

    const alerts = violations.map((violation) => ({
      ...violation,
      alert: getRandomBoolean(),
    }));
    setViolationAlerts(alerts);
  }, []);

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const handleSystemTypeChange = (event) => {
    setSystemType(event.target.value);
  };


  return (
    <div className="home-page">
      <div className="home-container">
        <div className="enable-violations">
          <h3>Enable Violations To Detect</h3>
          <ul>
            {violations.map((violation) => (
              <li key={violation.id}>
                <label>
                  <input type="checkbox" />
                  <span>{violation.name}</span>
                </label>
              </li>
            ))}
          </ul>
          <h3>Change System Type</h3>
          <div style={{marginRight:'60px'}}>
            <label>
              <input
                type="radio"
                value="CPU"
                checked={systemType === 'CPU'}
                onChange={handleSystemTypeChange} style={{marginRight:'10px'}}
              />
              CPU
            </label>
            <label>
              <input
                type="radio"
                value="GPU"
                checked={systemType === 'GPU'}
                onChange={handleSystemTypeChange} style={{marginRight:'10px'}}
              />
              GPU
            </label>
          </div>
          <button className="edit-button" >
            Save
          </button>
        </div>
        <div className="camera-placeholder">
          <div className="dropdown-container">
            <div className="dropdown-box">
              <select onChange={handleCameraChange} value={selectedCamera}>
                {cameras.map((camera, index) => (
                  <option key={index} value={camera}>
                    {camera}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h2>{selectedCamera} Placeholder</h2>
        </div>
        <div className="violations-detected">
          <h2>Violations Detected</h2>
          <div className="alerts-container">
            {violationAlerts.map((violation) => (
              <div
                className={`alert ${violation.alert ? 'highlight' : 'disabled'}`}
                key={violation.id}
              >
                {violation.alert && <IxIcon name="warning" size="24" />}
                <IxTypography variant="subtitle1">{violation.name}</IxTypography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cards-container">
        {violations.map((violation) => (
          <div className="ix-card-manual" key={violation.id}>
            <IxCard variant="warning" onClick={() => console.log(violation.name)}>
              <IxCardContent>
                <IxTypography bold>{violation.name}</IxTypography>
                <IxTypography>{violation.description}</IxTypography>
              </IxCardContent>
            </IxCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
