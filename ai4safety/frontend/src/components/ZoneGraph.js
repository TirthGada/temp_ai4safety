import React, { useRef, useState, useEffect } from 'react';
import './ZoneGraph.css';

const ZoneGraph = () => {
  const videoRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [viewZone, setViewZone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [zoneName, setZoneName] = useState('');
  const [zoneType, setZoneType] = useState('value1');

  useEffect(() => {
    setViewZone(points.length > 0);
  }, [points]);

  const savePoints = () => {
    setShowModal(true);
  };

  const handleModalSave = () => {
    console.log('Zone Name:', zoneName);
    console.log('Zone Type:', zoneType);
    console.log('Saved Points:', points);
    // Uncomment below code to send points, zone name, and zone type to the backend
    // fetch('http://localhost:5000/api/savePoints', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name: zoneName, type: zoneType, points }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    setZoneName('');
    setZoneType('value1');
    setPoints([]);
    setShowModal(false);
    setDrawing(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const resetPoints = () => {
    setPoints([]);
  };

  const handleVideoClick = (event) => {
    if (!drawing) return;

    const rect = videoRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  const handleVideoError = () => {
    setVideoError('Video failed to load. Please check the source URL.');
  };

  const connectPoints = () => {
    if (points.length < 2) return null;
    return points.map((point, index) => {
      const nextPoint = points[(index + 1) % points.length];
      return (
        <line
          key={`line-${index}`}
          x1={point.x}
          y1={point.y}
          x2={nextPoint.x}
          y2={nextPoint.y}
          stroke="red"
          strokeWidth="2"
        />
      );
    });
  };

  return (
    <div className="zone-graph-container">
      {videoError ? (
        <div className="error-message">{videoError}</div>
      ) : (
        <div className="video-wrapper">
          <video
            ref={videoRef}
            width="640"
            height="480"
            controls
            onClick={handleVideoClick}
            onError={handleVideoError}
            className="video-player"
          >
            <source src="./abc.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <svg className="overlay">
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="black"
              />
            ))}
            {viewZone && connectPoints()}
          </svg>
        </div>
      )}
      <div className="controls">
        <button onClick={() => setDrawing(!drawing)} className="control-button">
          {drawing ? 'Stop Drawing' : 'Start Drawing'}
        </button>
        <button onClick={resetPoints} className="control-button">
          Reset
        </button>
        <button onClick={savePoints} className="control-button">
          Save
        </button>
        <button onClick={() => setViewZone(!viewZone)} disabled={!viewZone} className="control-button">
          {viewZone ? 'Hide Zone' : 'View Zone'}
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Name Your Zone</h3>
            <input
              type="text"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder="Enter zone name"
            />
            <label>
              Type of Zone:
              <select value={zoneType} onChange={(e) => setZoneType(e.target.value)}>
                <option value="value1">No entry zone</option>
                <option value="value2">Restricted Area</option>
              </select>
            </label>
            <div className="modal-actions">
              <button onClick={handleModalSave} className="modal-button">Save</button>
              <button onClick={handleModalCancel} className="modal-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoneGraph;
