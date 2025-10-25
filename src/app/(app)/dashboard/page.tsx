'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ListChecks,
  ToyBrick,
  Presentation,
  BookOpen,
  CheckCircle2,
  Star,
  Trophy,
  Zap,
  History,
  LineChart,
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { recentActivities } from '@/lib/activity-data';
import { XPProgressChart } from '@/components/xp-progress-chart';
import { xpData } from '@/lib/chart-data';

const initialTodoItems = [
  {
    id: 1,
    title: 'Explore the Interactive Playground',
    completed: false,
    href: '/playground',
    icon: <ToyBrick className="w-4 h-4" />,
  },
  {
    id: 2,
    title: 'Watch the "API Endpoints" tutorial',
    completed: false,
    href: '/tutorials/api-endpoints',
    icon: <Presentation className="w-4 h-4" />,
  },
  {
    id: 3,
    title: 'Read docs on JWT Authentication',
    completed: false,
    href: '/docs/jwt',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 4,
    title: 'Complete the "Two Sum" challenge',
    completed: false,
    href: '/challenges/two-sum',
    icon: <Zap className="w-4 h-4" />,
  },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const { toast } = useToast();

  const handleTodoChange = (id: number) => {
    setTodoItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, completed: !item.completed };
          if (updatedItem.completed) {
            toast({
              title: 'Task Completed!',
              description: `Great job on finishing: "${updatedItem.title}"`,
            });
          }
          return updatedItem;
        }
        return item;
      });
      return newItems;
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back, {user?.displayName || 'Developer'}!
        </h1>
        <p className="text-muted-foreground">
          Let's continue to demystify the backend, one block at a time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Total XP"
              value="8,500"
              icon={<Star className="w-6 h-6 text-yellow-400" />}
            />
            <StatCard
              title="Challenges Solved"
              value="12"
              icon={<Zap className="w-6 h-6 text-green-500" />}
            />
            <StatCard
              title="Global Rank"
              value="#7"
              icon={<Trophy className="w-6 h-6 text-blue-400" />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <LineChart />
                Weekly XP Progress
              </CardTitle>
              <CardDescription>
                Your experience points gained over the last 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <XPProgressChart data={xpData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <History />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-full">
                      {activity.icon}
                    </div>
                    <div className="flex-grow text-sm">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                    {activity.points && (
                      <Badge variant="secondary">+{activity.points} XP</Badge>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <ListChecks />
                Your Learning Path
              </CardTitle>
              <CardDescription>
                Suggested next steps to get you started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {todoItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Checkbox
                      id={`todo-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={() => handleTodoChange(item.id)}
                      aria-label={item.title}
                    />
                    <div
                      className={`p-2 rounded-full ${
                        item.completed
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-secondary'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <label
                      htmlFor={`todo-${item.id}`}
                      className={`flex-grow text-sm cursor-pointer ${
                        item.completed ? 'text-muted-foreground line-through' : ''
                      }`}
                    >
                      {item.title}
                    </label>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link href="/playground">
                  <ToyBrick className="mr-2" /> Open Playground
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tutorials">
                  <Presentation className="mr-2" /> Browse Tutorials
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/docs">
                  <BookOpen className="mr-2" /> Read Docs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
