'use client';

import { useActionState, useState } from 'react';
import { getAIHelp, State } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, BookOpen, BrainCircuit } from 'lucide-react';
import { Separator } from './ui/separator';

interface AIMentorProps {
  challenge: { id: string, title: string };
  problemDescription: string;
}

export function AIMentor({ challenge, problemDescription }: AIMentorProps) {
  const [userCode, setUserCode] = useState('');
  const initialState: State = { message: null, data: null };
  const [state, formAction, isPending] = useActionState(getAIHelp, initialState);

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle className="font-headline flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-primary" />
          AI Mentor
        </SheetTitle>
        <SheetDescription>
          Stuck on "{challenge.title}"? Get a hint or explanation.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-grow mt-4 overflow-y-auto">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="topic" value={challenge.title} />
          <input type="hidden" name="problemDescription" value={problemDescription} />
          <div>
            <label htmlFor="userCode" className="text-sm font-medium">Your Code (optional)</label>
            <Textarea
              id="userCode"
              name="userCode"
              placeholder="Paste your code here for a more personalized hint."
              className="mt-1 min-h-[150px] font-code"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Analyzing...' : 'Get Assistance'}
          </Button>
        </form>

        {state?.message && state.message !== "Success" && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}

        {isPending && (
            <div className="mt-6 space-y-4 animate-pulse">
                <div className="h-8 bg-muted rounded-md w-1/3"></div>
                <div className="h-20 bg-muted rounded-md"></div>
                <div className="h-8 bg-muted rounded-md w-1/3 mt-4"></div>
                <div className="h-32 bg-muted rounded-md"></div>
            </div>
        )}

        {state?.data && (
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-headline">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Hint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{state.data.hint}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-headline">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Code Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: state.data.codeExplanation.replace(/\n/g, '<br />') }}>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
