export interface DateFormatOptions {
  format?: 'long' | 'short' | 'iso';
  locale?: string;
}

/**
 * Formats a date string or Date object, treating date-only strings as local dates.
 * If user inputs "2025-10-01", it will display as "October 1, 2025" regardless of timezone.
 * @param date - The date string or Date object to format.
 * @param options - Formatting options
 * @returns A formatted date string.
 */
export function formatDate(date: string | Date, options: DateFormatOptions = {}): string {
  const { format = 'long', locale = 'en-US' } = options;
  
  if (!date) return '';
  
  let dateObj: Date;
  
  if (typeof date === 'string') {
    if (format === 'iso') {
      // For ISO format, just return the date part if it's YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
    }
    
    // For date-only strings (YYYY-MM-DD), parse as local date to avoid timezone shifts
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-').map(Number);
      dateObj = new Date(year, month - 1, day); // month is 0-indexed
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  
  if (isNaN(dateObj.getTime())) {
    return typeof date === 'string' ? date : '';
  }
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'long' ? 'long' : 'short',
    day: 'numeric',
  };
  
  return dateObj.toLocaleDateString(locale, formatOptions);
}