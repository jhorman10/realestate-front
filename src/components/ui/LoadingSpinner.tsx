interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'pink' | 'purple';
  text?: string;
  className?: string;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const colorClasses = {
  blue: 'text-blue-600',
  gray: 'text-gray-600',
  green: 'text-green-600',
  red: 'text-red-600',
  yellow: 'text-yellow-600',
  pink: 'text-pink-600',
  purple: 'text-purple-600',
};

export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-label={text}
      >
      </div>
      {text && (
        <span className="text-sm text-gray-500 dark:text-gray-400">{text}</span>
      )}
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
}

export const LoadingOverlay = ({ isLoading, text = 'Loading...', children }: LoadingOverlayProps) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-10">
          <LoadingSpinner text={text} />
        </div>
      )}
    </div>
  );
};
