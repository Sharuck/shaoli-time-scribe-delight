
import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    hours: number;
    days: number;
    minutes: number;
  } | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, result }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !result) return null;

  const shareText = `🕒 Duration calculated with Shaoli's Calculator:

📊 Total: ${result.hours} hours
📅 Breakdown: ${result.days} days, ${result.hours % 24} hours, ${result.minutes} minutes

✨ Calculated by yours truly, Sharuck
🔗 ${window.location.href}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Share text copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 dark:bg-black/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-2xl animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Share Result</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-line border border-gray-200 dark:border-gray-600">
            {shareText}
          </div>
          
          <Button
            onClick={handleCopy}
            className="w-full h-10 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-semibold transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Share Text
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
