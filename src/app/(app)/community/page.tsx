import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { communityPosts } from '@/lib/data';
import { ThumbsUp, MessageSquare, Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
       <div className="flex items-center gap-4 mb-8">
            <Users className="w-10 h-10 text-primary" />
            <div>
                <h1 className="font-headline text-4xl font-bold">Community Feed</h1>
                <p className="text-muted-foreground">
                Share, learn, and grow with the community.
                </p>
            </div>
        </div>
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-start gap-4">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/1/40/40" data-ai-hint="person" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Textarea placeholder="What's on your mind, coder?" className="w-full" />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button>Post</Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        {communityPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-start gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://picsum.photos/seed/${post.avatarSeed}/40/40`}
                  alt={post.name}
                  data-ai-hint="person"
                />
                <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.name}</p>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
            </CardContent>
            <CardFooter className="flex gap-4 border-t pt-4 mt-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
