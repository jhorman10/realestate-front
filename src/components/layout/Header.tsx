import { HiHome, HiMenu, HiMoon, HiSun } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleTheme, toggleSidebar } from '../../store/slices/uiSlice';

export const Header = () => {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden transition-all duration-200 transform hover:scale-105"
            >
              <HiMenu className="h-6 w-6 transition-transform duration-200" />
            </button>
            <div className="flex-shrink-0 flex items-center transition-all duration-300">
              <HiHome className="h-8 w-8 text-blue-600 transition-colors duration-300" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                RealEstate
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-sm rounded-md"
            >
              Properties
            </a>
            <a
              href="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Favorites
            </a>
            <a
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 hover:rotate-12"
            >
              <div className="transition-all duration-300">
                {theme === 'light' ? (
                  <HiMoon className="h-5 w-5 transform transition-transform duration-300" />
                ) : (
                  <HiSun className="h-5 w-5 transform transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
