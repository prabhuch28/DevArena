'use server';
/**
 * @fileOverview An AI mentor assistance flow that provides personalized hints and code explanations for DSA topics.
 *
 * - aiMentorAssistance - A function that handles the AI mentor assistance process.
 * - AIMentorAssistanceInput - The input type for the aiMentorAssistance function.
 * - AIMentorAssistanceOutput - The return type for the aiMentorAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMentorAssistanceInputSchema = z.object({
  topic: z.string().describe('The DSA topic for which assistance is requested.'),
  problemDescription: z.string().describe('The description of the coding problem.'),
  userCode: z.string().optional().describe('The user code (if any) for context.'),
});
export type AIMentorAssistanceInput = z.infer<typeof AIMentorAssistanceInputSchema>;

const AIMentorAssistanceOutputSchema = z.object({
  hint: z.string().describe('A personalized hint for the given DSA topic and problem.'),
  codeExplanation: z.string().describe('An explanation of the code, tailored to the user level.'),
});
export type AIMentorAssistanceOutput = z.infer<typeof AIMentorAssistanceOutputSchema>;

export async function aiMentorAssistance(input: AIMentorAssistanceInput): Promise<AIMentorAssistanceOutput> {
  return aiMentorAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorAssistancePrompt',
  input: {schema: AIMentorAssistanceInputSchema},
  output: {schema: AIMentorAssistanceOutputSchema},
  prompt: `You are an AI mentor specializing in Data Structures and Algorithms (DSA).

  Your goal is to provide personalized hints and code explanations to help users understand DSA topics and improve their problem-solving skills.

  Topic: {{{topic}}}
  Problem Description: {{{problemDescription}}}
  User Code (if any): {{{userCode}}}

  Provide a helpful hint and a code explanation tailored to the user's apparent skill level. The explanation must be aligned with best practices.
  Ensure the hint guides the user without giving away the complete solution and is easy to understand. The code explanation should cover the problem best practices.

  Output format: 
  \{
    hint: string // A single helpful hint
    codeExplanation: string // Explanation of the code
  \}`,
});

const aiMentorAssistanceFlow = ai.defineFlow(
  {
    name: 'aiMentorAssistanceFlow',
    inputSchema: AIMentorAssistanceInputSchema,
    outputSchema: AIMentorAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
