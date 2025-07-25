'use server';

/**
 * @fileOverview A flow to curate a quote of the day for morning motivation.
 *
 * - curateQuoteOfTheDay - A function that returns a quote of the day.
 * - CurateQuoteOfTheDayOutput - The return type for the curateQuoteOfTheDay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CurateQuoteOfTheDayOutputSchema = z.object({
  quote: z.string().describe('A quote of the day for morning motivation.'),
});

export type CurateQuoteOfTheDayOutput = z.infer<typeof CurateQuoteOfTheDayOutputSchema>;

export async function curateQuoteOfTheDay(): Promise<CurateQuoteOfTheDayOutput> {
  // If the Gemini API key is not set, return a default quote.
  // This prevents the app from crashing if the key is missing.
  if (!process.env.GEMINI_API_KEY) {
    return {
      quote: "The journey of a thousand miles begins with a single step.",
    };
  }
  return curateQuoteOfTheDayFlow();
}

const quoteOfTheDayPrompt = ai.definePrompt({
  name: 'quoteOfTheDayPrompt',
  output: {schema: CurateQuoteOfTheDayOutputSchema},
  prompt: `You are a curator of inspirational quotes. Your task is to provide a single quote that is suitable for the start of the day, aimed at providing motivation and inspiration.  The quote should be relatively short, and suitable for display in a small space.

  Provide only the quote.
  `,
});

const curateQuoteOfTheDayFlow = ai.defineFlow({
  name: 'curateQuoteOfTheDayFlow',
  outputSchema: CurateQuoteOfTheDayOutputSchema,
}, async () => {
  const {output} = await quoteOfTheDayPrompt({});
  return output!;
}
);
