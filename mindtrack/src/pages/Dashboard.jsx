import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../firebase/config';
import DailyLogForm from '../components/DailyLogForm';
import LogList from '../components/LogList';
import Insight from '../components/Insight';
import Streak from '../components/Streak';
import Heatmap from '../components/Heatmap';
import PDFExport from '../components/PDFExport';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Load logs from Firebase
  useEffect(() => {
    if (!currentUser) return;

    const logsRef = ref(db, `users/${currentUser.id}/logs`);
    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
        setLogs(logsArray);
      } else {
        setLogs([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addLog = async (log) => {
    if (!currentUser) return;

    try {
      const logsRef = ref(db, `users/${currentUser.id}/logs`);
      const newLogRef = push(logsRef);
      await set(newLogRef, {
        ...log,
        userId: currentUser.id,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error adding log:', error);
      alert('Failed to save log. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading your data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {currentUser?.name || 'Student'}!</h1>
          <p className="text-gray-600">Track your study habits and mental wellness journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <DailyLogForm addLog={addLog} />
            <LogList logs={logs} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Streak logs={logs} />
            <Insight logs={logs} />
            <Heatmap logs={logs} />
            <PDFExport logs={logs} userName={currentUser?.name || 'Student'} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
