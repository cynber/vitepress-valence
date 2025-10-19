import { format, parseISO, isValid } from 'date-fns'

export interface DateFormatOptions {
  format?: 'long' | 'short' | 'iso' | string;
  locale?: string;
}

/**
 * Formats a date string or Date object using date-fns
 * @param date - The date string or Date object to format
 * @param options - Formatting options
 * @returns A formatted date string
 */
export function formatDate(date: string | Date, options: DateFormatOptions = {}): string {
  const { format: formatType = 'long' } = options;
  
  if (!date) return '';
  
  let dateObj: Date;
  
  if (typeof date === 'string') {
    // Handle ISO date strings (with timezone info)
    if (date.includes('T') || date.includes('Z')) {
      dateObj = parseISO(date);
    } 
    // Handle date-only strings (YYYY-MM-DD) as local dates
    else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-').map(Number);
      dateObj = new Date(year, month - 1, day);
    } 
    // Try to parse other date formats
    else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  
  if (!isValid(dateObj)) {
    return typeof date === 'string' ? date : '';
  }
  
  // Handle predefined formats
  switch (formatType) {
    case 'iso':
      return format(dateObj, 'yyyy-MM-dd');
    case 'long':
      return format(dateObj, 'MMMM d, yyyy');
    case 'short':
      return format(dateObj, 'MMM d, yyyy');
    default:
      // Allow custom date-fns format strings
      try {
        return format(dateObj, formatType);
      } catch (error) {
        console.warn(`Invalid date format: ${formatType}, falling back to long format`);
        return format(dateObj, 'MMMM d, yyyy');
      }
  }
}

/**
 * Displays a deprecation warning for a component.
 * @param oldComponentName - The name of the old component.
 * @param newComponentName - The name of the new component.
 * @param removalVersion - The version when the component will be removed.
 */
export function useDeprecationWarning(
  oldComponentName: string, 
  newComponentName: string, 
  removalVersion: string = 'v3.0.0'
): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      ` DEPRECATION WARNING: ${oldComponentName} will be removed in ${removalVersion}\n` +
      `   Please migrate to the VPV-prefixed version: ${newComponentName}\n` +
      `   See migration guide: https://cynber.dev/projects/vitepress-valence/`
    );
  }
}