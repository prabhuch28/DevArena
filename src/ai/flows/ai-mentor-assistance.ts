'use server';
/**
 * @fileOverview A flow for providing AI-powered assistance on coding challenges.
 *
 * - getAiMentorAssistance - A function that takes a user's query about a challenge and returns a hint.
 * - GetAiMentorAssistanceInput - The input type for the getAiMentorAssistance function.
 * - GetAiMentorAssistanceOutput - The return type for the getAiMentorAssistance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { challenges } from '@/lib/challenges-data';

const GetAiMentorAssistanceInputSchema = z.object({
  challengeId: z.string().describe('The ID of the challenge the user is asking about.').optional(),
  query: z.string().describe("The user's question or request for a hint."),
  code: z.string().describe('The user\'s current code solution.').optional(),
});
export type GetAiMentorAssistanceInput = z.infer<typeof GetAiMentorAssistanceInputSchema>;

const GetAiMentorAssistanceOutputSchema = z.object({
  response: z.string().describe("The AI mentor's helpful response, formatted in Markdown."),
});
export type GetAiMentorAssistanceOutput = z.infer<typeof GetAiMentorAssistanceOutputSchema>;

export async function getAiMentorAssistance(
  input: GetAiMentorAssistanceInput
): Promise<GetAiMentorAssistanceOutput> {
  return aiMentorAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorAssistancePrompt',
  input: { schema: GetAiMentorAssistanceInputSchema },
  output: { schema: GetAiMentorAssistanceOutputSchema },
  prompt: `You are an expert and encouraging AI Coding Mentor for the DevArena platform. Your goal is to help users understand backend concepts and the DevArena application.

{{#if challengeId}}
A user is working on the following challenge:

Challenge Title: {{challenge.title}}
Challenge Description: {{challenge.description}}

The user's current code is:
\'\'\'
{{{code}}}
\'\'\'
{{/if}}

The user's question is: "{{query}}"

Your task:
1. Analyze the user's question.
2. If a challenge context is provided, use it. Analyze their current code in the context of the challenge.
3. Provide a helpful, Socratic-style hint or a conceptual explanation that guides them toward the solution.
4. If the user's code has a flaw, gently point them in the right direction to find it. For example, "Take a closer look at how you're handling the loop termination condition."
5. If the question is general (no challenge context), answer it as a helpful backend engineering expert.
6. DO NOT provide the final, correct code for challenges. Your purpose is to teach, not to solve it for them.
7. Keep your tone encouraging and supportive. Start your response with something like "That's a great question!" or "You're on the right track!".
8. **Format your entire response using Markdown.** Use code blocks for code snippets, lists for steps, and bold/italics for emphasis.`,
});

const aiMentorAssistanceFlow = ai.defineFlow(
  {
    name: 'aiMentorAssistanceFlow',
    inputSchema: GetAiMentorAssistanceInputSchema,
    outputSchema: GetAiMentorAssistanceOutputSchema,
  },
  async (input) => {
    let challengeData: { title: string; description: string } | undefined;
    if (input.challengeId) {
        const challenge = challenges.find(c => c.id === input.challengeId);
        if (challenge) {
            challengeData = {
                title: challenge.title,
                description: challenge.description
            };
        } else {
            console.warn(`Challenge with id ${input.challengeId} not found.`);
        }
    }
    
    const { output } = await prompt({
        ...input,
        // @ts-ignore
        challenge: challengeData
    });
    return output!;
  }
);
