import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({ logs }) => {
  if (logs.length === 0) return null;

  // Create heatmap data for the last 365 days
  const getHeatmapData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const logForDate = logs.find(log => {
        const logDate = new Date(log.date);
        return logDate.toISOString().split('T')[0] === dateString;
      });

      if (logForDate) {
        // Calculate productivity score based on study hours, focus, and stress
        const studyScore = Math.min(Number(logForDate.studyHours) / 8, 1); // Normalize to 8 hours
        const focusScore = Number(logForDate.focus) / 10;
        const stressScore = 1 - (Number(logForDate.stress) / 10); // Lower stress = higher score
        
        const productivityScore = (studyScore + focusScore + stressScore) / 3;
        
        data.push({
          date: dateString,
          count: Math.round(productivityScore * 4) // Scale to 0-4 for heatmap
        });
      } else {
        data.push({
          date: dateString,
          count: 0
        });
      }
    }
    
    return data;
  };

  const heatmapData = getHeatmapData();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">Productivity Heatmap</h3>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={new Date(new Date().setDate(new Date().getDate() - 365))}
          endDate={new Date()}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${value.count}`;
          }}
          titleForValue={(value) => {
            if (!value) return 'No data';
            return `${value.date}: Productivity level ${value.count}/4`;
          }}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>Less Productive</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-200"></div>
            <div className="w-3 h-3 bg-blue-200"></div>
            <div className="w-3 h-3 bg-blue-400"></div>
            <div className="w-3 h-3 bg-blue-600"></div>
            <div className="w-3 h-3 bg-blue-800"></div>
          </div>
          <span>More Productive</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap; 