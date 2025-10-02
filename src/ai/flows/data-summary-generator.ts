'use server';

/**
 * @fileOverview Generates summaries of ARGO data and stores them as vectors for RAG.
 *
 * - generateDataSummary - A function that generates a summary of the ARGO data.
 * - DataSummaryInput - The input type for the generateDataSummary function.
 * - DataSummaryOutput - The return type for the generateDataSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataSummaryInputSchema = z.object({
  argoDataDescription: z
    .string()
    .describe('A description of the ARGO data to summarize.'),
});
export type DataSummaryInput = z.infer<typeof DataSummaryInputSchema>;

const DataSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the ARGO data.'),
});
export type DataSummaryOutput = z.infer<typeof DataSummaryOutputSchema>;

export async function generateDataSummary(
  input: DataSummaryInput
): Promise<DataSummaryOutput> {
  return generateDataSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dataSummaryPrompt',
  input: {schema: DataSummaryInputSchema},
  output: {schema: DataSummaryOutputSchema},
  prompt: `You are an expert oceanographer. Please summarize the following ARGO data description: {{{argoDataDescription}}}`,
});

const generateDataSummaryFlow = ai.defineFlow(
  {
    name: 'generateDataSummaryFlow',
    inputSchema: DataSummaryInputSchema,
    outputSchema: DataSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
