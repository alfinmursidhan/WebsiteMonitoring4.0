import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  headerActions?: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  onBack,
  headerActions,
  className = '',
}) => {
  return (
    <div className={`min-h-screen gradient-pink-orange ${className}`}>
      {/* Header */}
      {(title || showBackButton || headerActions) && (
        <div className="flex items-center justify-between px-6 py-6">
          {showBackButton ? (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-700 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <div className="w-10" />
          )}
          
          {title && (
            <h1 className="text-xl font-semibold text-gray-800 text-center flex-1">
              {title}
            </h1>
          )}
          
          <div className="w-10 flex justify-end">
            {headerActions}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;