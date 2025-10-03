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
  - n_prof: INTEGER
  - n_param: INTEGER
  - n_levels: INTEGER
  - n_history: INTEGER
  - n_calib: INTEGER
  - data_type: TEXT
  - format_version: TEXT
  - handbook_version: TEXT
  - reference_date_time: TEXT
  - date_creation: TEXT
  - date_update: TEXT
  - platform_number: TEXT
  - project_name: TEXT
  - pi_name: TEXT
  - station_parameters: TEXT
  - cycle_number: REAL
  - direction: TEXT
  - data_centre: TEXT
  - dc_reference: TEXT
  - data_state_indicator: TEXT
  - data_mode: TEXT
  - platform_type: TEXT
  - float_serial_no: TEXT
  - firmware_version: TEXT
  - wmo_inst_type: TEXT
  - juld: TIMESTAMP
  - juld_qc: TEXT
  - juld_location: TIMESTAMP
  - latitude: REAL
  - longitude: REAL
  - position_qc: TEXT
  - positioning_system: TEXT
  - profile_pres_qc: TEXT
  - profile_temp_qc: TEXT
  - profile_psal_qc: TEXT
  - vertical_sampling_scheme: TEXT
  - config_mission_number: REAL
  - pres: REAL
  - pres_qc: TEXT
  - pres_adjusted: REAL
  - pres_adjusted_qc: TEXT
  - pres_adjusted_error: REAL
  - temp: REAL
  - temp_qc: TEXT
  - temp_adjusted: REAL
  - temp_adjusted_qc: TEXT
  - temp_adjusted_error: REAL
  - psal: REAL
  - psal_qc: TEXT
  - psal_adjusted: REAL
  - psal_adjusted_qc: TEXT
  - psal_adjusted_error: REAL
  - history_institution: TEXT
  - history_step: TEXT
  - history_software: TEXT
  - history_software_release: TEXT
  - history_reference: TEXT
  - history_date: TEXT
  - history_action: TEXT
  - history_parameter: TEXT
  - history_start_pres: REAL
  - history_stop_pres: REAL
  - history_previous_value: REAL
  - history_qctest: TEXT
  - parameter: TEXT
  - scientific_calib_equation: TEXT
  - scientific_calib_coefficient: TEXT
  - scientific_calib_comment: TEXT
  - scientific_calib_date: TEXT
  - crs: INTEGER

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
