'use client';

import { useState } from 'react';
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
import { Play, Code, MessageSquare, Loader2, Send, User, Bot } from 'lucide-react';
import { challenges } from '@/lib/challenges-data';
import { notFound } from 'next/navigation';
import { getAiMentorAssistance } from '@/ai/flows/ai-mentor-assistance';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function ChallengeDetailPage({
  params,
}: {
  params: { challengeId: string };
}) {
  const challenge = challenges.find((c) => c.id === params.challengeId);
  const [code, setCode] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isMentorLoading, setIsMentorLoading] = useState(false);


  if (!challenge) {
    notFound();
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: chatInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsMentorLoading(true);

    try {
      const result = await getAiMentorAssistance({
        challengeId: challenge.id,
        query: chatInput,
        code,
      });
      const aiMessage: ChatMessage = { sender: 'ai', text: result.response };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI assistance:', error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsMentorLoading(false);
    }
  };


  return (
    <div className="h-[calc(100vh-100px)] grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Column */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Challenge Description */}
        <Card className="flex flex-col flex-grow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-2xl">
                {challenge.title}
              </CardTitle>
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
            </div>
            <CardDescription>Category: {challenge.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow prose prose-invert max-w-none text-sm">
            <p>{challenge.description}</p>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <Card className="flex flex-col flex-grow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code /> Your Solution
            </CardTitle>
            <CardDescription>
              Write your code, ask the AI Mentor for hints, and submit when you're ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-4">
            <Textarea
              placeholder="Enter your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow font-code bg-secondary border-0 resize-none"
            />
            <Button size="lg">
              <Play className="mr-2" />
              Run & Submit
            </Button>
          </CardContent>
        </Card>
      </div>


      {/* Right Column - AI Mentor */}
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot /> AI Mentor
          </CardTitle>
          <CardDescription>
            Stuck? Ask for a hint or explanation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4 min-h-0">
          <ScrollArea className="flex-grow pr-4 -mr-4 h-0">
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback><Bot size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[85%] text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    {msg.text}
                  </div>
                   {msg.sender === 'user' && (
                    <Avatar className="w-8 h-8 border">
                       <AvatarFallback><User size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isMentorLoading && (
                <div className="flex items-start gap-3">
                   <Avatar className="w-8 h-8 border">
                      <AvatarFallback><Bot size={18}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                </div>
            )}
            </div>
          </ScrollArea>
          <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask for a hint..."
              className="flex-grow bg-secondary border-0"
              disabled={isMentorLoading}
            />
            <Button type="submit" size="icon" disabled={isMentorLoading || !chatInput.trim()}>
              <Send />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
