import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperty, useDeleteProperty } from '../../hooks/usePropertyApi';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deletePropertyMutation = useDeleteProperty();
  const { dialogState, showConfirm } = useConfirmDialog();

  const { data: property, isLoading, error } = useProperty(id!);

  const handleDelete = async () => {
    const confirmed = await showConfirm({
      title: 'Delete Property',
      message: `Are you sure you want to delete "${property?.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });

    if (confirmed) {
      const loadingToast = toast.loading('Deleting property...');
      
      try {
        await deletePropertyMutation.mutateAsync(id!);
        toast.dismiss(loadingToast); // Dismiss loading toast, success is handled by the hook
        navigate('/properties');
      } catch (error: unknown) {
        console.error('Failed to delete property:', error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to delete property. Please try again.';
        
        toast.error(errorMessage, { id: loadingToast });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Loading property details...</span>
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
          <Link
            to="/properties"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Link
              to="/properties"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2 inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Properties
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {property.name}
            </h1>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                property.enabled 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {property.enabled ? 'Active' : 'Inactive'}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Code: {property.codeInternal}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              to={`/properties/${property.id}/edit`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Edit Property
            </Link>
            <button
              onClick={handleDelete}
              disabled={deletePropertyMutation.isPending}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-md transition-colors"
            >
              {deletePropertyMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Property Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Property Name
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">{property.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Internal Code
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white font-mono">{property.codeInternal}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Price
                  </label>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${property.price.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Year Built
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">{property.year}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Owner ID
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white font-mono">{property.ownerId}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <p className={`text-lg font-medium ${
                    property.enabled 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {property.enabled ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Address
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {property.address}
              </p>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <Link
                  to={`/properties/${property.id}/edit`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors block text-center"
                >
                  Edit Property
                </Link>
                
                <button
                  onClick={() => window.print()}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Print Details
                </button>
                
                <Link
                  to="/properties"
                  className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md transition-colors block text-center"
                >
                  Back to List
                </Link>
              </div>

              {/* Property Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Price per year:</span>
                    <span className="text-gray-900 dark:text-white">
                      ${(property.price / (new Date().getFullYear() - property.year + 1)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Property age:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date().getFullYear() - property.year} years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog 
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        type={dialogState.type}
        onConfirm={dialogState.onConfirm}
        onCancel={dialogState.onCancel}
      />
    </div>
  );
};

export default PropertyDetailPage;