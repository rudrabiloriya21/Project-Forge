'use server';
/**
 * @fileOverview An AI agent that suggests microcontroller or minicomputer projects based on user criteria.
 *
 * - aiProjectSuggestion - A function that handles the project suggestion process.
 * - AiProjectSuggestionInput - The input type for the aiProjectSuggestion function.
 * - AiProjectSuggestionOutput - The return type for the aiProjectSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiProjectSuggestionInputSchema = z.object({
  skillLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The user\'s skill level.'),
  availableComponents: z
    .array(z.string())
    .describe('A list of components the user has on hand.'),
  desiredOutcome: z
    .string()
    .describe('A brief idea of what the user wants to create.'),
});
export type AiProjectSuggestionInput = z.infer<
  typeof AiProjectSuggestionInputSchema
>;

const AiProjectSuggestionOutputSchema = z.object({
  projectName: z.string().describe('The name of the suggested project.'),
  description: z.string().describe('A short description of the project.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The estimated difficulty of the project.'),
  requiredComponents: z
    .array(z.string())
    .describe('A list of key components required for the project.'),
});
export type AiProjectSuggestionOutput = z.infer<
  typeof AiProjectSuggestionOutputSchema
>;

export async function aiProjectSuggestion(
  input: AiProjectSuggestionInput
): Promise<AiProjectSuggestionOutput> {
  return aiProjectSuggestionFlow(input);
}

const projectSuggestionPrompt = ai.definePrompt({
  name: 'projectSuggestionPrompt',
  input: {schema: AiProjectSuggestionInputSchema},
  output: {schema: AiProjectSuggestionOutputSchema},
  prompt: `You are an expert project suggester for microcontroller and minicomputer projects.

Generate a personalized project idea based on the user's skill level, available components, and desired outcome.

User Skill Level: {{{skillLevel}}}
Available Components: {{{availableComponents}}}
Desired Outcome: {{{desiredOutcome}}}

Suggest a creative and feasible project, providing its name, a short description, estimated difficulty (easy, medium, or hard), and a list of key components required.

Ensure the project is relevant to either microcontrollers or minicomputers.`,
});

const aiProjectSuggestionFlow = ai.defineFlow(
  {
    name: 'aiProjectSuggestionFlow',
    inputSchema: AiProjectSuggestionInputSchema,
    outputSchema: AiProjectSuggestionOutputSchema,
  },
  async input => {
    const {output} = await projectSuggestionPrompt(input);
    return output!;
  }
);
