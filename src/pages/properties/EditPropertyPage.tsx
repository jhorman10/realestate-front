import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProperty } from '../../hooks/usePropertyApi';
import EditPropertyForm from '../../components/forms/EditPropertyForm';

const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: property, isLoading, error } = useProperty(id!);

  const handleSuccess = () => {
    navigate(`/properties/${id}`);
  };

  const handleCancel = () => {
    navigate(`/properties/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Loading property...</span>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 text-xl mb-4">
            Property not found
          </div>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const propertyData = property;
  const initialData = {
    name: propertyData.name,
    address: propertyData.address,
    price: propertyData.price,
    codeInternal: propertyData.codeInternal,
    year: propertyData.year,
    ownerId: propertyData.ownerId,
    enabled: propertyData.enabled,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EditPropertyForm
        propertyId={id!}
        initialData={initialData}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditPropertyPage;