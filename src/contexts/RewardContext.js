import React, { createContext, useContext, useState } from 'react';

const RewardContext = createContext();

export const RewardProvider = ({ children }) => {
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(0);

  const awardBadge = (badgeId, title, description) => {
    if (!badges.find(b => b.id === badgeId)) {
      setBadges(prev => [...prev, {
        id: badgeId,
        title,
        description,
        earnedAt: new Date().toISOString()
      }]);
    }
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  return (
    <RewardContext.Provider value={{
      badges,
      streak,
      awardBadge,
      incrementStreak,
      resetStreak
    }}>
      {children}
    </RewardContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error('useRewards must be used within RewardProvider');
  }
  return context;
};