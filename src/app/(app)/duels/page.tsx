import { CodeEditor } from '@/components/code-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Timer, Swords } from 'lucide-react';
import { allChallenges } from '@/lib/data';

export default function DuelsPage() {
  const challenge = allChallenges[0]; // Using 'Two Sum' as a mock problem
  const problemDescription = `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.
`;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <Swords className="w-10 h-10 text-primary" />
            <div>
                <h1 className="font-headline text-4xl font-bold">Code Duel</h1>
                <p className="text-muted-foreground">You vs. LogicLane</p>
            </div>
        </div>
        <Card className="p-4 flex items-center gap-3 bg-accent text-accent-foreground">
          <Timer className="w-6 h-6" />
          <span className="font-mono text-2xl font-bold">02:47</span>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold font-headline">{challenge.title}</h2>
        <p className="text-sm text-muted-foreground">First to solve 3 test cases wins!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
        {/* Player 1 - You */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/1/40/40" data-ai-hint="person" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">You</h3>
            </div>
            <div className="text-lg font-bold">2/3 Solved</div>
          </div>
          <div className="h-full">
            <CodeEditor challenge={challenge} problemDescription={problemDescription} isDuel={true} />
          </div>
        </div>

        {/* Player 2 - Opponent */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/102/40/40" data-ai-hint="person" />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">LogicLane</h3>
            </div>
            <div className="text-lg font-bold">1/3 Solved</div>
          </div>
          <div className="h-full">
            <CodeEditor challenge={challenge} problemDescription={problemDescription} isDuel={true} readOnly={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
