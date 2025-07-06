
import React from 'react';
import { Share2, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultCardProps {
  result: {
    hours: number;
    days: number;
    minutes: number;
  };
  onShare: () => void;
  onExport: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onShare, onExport }) => {
  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-black/70 border border-gray-200 dark:border-gray-700 shadow-2xl animate-pulse-glow">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
          <Clock className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          Duration Result
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="text-center p-6 bg-gray-50/80 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-600">
          <div className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-2">
            {result.hours}
          </div>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Total Hours</div>
          
          {/* Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-300 dark:border-gray-600">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{result.days}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Days</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-300 dark:border-gray-600">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{result.hours % 24}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Hours</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-300 dark:border-gray-600">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{result.minutes}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Minutes</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onShare}
            variant="outline"
            className="flex-1 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Result
          </Button>
          <Button
            onClick={onExport}
            variant="outline"
            className="flex-1 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as File
          </Button>
        </div>

        {/* Signature */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 italic pt-4 border-t border-gray-200 dark:border-gray-700">
          Calculated with ❤️ by Sharuck
        </div>
      </CardContent>
    </Card>
  );
};
