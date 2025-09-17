import React from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePropertyRequestSchema, UpdatePropertyRequest } from '../../schemas/propertySchemas';
import { useUpdateProperty } from '../../hooks/usePropertyApi';
import { LoadingTransition } from '../ui/PageTransition';
import OwnerSelector from './OwnerSelector';

interface EditPropertyFormProps {
  propertyId: string;
  initialData: UpdatePropertyRequest;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({ 
  propertyId, 
  initialData, 
  onSuccess, 
  onCancel 
}) => {
  const updatePropertyMutation = useUpdateProperty();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UpdatePropertyRequestSchema),
    defaultValues: {
      ...initialData,
      enabled: initialData.enabled ?? true,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const updateData: UpdatePropertyRequest = {
        name: data.name,
        address: data.address,
        price: data.price,
        codeInternal: data.codeInternal,
        year: data.year,
        ownerId: data.ownerId,
        enabled: data.enabled ?? true,
      };
      await updatePropertyMutation.mutateAsync({ id: propertyId, data: updateData });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update property:', error);
    }
  };

  return (
    <LoadingTransition isLoading={isSubmitting} loadingText="Actualizando propiedad...">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-slide">
          Edit Property
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Property Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter property name (1-200 characters)"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address *
          </label>
          <textarea
            id="address"
            {...register('address')}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter property address (1-500 characters)"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address.message}</p>
          )}
        </div>

        {/* Price and Year Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0.01"
              {...register('price', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Must be greater than 0"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price.message}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Year Built *
            </label>
            <input
              type="number"
              id="year"
              min="1800"
              max="2100"
              {...register('year', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1800 - 2100"
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.year.message}</p>
            )}
          </div>
        </div>

        {/* Code Internal and Owner ID Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Code Internal */}
          <div>
            <label htmlFor="codeInternal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Internal Code *
            </label>
            <input
              type="text"
              id="codeInternal"
              {...register('codeInternal')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.codeInternal ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="PROP001 (1-50 characters)"
            />
            {errors.codeInternal && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.codeInternal.message}</p>
            )}
          </div>

          {/* Owner Selector */}
          <div>
            <Controller
              name="ownerId"
              control={control}
              render={({ field }) => (
                <OwnerSelector
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.ownerId?.message}
                  disabled={isSubmitting || updatePropertyMutation.isPending}
                />
              )}
            />
          </div>
        </div>

        {/* Enabled Toggle */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('enabled')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Property is enabled (active)
            </span>
          </label>
          {errors.enabled && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.enabled.message}</p>
          )}
        </div>

        {/* Validation Info */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Validation Rules:</h3>
          <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Name: 1-200 characters required</li>
            <li>• Address: 1-500 characters required</li>
            <li>• Price: Must be greater than 0</li>
            <li>• Year: Must be between 1800 and 2100</li>
            <li>• Code: 1-50 characters required</li>
            <li>• Owner: Must be a valid 24-character ObjectId</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || updatePropertyMutation.isPending}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {isSubmitting || updatePropertyMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Update Property'
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-[1.02]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
    </LoadingTransition>
  );
};

export default EditPropertyForm;
