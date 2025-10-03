'use server';

import { queryAndVisualizeData } from '@/ai/flows/query-and-visualize-data';
import argoData from '@/lib/argo-data.json';

export async function getAnswerAndChart(
  question: string
): Promise<{ answer?: string; chartData?: any[]; chartLabels?: {x: string; y: string}; error?: string }> {
  try {
    if (!question.trim()) {
      return { error: 'Question cannot be empty.' };
    }
    const result = await queryAndVisualizeData({ question, jsonData: JSON.stringify(argoData) });
    return { answer: result.answer, chartData: result.chartData, chartLabels: result.chartLabels };
  } catch (error) {
    console.error('Error in getAnswerAndChart:', error);
    return {
      error: 'Sorry, I was unable to process your question at this time. Please try again later.',
    };
  }
}
