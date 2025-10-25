'use client';

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
import { Play, Code, Zap } from 'lucide-react';
import { challenges } from '@/lib/challenges-data';
import { notFound } from 'next/navigation';

export default function ChallengeDetailPage({
  params,
}: {
  params: { challengeId: string };
}) {
  const challenge = challenges.find((c) => c.id === params.challengeId);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-100px)] grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Challenge Description */}
      <Card className="flex flex-col">
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

      {/* Code Editor and Submission */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code /> Your Solution
          </CardTitle>
          <CardDescription>
            Write your code below and submit it for evaluation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4">
          <Textarea
            placeholder="Enter your code here..."
            className="flex-grow font-code bg-secondary border-0 resize-none"
          />
          <Button size="lg">
            <Play className="mr-2" />
            Run & Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
