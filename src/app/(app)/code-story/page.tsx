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
import { Wand2, Loader2, BookText } from 'lucide-react';
import { generateCodeStory, GenerateCodeStoryOutput } from '@/ai/flows/code-story-flow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CodeStoryPage() {
  const [code, setCode] = useState(
`function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap arr[j] and arr[j+1]
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
`
  );
  const [programmingLanguage, setProgrammingLanguage] = useState('JavaScript');
  const [language, setLanguage] = useState('English');
  const [story, setStory] = useState<GenerateCodeStoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code) return;
    setIsLoading(true);
    setStory(null);
    try {
      const result = await generateCodeStory({ code, programmingLanguage, language });
      setStory(result);
    } catch (error) {
      console.error('Error generating story:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8 h-full">
      <div className="flex items-center gap-4">
        <BookText className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            AI Code Story Generator
          </h1>
          <p className="text-muted-foreground">
            Turn your code into a fun and engaging story.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow min-h-0">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enter your code</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="flex-grow font-code text-sm bg-secondary border-0 resize-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={programmingLanguage}
                onValueChange={setProgrammingLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Code Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="Go">Go</SelectItem>
                </SelectContent>
              </Select>
               <Select
                value={language}
                onValueChange={setLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Story Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                   <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !code}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Writing Story...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2" />
                  Generate Story
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Code Story</CardTitle>
            <CardDescription>The AI's narrative explanation of your code.</CardDescription>
          </CardHeader>
           <CardContent className="prose prose-sm prose-invert max-w-none flex-grow overflow-auto">
            {isLoading && (
               <div className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className='font-semibold'>The AI is crafting a masterpiece...</p>
                <p className='text-sm'>Please wait while the story is being written.</p>
              </div>
            )}
            {!isLoading && !story && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
                <p className='font-semibold'>Your story will appear here</p>
                <p className='text-sm text-center'>Enter code and click "Generate Story" to begin.</p>
              </div>
            )}
            {story && (
              <ReactMarkdown>{story.story}</ReactMarkdown>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
