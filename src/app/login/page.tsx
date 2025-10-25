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
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Atom } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);


  const handleSignIn = () => {
    initiateEmailSignIn(auth, email, password);
  };
  
  if (isUserLoading || user) {
    return <div className="flex items-center justify-center min-h-screen bg-background">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="w-full max-w-sm border-0 bg-background shadow-2xl shadow-black/50">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Atom className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your journey in AlgoVerse</CardDescription>
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
          <p className="text-xs text-center text-muted-foreground">
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
