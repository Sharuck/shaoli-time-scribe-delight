
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black"></div>
      <span className="text-white dark:text-black">Calculating...</span>
    </div>
  );
};
