// components/ui/Tabs.tsx
'use client';

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Tab Context
interface TabContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsProps['variant'];
  orientation: TabsProps['orientation'];
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within Tabs');
  }
  return context;
};

// Main Tabs Component
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'glass' | 'gradient';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
}

export default function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
  orientation = 'horizontal',
  className,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(value || defaultValue || '');

  const handleTabChange = (newValue: string) => {
    if (!value) {
      setActiveTab(newValue);
    }
    onValueChange?.(newValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab: handleTabChange,
        variant,
        orientation,
      }}
    >
      <div
        className={cn(
          orientation === 'vertical' && 'flex gap-6',
          className
        )}
      >
        {children}
      </div>
    </TabContext.Provider>
  );
}

// TabsList Component
interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  const { variant, orientation } = useTabContext();
  const [indicatorStyle] = useState({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const variantClasses = {
    default: 'bg-slate-100 p-1 rounded-2xl',
    pills: 'bg-transparent gap-2',
    underline: 'border-b-2 border-slate-200',
    glass: 'glass-soft p-1 rounded-2xl',
    gradient: 'bg-gradient-to-r from-slate-100 to-slate-50 p-1 rounded-2xl',
  };

  return (
    <div
      ref={tabsRef}
      className={cn(
        'relative inline-flex',
        orientation === 'horizontal' 
          ? 'flex-row' 
          : 'flex-col min-w-[200px]',
        variantClasses,
        className
      )}
    >
      {children}
      
      {/* Animated indicator for underline variant */}
      {variant === 'underline' && (
        <motion.div
          className="absolute bottom-0 h-0.5 bg-emerald-500"
          style={indicatorStyle}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  );
}

// TabsTrigger Component
interface TabsTriggerProps {
  value: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  children: React.ReactNode;
}

export function TabsTrigger({
  value,
  className,
  disabled = false,
  icon,
  badge,
  children,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab, variant, orientation } = useTabContext();
  const isActive = activeTab === value;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-300',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    orientation === 'horizontal' ? 'px-4 py-2' : 'px-4 py-3 w-full'
  );

  const variantClasses = {
    default: cn(
      'rounded-xl hover:text-slate-900',
      isActive 
        ? 'bg-white text-slate-900 shadow-soft-sm' 
        : 'text-slate-600 hover:bg-white/50'
    ),
    pills: cn(
      'rounded-full',
      isActive
        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-soft-md'
        : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-emerald-200'
    ),
    underline: cn(
      'pb-3 rounded-none',
      isActive
        ? 'text-emerald-600'
        : 'text-slate-600 hover:text-slate-900'
    ),
    glass: cn(
      'rounded-xl',
      isActive
        ? 'bg-white/90 text-slate-900 shadow-soft-sm'
        : 'text-slate-600 hover:bg-white/30'
    ),
    gradient: cn(
      'rounded-xl',
      isActive
        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-soft-sm'
        : 'text-slate-600 hover:text-slate-900'
    ),
  };

  return (
    <button
      ref={triggerRef}
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses,
        className
      )}
    >
      {/* Active indicator for pills variant */}
      {variant === 'pills' && isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
        {badge !== undefined && (
          <span className={cn(
            'ml-1 px-2 py-0.5 text-xs rounded-full',
            isActive
              ? variant === 'pills' || variant === 'gradient'
                ? 'bg-white/20 text-white'
                : 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-600'
          )}>
            {badge}
          </span>
        )}
      </span>
    </button>
  );
}

// TabsContent Component
interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsContent({
  value,
  className,
  children,
}: TabsContentProps) {
  const { activeTab, orientation } = useTabContext();
  
  if (activeTab !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        orientation === 'horizontal' ? 'mt-6' : 'flex-1',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Scrollable Tabs Component for many tabs
interface ScrollableTabsProps extends TabsProps {
  showScrollButtons?: boolean;
}

export function ScrollableTabs({
  showScrollButtons = true,
  children,
  ...props
}: ScrollableTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  return (
    <div className="relative">
      {showScrollButtons && canScrollLeft && (
        <button
          onClick={() => { scroll('left'); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-soft-md hover:shadow-soft-lg"
        >
          ←
        </button>
      )}
      
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
        onScroll={checkScrollability}
      >
        <Tabs {...props}>
          {children}
        </Tabs>
      </div>
      
      {showScrollButtons && canScrollRight && (
        <button
          onClick={() => { scroll('right'); }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-soft-md hover:shadow-soft-lg"
        >
          →
        </button>
      )}
    </div>
  );
}

//export { Tabs, TabsList, TabsTrigger, TabsContent, ScrollableTabs };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };