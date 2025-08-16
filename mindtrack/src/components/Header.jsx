import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!currentUser) {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-100 transition-colors">
            MindTrack
          </Link>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="hover:text-blue-100 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-100 transition-colors">
          MindTrack
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`hover:text-blue-100 transition-colors ${
              isActive('/') ? 'text-blue-100 border-b-2 border-blue-100' : ''
            }`}
          >
            Dashboard
          </Link>
          {currentUser.role === 'mentor' && (
            <Link 
              to="/mentor" 
              className={`hover:text-blue-100 transition-colors ${
                isActive('/mentor') ? 'text-blue-100 border-b-2 border-blue-100' : ''
              }`}
            >
              Mentor Dashboard
            </Link>
          )}
        </nav>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 hover:text-blue-100 transition-colors"
          >
            <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-semibold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block">{currentUser.name}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-gray-500 capitalize">{currentUser.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden mt-4">
        <nav className="flex space-x-4">
          <Link 
            to="/" 
            className={`hover:text-blue-100 transition-colors ${
              isActive('/') ? 'text-blue-100' : ''
            }`}
          >
            Dashboard
          </Link>
          {currentUser.role === 'mentor' && (
            <Link 
              to="/mentor" 
              className={`hover:text-blue-100 transition-colors ${
                isActive('/mentor') ? 'text-blue-100' : ''
              }`}
            >
              Mentor
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
