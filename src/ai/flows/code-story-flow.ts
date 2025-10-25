/**
 * @fileOverview A flow for generating a story from a code snippet.
 *
 * - generateCodeStory - A function that takes a code snippet and returns a story.
 * - GenerateCodeStoryInput - The input type for the generateCodeStory function.
 * - GenerateCodeStoryOutput - The return type for the generateCodeStory function.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCodeStoryInputSchema = z.object({
  code: z.string().describe('The code snippet to generate a story from.'),
  language: z.string().describe('The language to generate the story in (e.g., English, Gujarati, Telugu).'),
});
export type GenerateCodeStoryInput = z.infer<typeof GenerateCodeStoryInputSchema>;

const GenerateCodeStoryOutputSchema = z.object({
  story: z.string().describe('The generated story that explains the code.'),
});
export type GenerateCodeStoryOutput = z.infer<typeof GenerateCodeStoryOutputSchema>;

export async function generateCodeStory(input: GenerateCodeStoryInput): Promise<GenerateCodeStoryOutput> {
  return generateCodeStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeStoryPrompt',
  input: { schema: GenerateCodeStoryInputSchema },
  output: { schema: GenerateCodeStoryOutputSchema },
  prompt: `You are a master storyteller who can explain complex code in a simple, engaging narrative.
Your task is to take the following code snippet and explain it as a story in {{language}}.
The story should be easy to understand for someone who is not a programmer.

Code:
\'\'\'
{{{code}}}
\'\'\'

Please generate a story that explains what this code does.`,
});

const generateCodeStoryFlow = ai.defineFlow(
  {
    name: 'generateCodeStoryFlow',
    inputSchema: GenerateCodeStoryInputSchema,
    outputSchema: GenerateCodeStoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
