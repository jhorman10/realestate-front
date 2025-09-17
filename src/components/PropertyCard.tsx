import React from 'react';
import { Property } from '../schemas/propertySchemas';

interface PropertyCardProps {
  property: Property;
}

/**
 * Simplified PropertyCard component for debugging
 * Temporarily removed React.memo to debug interaction issues
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  console.log('PropertyCard rendering for property:', property.id, property.name);
  
  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('View Details clicked for property:', property.id);
    window.location.href = `/properties/${property.id}`;
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Edit clicked for property:', property.id);
    window.location.href = `/properties/${property.id}/edit`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {property.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.enabled 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {property.enabled ? 'Active' : 'Inactive'}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {property.address}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ${property.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Year:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {property.year}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Code:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {property.codeInternal}
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleViewClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-center py-2 px-3 rounded-md text-sm transition-all duration-200 cursor-pointer"
          >
            View Details
          </button>
          <button
            onClick={handleEditClick}
            className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-center py-2 px-3 rounded-md text-sm transition-all duration-200 cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

PropertyCard.displayName = 'PropertyCard';