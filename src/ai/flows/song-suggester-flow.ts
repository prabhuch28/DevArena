'use server';
/**
 * @fileOverview A flow for suggesting a song based on a user's mood or activity.
 *
 * - suggestSong - A function that takes a user's context and returns a song suggestion.
 * - SuggestSongInput - The input type for the suggestSong function.
 * - SuggestSongOutput - The return type for the suggestSong function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestSongInputSchema = z.object({
  context: z.string().describe("The user's current mood, feeling, or activity (e.g., 'feeling focused', 'debugging a tough problem', 'celebrating a win')."),
});
export type SuggestSongInput = z.infer<typeof SuggestSongInputSchema>;

const SuggestSongOutputSchema = z.object({
    songName: z.string().describe("The name of the suggested song."),
    artist: z.string().describe("The artist of the suggested song."),
    reason: z.string().describe("A short, fun reason why this song was chosen for the user's context."),
});
export type SuggestSongOutput = z.infer<typeof SuggestSongOutputSchema>;

export async function suggestSong(
  input: SuggestSongInput
): Promise<SuggestSongOutput> {
  return suggestSongFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSongPrompt',
  input: { schema: SuggestSongInputSchema },
  output: { schema: SuggestSongOutputSchema },
  prompt: `You are a cool and knowledgeable DJ. A user is looking for the perfect song for a specific moment.

User's context: "{{context}}"

Your task:
1.  Analyze the user's context.
2.  Suggest one perfect song (song name and artist) that fits the vibe.
3.  Provide a short, cool reason why you're recommending this specific track. Keep it concise and fun.

Give me one song recommendation.`,
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
