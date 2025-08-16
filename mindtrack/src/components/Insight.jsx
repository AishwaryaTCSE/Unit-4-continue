import React from 'react';

const Insight = ({ logs }) => {
  if (logs.length < 7) {
    return (
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Weekly Insights</h3>
        <p className="text-gray-600">
          Keep logging for 7 days to receive personalized insights about your study habits and wellness patterns!
        </p>
      </div>
    );
  }

  // Calculate insights from the last 7 days
  const recentLogs = logs.slice(0, 7);
  
  const avgSleep = recentLogs.reduce((acc, log) => acc + Number(log.sleep), 0) / recentLogs.length;
  const avgStudy = recentLogs.reduce((acc, log) => acc + Number(log.studyHours), 0) / recentLogs.length;
  const avgStress = recentLogs.reduce((acc, log) => acc + Number(log.stress), 0) / recentLogs.length;
  const avgFocus = recentLogs.reduce((acc, log) => acc + Number(log.focus), 0) / recentLogs.length;
  const avgBreak = recentLogs.reduce((acc, log) => acc + Number(log.breakTime), 0) / recentLogs.length;

  // Generate insights based on patterns
  const insights = [];

  // Sleep insights
  if (avgSleep >= 8) {
    insights.push("Great sleep habits! You're getting 8+ hours consistently, which helps with focus and retention.");
  } else if (avgSleep >= 6) {
    insights.push("Your sleep is adequate, but try aiming for 8 hours to improve focus and reduce stress.");
  } else {
    insights.push("Consider prioritizing sleep - less than 6 hours can significantly impact your study performance.");
  }

  // Study hours insights
  if (avgStudy >= 6) {
    insights.push("Excellent study consistency! You're maintaining 6+ hours daily.");
  } else if (avgStudy >= 4) {
    insights.push("Good study habits! Consider gradually increasing to 6 hours for optimal learning.");
  } else {
    insights.push("Try to increase study hours gradually. Even 30-minute increments can make a difference.");
  }

  // Stress and focus correlation
  if (avgStress <= 3 && avgFocus >= 8) {
    insights.push("Perfect balance! Low stress and high focus create optimal learning conditions.");
  } else if (avgStress >= 7) {
    insights.push("High stress levels detected. Consider more breaks, exercise, or relaxation techniques.");
  } else if (avgFocus <= 5) {
    insights.push("Focus levels are low. Try studying in shorter, more intense sessions with breaks.");
  }

  // Break time insights
  if (avgBreak >= 60) {
    insights.push("Good break management! Longer breaks help reduce stress and improve focus.");
  } else if (avgBreak <= 30) {
    insights.push("Consider taking longer breaks. 45-60 minute breaks can boost productivity.");
  }

  // Trend analysis
  const firstHalf = recentLogs.slice(0, 3);
  const secondHalf = recentLogs.slice(3, 6);
  
  const firstAvgStudy = firstHalf.reduce((acc, log) => acc + Number(log.studyHours), 0) / firstHalf.length;
  const secondAvgStudy = secondHalf.reduce((acc, log) => acc + Number(log.studyHours), 0) / secondHalf.length;
  
  if (secondAvgStudy > firstAvgStudy + 1) {
    insights.push("Improving trend! Your study hours are increasing - keep up the momentum!");
  } else if (secondAvgStudy < firstAvgStudy - 1) {
    insights.push("Study hours are decreasing. Consider what might be affecting your motivation.");
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Weekly Insights</h3>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">{insight}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">This Week's Averages:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Sleep: {avgSleep.toFixed(1)}h</div>
          <div>Study: {avgStudy.toFixed(1)}h</div>
          <div>Stress: {avgStress.toFixed(1)}/10</div>
          <div>Focus: {avgFocus.toFixed(1)}/10</div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
