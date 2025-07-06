
import React from 'react';
import { Share2, Download, Clock, Calendar } from 'lucide-react';
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
    <Card className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-blue-50/80 border-0 shadow-2xl animate-pulse-glow">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-green-800">
          <Clock className="w-6 h-6 text-green-600" />
          Duration Result
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="text-center p-6 bg-white/60 rounded-2xl">
          <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-2">
            {result.hours}
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-4">Total Hours</div>
          
          {/* Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-100/80 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-700">{result.days}</div>
              <div className="text-sm text-blue-600 font-medium">Days</div>
            </div>
            <div className="bg-purple-100/80 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-700">{result.hours % 24}</div>
              <div className="text-sm text-purple-600 font-medium">Hours</div>
            </div>
            <div className="bg-indigo-100/80 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-700">{result.minutes}</div>
              <div className="text-sm text-indigo-600 font-medium">Minutes</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onShare}
            variant="outline"
            className="flex-1 h-12 bg-white/80 border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Result
          </Button>
          <Button
            onClick={onExport}
            variant="outline"
            className="flex-1 h-12 bg-white/80 border-green-200 hover:bg-green-50 text-green-700 font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as File
          </Button>
        </div>

        {/* Signature */}
        <div className="text-center text-sm text-gray-500 italic pt-4 border-t border-gray-200/50">
          Calculated with ❤️ by Sharuck
        </div>
      </CardContent>
    </Card>
  );
};
