/**
 * @fileOverview A flow for generating a step-by-step summary of a code snippet.
 *
 * - summarizeCode - A function that takes a code snippet and returns a summary.
 * - SummarizeCodeInput - The input type for the summarizeCode function.
 * - SummarizeCodeOutput - The return type for the summarizeCode function.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to summarize.'),
  programmingLanguage: z.string().describe('The programming language of the code snippet (e.g., JavaScript, Python).'),
});
export type SummarizeCodeInput = z.infer<typeof SummarizeCodeInputSchema>;

const SummarizeCodeOutputSchema = z.object({
  summary: z.string().describe('The generated step-by-step summary that explains the code execution, formatted in Markdown.'),
});
export type SummarizeCodeOutput = z.infer<typeof SummarizeCodeOutputSchema>;

export async function summarizeCode(input: SummarizeCodeInput): Promise<SummarizeCodeOutput> {
  return summarizeCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCodePrompt',
  input: { schema: SummarizeCodeInputSchema },
  output: { schema: SummarizeCodeOutputSchema },
  prompt: `You are an expert at explaining code execution like the Python Tutor tool.
Your task is to take the following {{programmingLanguage}} code snippet and explain its execution step-by-step in a clear, concise narrative.
Format the entire output in Markdown. Use lists, bold text, and code formatting to make it readable.

Code:
\'\'\'
{{{code}}}
\'\'\'

Generate a step-by-step summary explaining what the code does, how variables change, and how functions are called and return.`,
});

const summarizeCodeFlow = ai.defineFlow(
  {
    name: 'summarizeCodeFlow',
    inputSchema: SummarizeCodeInputSchema,
    outputSchema: SummarizeCodeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
