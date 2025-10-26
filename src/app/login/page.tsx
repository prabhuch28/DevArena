'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { GitBranch, Loader2, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);


  const handleSignIn = () => {
    initiateEmailSignIn(auth, email, password);
  };
  
  const handleFingerprintSignIn = () => {
    toast({
      title: 'Simulating Fingerprint Scan',
      description: 'Signing you in with anonymous authentication...',
    });
    initiateAnonymousSignIn(auth);
  }

  if (isUserLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-0 bg-background/50 backdrop-blur-sm shadow-2xl shadow-black/50">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <GitBranch className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to DevArena</CardTitle>
          <CardDescription>Sign in to enter the arena</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary border-0"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSignIn}>
            Sign In
          </Button>

          <div className="relative w-full">
            <Separator className="my-2" />
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-background/50 px-2 text-xs text-muted-foreground">OR</span>
          </div>

          <Button variant="outline" className="w-full" onClick={handleFingerprintSignIn}>
            <Fingerprint className="mr-2 h-4 w-4" />
            Sign in with Fingerprint
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Don't have an account?{' '}
            <Link href="/signup" className="underline font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
