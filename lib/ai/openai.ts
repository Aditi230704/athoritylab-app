import OpenAI from 'openai';

// Lazy singleton — only instantiated on first call, not at module load time.
// This prevents build-time errors when OPENAI_API_KEY is not set.
let _openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set. Add it to .env.local or Vercel environment variables.');
    }
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Generate a GPT-4o-mini completion with a structured JSON response */
export async function complete<T>(
  systemPrompt: string,
  userPrompt: string,
): Promise<T> {
  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 1500,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned empty response');
  return JSON.parse(content) as T;
}

/** Generate an embedding vector for semantic search */
export async function embed(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}
