import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true
}) => {
  // ... (component's logic)
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          //... motion props
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          {/* ... rest of the JSX */}
          <motion.div className={clsx('relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full', sizeClasses[size])}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button onClick={onClose}><X size={20} /></button>
            </div>
            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Make sure it has a default export
export default Modal;