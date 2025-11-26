'use server';
/**
 * @fileoverview A flow for generating game exploitation payloads using AI.
 * 
 * - generatePayload: A function to generate a JSON payload based on a natural language description.
 * - GeneratePayloadInput: The input type for the generatePayload function.
 * - GeneratePayloadOutput: The return type for the generatePayload function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GeneratePayloadInputSchema = z.object({
  description: z.string().describe('A natural language description of the desired exploitation payload.'),
});
export type GeneratePayloadInput = z.infer<typeof GeneratePayloadInputSchema>;

export const GeneratePayloadOutputSchema = z.object({
    payload: z.record(z.any()).describe('The generated JSON payload object for the game command.'),
}).describe('A structured JSON payload representing a game command.');
export type GeneratePayloadOutput = z.infer<typeof GeneratePayloadOutputSchema>;

export async function generatePayload(input: GeneratePayloadInput): Promise<GeneratePayloadOutput> {
  return generatePayloadFlow(input);
}

const payloadGenerationPrompt = ai.definePrompt({
  name: 'generatePayloadPrompt',
  input: { schema: GeneratePayloadInputSchema },
  output: { schema: GeneratePayloadOutputSchema },
  prompt: `
    You are an expert security researcher specializing in game exploitation. Your task is to generate a JSON payload for a game's WebSocket command based on a natural language description.

    The game has a known vulnerability where it trusts client-side data. We are targeting specific commands to manipulate game state.
    
    Known Command Structure:
    - Most commands have a 'mainID' and a 'subID'.
    - A jackpot win command is known to be mainID: 100, subID: 142.
    - Fields like 'dynamicpass', 'userid', 'token', and 'bossid' are often required for authentication and targeting.
    - 'winscore' is used to declare a win amount. 'jptype' might specify the type of jackpot.

    Based on the following description, construct the most likely JSON payload. Infer parameter names and values based on the request and known patterns.

    Description: {{{description}}}
  `,
});

const generatePayloadFlow = ai.defineFlow(
  {
    name: 'generatePayloadFlow',
    inputSchema: GeneratePayloadInputSchema,
    outputSchema: GeneratePayloadOutputSchema,
  },
  async (input) => {
    const { output } = await payloadGenerationPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a payload.');
    }
    return output;
  }
);
