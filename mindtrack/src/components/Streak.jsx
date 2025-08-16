import React from 'react';

const Streak = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Start Your Journey</h3>
        <p className="text-gray-600 text-sm">Log your first entry to begin building your streak!</p>
      </div>
    );
  }

  // Calculate current streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[i].date);
      logDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - streak);
      
      if (logDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Calculate longest streak
  const calculateLongestStreak = () => {
    let longestStreak = 0;
    let currentStreak = 0;
    
    for (let i = 0; i < logs.length - 1; i++) {
      const currentDate = new Date(logs[i].date);
      const nextDate = new Date(logs[i + 1].date);
      const diffDays = (currentDate - nextDate) / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return longestStreak;
  };

  const currentStreak = calculateStreak();
  const longestStreak = calculateLongestStreak();

  // Get motivation message based on streak
  const getMotivationMessage = () => {
    if (currentStreak === 0) {
      return "Don't break the chain! Log today to keep your momentum going.";
    } else if (currentStreak === 1) {
      return "Great start! Consistency is key to building lasting habits.";
    } else if (currentStreak < 7) {
      return "Building momentum! You're on your way to a week-long streak.";
    } else if (currentStreak < 30) {
      return "Impressive! You've maintained consistency for over a week.";
    } else if (currentStreak < 100) {
      return "Outstanding! You're building a strong foundation for success.";
    } else {
      return "Legendary! You're an inspiration to others. Keep going!";
    }
  };

  // Get streak emoji
  const getStreakEmoji = () => {
    if (currentStreak === 0) return "💪";
    if (currentStreak < 7) return "🔥";
    if (currentStreak < 30) return "⚡";
    if (currentStreak < 100) return "🏆";
    return "👑";
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow">
      <div className="text-center">
        <div className="text-4xl mb-2">{getStreakEmoji()}</div>
        <h3 className="font-bold text-xl mb-1">Current Streak</h3>
        <div className="text-3xl font-bold text-orange-600 mb-2">
          {currentStreak} day{currentStreak !== 1 ? 's' : ''}
        </div>
        <p className="text-sm text-gray-600 mb-4">{getMotivationMessage()}</p>
      </div>

      <div className="border-t border-orange-200 pt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Longest Streak:</span>
          <span className="font-semibold">{longestStreak} days</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-gray-600">Total Entries:</span>
          <span className="font-semibold">{logs.length}</span>
        </div>
      </div>

      {currentStreak > 0 && (
        <div className="mt-4 p-3 bg-orange-100 rounded-lg">
          <div className="text-xs text-orange-800">
            <strong>Next milestone:</strong> {currentStreak < 7 ? '7 days' : currentStreak < 30 ? '30 days' : '100 days'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Streak;
