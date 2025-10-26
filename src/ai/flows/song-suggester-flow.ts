/**
 * @fileOverview A flow for generating a song suggestion based on user context.
 *
 * - suggestSong - A function that takes a user's context and returns a song suggestion.
 * - SuggestSongInput - The input type for the suggestSong function.
 * - SuggestSongOutput - The return type for the suggestSong function.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestSongInputSchema = z.object({
  context: z.string().describe('The user\'s current situation, mood, or activity (e.g., "celebrating a big win", "debugging a tough problem").'),
});
export type SuggestSongInput = z.infer<typeof SuggestSongInputSchema>;

const SuggestSongOutputSchema = z.object({
  song: z.string().describe('The name of the suggested song.'),
  artist: z.string().describe('The artist of the suggested song.'),
  reason: z.string().describe('A creative and fun reason why this song fits the user\'s context.'),
});
export type SuggestSongOutput = z.infer<typeof SuggestSongOutputSchema>;

export async function suggestSong(input: SuggestSongInput): Promise<SuggestSongOutput> {
  return suggestSongFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSongPrompt',
  input: { schema: SuggestSongInputSchema },
  output: { schema: SuggestSongOutputSchema },
  prompt: `You are an AI DJ for developers with a witty and fun personality.
Your task is to suggest the perfect song for a developer based on their current situation.

User's context: "{{context}}"

Suggest a song (song and artist) that fits this mood.
Also, provide a short, creative, and fun reason for your choice.
For example, if the context is "just shipped a feature," you could suggest "Don't Stop Me Now" by Queen.`,
});

const suggestSongFlow = ai.defineFlow(
  {
    name: 'suggestSongFlow',
    inputSchema: SuggestSongInputSchema,
    outputSchema: SuggestSongOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
