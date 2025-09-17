import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale';
  duration?: number;
  delay?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 500,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransitionClass = () => {
    if (!isVisible) {
      switch (type) {
        case 'slide':
          return 'opacity-0 transform translate-x-[-30px]';
        case 'scale':
          return 'opacity-0 transform scale-95';
        case 'fade':
        default:
          return 'opacity-0 transform translate-y-5';
      }
    }

    return 'opacity-100 transform translate-x-0 translate-y-0 scale-100';
  };

  const getTransitionStyle = () => ({
    transition: `all ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`
  });

  return (
    <div
      className={`transition-all ${getTransitionClass()}`}
      style={getTransitionStyle()}
    >
      {children}
    </div>
  );
};

// Componente wrapper para páginas con transiciones automáticas
export const PageWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <PageTransition type="fade" duration={400}>
      <div className={`transition-page ${className}`}>
        {children}
      </div>
    </PageTransition>
  );
};

// Componente para transiciones de loading
export const LoadingTransition: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}> = ({ isLoading, children, loadingText = 'Cargando...' }) => {
  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${isLoading ? 'loading-fade' : ''}`}>
        {children}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 transition-all duration-300">
          <div className="flex items-center space-x-2">
            <div className="loading-pulse">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-gray-600 dark:text-gray-300">{loadingText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTransition;