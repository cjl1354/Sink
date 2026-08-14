import { describe, expect, it } from 'vitest'
import { parseAiResponse } from '../../server/utils/ai'

describe('parseAiResponse', () => {
  it('parses string responses from supported Workers AI models', () => {
    expect(parseAiResponse('{"slug":"cloudflare"}')).toEqual({ slug: 'cloudflare' })
    expect(parseAiResponse({ response: '```json\n{"slug":"sink"}\n```' })).toEqual({ slug: 'sink' })
  })

  it('accepts already parsed object responses', () => {
    expect(parseAiResponse({
      response: {
        title: 'Cloudflare',
        description: 'A global connectivity cloud.',
      },
    })).toEqual({
      title: 'Cloudflare',
      description: 'A global connectivity cloud.',
    })
  })
})
