'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Book, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { challenges } from '@/lib/challenges-data';

export default function ChallengesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Zap className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            Coding Challenges
          </h1>
          <p className="text-muted-foreground">
            Test your skills and compete with others.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="flex flex-col hover:border-primary transition-colors"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">
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
              <CardDescription className="line-clamp-2">
                {challenge.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span>Category: {challenge.category}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/challenges/${challenge.id}`}>
                  Start Challenge <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
