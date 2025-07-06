
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-orange-400"></div>
      <span>Calculating...</span>
    </div>
  );
};
