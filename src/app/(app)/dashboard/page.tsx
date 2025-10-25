'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ListChecks, ToyBrick, Presentation, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase';


const todoItems = [
    { id: 1, title: 'Explore the Interactive Playground', completed: false, href: '/playground' },
    { id: 2, title: 'Watch the "API Endpoints" tutorial', completed: false, href: '/tutorials/api-endpoints' },
    { id: 3, title: 'Read the documentation on JWT Authentication', completed: false, href: '/docs/jwt' },
    { id: 4, title: 'Build a simple login flow visually', completed: false, href: '/playground' },
];

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome, {user?.displayName || 'Developer'}!
        </h1>
        <p className="text-muted-foreground">Let's demystify the backend, one block at a time.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
            title="Interactive Playground"
            description="Visually construct and understand backend logic with a drag-and-drop canvas."
            icon={<ToyBrick className="w-10 h-10 text-primary" />}
            href="/playground"
            cta="Open Playground"
        />
        <FeatureCard
            title="Visual Tutorials"
            description="Learn complex topics through step-by-step animated tutorials."
            icon={<Presentation className="w-10 h-10 text-primary" />}
            href="/tutorials"
            cta="Browse Tutorials"
        />
        <FeatureCard
            title="Documentation"
            description="Dive deep into concepts with our comprehensive, easy-to-read docs."
            icon={<BookOpen className="w-10 h-10 text-primary" />}
            href="/docs"
            cta="Read Docs"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <ListChecks />
            Your Learning Path
          </CardTitle>
          <CardDescription>
            Here are some suggested next steps to get you started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {todoItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/80 transition-colors">
                <Checkbox
                  id={`todo-${item.id}`}
                  checked={item.completed}
                  aria-label={item.title}
                />
                <label
                  htmlFor={`todo-${item.id}`}
                  className={`flex-grow text-sm ${item.completed ? 'text-muted-foreground line-through' : ''}`}
                >
                  {item.title}
                </label>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={item.href}>Go</Link>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  href,
  cta
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-start gap-4">
        {icon}
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardContent>
         <Button asChild className="w-full">
            <Link href={href}>{cta}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
