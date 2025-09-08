// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * This ensures proper Tailwind CSS class precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to locale string
 */
export function formatDate(date: Date | string, locale: "en" | "he" = "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  
  return d.toLocaleDateString(locale === "he" ? "he-IL" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if we're on the server
 */
export const isServer = typeof window === "undefined";

/**
 * Check if we're on mobile
 */
export function isMobile(): boolean {
  if (isServer) return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get viewport dimensions
 */
export function getViewport() {
  if (isServer) {
    return { width: 1920, height: 1080 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(elementId: string, offset: number = 0) {
  if (isServer) return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (isServer) return false;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Format number with separators
 */
export function formatNumber(num: number, locale: "en" | "he" = "en"): string {
  return new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US").format(num);
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone (Israeli format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+972|0)([23489]|5[0-9]|7[0-9])[0-9]{7}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}