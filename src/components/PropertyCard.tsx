import React, { useState, useRef, useEffect } from 'react';
import { Property } from '../schemas/propertySchemas';

interface PropertyCardProps {
  property: Property;
}

/**
 * PropertyCard component with image support and lazy loading
 * Shows property images from imageUrl or images array with fallback placeholder
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  
  console.log('PropertyCard rendering for property:', property.id, property.name);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
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

  // Get the primary image URL - compatible with both data structures
  const getImageUrl = (): string | null => {
    // First try imageUrl field (from schemas)
    if (property.imageUrl) {
      return property.imageUrl;
    }
    
    // Then try first enabled image from images array (from schemas)
    if (property.images && Array.isArray(property.images)) {
      // Check if images is array of objects (PropertyImage[])
      if (property.images.length > 0 && typeof property.images[0] === 'object') {
        const enabledImages = property.images.filter((img: { enabled?: boolean; file: string }) => img.enabled !== false);
        if (enabledImages.length > 0) {
          return enabledImages[0].file;
        }
        // If no enabled images, try first image regardless of enabled status
        return (property.images[0] as { file: string }).file || null;
      }
      
      // Check if images is array of strings (string[])
      if (property.images.length > 0 && typeof property.images[0] === 'string') {
        return property.images[0] as string;
      }
    }
    
    return null;
  };

  const getImageCount = (): number => {
    if (property.images && Array.isArray(property.images)) {
      return property.images.length;
    }
    return 0;
  };

  const imageUrl = getImageUrl();
  const imageCount = getImageCount();
  const hasImage = imageUrl && !imageError;
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('Image loaded for property:', property.name);
  };

  const handleImageError = () => {
    setImageError(true);
    console.warn('Failed to load image for property:', property.name, 'URL:', imageUrl);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Property Image */}
      <div ref={imgRef} className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        {hasImage && isInView ? (
          <>
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded w-8 h-8"></div>
              </div>
            )}
            
            {/* Actual image */}
            <img
              src={imageUrl}
              alt={property.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            property.enabled 
              ? 'bg-green-100/90 text-green-800 dark:bg-green-900/90 dark:text-green-200'
              : 'bg-red-100/90 text-red-800 dark:bg-red-900/90 dark:text-red-200'
          }`}>
            {property.enabled ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Image Count Badge */}
        {imageCount > 1 && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-900/70 text-white backdrop-blur-sm">
              +{imageCount - 1} more
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Property Title */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {property.name}
          </h3>
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