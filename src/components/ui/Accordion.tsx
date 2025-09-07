// src/components/ui/Accordion.tsx
'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpen?: string | string[];
  variant?: 'default' | 'bordered' | 'glass' | 'gradient';
  iconType?: 'chevron' | 'plus';
  className?: string;
}

export default function Accordion({
  items,
  type = 'single',
  defaultOpen,
  variant = 'default',
  iconType = 'chevron',
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (defaultOpen) {
      return Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen];
    }
    return [];
  });

  const toggleItem = (itemId: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(itemId) ? [] : [itemId]);
    } else {
      setOpenItems(
        openItems.includes(itemId)
          ? openItems.filter((id) => id !== itemId)
          : [...openItems, itemId]
      );
    }
  };

  const variants = {
    default: {
      container: 'space-y-2',
      item: 'bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden',
      header: 'hover:bg-neutral-800/50',
    },
    bordered: {
      container: 'space-y-4',
      item: 'border-2 border-neutral-800 rounded-xl overflow-hidden hover:border-primary-500/50 transition-colors',
      header: 'hover:bg-white/5',
    },
    glass: {
      container: 'space-y-3',
      item: 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden',
      header: 'hover:bg-white/10',
    },
    gradient: {
      container: 'space-y-4',
      item: 'relative rounded-xl overflow-hidden before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-accent-purple before:via-accent-pink before:to-primary-500 before:-z-10 bg-neutral-900',
      header: 'hover:bg-white/5',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className={cn(currentVariant.container, className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={{ 
              scale: isOpen ? 1.02 : 1,
              transition: { duration: 0.2 }
            }}
            className={currentVariant.item}
          >
            {/* Header */}
            <button
              onClick={() => { toggleItem(item.id); }}
              className={cn(
                'w-full px-6 py-4 flex items-center justify-between text-left transition-all',
                currentVariant.header
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <span className="text-primary-500">{item.icon}</span>
                )}
                <span className="font-semibold text-white">{item.title}</span>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                {iconType === 'chevron' ? (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                ) : isOpen ? (
                  <Minus className="w-5 h-5 text-white/60" />
                ) : (
                  <Plus className="w-5 h-5 text-white/60" />
                )}
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-white/70">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}