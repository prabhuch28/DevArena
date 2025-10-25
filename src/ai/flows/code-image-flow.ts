/**
 * @fileOverview A flow for generating an image from a code snippet.
 *
 * - generateCodeImage - A function that takes a code snippet and returns an image.
 * - GenerateCodeImageInput - The input type for the generateCodeImage function.
 * - GenerateCodeImageOutput - The return type for the generateCodeImage function.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCodeImageInputSchema = z.object({
  code: z.string().describe('The code snippet to generate an image from.'),
  programmingLanguage: z
    .string()
    .describe(
      'The programming language of the code snippet (e.g., JavaScript, Python).'
    ),
});
export type GenerateCodeImageInput = z.infer<typeof GenerateCodeImageInputSchema>;

const GenerateCodeImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "A data URI of the generated image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateCodeImageOutput = z.infer<
  typeof GenerateCodeImageOutputSchema
>;

export async function generateCodeImage(
  input: GenerateCodeImageInput
): Promise<GenerateCodeImageOutput> {
  return generateCodeImageFlow(input);
}

const generateCodeImageFlow = ai.defineFlow(
  {
    name: 'generateCodeImageFlow',
    inputSchema: GenerateCodeImageInputSchema,
    outputSchema: GenerateCodeImageOutputSchema,
  },
  async ({ code, programmingLanguage }) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: { text: `Generate a clear, visually appealing diagram (like a flowchart or architecture diagram) that explains the logic of the following ${programmingLanguage} code snippet. The diagram should be easy to understand for a beginner. The diagram should be self-contained and not require any additional text to understand.

Code:
\'\'\'
${code}
\'\'\'
`},
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
