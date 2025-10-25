'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, Code, Swords, Clock, User, Bot } from 'lucide-react';
import { challenges } from '@/lib/challenges-data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';
import Image from 'next/image';
import { generateCodeStory, GenerateCodeStoryOutput } from '@/ai/flows/code-story-flow';
import { generateCodeImage, GenerateCodeImageOutput } from '@/ai/flows/code-image-flow';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const DUEL_DURATION_SECONDS = 300; // 5 minutes

export default function ChallengeDetailPage({
  params,
}: {
  params: { challengeId: string };
}) {
  const challenge = challenges.find((c) => c.id === params.challengeId);
  const { user } = useUser();

  const [code, setCode] = useState('');
  const [opponentCode, setOpponentCode] = useState(`// Opponent is typing...`);
  const [timeLeft, setTimeLeft] = useState(DUEL_DURATION_SECONDS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState<GenerateCodeStoryOutput | null>(null);
  const [image, setImage] = useState<GenerateCodeImageOutput | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Simulate opponent typing
    const typingInterval = setInterval(() => {
        setOpponentCode(prev => prev + '\n' + `const solution = () => {};`);
    }, 5000);
    return () => clearInterval(typingInterval);
  }, [])

  if (!challenge) {
    notFound();
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    if (!code) return;
    setIsModalOpen(true);
    setIsGenerating(true);
    setStory(null);
    setImage(null);

    try {
      // These can run in parallel
      const storyPromise = generateCodeStory({ code, programmingLanguage: 'JavaScript', language: 'English' });
      const imagePromise = generateCodeImage({ code, programmingLanguage: 'JavaScript' });

      const [storyResult, imageResult] = await Promise.all([storyPromise, imagePromise]);
      
      setStory(storyResult);
      setImage(imageResult);

    } catch (error) {
      console.error('Error generating AI content:', error);
      // You could show an error toast here
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-[calc(100vh-100px)]">
        {/* Header Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Swords className="text-primary w-8 h-8" />
                <div>
                  <CardTitle className="font-headline text-2xl">
                    {challenge.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge
                      variant={
                        challenge.difficulty === 'Easy'
                          ? 'secondary'
                          : challenge.difficulty === 'Medium'
                          ? 'default'
                          : 'destructive'
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                    <CardDescription>Category: {challenge.category}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Clock className="w-5 h-5"/>
                  <span>Time Left</span>
                </div>
                <p className="text-2xl font-mono font-bold text-destructive">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow min-h-0">
          {/* Left Column: Challenge Description */}
          <Card className="lg:col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow prose prose-invert max-w-none text-sm">
              <p>{challenge.description}</p>
            </CardContent>
          </Card>

          {/* Middle Column: Your Editor */}
          <Card className="lg:col-span-5 flex flex-col">
            <CardHeader>
               <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/40/40`} data-ai-hint="person" />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle>Your Solution</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
              <Textarea
                placeholder="Enter your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-grow font-code bg-secondary border-0 resize-none"
              />
               <Button size="lg" onClick={handleRunCode}>
                <Play className="mr-2" />
                Submit & Visualize
              </Button>
            </CardContent>
          </Card>
          
          {/* Right Column: Opponent's Editor */}
          <Card className="lg:col-span-4 flex flex-col bg-secondary/50">
             <CardHeader>
               <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback><Bot/></AvatarFallback>
                  </Avatar>
                  <CardTitle>Opponent's Code</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Textarea
                value={opponentCode}
                readOnly
                className="flex-grow font-code bg-background/30 border-0 resize-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>AI Code Analysis</DialogTitle>
            <DialogDescription>
              Your code has been submitted! Here's a creative and visual explanation of what it does.
            </DialogDescription>
          </DialogHeader>
          {isGenerating ? (
             <div className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className='font-semibold'>Our AI is analyzing and visualizing your code...</p>
              <p className='text-sm'>This may take a moment.</p>
            </div>
          ) : (
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Code Story</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm prose-invert max-w-none">
                  {story && <ReactMarkdown>{story.story}</ReactMarkdown>}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Visual Diagram</CardTitle>
                </CardHeader>
                <CardContent>
                  {image && <Image src={image.imageUrl} alt="AI generated diagram of code" width={500} height={500} className="rounded-lg" />}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
