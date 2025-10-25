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
import { Play, Code, Terminal } from 'lucide-react';
import { challenges } from '@/lib/challenges-data';
import { notFound } from 'next/navigation';

export default function ChallengeDetailPage({
  params,
}: {
  params: { challengeId: string };
}) {
  const challenge = challenges.find((c) => c.id === params.challengeId);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Your output will appear here...');

  if (!challenge) {
    notFound();
  }

  const handleRunCode = () => {
    setOutput('Running code...');
    // In a real scenario, you'd execute the code in a sandbox
    // and capture the output. For now, we'll just simulate it.
    setTimeout(() => {
        setOutput(`Simulated output for:
        
${code}

> Executed successfully.
> 2 tests passed, 0 failed.`);
    }, 1000);
  }

  return (
    <div className="h-[calc(100vh-100px)] grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column */}
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

      {/* Right Column */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        {/* Code Editor */}
        <Card className="flex flex-col flex-grow-[2]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code /> Your Solution
            </CardTitle>
            <CardDescription>
              Write your code and run it to see the output.
            </CardDescription>
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
              Run Code
            </Button>
          </CardContent>
        </Card>
        
        {/* Output/Console */}
        <Card className="flex flex-col flex-grow-[1]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal /> Output
            </CardTitle>
             <CardDescription>
              Results from your code execution will be displayed here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <pre className="bg-secondary p-4 rounded-md text-sm text-muted-foreground whitespace-pre-wrap h-full font-code">
                {output}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
