'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Play, Upload, BrainCircuit } from 'lucide-react';
import { AIMentor } from './ai-mentor';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import type { allChallenges } from '@/lib/data';

interface CodeEditorProps {
    challenge: typeof allChallenges[0];
    problemDescription: string;
    isDuel?: boolean;
    readOnly?: boolean;
}

export function CodeEditor({ challenge, problemDescription, isDuel = false, readOnly = false }: CodeEditorProps) {
  const defaultCode = `// Language: JavaScript\n// Problem: ${challenge.title}\n\nfunction solve() {\n  // Write your code here\n  \n}`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
        <Select defaultValue="javascript">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" disabled={readOnly}>
                    <BrainCircuit className="w-4 h-4 mr-2" />
                    AI Mentor
                </Button>
            </SheetTrigger>
            <SheetContent>
                <AIMentor challenge={challenge} problemDescription={problemDescription} />
            </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <Textarea
          placeholder="Write your code here..."
          className="h-full w-full resize-none border-none rounded-none focus-visible:ring-0 font-code text-base"
          defaultValue={defaultCode}
          readOnly={readOnly}
        />
      </CardContent>
      <CardFooter className="p-3 border-t flex justify-end gap-2">
        <Button variant="secondary" disabled={readOnly}>
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>
        <Button className="bg-accent hover:bg-accent/90" disabled={readOnly}>
          <Upload className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
