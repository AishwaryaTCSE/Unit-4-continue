import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';

const MentorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentLogs, setStudentLogs] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Load all students
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'mentor') return;

    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.values(data).filter(user => user.role === 'student');
        setStudents(studentList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Load selected student's logs
  useEffect(() => {
    if (!selectedStudent) {
      setStudentLogs([]);
      return;
    }

    const logsRef = ref(db, `users/${selectedStudent.id}/logs`);
    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
        setStudentLogs(logsArray);
      } else {
        setStudentLogs([]);
      }
    });

    return () => unsubscribe();
  }, [selectedStudent]);

  const handleAddComment = async (logId) => {
    if (!comment.trim() || !selectedStudent) return;

    try {
      const commentRef = ref(db, `users/${selectedStudent.id}/logs/${logId}/comments`);
      await push(commentRef, {
        text: comment.trim(),
        mentorId: currentUser.id,
        mentorName: currentUser.name,
        timestamp: Date.now()
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const getStudentInsights = (logs) => {
    if (logs.length === 0) return [];

    const recentLogs = logs.slice(0, 7);
    const avgSleep = recentLogs.reduce((acc, log) => acc + Number(log.sleep), 0) / recentLogs.length;
    const avgStudy = recentLogs.reduce((acc, log) => acc + Number(log.studyHours), 0) / recentLogs.length;
    const avgStress = recentLogs.reduce((acc, log) => acc + Number(log.stress), 0) / recentLogs.length;
    const avgFocus = recentLogs.reduce((acc, log) => acc + Number(log.focus), 0) / recentLogs.length;

    const insights = [];

    if (avgSleep < 7) {
      insights.push('Consider encouraging better sleep habits - current average is below recommended levels.');
    }
    if (avgStress > 7) {
      insights.push('High stress levels detected. Suggest stress management techniques or breaks.');
    }
    if (avgFocus < 6) {
      insights.push('Focus levels are low. Recommend study environment improvements or time management strategies.');
    }
    if (avgStudy < 4) {
      insights.push('Study hours are below recommended levels. Consider discussing study schedule optimization.');
    }

    return insights;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading mentor dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600">Support your students' wellness and study journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Students</h2>
              <div className="space-y-2">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedStudent?.id === student.id
                        ? 'bg-blue-100 border-blue-300 border'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </button>
                ))}
              </div>
              {students.length === 0 && (
                <p className="text-gray-500 text-center py-4">No students found</p>
              )}
            </div>
          </div>

          {/* Student Details */}
          <div className="lg:col-span-3">
            {selectedStudent ? (
              <div className="space-y-6">
                {/* Student Overview */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                      <p className="text-gray-600">{selectedStudent.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total Entries</div>
                      <div className="text-2xl font-bold text-blue-600">{studentLogs.length}</div>
                    </div>
                  </div>

                  {/* Insights */}
                  {studentLogs.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Recent Insights</h3>
                      <div className="space-y-2">
                        {getStudentInsights(studentLogs).map((insight, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Student Logs */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Entries</h3>
                  <div className="space-y-4">
                    {studentLogs.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No entries yet</p>
                    ) : (
                      studentLogs.slice(0, 5).map((log) => (
                        <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium text-gray-800">{formatDate(log.date)}</div>
                              <div className="text-sm text-gray-500">
                                Study: {log.studyHours}h | Sleep: {log.sleep}h | Stress: {log.stress}/10 | Focus: {log.focus}/10
                              </div>
                            </div>
                          </div>

                          {log.reflection && (
                            <div className="mb-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Reflection:</div>
                              <div className="text-sm text-gray-600 prose prose-sm max-w-none">
                                <ReactMarkdown>{log.reflection}</ReactMarkdown>
                              </div>
                            </div>
                          )}

                          {/* Comments */}
                          {log.comments && (
                            <div className="mb-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Comments:</div>
                              <div className="space-y-2">
                                {Object.values(log.comments).map((comment, index) => (
                                  <div key={index} className="bg-blue-50 p-2 rounded text-sm">
                                    <div className="font-medium text-blue-800">{comment.mentorName}</div>
                                    <div className="text-blue-700">{comment.text}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Add Comment */}
                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleAddComment(log.id)}
                                disabled={!comment.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Student</h3>
                <p className="text-gray-600">Choose a student from the list to view their progress and provide guidance</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
