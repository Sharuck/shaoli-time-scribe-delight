import React, { useState } from 'react';
import { Calendar, Clock, Share2, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Confetti } from './Confetti';
import { LoadingSpinner } from './LoadingSpinner';
import { TimeWheel } from './TimeWheel';
import { ShareModal } from './ShareModal';

const HourCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [result, setResult] = useState<{
    hours: number;
    days: number;
    minutes: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const calculateHours = async () => {
    if (!startDate || !startTime || !endDate || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all date and time fields.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (endDateTime <= startDateTime) {
      toast({
        title: "Invalid Date Range",
        description: "End date and time must be after start date and time.",
        variant: "destructive",
      });
      setIsCalculating(false);
      return;
    }

    const diffInMs = endDateTime.getTime() - startDateTime.getTime();
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    setResult({ hours, days, minutes });
    setIsCalculating(false);
    setShowConfetti(true);
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleShare = async () => {
    if (!result) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shaoli's Calculator Result",
          text: `Duration: ${result.hours} hours (${result.days} days and ${result.hours % 24} hours)`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleExportPDF = () => {
    if (!result) return;
    
    // Create a simple text-based PDF content
    const content = `
      SHAOLI'S CALCULATOR - DURATION RESULT
      By yours truly, Sharuck
      
      Duration Calculated: ${result.hours} total hours
      
      Breakdown:
      • ${result.days} days
      • ${result.hours % 24} hours  
      • ${result.minutes} minutes
      
      Calculated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shaoli-calculator-result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete!",
      description: "Your calculation has been exported successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8 px-4 font-inter relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Gradient Border Effect */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-green-500 opacity-20 blur-sm"></div>
      
      {showConfetti && <Confetti />}
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-orange-400 animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              Shaoli's Calculator
            </h1>
            <Sparkles className="w-8 h-8 text-green-400 animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-lg text-gray-300 mb-2">Noise off. Focus on.</p>
          <p className="text-lg text-gray-300 mb-2">Time doesn't rush here.</p>
          <p className="text-sm text-gray-400 italic">By yours truly, Sharuck ✨</p>
        </div>

        {/* Main Calculator Card */}
        <Card className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold text-white">
              <Clock className="w-6 h-6 text-orange-400" />
              Calculate Duration
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Start Date/Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* End Date/Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              onClick={calculateHours}
              disabled={isCalculating}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 via-red-500 to-green-500 hover:from-orange-600 hover:via-red-600 hover:to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isCalculating ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Calculate Vault Timing
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Display with Time Wheel */}
        {result && (
          <div className="mt-8 animate-celebration">
            <Card className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Flow time</h3>
                </div>
                
                <TimeWheel result={result} />
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 h-12 bg-white/10 border-white/20 hover:bg-white/20 text-white font-semibold transition-all duration-200 hover:scale-[1.02]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Result
                  </Button>
                  <Button
                    onClick={handleExportPDF}
                    variant="outline"
                    className="flex-1 h-12 bg-white/10 border-white/20 hover:bg-white/20 text-white font-semibold transition-all duration-200 hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export as File
                  </Button>
                </div>

                {/* Signature */}
                <div className="text-center text-sm text-gray-400 italic pt-6 border-t border-white/10 mt-6">
                  Calculated with ❤️ by Sharuck
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        result={result}
      />
    </div>
  );
};

export default HourCalculator;
