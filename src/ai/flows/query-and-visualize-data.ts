'use server';
/**
 * @fileOverview A flow that queries JSON data and generates a visualization.
 *
 * - queryAndVisualizeData - A function that takes a question and JSON data and returns an answer and chart data.
 * - QueryAndVisualizeDataInput - The input type for the queryAndVisualizeData function.
 * - QueryAndVisualizeDataOutput - The return type for the queryAndVisualizeData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QueryAndVisualizeDataInputSchema = z.object({
  question: z.string().describe('The user\'s question about the data.'),
  jsonData: z.string().describe('The JSON data to query as a string.'),
});
export type QueryAndVisualizeDataInput = z.infer<
  typeof QueryAndVisualizeDataInputSchema
>;

const ChartSeriesSchema = z.object({
  name: z.string().describe('The name of this data series.'),
  data: z.array(z.object({
    x: z.any().describe('The x-axis value.'),
    y: z.any().describe('The y-axis value.'),
  })).describe('Data points for this series.'),
});

const QueryAndVisualizeDataOutputSchema = z.object({
  answer: z.string().describe('A natural language answer to the question.'),
  chartData: z.array(ChartSeriesSchema).optional().describe('Data for generating a chart. Each element in the array represents a data series to be plotted.'),
  chartType: z.enum(['line', 'bar', 'scatter']).optional().describe('The suggested type of chart to render.'),
  chartLabels: z.object({
    x: z.string().describe('The label for the x-axis.'),
    y: z.string().describe('The label for the y-axis.'),
  }).optional().describe('Labels for the chart axes.'),
});


export type QueryAndVisualizeDataOutput = z.infer<
  typeof QueryAndVisualizeDataOutputSchema
>;

export async function queryAndVisualizeData(
  input: QueryAndVisualizeDataInput
): Promise<QueryAndVisualizeDataOutput> {
  return queryAndVisualizeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'queryAndVisualizeDataPrompt',
  input: { schema: QueryAndVisualizeDataInputSchema },
  output: { schema: QueryAndVisualizeDataOutputSchema },
  prompt: `You are an expert data analyst specializing in oceanographic data.
Your task is to answer a user's question based on the provided JSON data.
You must provide a concise, natural language answer.

If the question asks for a comparison, trend, or data over a range, you MUST also provide data for a chart.
- Choose the best chart type: 'line' for trends over time, 'bar' for comparing distinct categories, or 'scatter' for showing relationships between two variables.
- The chart data should be an array of series. For single-series charts, this will be an array with one element. For comparisons, it will have multiple elements.
- Each series object must have a 'name' and a 'data' array of {x, y} points.
- Determine the most appropriate fields from the JSON for the x and y axes based on the user's question.
- Provide clear and descriptive labels for the x and y axes.

Data:
\`\`\`json
{{{jsonData}}}
\`\`\`

User's Question:
"{{{question}}}"

Based on the question and data, provide your answer and the necessary data for visualization.
If the data is insufficient to create a chart, return an empty array for chartData.
For 'x' and 'y' keys in chartData, use values directly from the JSON data. For example, for temporal trends, 'x' could be 'time' and 'y' could be 'temperature_C'.
For comparative queries, generate a series for each item being compared.
`,
});

const queryAndVisualizeDataFlow = ai.defineFlow(
  {
    name: 'queryAndVisualizeDataFlow',
    inputSchema: QueryAndVisualizeDataInputSchema,
    outputSchema: QueryAndVisualizeDataOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
