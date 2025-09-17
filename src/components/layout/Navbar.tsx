import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useNavigationTransition } from '../../hooks/useTransitions';
import { ROUTE_PATHS } from '../../constants/routes';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { startTransition } = useNavigationTransition();

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    
    // Handle special cases first
    switch (path) {
      case ROUTE_PATHS.HOME:
        // Home is active only on exact match
        return currentPath === ROUTE_PATHS.HOME;
        
      case ROUTE_PATHS.PROPERTIES.LIST:
        // Properties list is active only on exact match
        // Don't highlight for create, edit, or detail pages
        return currentPath === ROUTE_PATHS.PROPERTIES.LIST;
        
      case ROUTE_PATHS.PROPERTIES.CREATE:
        // Create property page
        return currentPath === ROUTE_PATHS.PROPERTIES.CREATE;
        
      default:
        // For other routes, check exact match first, then child routes
        return currentPath === path || currentPath.startsWith(path + '/');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to={ROUTE_PATHS.HOME} 
            className="flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
            onClick={() => startTransition()}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
              <span className="text-white font-bold text-lg transition-transform duration-200">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              RealEstate
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTE_PATHS.HOME}
              onClick={() => startTransition()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-sm ${
                isActive(ROUTE_PATHS.HOME)
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to={ROUTE_PATHS.PROPERTIES.LIST}
              onClick={() => startTransition()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-sm ${
                isActive(ROUTE_PATHS.PROPERTIES.LIST)
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Properties
            </Link>
            <Link
              to={ROUTE_PATHS.PROPERTIES.CREATE}
              onClick={() => startTransition()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-sm ${
                isActive(ROUTE_PATHS.PROPERTIES.CREATE)
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Add Property
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                startTransition();
                toggleTheme();
              }}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 hover:rotate-12"
              aria-label="Toggle theme"
            >
              <div className="transition-all duration-300">
                {theme === 'light' ? (
                  // Moon icon for dark mode
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  // Sun icon for light mode
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
              <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;