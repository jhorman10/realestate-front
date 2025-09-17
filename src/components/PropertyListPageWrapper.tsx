import React, { Suspense } from 'react';
import PropertyListPage from '../pages/properties/PropertyListPage';
import { PropertyListLoading } from '../components/PropertyListStates';
import { PropertyErrorBoundary } from '../components/PropertyErrorBoundary';

/**
 * PropertyListPageWrapper - Uses Suspense and Error Boundary for better UX
 * This wrapper provides consistent loading states and error handling
 * optimized for React 19 performance features
 */
export const PropertyListPageWrapper: React.FC = () => {
  return (
    <PropertyErrorBoundary>
      <Suspense fallback={<PropertyListLoading />}>
        <PropertyListPage />
      </Suspense>
    </PropertyErrorBoundary>
  );
};

export default PropertyListPageWrapper;