import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Owner } from '../../schemas/propertySchemas';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface OwnerSelectorProps {
  value: string;
  onChange: (ownerId: string) => void;
  error?: string;
  disabled?: boolean;
}

const OwnerSelector: React.FC<OwnerSelectorProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/owners`);
        
        if (response.data.success) {
          setOwners(response.data.data);
        } else {
          setFetchError('Failed to load owners');
        }
      } catch (err) {
        console.error('Error fetching owners:', err);
        setFetchError('Failed to load owners. Please check if the API is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  if (loading) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Owner *
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
          <LoadingSpinner size="sm" />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Loading owners...</span>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Owner *
        </label>
        <div className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 dark:bg-red-900/20">
          <p className="text-sm text-red-600 dark:text-red-400">{fetchError}</p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
            You can still enter an Owner ID manually below.
          </p>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`mt-2 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter Owner ID (24-character ObjectId)"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Owner *
      </label>
      <select
        id="ownerId"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Select an owner...</option>
        {owners.map((owner) => (
          <option key={owner.id} value={owner.id}>
            {owner.name} - {owner.address}
          </option>
        ))}
      </select>
      
      {/* Show ObjectId for selected owner */}
      {value && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Owner ID: {value}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {owners.length === 0 && !loading && (
        <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
          No owners found. Make sure the API is seeded with data.
        </p>
      )}
    </div>
  );
};

export default OwnerSelector;
