import React from "react";

const TimeFormatter = ({ seconds }) => {
  if (seconds <= 0) return <span>Завершено</span>;

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  return (
    <span>
      {days > 0 && `${days}д `}{hours > 0 && `${hours}ч `}
      {minutes > 0 && `${minutes}м `}{seconds}с
    </span>
  );
};

export default TimeFormatter;
