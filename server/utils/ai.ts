import { destr } from 'destr'

export type AiChatResponse = string | {
  response?: unknown
  choices?: { message?: { content?: unknown } }[]
}

function stripCodeFence(content: string): string {
  const trimmed = content.trim()
  if (!trimmed.startsWith('```') || !trimmed.endsWith('```')) {
    return trimmed
  }

  const lines = trimmed.split('\n')
  const firstLine = lines[0]?.trim()
  if (lines.length < 2 || (firstLine !== '```' && firstLine !== '```json')) {
    return trimmed
  }

  lines.shift()
  lines.pop()
  return lines.join('\n').trim()
}

export function parseAiResponse(response: AiChatResponse): Record<string, unknown> {
  const content = typeof response === 'string'
    ? response
    : response.response ?? response.choices?.[0]?.message?.content

  if (typeof content === 'object' && content !== null && !Array.isArray(content))
    return content as Record<string, unknown>

  if (typeof content !== 'string' || !content.trim())
    return {}

  const parsed = destr(stripCodeFence(content))
  return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
    ? parsed as Record<string, unknown>
    : {}
}
