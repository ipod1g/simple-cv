import formatDate from '@/utils/formatDate';
import React from 'react';

const ContentDuration = (props: {
  duration: {
    start: string;
    end: string | null;
  };
}) => {
  if (typeof props.duration?.start === 'undefined') return null;

  return props.duration?.end ? (
    <div className="text-base">
      {formatDate(props.duration.start) === formatDate(props.duration.end)
        ? formatDate(props.duration.start)
        : formatDate(props.duration.start) +
          ' - ' +
          formatDate(props.duration.end)}
    </div>
  ) : (
    <div className="text-base">
      {formatDate(props.duration.start)} - Present
    </div>
  );
};

export default ContentDuration;
