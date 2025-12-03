// components/common/dropdown/Dropdown.tsx
import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
  value?: string;
  onClose?: () => void; // Add this line
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  isOpen,
  onToggle,
  children,
  className = '',
  value,
  onClose // Add this prop
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.(); // Call onClose when clicking outside
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm w-full"
      >
        <span className="text-gray-700 dark:text-gray-300 font-medium flex-1 text-left">
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : label}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && children}
    </div>
  );
};

export default Dropdown;