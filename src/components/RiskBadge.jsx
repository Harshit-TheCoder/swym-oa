import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const RiskBadge = ({ level, className }) => {
  const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center";
  const colors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800"
  };

  return (
    <span className={twMerge(clsx(baseClasses, colors[level]), className)}>
      {level}
    </span>
  );
};
