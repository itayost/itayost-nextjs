// components/ui/Modal.tsx
'use client';

import { useEffect, useCallback, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  variant?: 'default' | 'glass' | 'minimal';
  position?: 'center' | 'top' | 'bottom';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
  overlayClassName,
  variant = 'default',
  position = 'center',
}: ModalProps) {
  // Handle ESC key press
  const handleEscKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEsc) {
      onClose();
    }
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscKey]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-20',
    bottom: 'items-end justify-center pb-20',
  };

  const variantClasses = {
    default: 'bg-white shadow-soft-2xl',
    glass: 'glass-white shadow-soft-xl',
    minimal: 'bg-white',
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed inset-0 z-50 bg-black/20 backdrop-blur-sm',
              overlayClassName
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          
          {/* Modal Container */}
          <div className={cn(
            'fixed inset-0 z-50 flex overflow-y-auto',
            positionClasses[position]
          )}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: 'spring',
                duration: 0.5,
                bounce: 0.3
              }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'relative w-full rounded-3xl',
                sizeClasses[size],
                variantClasses[variant],
                'mx-4 my-8 p-6 sm:p-8',
                className
              )}
            >
              {/* Decorative blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 blob-gradient blob-shape opacity-20" />
              
              {/* Close button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              )}
              
              {/* Header */}
              {(title || description) && (
                <div className="mb-6">
                  {title && (
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-slate-600 mt-2">
                      {description}
                    </p>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className="relative">
                {children}
              </div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document root
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}

// Modal Footer Component
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export function ModalFooter({ 
  children, 
  className,
  align = 'right' 
}: ModalFooterProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={cn(
      'flex items-center gap-3 mt-8 pt-6 border-t border-slate-100',
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  );
}

// Confirmation Modal Component
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'info' | 'warning' | 'danger' | 'success';
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'אישור פעולה',
  message,
  confirmText = 'אישור',
  cancelText = 'ביטול',
  variant = 'info',
  loading = false,
}: ConfirmModalProps) {
  const variantColors = {
    info: 'bg-gradient-to-r from-sky-500 to-blue-500',
    warning: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    danger: 'bg-gradient-to-r from-red-500 to-rose-500',
    success: 'bg-gradient-to-r from-emerald-500 to-green-500',
  };

  const variantIcons = {
    info: '❓',
    warning: '⚠️',
    danger: '⛔',
    success: '✅',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={!loading}
      closeOnEsc={!loading}
      showCloseButton={!loading}
    >
      <div className="text-center">
        {/* Icon */}
        <div className="text-5xl mb-4">
          {variantIcons[variant]}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          {title}
        </h3>
        
        {/* Message */}
        <p className="text-slate-600 mb-6">
          {message}
        </p>
        
        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-soft min-w-[100px]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'min-w-[100px] px-6 py-3 rounded-full text-white font-medium',
              variantColors[variant],
              'hover:scale-105 transition-transform',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {loading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}