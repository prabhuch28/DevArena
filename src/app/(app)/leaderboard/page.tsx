
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Shield, Medal, Star } from 'lucide-react';
import { leaderboardData } from '@/lib/leaderboard-data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const rankIcons = {
  1: <Trophy className="text-yellow-400" />,
  2: <Medal className="text-gray-400" />,
  3: <Shield className="text-yellow-600" />,
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
            See who's at the top of the BackEndVis world.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
          <CardDescription>Top 10 developers this season.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Developer</TableHead>
                <TableHead className="text-right">XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow
                  key={entry.rank}
                  className={entry.rank === currentUserRank ? 'bg-primary/10' : ''}
                >
                  <TableCell className="font-bold text-lg">
                    <div className="flex items-center justify-center">
                      {rankIcons[entry.rank as keyof typeof rankIcons] || entry.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <Image src={entry.avatarUrl} alt={entry.name} width={40} height={40} data-ai-hint={entry.avatarHint} />
                        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{entry.name}</p>
                        {entry.rank === currentUserRank && (
                           <Badge variant="secondary" className="mt-1">You</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono flex items-center justify-end gap-2">
                    {entry.xp.toLocaleString()} <Star className="w-4 h-4 text-yellow-400"/>
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
