import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const LogList = ({ logs }) => {
  const [expandedLog, setExpandedLog] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStressColor = (stress) => {
    if (stress <= 3) return 'text-green-600';
    if (stress <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFocusColor = (focus) => {
    if (focus >= 8) return 'text-green-600';
    if (focus >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProductivityScore = (log) => {
    const studyScore = Math.min(Number(log.studyHours) / 8, 1);
    const focusScore = Number(log.focus) / 10;
    const stressScore = 1 - (Number(log.stress) / 10);
    return Math.round(((studyScore + focusScore + stressScore) / 3) * 100);
  };

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No logs yet</h3>
        <p className="text-gray-600">Start your journey by adding your first daily log above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Journal Entries</h2>
        <span className="text-sm text-gray-500">{logs.length} entries</span>
      </div>
      
      {logs.map((log) => (
        <div key={log.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {formatDate(log.date)}
                </h3>
                <p className="text-sm text-gray-600">
                  Productivity Score: <span className="font-semibold">{getProductivityScore(log)}%</span>
                </p>
              </div>
              <button
                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {expandedLog === log.id ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{log.studyHours}h</div>
                <div className="text-xs text-gray-500">Study Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{log.sleep}h</div>
                <div className="text-xs text-gray-500">Sleep</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{log.breakTime}m</div>
                <div className="text-xs text-gray-500">Break Time</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getStressColor(log.stress)}`}>
                  {log.stress}/10
                </div>
                <div className="text-xs text-gray-500">Stress Level</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getFocusColor(log.focus)}`}>
                  {log.focus}/10
                </div>
                <div className="text-xs text-gray-500">Focus Level</div>
              </div>
            </div>

            {/* Reflection */}
            {log.reflection && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Daily Reflection</h4>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{log.reflection}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Expanded Details */}
            {expandedLog === log.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Study Analysis</h5>
                    <div className="space-y-1 text-gray-600">
                      <div>Study Efficiency: {log.studyHours > 0 ? Math.round((log.focus / 10) * 100) : 0}%</div>
                      <div>Break Ratio: {log.studyHours > 0 ? Math.round((log.breakTime / (log.studyHours * 60)) * 100) : 0}%</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Wellness Check</h5>
                    <div className="space-y-1 text-gray-600">
                      <div>Sleep Quality: {log.sleep >= 8 ? 'Excellent' : log.sleep >= 6 ? 'Good' : 'Needs Improvement'}</div>
                      <div>Stress Management: {log.stress <= 3 ? 'Excellent' : log.stress <= 6 ? 'Manageable' : 'High'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogList;
