'use client';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  userStats,
  problemsByCategory,
  dailyMissions,
  submissionAccuracy,
} from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Coins,
  Star,
  Flame,
  Target,
  CheckCircle,
} from 'lucide-react';

const chartConfig = {
  solved: {
    label: 'Solved',
  },
  arrays: {
    label: 'Arrays',
    color: 'hsl(var(--chart-1))',
  },
  strings: {
    label: 'Strings',
    color: 'hsl(var(--chart-2))',
  },
  trees: {
    label: 'Trees',
    color: 'hsl(var(--chart-3))',
  },
  graphs: {
    label: 'Graphs',
    color: 'hsl(var(--chart-4))',
  },
  dp: {
    label: 'DP',
    color: 'hsl(var(--chart-5))',
  },
  misc: {
    label: 'Misc',
    color: 'hsl(var(--muted))',
  },
};

const accuracyChartConfig = {
    value: {
        label: "Submissions"
    },
    accepted: {
        label: "Accepted",
        color: "hsl(var(--chart-1))"
    },
    rejected: {
        label: "Rejected",
        color: "hsl(var(--chart-2))"
    }
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Welcome Back, Coder!
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="XP Points"
          value={userStats.xp.toLocaleString()}
          icon={<Star className="h-6 w-6 text-yellow-400" />}
        />
        <StatCard
          title="Coins"
          value={userStats.coins.toLocaleString()}
          icon={<Coins className="h-6 w-6 text-amber-500" />}
        />
        <StatCard
          title="Global Rank"
          value={`#${userStats.rank}`}
          icon={<Trophy className="h-6 w-6 text-slate-400" />}
        />
        <StatCard
          title="Daily Streak"
          value={`${userStats.dailyStreak} Days`}
          icon={<Flame className="h-6 w-6 text-orange-500" />}
        />
        <StatCard
          title="Accuracy"
          value={`${userStats.accuracy}%`}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">
              Problems Solved by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={problemsByCategory}>
                <XAxis
                  dataKey="category"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
                  {problemsByCategory.map((entry) => (
                    <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Submission Accuracy</CardTitle>
                <CardDescription>Total submissions analysis</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                        <Pie data={submissionAccuracy} dataKey="value" nameKey="status" cx="50%" cy="50%" innerRadius={40} outerRadius={60} labelLine={false} paddingAngle={5}>
                             {submissionAccuracy.map((entry) => (
                                <Cell key={`cell-${entry.status}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">
                    <Target className="inline-block mr-2 h-5 w-5" />
                    Daily Missions
                </CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="space-y-3">
                    {dailyMissions.map((mission) => (
                    <li key={mission.id} className="flex items-center gap-3">
                        <Checkbox
                        id={`mission-${mission.id}`}
                        checked={mission.completed}
                        aria-label={mission.title}
                        />
                        <label
                        htmlFor={`mission-${mission.id}`}
                        className={`text-sm ${mission.completed ? 'text-muted-foreground line-through' : ''}`}
                        >
                        {mission.title}
                        </label>
                    </li>
                    ))}
                </ul>
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
