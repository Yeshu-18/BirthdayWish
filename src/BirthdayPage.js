// src/BirthdayPage.js
import React from 'react';

// Basic styling for the iframe to fill the screen
const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  border: 'none',
  zIndex: 20000 // Ensure it's on top
};

export default function BirthdayPage() {
  return (
    <div>
      <iframe 
        src="/birthday.html" // The path to your file in the public folder
        title="Birthday Surprise"
        style={iframeStyle}
      />
    </div>
  );
}