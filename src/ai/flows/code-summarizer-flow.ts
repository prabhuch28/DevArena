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
  prompt: `You are an expert at explaining code execution, like the Python Tutor tool (pythontutor.com). Your task is to provide a step-by-step, line-by-line narrative of what a piece of code is doing.

For the given {{programmingLanguage}} code, generate a detailed execution summary.

Code:
\'\'\'
{{{code}}}
\'\'\'

Follow these instructions for your summary:
1.  Start from the first line of execution.
2.  For each step, describe what the line does in simple terms.
3.  Explain how variables are created, what their values are, and how they change.
4.  When a function is called, describe the creation of a new "frame" for that function call. Mention the values of the parameters passed into it.
5.  When a function returns, state the return value and that its frame is discarded.
6.  If there's recursion, clearly explain the stack of function calls.
7.  Keep the explanation clear and easy for a beginner to follow.
8.  **Format the entire output in Markdown.** Use a numbered list for the steps. Use bold text for variable names and function names, and use inline code blocks for values (e.g., \`1\`, \`"hello"\`, \`null\`).

Generate the step-by-step summary.`,
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
