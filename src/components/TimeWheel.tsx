
import React from 'react';
import { Clock } from 'lucide-react';

interface TimeWheelProps {
  result: {
    hours: number;
    days: number;
    minutes: number;
  };
}

export const TimeWheel: React.FC<TimeWheelProps> = ({ result }) => {
  // Calculate percentage for the arc (max 100 hours for visual appeal)
  const maxHours = Math.max(100, result.hours);
  const percentage = (result.hours / maxHours) * 100;
  const circumference = 2 * Math.PI * 120; // radius of 120
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-80 h-80 mx-auto">
      {/* Background Circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 280 280">
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="4"
          fill="none"
        />
        {/* Gradient Progress Circle */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="50%" stopColor="#f7931e" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke="url(#progressGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-2000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.5))'
          }}
        />
      </svg>
      
      {/* Center Content */}
      <div className="text-center z-10">
        <div className="text-6xl md:text-7xl font-bold text-white mb-2 font-mono">
          {result.hours}
        </div>
        <div className="text-lg text-gray-300 mb-4">Total Hours</div>
        
        {/* Time Breakdown */}
        <div className="space-y-1 text-sm">
          <div className="text-orange-400">{result.days} days</div>
          <div className="text-yellow-400">{result.hours % 24} hours</div>
          <div className="text-green-400">{result.minutes} minutes</div>
        </div>
      </div>
      
      {/* Decorative dots around the circle */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) - 90; // Start from top
          const radian = (angle * Math.PI) / 180;
          const x = 140 + 130 * Math.cos(radian);
          const y = 140 + 130 * Math.sin(radian);
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
