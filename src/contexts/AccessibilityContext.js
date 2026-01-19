import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    largerTapTargets: false,
    slowTransitions: false,
    disableAnimations: false,
    highContrast: false,
    reducedMotion: false
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getAnimationDuration = () => {
    if (settings.disableAnimations) return 0;
    if (settings.slowTransitions) return 800;
    return 300;
  };

  const getTapTargetSize = () => {
    return settings.largerTapTargets ? 60 : 44;
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSetting,
      getAnimationDuration,
      getTapTargetSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};