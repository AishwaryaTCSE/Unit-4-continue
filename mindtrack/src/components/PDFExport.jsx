import React, { useState } from 'react';
import jsPDF from 'jspdf';

const PDFExport = ({ logs, userName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (logs.length === 0) {
      alert('No logs to export');
      return;
    }

    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = 20;

      // Title
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('MindTrack Journal Summary', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Subtitle
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated for ${userName} on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;

      // Summary Statistics
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Summary Statistics', margin, yPosition);
      yPosition += 10;

      const totalEntries = logs.length;
      const avgStudyHours = logs.reduce((acc, log) => acc + Number(log.studyHours), 0) / totalEntries;
      const avgSleep = logs.reduce((acc, log) => acc + Number(log.sleep), 0) / totalEntries;
      const avgStress = logs.reduce((acc, log) => acc + Number(log.stress), 0) / totalEntries;
      const avgFocus = logs.reduce((acc, log) => acc + Number(log.focus), 0) / totalEntries;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Entries: ${totalEntries}`, margin, yPosition);
      yPosition += 6;
      doc.text(`Average Study Hours: ${avgStudyHours.toFixed(1)}h`, margin, yPosition);
      yPosition += 6;
      doc.text(`Average Sleep: ${avgSleep.toFixed(1)}h`, margin, yPosition);
      yPosition += 6;
      doc.text(`Average Stress Level: ${avgStress.toFixed(1)}/10`, margin, yPosition);
      yPosition += 6;
      doc.text(`Average Focus Level: ${avgFocus.toFixed(1)}/10`, margin, yPosition);
      yPosition += 15;

      // Recent Entries
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Recent Entries', margin, yPosition);
      yPosition += 10;

      // Get last 10 entries
      const recentLogs = logs.slice(0, 10);

      recentLogs.forEach((log, index) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(new Date(log.date).toLocaleDateString(), margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const metrics = `Study: ${log.studyHours}h | Sleep: ${log.sleep}h | Stress: ${log.stress}/10 | Focus: ${log.focus}/10`;
        doc.text(metrics, margin, yPosition);
        yPosition += 6;

        if (log.reflection) {
          // Truncate reflection if too long
          const maxLength = 80;
          const reflection = log.reflection.length > maxLength 
            ? log.reflection.substring(0, maxLength) + '...'
            : log.reflection;
          
          doc.text(`Reflection: ${reflection}`, margin, yPosition);
          yPosition += 6;
        }

        yPosition += 5; // Space between entries
      });

      // Insights Section
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Insights & Recommendations', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      const insights = [];
      if (avgSleep < 7) {
        insights.push('• Consider improving sleep habits - aim for 7-9 hours per night');
      }
      if (avgStress > 7) {
        insights.push('• High stress levels detected - consider stress management techniques');
      }
      if (avgFocus < 6) {
        insights.push('• Focus levels could be improved - try study environment optimization');
      }
      if (avgStudyHours < 4) {
        insights.push('• Study hours are below recommended levels - consider schedule adjustments');
      }
      if (avgStudyHours >= 6) {
        insights.push('• Excellent study consistency - keep up the great work!');
      }
      if (avgSleep >= 8) {
        insights.push('• Great sleep habits - this supports better focus and retention');
      }

      insights.forEach(insight => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(insight, margin, yPosition);
        yPosition += 6;
      });

      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, 290, { align: 'center' });
        doc.text('Generated by MindTrack - Student Wellness & Study Habit Journal', pageWidth / 2, 295, { align: 'center' });
      }

      // Save the PDF
      const fileName = `mindtrack-journal-${userName}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Export Journal</h3>
      <p className="text-gray-600 text-sm mb-4">
        Download a PDF summary of your journal entries, including statistics and insights.
      </p>
      
      <button
        onClick={generatePDF}
        disabled={isGenerating || logs.length === 0}
        className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
          isGenerating || logs.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
        }`}
      >
        {isGenerating ? 'Generating PDF...' : 'Export as PDF'}
      </button>
      
      {logs.length === 0 && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Add some entries to your journal to enable PDF export
        </p>
      )}
    </div>
  );
};

export default PDFExport;
