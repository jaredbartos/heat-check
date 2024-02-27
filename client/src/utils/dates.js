import { DateTime } from 'luxon';

// Helper function to format dates for storage in database
export const formatDate = (timestamp) => {
  const dt = DateTime.fromJSDate(new Date(Number(timestamp)), {zone: 'utc'});

  return dt.toFormat('LL/dd/yy');
};

// Helper function to format dates to be edited in UI
export const formatEditDate = (timestamp) => {
  const dt = DateTime.fromJSDate(new Date(Number(timestamp)), {zone: 'utc'});

  return dt.toFormat('yyyy-LL-dd');
}