import { NextResponse } from 'next/server';
import { groq } from '@/lib/groq';

export async function POST(req: Request) {
  try {
    const { prompt, audience } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid prompt is required' },
        { status: 400 }
      );
    }

    const targetAudience = audience && audience !== 'General' ? `Target Audience: ${audience}` : 'Target Audience: General audience';

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert AI Prompt Engineer.

Your task is to transform a user's simple instruction into four highly optimized, advanced prompt templates that work exceptionally well with large language models.
${targetAudience}

Generate these versions:

1. professional
2. creative
3. detailed
4. concise

CRITICAL Rules for the output prompts:
- They MUST be written as instructions for an AI (e.g., "Act as a...", "You are a...").
- Include placeholders like [Insert Details] where the user needs to provide specific context.
- Define explicit constraints, desired output format, tone, and context in every prompt.
- Make them look like highly engineered "Mega-Prompts" (e.g. use markdown structure, clear sections).
- Do not just rephrase the user's input. Radically expand and enhance it.
- Return ONLY valid JSON.
- Do not include markdown around the JSON object itself, explanations, or extra text.

JSON format:

{
  "professional": "...",
  "creative": "...",
  "detailed": "...",
  "concise": "..."
}`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from Groq');
    }

    const data = JSON.parse(content);

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to enhance prompt' },
      { status: 500 }
    );
  }
}
