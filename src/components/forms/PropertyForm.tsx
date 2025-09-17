import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePropertyRequestSchema, CreatePropertyRequest } from '../../schemas/propertySchemas';
import { useCreateProperty } from '../../hooks/usePropertyApi';
import { LoadingTransition } from '../ui/PageTransition';
import OwnerSelector from './OwnerSelector';

interface PropertyFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSuccess, onCancel }) => {
  const createPropertyMutation = useCreateProperty();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatePropertyRequest>({
    resolver: zodResolver(CreatePropertyRequestSchema),
    defaultValues: {
      name: '',
      address: '',
      price: 0,
      codeInternal: '',
      year: new Date().getFullYear(),
      ownerId: '',
    },
  });

  const onSubmit = async (data: CreatePropertyRequest) => {
    try {
      await createPropertyMutation.mutateAsync(data);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create property:', error);
    }
  };

  return (
    <LoadingTransition isLoading={isSubmitting} loadingText="Creando propiedad...">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-slide">
          Create New Property
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">{/* Property Name */}
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
                  disabled={isSubmitting || createPropertyMutation.isPending}
                />
              )}
            />
          </div>
        </div>

        {/* Validation Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Validation Rules:</h3>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
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
            disabled={isSubmitting}
            className={`flex-1 font-medium py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] ${
              isSubmitting
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </div>
            ) : (
              'Create Property'
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

export default PropertyForm;
