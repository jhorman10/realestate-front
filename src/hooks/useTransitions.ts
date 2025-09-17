import { useState } from 'react';

// Hook para manejar transiciones de navegación
export const useNavigationTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
    // Resetear después de un tiempo corto
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return { isTransitioning, startTransition };
};

// Hook para manejar estados de loading con transiciones
export const useLoadingTransition = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
};