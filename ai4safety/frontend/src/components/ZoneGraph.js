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
    // Preparing the points in the required JSON structure
    const formattedPoints = points.flatMap(point => [point.x, point.y]);

    const jsonData = {
      licenses: [
        {
          name: "",
          id: 0,
          url: ""
        }
      ],
      info: {
        contributor: "",
        date_created: new Date().toISOString(),
        description: "Zone Graph Points",
        url: "",
        version: "1.0",
        year: new Date().getFullYear().toString()
      },
      categories: [
        {
          id: 1,
          name: zoneType === "value1" ? "no_entry_zone" : "restricted_area",
          supercategory: ""
        }
      ],
      images: [
        {
          id: 1,
          width: videoRef.current ? videoRef.current.videoWidth : 640,
          height: videoRef.current ? videoRef.current.videoHeight : 480,
          file_name: "video_frame.png",
          license: 0,
          flickr_url: "",
          coco_url: "",
          date_captured: Date.now()
        }
      ],
      annotations: [
        {
          id: 1,
          image_id: 1,
          category_id: 1,
          segmentation: [formattedPoints],
          area: calculateArea(points),
          bbox: calculateBoundingBox(points),
          iscrowd: 0,
          attributes: {
            occluded: false
          }
        }
      ]
    };

    console.log('Zone Name:', zoneName);
    console.log('Zone Type:', zoneType);
    console.log('Saved Points:', jsonData);

    // Save JSON to file
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${zoneName || 'zone'}.json`;  // Use 'zone' as a default name if zoneName is empty
    link.click();

    // Reset modal and points
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

  const calculateArea = (points) => {
    if (points.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const { x: x1, y: y1 } = points[i];
      const { x: x2, y: y2 } = points[(i + 1) % points.length];
      area += (x1 * y2 - x2 * y1);
    }
    return Math.abs(area / 2.0);
  };

  const calculateBoundingBox = (points) => {
    if (points.length === 0) return [0, 0, 0, 0];
    const xValues = points.map(point => point.x);
    const yValues = points.map(point => point.y);
    const minX = Math.min(...xValues);
    const minY = Math.min(...yValues);
    const maxX = Math.max(...xValues);
    const maxY = Math.max(...yValues);
    return [minX, minY, maxX - minX, maxY - minY];
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
