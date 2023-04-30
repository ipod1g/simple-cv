import React from 'react';

const formatDate = (dateString: string | null | undefined) => {
  if (dateString === null || dateString === undefined) return null;

  const date = new Date(dateString);
  const monthAbbrev = date.toLocaleString('en', { month: 'short' });
  const year = date.getFullYear().toString().substr(-2);
  return `${monthAbbrev} ${year}`;
};

export default formatDate;
