// src/SurprisePage.js
import { useState, useEffect } from 'react';
import FlyingPosters from './FlyingPosters';
import BirthdayPage from './BirthdayPage'; // Import the new component
import './SurprisePage.css';

export default function SurprisePage() {
  const [showPosters, setShowPosters] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false); // New state to control the final page

  const items = ['/poster1.jpg', '/poster2.jpg', '/poster3.jpg'];

  const handleCurtainClick = () => {
    setCurtainOpen(true);
  };

  const handleSurpriseClick = () => {
    setShowBirthday(true); // Set state to show the birthday page
  };

  useEffect(() => {
    if (curtainOpen) {
      const timer = setTimeout(() => {
        setShowPosters(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [curtainOpen]);

  // If showBirthday is true, render only the BirthdayPage
  if (showBirthday) {
    return <BirthdayPage />;
  }

  return (
    <div className="surprise-container">
      {!showPosters && (
        <div className="curtain-container">
          <div className={`curtain-half left ${curtainOpen ? 'open' : ''}`} />
          <div className={`curtain-half right ${curtainOpen ? 'open' : ''}`} />
          {!curtainOpen && (
            <div
              className="hitbox"
              onClick={handleCurtainClick}
              onKeyDown={(e) => e.key === 'Enter' && handleCurtainClick()}
              tabIndex={0}
            >
              <span className="hint-text">Click Here</span>
            </div>
          )}
        </div>
      )}

      {showPosters && (
        <>
          <div className="flying-posters-container">
            <FlyingPosters
              items={items}
              planeWidth={320}
              planeHeight={320}
              distortion={3}
              scrollEase={0.01}
              cameraFov={45}
              cameraZ={20}
            />
          </div>
          {/* Add a button to trigger the final surprise */}
          <button
            onClick={handleSurpriseClick}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              padding: '12px 24px',
              fontSize: '1rem',
              cursor: 'pointer',
              borderRadius: '8px',
              border: 'none',
              background: '#ff9a9e',
              color: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            Click for the Real Surprise!
          </button>
        </>
      )}
    </div>
  );
}
