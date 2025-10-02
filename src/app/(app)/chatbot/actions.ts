'use server';

import { naturalLanguageSqlQuery } from '@/ai/flows/natural-language-sql-query';

export async function getSQLFromQuestion(
  question: string
): Promise<{ query?: string; error?: string }> {
  try {
    if (!question.trim()) {
      return { error: 'Question cannot be empty.' };
    }
    const result = await naturalLanguageSqlQuery({ question });
    return { query: result.sqlQuery };
  } catch (error) {
    console.error('Error in getSQLFromQuestion:', error);
    return {
      error: 'Sorry, I was unable to process your question at this time. Please try again later.',
    };
  }
}
