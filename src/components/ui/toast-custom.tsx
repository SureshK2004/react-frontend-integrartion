import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface CustomToastProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  duration?: number;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  isVisible,
  onClose,
  title,
  description,
  duration = 5000
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 min-w-80 max-w-md">
        <div className="flex items-start gap-3">
          {/* Green Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-green-900">
              {title}
            </h4>
            {description && (
              <p className="mt-1 text-sm text-green-700">
                {description}
              </p>
            )}
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-green-100 rounded-full transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
};