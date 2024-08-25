import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Camera.css';

const cameras = [
  { label: "Camera 1", ip: "192.168.1.1" },
  { label: "Camera 2", ip: "192.168.1.2" },
  { label: "Camera 3", ip: "192.168.1.3" },
  { label: "Camera 4", ip: "192.168.1.4" },
  { label: "Camera 5", ip: "192.168.1.5" },
  { label: "Camera 6", ip: "192.168.1.6" },
  { label: "Camera 7", ip: "192.168.1.7" },
  { label: "Camera 8", ip: "192.168.1.8" },
  { label: "Camera 9", ip: "192.168.1.9" },
  { label: "Camera 10", ip: "192.168.1.10" }
];

const Camera = () => {
  const navigate = useNavigate();

  const handleEditClick = (camera) => {
    navigate(`/edit/${camera.ip}`, { state: { camera } });
  };

  return (
    <>
      <div className="camera-list-container">
        <h3 className="title">Cameras</h3>
        <div className="camera-list">
          {cameras.map((camera, index) => (
            <div key={index} className="camera-item">
              <span className="camera-label">{camera.label}</span>
              <span className="camera-ip">{camera.ip}</span>
              <button className="edit-button" onClick={() => handleEditClick(camera)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Camera;
