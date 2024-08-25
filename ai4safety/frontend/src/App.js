import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Calibration from './components/Calibration';
import Camera from './components/Camera';
import EditConfig from './components/EditConfig';
import Highlight from './components/Highlight';
import IntegratedNavbar from './components/Navbar'; // Import your navbar component
import NotFound from './components/NotFound';
import './App.css'; // Import CSS file for styling
import ZoneGraph from './components/ZoneGraph';
function App() {
  return (
    <Router>
      <div className="app-container">
        <IntegratedNavbar />

        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/calibration" element={<Calibration />} />
            <Route path="/edit/:ip" element={<EditConfig />} />
            <Route path="/highlights" element={<Highlight />} />
            <Route path ="/zone-graph" element={<ZoneGraph/>} />
            {/* Route for handling 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
