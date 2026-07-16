import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ score, level }) => {
  const colors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500"
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-2 rounded-full ${colors[level]}`}
      />
    </div>
  );
};
