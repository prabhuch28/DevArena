import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { challenges } from '@/lib/data';

export default function ChallengesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="font-headline text-4xl font-bold mb-2">Challenges</h1>
      <p className="text-muted-foreground mb-8">
        Test your skills. Climb the ranks. Become a legend.
      </p>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="pro">Pro</TabsTrigger>
        </TabsList>
        <TabsContent value="beginner">
          <ChallengeGrid challenges={challenges.beginner} />
        </TabsContent>
        <TabsContent value="intermediate">
          <ChallengeGrid challenges={challenges.intermediate} />
        </TabsContent>
        <TabsContent value="pro">
          <ChallengeGrid challenges={challenges.pro} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChallengeGrid({
  challenges,
}: {
  challenges: {
    id: string;
    title: string;
    difficulty: string;
    xp: number;
    category: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-lg">
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
                className={challenge.difficulty === 'Medium' ? 'bg-yellow-500 text-white' : ''}
              >
                {challenge.difficulty}
              </Badge>
            </div>
            <CardDescription>{challenge.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Earn <span className="font-bold text-primary">{challenge.xp} XP</span> upon completion.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href={`/challenges/${challenge.id}`}>Start Challenge</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
