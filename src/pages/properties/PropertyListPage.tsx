import React, { useState, useCallback, useMemo, memo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { PropertyFilterRequest, Property } from '../../schemas/propertySchemas';
import { usePropertiesWithLocalFilter } from '../../hooks/usePropertiesWithLocalFilter';
import { PropertyCard } from '../../components/PropertyCard';
import { PropertyListLoading, PropertyListError } from '../../components/PropertyListStates';

/**
 * PropertyListPage - Optimized with React 19 performance features and Redux local filtering
 * Uses memo, useMemo, useCallback, Suspense, and Redux for optimal performance without focus loss
 */
const PropertyListPage = memo(() => {
  const [showFilters, setShowFilters] = useState(false);

  // Use Redux-based local filtering to prevent focus loss
  const {
    properties,
    totalCount,
    filters,
    loading,
    error,
    updateFilters,
    clearFilters: clearAllFilters,
    refreshData,
    hasData
  } = usePropertiesWithLocalFilter();

  // Memoize filter change handler to prevent child re-renders
  const handleFilterChange = useCallback((field: keyof PropertyFilterRequest, value: string | number | undefined) => {
    updateFilters({
      [field]: value || undefined,
    });
  }, [updateFilters]);

  // Memoize clear filters handler
  const clearFilters = useCallback(() => {
    clearAllFilters();
  }, [clearAllFilters]);

  // Memoize toggle filters handler
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // Memoize retry handler for error state
  const handleRetry = useCallback(() => {
    refreshData();
  }, [refreshData]);

  // Early returns for loading and error states
  if (loading && !hasData) {
    return <PropertyListLoading />;
  }

  if (error && !hasData) {
    return <PropertyListError onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<PropertyListLoading />}>
          <PropertyListHeader 
            total={totalCount}
            showFilters={showFilters}
            onToggleFilters={toggleFilters}
          />

          <PropertyListFilters
            show={showFilters}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          <PropertyGrid properties={properties} />
        </Suspense>
      </div>
    </div>
  );
});

PropertyListPage.displayName = 'PropertyListPage';

// Memoized Header Component
interface PropertyListHeaderProps {
  total: number;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const PropertyListHeader = memo<PropertyListHeaderProps>(({ total, showFilters, onToggleFilters }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Properties
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {total} properties found
        </p>
      </div>
      
      <div className="flex space-x-3 mt-4 md:mt-0">
        <button
          onClick={onToggleFilters}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <Link
          to="/properties/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Property
        </Link>
      </div>
    </div>
  );
});

PropertyListHeader.displayName = 'PropertyListHeader';

// Memoized Filters Component
interface PropertyListFiltersProps {
  show: boolean;
  filters: PropertyFilterRequest;
  onFilterChange: (field: keyof PropertyFilterRequest, value: string | number | undefined) => void;
  onClearFilters: () => void;
}

const PropertyListFilters = memo<PropertyListFiltersProps>(({ show, filters, onFilterChange, onClearFilters }) => {
  if (!show) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterInput
          label="Property Name"
          type="text"
          value={filters.name || ''}
          onChange={(value) => onFilterChange('name', value)}
          placeholder="Search by name..."
        />
        
        <FilterInput
          label="Address"
          type="text"
          value={filters.address || ''}
          onChange={(value) => onFilterChange('address', value)}
          placeholder="Search by address..."
        />
        
        <FilterInput
          label="Min Price ($)"
          type="number"
          value={filters.minPrice || ''}
          onChange={(value) => onFilterChange('minPrice', value ? parseFloat(value) : undefined)}
          placeholder="0"
        />
        
        <FilterInput
          label="Max Price ($)"
          type="number"
          value={filters.maxPrice || ''}
          onChange={(value) => onFilterChange('maxPrice', value ? parseFloat(value) : undefined)}
          placeholder="1000000"
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClearFilters}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
});

PropertyListFilters.displayName = 'PropertyListFilters';

// Memoized Filter Input Component
interface FilterInputProps {
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (value: string) => void;
  placeholder: string;
}

const FilterInput = memo<FilterInputProps>(({ label, type, value, onChange, placeholder }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
});

FilterInput.displayName = 'FilterInput';

// Memoized Property Grid Component
interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid = memo<PropertyGridProps>(({ properties }) => {
  // Memoize the properties list to prevent unnecessary re-renders
  const propertyCards = useMemo(() => 
    properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    )), 
    [properties]
  );

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-xl mb-4">
          No properties found
        </div>
        <Link
          to="/properties/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
        >
          Create Your First Property
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {propertyCards}
    </div>
  );
});

PropertyGrid.displayName = 'PropertyGrid';

export default PropertyListPage;