import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Camera.css';

const EditConfig = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { camera } = location.state || { camera: { label: '', ip: '' } };

  const [label, setLabel] = useState(camera.label);
  const [ip, setIp] = useState(camera.ip);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  const handleSave = () => {
    // Implement save logic here
    console.log('Saved data:', { label, ip, field1, field2, field3, field4 });
    navigate('/camera');
  };

  // const handleBack=()=>{
  //   navigate('/camera');
  // }
  return (
    <>
    <div className="edit-config-container">
      <div className="form-group">
        <label>Camera Label</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Camera IP</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Field 1</label>
        <input type="text" value={field1} onChange={(e) => setField1(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Field 2</label>
        <input type="text" value={field2} onChange={(e) => setField2(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Field 3</label>
        <input type="text" value={field3} onChange={(e) => setField3(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Field 4</label>
        <input type="text" value={field4} onChange={(e) => setField4(e.target.value)} />
      </div>
      <button className="edit-button" onClick={handleSave}>Save</button>
    </div>
    </>
  );
};

export default EditConfig;

