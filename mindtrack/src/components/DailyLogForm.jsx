import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DailyLogForm = ({ addLog }) => {
  const [formData, setFormData] = useState({
    studyHours: '',
    breakTime: '',
    sleep: '',
    stress: '',
    focus: '',
    reflection: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studyHours || formData.studyHours < 0 || formData.studyHours > 24) {
      newErrors.studyHours = 'Please enter valid study hours (0-24)';
    }

    if (!formData.sleep || formData.sleep < 0 || formData.sleep > 24) {
      newErrors.sleep = 'Please enter valid sleep hours (0-24)';
    }

    if (formData.stress && (formData.stress < 1 || formData.stress > 10)) {
      newErrors.stress = 'Stress level must be between 1-10';
    }

    if (formData.focus && (formData.focus < 1 || formData.focus > 10)) {
      newErrors.focus = 'Focus level must be between 1-10';
    }

    if (formData.breakTime && formData.breakTime < 0) {
      newErrors.breakTime = 'Break time cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newLog = {
        id: uuidv4(),
        studyHours: Number(formData.studyHours),
        breakTime: Number(formData.breakTime) || 0,
        sleep: Number(formData.sleep),
        stress: Number(formData.stress) || 5,
        focus: Number(formData.focus) || 5,
        reflection: formData.reflection.trim(),
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      };

      await addLog(newLog);
      
      // Reset form
      setFormData({
        studyHours: '',
        breakTime: '',
        sleep: '',
        stress: '',
        focus: '',
        reflection: ''
      });
      
      setErrors({});
    } catch (error) {
      console.error('Error submitting log:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Study & Wellness Log</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Study Hours and Sleep */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Study Hours *
            </label>
            <input
              type="number"
              name="studyHours"
              value={formData.studyHours}
              onChange={handleChange}
              placeholder="e.g., 4.5"
              step="0.5"
              min="0"
              max="24"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.studyHours ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.studyHours && (
              <p className="text-red-500 text-sm mt-1">{errors.studyHours}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleep Hours *
            </label>
            <input
              type="number"
              name="sleep"
              value={formData.sleep}
              onChange={handleChange}
              placeholder="e.g., 8"
              step="0.5"
              min="0"
              max="24"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.sleep ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.sleep && (
              <p className="text-red-500 text-sm mt-1">{errors.sleep}</p>
            )}
          </div>
        </div>

        {/* Break Time, Stress, and Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Break Time (minutes)
            </label>
            <input
              type="number"
              name="breakTime"
              value={formData.breakTime}
              onChange={handleChange}
              placeholder="e.g., 45"
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.breakTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.breakTime && (
              <p className="text-red-500 text-sm mt-1">{errors.breakTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stress Level (1-10)
            </label>
            <input
              type="number"
              name="stress"
              value={formData.stress}
              onChange={handleChange}
              placeholder="e.g., 6"
              min="1"
              max="10"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.stress ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.stress && (
              <p className="text-red-500 text-sm mt-1">{errors.stress}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Focus Level (1-10)
            </label>
            <input
              type="number"
              name="focus"
              value={formData.focus}
              onChange={handleChange}
              placeholder="e.g., 8"
              min="1"
              max="10"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.focus ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.focus && (
              <p className="text-red-500 text-sm mt-1">{errors.focus}</p>
            )}
          </div>
        </div>

        {/* Reflection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Reflection (Markdown Supported)
          </label>
          <textarea
            name="reflection"
            value={formData.reflection}
            onChange={handleChange}
            placeholder="How was your study session today? What went well? What could be improved? (Supports markdown formatting)"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can use markdown: **bold**, *italic*, - lists, etc.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Daily Log'}
        </button>
      </form>
    </div>
  );
};

export default DailyLogForm;
