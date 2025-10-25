import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Presentation, Clock, BarChart2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const tutorials = [
    {
        id: 'api-endpoints',
        title: 'Understanding API Endpoints',
        description: 'Learn the fundamentals of creating and interacting with API endpoints.',
        duration: '15 min',
        difficulty: 'Beginner',
        imageUrl: 'https://picsum.photos/seed/301/600/400',
        imageHint: 'api network',
        challengeId: 'two-sum',
        challengeTitle: 'Two Sum'
    },
    {
        id: 'jwt-auth',
        title: 'Securing Routes with JWT',
        description: 'A step-by-step guide to implementing JSON Web Token authentication.',
        duration: '25 min',
        difficulty: 'Intermediate',
        imageUrl: 'https://picsum.photos/seed/302/600/400',
        imageHint: 'security lock',
        challengeId: 'valid-parentheses',
        challengeTitle: 'Valid Parentheses'
    },
    {
        id: 'db-queries',
        title: 'Mastering Database Queries',
        description: 'From simple lookups to complex joins, visualize how data is retrieved.',
        duration: '30 min',
        difficulty: 'Intermediate',
        imageUrl: 'https://picsum.photos/seed/303/600/400',
        imageHint: 'database server',
        challengeId: 'merge-two-sorted-lists',
        challengeTitle: 'Merge Two Sorted Lists'
    },
    {
        id: 'caching-strategies',
        title: 'Implementing Caching Strategies',
        description: 'Explore different caching techniques like Redis to speed up your app.',
        duration: '20 min',
        difficulty: 'Advanced',
        imageUrl: 'https://picsum.photos/seed/304/600/400',
        imageHint: 'fast speed',
        challengeId: 'lru-cache',
        challengeTitle: 'LRU Cache'
    }
];

export default function TutorialsPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center gap-4 mb-8">
                <Presentation className="w-10 h-10 text-primary" />
                <div>
                    <h1 className="font-headline text-4xl font-bold">Visual Tutorials</h1>
                    <p className="text-muted-foreground">
                        Learn complex backend concepts through interactive, step-by-step guides.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="flex flex-col overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="relative">
                            <Image 
                                src={tutorial.imageUrl} 
                                alt={tutorial.title}
                                width={600}
                                height={400}
                                data-ai-hint={tutorial.imageHint}
                                className="w-full h-48 object-cover"
                            />
                             <Badge 
                                className="absolute top-2 right-2"
                                variant={
                                    tutorial.difficulty === 'Beginner' ? 'secondary' :
                                    tutorial.difficulty === 'Intermediate' ? 'default' :
                                    'destructive'
                                }
                            >
                                {tutorial.difficulty}
                            </Badge>
                        </div>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">{tutorial.title}</CardTitle>
                            <CardDescription className="text-xs line-clamp-2">{tutorial.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3">
                           <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3"/>
                                    <span>{tutorial.duration}</span>
                               </div>
                               <div className="flex items-center gap-2">
                                    <BarChart2 className="w-3 h-3" />
                                    <span>{tutorial.difficulty}</span>
                               </div>
                           </div>
                           <Link href={`/challenges/${tutorial.challengeId}`} className="text-xs inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <Zap className="w-3 h-3"/>
                            <span>Related Challenge: {tutorial.challengeTitle}</span>
                           </Link>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/tutorials/${tutorial.id}`}>Start Tutorial</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
