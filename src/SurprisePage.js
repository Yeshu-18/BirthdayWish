import { useState, useEffect } from 'react';
import FlyingPosters from './FlyingPosters';
import BirthdayPage from './BirthdayPage';
import './SurprisePage.css';

const importAll = (r) => r.keys().map(r);
const items = importAll(require.context('./assets/posters', false, /\.(png|jpe?g|svg)$/));

export default function SurprisePage() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showPosters, setShowPosters] = useState(false);
  const [fadeOutPosters, setFadeOutPosters] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);

  const handleCurtainClick = () => setCurtainOpen(true);

  useEffect(() => {
    if (curtainOpen) {
      const timer = setTimeout(() => setShowPosters(true), 7000); // curtain fade visibility time
      return () => clearTimeout(timer);
    }
  }, [curtainOpen]);

  // Callback when FlyingPosters scroll ends
  const handlePostersScrollEnd = () => {
    setFadeOutPosters(true); // start fade-out
    setTimeout(() => setShowBirthday(true), 1000); // wait for fade-out duration
  };

  if (showBirthday) return <BirthdayPage />;

  return (
    <div className="surprise-container">
      {/* Always present background, fades in after curtain click */}
      <div className={`curtain-background ${curtainOpen ? 'visible' : ''}`} />

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
    <div className={`curtain-background ${fadeOutPosters ? 'fade-out' : 'visible'}`} />
    <div className={`flying-posters-container ${fadeOutPosters ? 'fade-out' : ''}`}>
      <FlyingPosters
        items={items}
        planeWidth={320}
        planeHeight={320}
        distortion={2}
        scrollEase={0.01}
        cameraFov={45}
        cameraZ={20}
        onScrollEnd={handlePostersScrollEnd}
      />
    </div>
  </>
)}

    </div>
  );
}
