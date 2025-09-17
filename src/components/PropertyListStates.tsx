import React, { memo } from 'react';

/**
 * Optimized loading component using React.memo
 * Prevents unnecessary re-renders of loading state
 */
export const PropertyListLoading = memo(() => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-700 dark:text-gray-300">Loading properties...</span>
      </div>
    </div>
  );
});

PropertyListLoading.displayName = 'PropertyListLoading';

/**
 * Optimized error component using React.memo
 * Only re-renders when refetch function changes
 */
interface PropertyListErrorProps {
  onRetry: () => void;
}

export const PropertyListError = memo<PropertyListErrorProps>(({ onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 dark:text-red-400 text-xl mb-4">
          Failed to load properties
        </div>
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
});

PropertyListError.displayName = 'PropertyListError';