'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2, Loader2, Disc } from 'lucide-react';
import { suggestSong, SuggestSongOutput } from '@/ai/flows/song-suggester-flow';
import { Separator } from '@/components/ui/separator';

export default function SongSuggesterPage() {
  const [context, setContext] = useState('Just deployed to production on a Friday');
  const [suggestion, setSuggestion] = useState<SuggestSongOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!context) return;
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestSong({ context });
      setSuggestion(result);
    } catch (error) => {
      console.error('Error suggesting song:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8 h-full">
      <div className="flex items-center gap-4">
        <Disc className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            AI Song Suggester
          </h1>
          <p className="text-muted-foreground">
            Your personal AI DJ for the perfect coding soundtrack.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>What's the vibe?</CardTitle>
          <CardDescription>Tell the AI what you're doing or how you're feeling.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., debugging a tough problem, celebrating a launch..."
              className="flex-grow bg-secondary border-0"
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !context}
              className="w-full sm:w-auto"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Spinning the track...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2" />
                  Get Suggestion
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isLoading && (
        <Card className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8 bg-secondary/50">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className='font-semibold'>Our AI DJ is searching the crates...</p>
        </Card>
      )}

      {!isLoading && !suggestion && (
        <Card className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8 bg-secondary/50">
          <p className='font-semibold'>Your song suggestion will appear here</p>
          <p className='text-sm text-center'>Enter your context above and click "Get Suggestion" to start.</p>
        </Card>
      )}

      {suggestion && (
        <Card className="flex-grow flex flex-col bg-secondary/50">
          <CardHeader className="text-center">
            <CardTitle className="text-primary text-3xl font-headline">{suggestion.song}</CardTitle>
            <CardDescription className="text-lg">by {suggestion.artist}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">Here's why:</p>
              <p className="text-lg text-muted-foreground mt-2 max-w-md mx-auto">"{suggestion.reason}"</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
