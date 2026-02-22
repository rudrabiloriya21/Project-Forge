'use server';
/**
 * @fileOverview God-tier AI Project Engineer v4.0.
 * Acts as a Chief Systems Architect to design comprehensive hardware roadmaps including full source code.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiProjectSuggestionInputSchema = z.object({
  skillLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe("The user's experience level."),
  availableComponents: z
    .array(z.string())
    .describe('Components the user already has.'),
  desiredOutcome: z
    .string()
    .describe('The user\'s dream project or goal.'),
  preferredPlatform: z
    .string()
    .optional()
    .describe('Specific board preference.'),
  projectGoal: z
    .enum(['fun', 'productivity', 'learning', 'industrial', 'artistic'])
    .optional()
    .describe('The primary motivation.'),
  budget: z.enum(['ultra-low', 'modest', 'professional']).optional().describe('Financial constraints.'),
});
export type AiProjectSuggestionInput = z.infer<typeof AiProjectSuggestionInputSchema>;

const AiProjectSuggestionOutputSchema = z.object({
  projectName: z.string().describe('Catchy engineering name.'),
  description: z.string().describe('High-level vision.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('Complexity.'),
  category: z.enum(['Microcontroller', 'Minicomputer']).describe('Hardware tier.'),
  platform: z.string().describe('Recommended primary board.'),
  requiredComponents: z.array(z.string()).describe('BOM (Bill of Materials).'),
  estimatedTime: z.string().describe('Time to build.'),
  estimatedCost: z.string().describe('Estimated additional spend needed.'),
  architectureSteps: z.array(z.string()).describe('Technical milestones.'),
  softwareStack: z.array(z.string()).describe('Recommended libraries and protocols (e.g. WiFiManager, MQTT, OpenCV).'),
  circuitLogic: z.string().describe('A descriptive hint of how the circuit should be wired.'),
  fullSourceCode: z.string().describe('Complete, production-ready source code for the project (e.g. Arduino .ino or Python .py).'),
  learningOutcomes: z.array(z.string()).describe('Skills acquired.'),
  pitfalls: z.array(z.string()).describe('Common mistakes to avoid for this specific build.'),
  proTip: z.string().describe('Expert optimization.'),
});
export type AiProjectSuggestionOutput = z.infer<typeof AiProjectSuggestionOutputSchema>;

export async function aiProjectSuggestion(input: AiProjectSuggestionInput): Promise<AiProjectSuggestionOutput> {
  return aiProjectSuggestionFlow(input);
}

const projectSuggestionPrompt = ai.definePrompt({
  name: 'projectSuggestionPrompt',
  input: {schema: AiProjectSuggestionInputSchema},
  output: {schema: AiProjectSuggestionOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
    ]
  },
  prompt: `You are the Chief Technology Officer and Master Embedded Systems Architect.
Your task is to take a user's vague idea and turn it into a professional-grade engineering proposal.

### INPUT DATA:
- **Level:** {{{skillLevel}}}
- **Inventory:** {{{availableComponents}}}
- **Dream:** {{{desiredOutcome}}}
{{#if preferredPlatform}} - **Target Platform:** {{{preferredPlatform}}}{{/if}}
{{#if projectGoal}} - **Focus:** {{{projectGoal}}}{{/if}}
{{#if budget}} - **Budget Tier:** {{{budget}}}{{/if}}

### ARCHITECTURAL REQUIREMENTS:
1. **Feasibility:** Ensure the project is 100% buildable with the chosen hardware.
2. **Platform Logic:** If they need real-time control, use a Microcontroller. If they need heavy processing or OS services, use a Minicomputer.
3. **Software Stack:** Mention specific C++/Python libraries (e.g. 'FastLED', 'TensorFlow Lite', 'PubSubClient').
4. **Circuit Logic:** Describe the wiring logic (e.g. 'Connect the sensor to I2C pins with 4.7k pull-up resistors').
5. **Source Code:** Provide the COMPLETE source code for the project. It must be well-commented and optimized for the target hardware.
6. **Anti-Fragility:** List 3 potential pitfalls (e.g. 'Voltage spikes on inductive loads', 'Memory leaks in long-running tasks').
7. **Impossible Requests:** If the request is scientifically impossible, architect the closest feasible high-tech prototype or "Proof of Concept".

Do not just suggest an idea. Architect a complete technical solution with code.`,
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
