'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Play, GitBranch } from 'lucide-react';
import { summarizeCode, SummarizeCodeOutput } from '@/ai/flows/code-summarizer-flow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function CodeSummarizerPage() {
  const [code, setCode] = useState(
`def listSum(numbers):
  if not numbers:
    return 0
  else:
    (f, rest) = numbers
    return f + listSum(rest)

myList = (1, (2, (3, None)))
total = listSum(myList)`
  );
  const [programmingLanguage, setProgrammingLanguage] = useState('Python');
  const [summary, setSummary] = useState<SummarizeCodeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code) return;
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeCode({ code, programmingLanguage });
      setSummary(result);
    } catch (error) {
      console.error('Error generating summary:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8 h-full">
      <div className="flex items-center gap-4">
        <GitBranch className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            Code Execution Visualizer
          </h1>
          <p className="text-muted-foreground">
            Visualize your code's execution step-by-step, inspired by Python Tutor.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 flex-grow">
        <Card className="flex-shrink-0">
          <CardHeader>
            <CardTitle>Write code to visualize</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[1fr_auto] gap-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[200px] font-code text-sm bg-secondary border-0"
            />
            <div className="flex flex-col gap-2">
              <Select
                value={programmingLanguage}
                onValueChange={setProgrammingLanguage}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Code Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="C++">C++</SelectItem>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="Go">Go</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !code}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Visualizing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2" />
                    Visualize Execution
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          {isLoading && (
            <Card className="lg:col-span-2 flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className='font-semibold'>AI is analyzing your code...</p>
              <p className='text-sm'>Please wait while we generate the execution steps.</p>
            </Card>
          )}
          {!isLoading && !summary && (
            <Card className="lg:col-span-2 flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
              <p className='font-semibold'>Visualization output will appear here</p>
              <p className='text-sm text-center'>Enter your code and click "Visualize Execution" to see the step-by-step summary.</p>
            </Card>
          )}
          {summary && (
            <>
              <Card className='flex flex-col'>
                <CardHeader>
                  <CardTitle>Frames</CardTitle>
                  <CardDescription>Execution steps and call stack</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm prose-invert max-w-none flex-grow overflow-auto">
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside" {...props} />,
                    }}
                  >
                    {summary.summary}
                  </ReactMarkdown>
                </CardContent>
              </Card>
              <Card className='flex flex-col'>
                <CardHeader>
                  <CardTitle>Objects</CardTitle>
                  <CardDescription>Data structures in memory</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground flex-grow flex items-center justify-center">
                  <div>
                    <p className="font-semibold">Visualization Coming Soon</p>
                    <p className="text-xs">
                      An interactive diagram of your code's objects will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
