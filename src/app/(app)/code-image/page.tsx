'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { generateCodeImage, GenerateCodeImageOutput } from '@/ai/flows/code-image-flow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

export default function CodeImagePage() {
  const [code, setCode] = useState(
`function checkAuth(request) {
  const token = request.headers.get('Authorization');
  if (!token) {
    return { status: 401, body: 'Unauthorized' };
  }
  try {
    const user = verifyJwt(token);
    // Attach user to request for downstream services
    request.user = user; 
    return null; // Continue
  } catch (e) {
    return { status: 403, body: 'Forbidden' };
  }
}
`
  );
  const [programmingLanguage, setProgrammingLanguage] = useState('JavaScript');
  const [image, setImage] = useState<GenerateCodeImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code) return;
    setIsLoading(true);
    setImage(null);
    try {
      const result = await generateCodeImage({ code, programmingLanguage });
      setImage(result);
    } catch (error) {
      console.error('Error generating image:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8 h-full">
      <div className="flex items-center gap-4">
        <ImageIcon className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            AI Code-to-Image Generator
          </h1>
          <p className="text-muted-foreground">
            Visualize your code's logic as a diagram.
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
            <div className="grid grid-cols-1 gap-4">
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
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
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
                  Generating Diagram...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2" />
                  Generate Diagram
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Generated Diagram</CardTitle>
            <CardDescription>The AI's visual explanation of your code's logic.</CardDescription>
          </CardHeader>
           <CardContent className="flex-grow flex items-center justify-center overflow-auto p-4 bg-secondary/50 rounded-b-lg">
            {isLoading && (
               <div className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className='font-semibold'>The AI is drawing the architecture...</p>
                <p className='text-sm'>Please wait while the diagram is generated.</p>
              </div>
            )}
            {!isLoading && !image && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
                <p className='font-semibold'>Your diagram will appear here</p>
                <p className='text-sm text-center'>Enter code and click "Generate Diagram" to begin.</p>
              </div>
            )}
            {image && (
              <Image 
                src={image.imageUrl} 
                alt="AI generated diagram of code" 
                width={512} 
                height={512} 
                className="rounded-lg object-contain"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
