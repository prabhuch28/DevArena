import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Trophy className="w-10 h-10 text-yellow-400" />
        <div>
          <h1 className="font-headline text-4xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See who's dominating the AlgoVerse.
          </p>
        </div>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="college">College</TabsTrigger>
        </TabsList>
        <TabsContent value="global">
          <LeaderboardTable players={leaderboard} />
        </TabsContent>
        <TabsContent value="weekly">
          <LeaderboardTable players={[...leaderboard].sort(() => Math.random() - 0.5)} />
        </TabsContent>
        <TabsContent value="college">
            <div className="text-center py-16 text-muted-foreground">
                <p>College leaderboards coming soon!</p>
                <p className="text-sm">Compete with your campus mates.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LeaderboardTable({ players }: { players: typeof leaderboard }) {
  return (
    <div className="rounded-lg border mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">XP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.rank} className={player.rank <= 3 ? 'bg-card' : ''}>
              <TableCell className="font-bold text-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://picsum.photos/seed/${player.avatarSeed}/40/40`}
                      alt={player.name}
                      data-ai-hint="person"
                    />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{player.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono font-semibold text-primary">
                {player.xp.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
