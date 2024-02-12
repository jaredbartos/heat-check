import { DateTime } from 'luxon';

export const formatDate = (timestamp) => {
  const dt = DateTime.fromJSDate(new Date(Number(timestamp)));

  return dt.toLocaleString();
};