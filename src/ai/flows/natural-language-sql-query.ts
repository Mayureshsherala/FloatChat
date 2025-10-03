'use server';

/**
 * @fileOverview A natural language to SQL query AI agent.
 *
 * - naturalLanguageSqlQuery - A function that handles the natural language to SQL query process.
 * - NaturalLanguageSqlQueryInput - The input type for the naturalLanguageSqlQuery function.
 * - NaturalLanguageSqlQueryOutput - The return type for the naturalLanguageSqlQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageSqlQueryInputSchema = z.object({
  question: z.string().describe('The natural language question about ARGO float data.'),
});
export type NaturalLanguageSqlQueryInput = z.infer<typeof NaturalLanguageSqlQueryInputSchema>;

const NaturalLanguageSqlQueryOutputSchema = z.object({
  sqlQuery: z.string().describe('The SQL query that answers the question.'),
});
export type NaturalLanguageSqlQueryOutput = z.infer<typeof NaturalLanguageSqlQueryOutputSchema>;

export async function naturalLanguageSqlQuery(input: NaturalLanguageSqlQueryInput): Promise<NaturalLanguageSqlQueryOutput> {
  return naturalLanguageSqlQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageSqlQueryPrompt',
  input: {schema: NaturalLanguageSqlQueryInputSchema},
  output: {schema: NaturalLanguageSqlQueryOutputSchema},
  prompt: `You are an expert SQL query generator for an ARGO float dataset.

  Your job is to translate a natural language question into a SQL query that can be executed against a PostgreSQL database.

  The table name is 'argo_data' and it has the following columns:
  - float_id: INTEGER
  - cycle_number: INTEGER
  - profile_id: VARCHAR
  - time: TIMESTAMP
  - latitude: REAL
  - longitude: REAL
  - pressure_dbar: REAL
  - temperature_C: REAL
  - salinity_PSU: REAL
  - oxygen_umol_per_kg: REAL
  - nitrate_umol_per_kg: REAL
  - bgc_flag: VARCHAR
  - source_netcdf: VARCHAR

  Question: {{{question}}}

  Return only the SQL query.
  `,
});

const naturalLanguageSqlQueryFlow = ai.defineFlow(
  {
    name: 'naturalLanguageSqlQueryFlow',
    inputSchema: NaturalLanguageSqlQueryInputSchema,
    outputSchema: NaturalLanguageSqlQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
