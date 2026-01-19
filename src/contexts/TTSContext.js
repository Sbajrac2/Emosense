import React, { createContext, useContext, useState } from 'react';

const TTSContext = createContext();

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};

export const TTSProvider = ({ children }) => {
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);

  const toggleTTS = () => {
    setIsTTSEnabled(!isTTSEnabled);
  };

  return (
    <TTSContext.Provider value={{ isTTSEnabled, toggleTTS }}>
      {children}
    </TTSContext.Provider>
  );
};