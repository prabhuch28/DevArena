'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Music, Loader2, Wand2, Mic, GitBranch } from 'lucide-react';
import { suggestSong, SuggestSongOutput } from '@/ai/flows/song-suggester-flow';

export default function SongSuggesterPage() {
  const [context, setContext] = useState('Coding a hackathon project');
  const [suggestion, setSuggestion] = useState<SuggestSongOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!context) return;
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestSong({ context });
      setSuggestion(result);
    } catch (error) {
      console.error('Error suggesting song:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Music className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            AI Song Suggester
          </h1>
          <p className="text-muted-foreground">
            Find the perfect track for any moment.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>What's the vibe?</CardTitle>
            <CardDescription>Tell the AI your mood or what you're doing.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., 'Focusing hard on a bug'"
              className="bg-secondary border-0"
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !context}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding a bop...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2" />
                  Suggest a Song
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
            {isLoading && (
               <div className="h-full flex flex-col items-center justify-center gap-4 text-muted-foreground p-8 bg-secondary/30 rounded-lg">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
                <p className='font-semibold text-lg'>Our AI DJ is spinning the decks...</p>
                <p className='text-sm'>Please wait while we find the perfect track for you.</p>
              </div>
            )}
            {!isLoading && !suggestion && (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-muted-foreground p-8 bg-secondary/30 rounded-lg">
                 <Music className="w-16 h-16 text-primary/50" />
                <p className='font-semibold text-lg'>Your song suggestion will appear here</p>
                <p className='text-sm text-center'>Enter your vibe and click "Suggest a Song" to begin.</p>
              </div>
            )}
            {suggestion && (
                <Card className="h-full bg-gradient-to-br from-primary/10 to-background shadow-lg">
                    <CardHeader className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="p-4 bg-primary/20 rounded-full">
                                <Mic className="w-12 h-12 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="font-headline text-3xl">{suggestion.songName}</CardTitle>
                        <CardDescription className="text-lg">{suggestion.artist}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground italic">"{suggestion.reason}"</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <GitBranch className="w-4 h-4"/>
                            <span>Powered by BackEndVis AI</span>
                         </div>
                    </CardFooter>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
