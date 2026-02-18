'use server';
/**
 * @fileOverview An enhanced AI agent that engineers detailed project proposals for makers.
 *
 * - aiProjectSuggestion - A function that handles the project engineering process.
 * - AiProjectSuggestionInput - The input type for the aiProjectSuggestion function.
 * - AiProjectSuggestionOutput - The return type for the aiProjectSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiProjectSuggestionInputSchema = z.object({
  skillLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe("The user's experience level with electronics and programming."),
  availableComponents: z
    .array(z.string())
    .describe('A list of components the user already has.'),
  desiredOutcome: z
    .string()
    .describe('What the user wants to achieve or build.'),
  preferredPlatform: z
    .string()
    .optional()
    .describe('Specific hardware the user prefers to use (e.g., ESP32, Raspberry Pi).'),
  projectGoal: z
    .enum(['fun', 'productivity', 'learning', 'industrial'])
    .optional()
    .describe('The primary motivation for the project.'),
});
export type AiProjectSuggestionInput = z.infer<
  typeof AiProjectSuggestionInputSchema
>;

const AiProjectSuggestionOutputSchema = z.object({
  projectName: z.string().describe('A catchy name for the project.'),
  description: z.string().describe('A detailed summary of the project concept.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('Complexity rating.'),
  category: z.enum(['Microcontroller', 'Minicomputer']).describe('Hardware type.'),
  platform: z.string().describe('The specific board recommended.'),
  requiredComponents: z.array(z.string()).describe('List of necessary hardware.'),
  estimatedTime: z.string().describe('Estimated duration to complete (e.g., "4-6 hours").'),
  architectureSteps: z
    .array(z.string())
    .describe('High-level technical steps or architectural milestones.'),
  learningOutcomes: z
    .array(z.string())
    .describe('Key concepts or skills the user will acquire.'),
  proTip: z.string().describe('An expert-level insight or optimization for the project.'),
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
  prompt: `You are an elite Embedded Systems Architect and Linux Sysadmin. 
Your goal is to engineer a highly feasible, creative, and rewarding hardware project for a maker.

### INPUT CONSTRAINTS:
- **Skill Level:** {{{skillLevel}}}
- **Has on hand:** {{{availableComponents}}}
- **Wants to build:** {{{desiredOutcome}}}
{{#if preferredPlatform}} - **Prefers Platform:** {{{preferredPlatform}}}{{/if}}
{{#if projectGoal}} - **Primary Goal:** {{{projectGoal}}}{{/if}}

### YOUR TASK:
1. Suggest a project that maximizes the use of available components.
2. If it requires an SBC (like Raspberry Pi), classify as "Minicomputer". If it's real-time/bare-metal (like ESP32/Arduino), classify as "Microcontroller".
3. Provide a clear "Architecture" breakdown of how the hardware and software interact.
4. Define specific "Learning Outcomes" (e.g., "Interrupt handling", "MQTT protocol", "Linux kernel modules").
5. Add a "Pro Tip" that addresses a common pitfall or provides a professional optimization.

Ensure the suggestion is technically accurate and fits the specified skill level.`,
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
