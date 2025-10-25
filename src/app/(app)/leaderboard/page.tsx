'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { leaderboardData } from '@/lib/leaderboard-data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const rankIcons: { [key: number]: React.ReactNode } = {
  1: <Trophy className="w-6 h-6 text-yellow-400" />,
  2: <Medal className="w-6 h-6 text-slate-400" />,
  3: <Award className="w-6 h-6 text-yellow-600" />,
};

const rankRowClass: { [key: number]: string } = {
  1: 'bg-yellow-400/10 hover:bg-yellow-400/20 border-yellow-400/20',
  2: 'bg-slate-400/10 hover:bg-slate-400/20 border-slate-400/20',
  3: 'bg-yellow-600/10 hover:bg-yellow-600/20 border-yellow-600/20',
};

export default function LeaderboardPage() {
  const currentUserRank = 7; // Mock current user rank

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Trophy className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See who's at the top of the DevArena world.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
          <CardDescription>Top 10 developers this season.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Rank</TableHead>
                <TableHead>Developer</TableHead>
                <TableHead className="text-right pr-6">XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow
                  key={entry.rank}
                  className={cn(
                    rankRowClass[entry.rank],
                    entry.rank === currentUserRank && 'bg-primary/20 hover:bg-primary/30 border-primary/30'
                  )}
                >
                  <TableCell className="font-bold text-lg">
                    <div className="flex items-center justify-center gap-2">
                       {rankIcons[entry.rank] || <span className="text-muted-foreground">{entry.rank}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-11 h-11 border-2 border-primary/20">
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.name}
                          width={44}
                          height={44}
                          data-ai-hint={entry.avatarHint}
                        />
                        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{entry.name}</p>
                        {entry.rank === currentUserRank && (
                          <Badge variant="default" className="mt-1">
                            You
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-lg pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <span>{entry.xp.toLocaleString()}</span>
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
