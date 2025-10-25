
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
import {
  generateCodeStory,
  GenerateCodeStoryOutput,
} from '@/ai/flows/code-story-flow';
import {
  generateCodeImage,
  GenerateCodeImageOutput,
} from '@/ai/flows/code-image-flow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CodeStoryPage() {
  const [code, setCode] = useState('');
  const [programmingLanguage, setProgrammingLanguage] = useState('JavaScript');
  const [language, setLanguage] = useState('English');
  const [story, setStory] = useState<GenerateCodeStoryOutput | null>(null);
  const [image, setImage] = useState<GenerateCodeImageOutput | null>(null);
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleGenerateStory = async () => {
    if (!code) return;
    setIsStoryLoading(true);
    setStory(null);
    try {
      const result = await generateCodeStory({
        code,
        programmingLanguage,
        language,
      });
      setStory(result);
    } catch (error) {
      console.error('Error generating story:', error);
      // You could show an error toast here
    } finally {
      setIsStoryLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!code) return;
    setIsImageLoading(true);
    setImage(null);
    try {
      const result = await generateCodeImage({ code, programmingLanguage });
      setImage(result);
    } catch (error) {
      console.error('Error generating image:', error);
      // You could show an error toast here
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Wand2 className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-headline text-4xl font-bold">
            Code Story & Canvas
          </h1>
          <p className="text-muted-foreground">
            Paste your code to get a story and a visual diagram explaining it.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Code</CardTitle>
            <CardDescription>
              Paste any code snippet below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="function helloWorld() { console.log('Hello, World!'); }"
              className="min-h-[300px] font-code text-sm bg-secondary border-0"
            />
            <div className="flex flex-wrap items-center gap-4">
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
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Story Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleGenerateStory}
                disabled={isStoryLoading || !code}
                className="w-full"
              >
                {isStoryLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Story...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2" />
                    Generate Story
                  </>
                )}
              </Button>
              <Button
                onClick={handleGenerateImage}
                disabled={isImageLoading || !code}
                className="w-full"
                variant="outline"
              >
                {isImageLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Image...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <Tabs defaultValue="story" className="w-full h-full flex flex-col">
            <CardHeader>
              <CardTitle>The Explanation</CardTitle>
               <TabsList className="grid w-full grid-cols-2 mt-2">
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="canvas">Canvas</TabsTrigger>
                </TabsList>
            </CardHeader>
            <TabsContent value="story" className="flex-grow">
               <CardContent className="h-full flex items-center justify-center">
                {isStoryLoading ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p>Our AI storyteller is crafting your tale...</p>
                  </div>
                ) : story ? (
                  <div className="prose prose-invert max-w-none text-sm">
                    <p>{story.story}</p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p className="font-semibold">Your story will appear here.</p>
                    <p className="text-xs">
                      Generate a story to see the magic happen.
                    </p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            <TabsContent value="canvas" className="flex-grow">
               <CardContent className="h-full flex items-center justify-center">
                 {isImageLoading ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p>Our AI artist is painting your code...</p>
                  </div>
                ) : image ? (
                    <Image
                      src={image.imageUrl}
                      alt="Generated diagram of the code"
                      width={500}
                      height={500}
                      className="rounded-lg object-contain"
                    />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p className="font-semibold">Your visual canvas will appear here.</p>
                    <p className="text-xs">
                      Generate an image to see your code visualized.
                    </p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
