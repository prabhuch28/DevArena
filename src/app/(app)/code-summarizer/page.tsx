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

export default function CodeSummarizerPage() {
  const [code, setCode] = useState(
`def listSum(numbers):
  if not numbers:
    return 0
  else:
    (f, rest) = numbers
    return f + listSum(rest)

myList = (1, (2, (3, null)))
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
    <div className="container mx-auto py-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <GitBranch className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            Code Summarizer & Visualizer
          </h1>
          <p className="text-muted-foreground">
            Get a step-by-step summary and visualization of your code's execution, similar to Python Tutor.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Code Input</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="min-h-[250px] font-code text-sm bg-secondary border-0"
          />
          <div className="flex flex-col sm:flex-row gap-2">
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
              className="w-full sm:w-auto"
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

      {isLoading && (
         <div className="flex flex-col items-center gap-4 text-muted-foreground p-8">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className='font-semibold'>AI is analyzing your code...</p>
            <p className='text-sm'>Please wait while we generate the execution steps and visualization.</p>
          </div>
      )}

      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Execution Summary</CardTitle>
              <CardDescription>
                A step-by-step breakdown of what the code is doing.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm prose-invert max-w-none">
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
           <Card>
            <CardHeader>
              <CardTitle>Live Visualization</CardTitle>
              <CardDescription>
                Frames and objects in memory at each step. (Conceptual)
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground p-8">
              <p className="font-semibold">Visualization Coming Soon</p>
              <p className="text-xs">
                An interactive visualization of your code's state will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
