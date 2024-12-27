interface AnkiRequest {
  action: string
  version: number
  params?: Record<string, unknown>
}

interface AnkiResponse<T> {
  result?: T
  error?: string
}

export class AnkiClient {
  private static endpoint = 'http://localhost:8765'

  static async request<T>(
    action: string,
    params?: Record<string, unknown>
  ): Promise<T | null> {
    const body: AnkiRequest = {
      action,
      version: 6,
      params: params ?? {}
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      const data: AnkiResponse<T> = await response.json()
      if (data.error) {
        console.error(`Anki error: ${data.error}`)
        return null
      }
      return data.result ?? null
    } catch (err) {
      console.error(`Network or other error: ${err}`)
      return null
    }
  }

  static getDeckNames(): Promise<string[] | null> {
    return this.request<string[]>('deckNames')
  }

  static async setReviewMode(deckName: string) {
    return this.request('guiDeckReview', {name: deckName})
  }

  static async getModelStyling(modelName: string): Promise<string | null> {
    const result = await this.request<{css: string}>('modelStyling', {
      modelName
    })
    return result ? result.css : null
  }

  static async getCurrentCard(): Promise<{
    question: string
    answer: string
    cardId: number
  } | null> {
    const result = await this.request<{
      question: string
      answer: string
      cardId: number
    }>('guiCurrentCard')
    return result
  }

  static async getCardInfo(
    cardId: number
  ): Promise<{modelName: string} | null> {
    const result = await this.request<Array<{modelName: string}>>('cardsInfo', {
      cards: [cardId]
    })
    return result ? result[0] : null
  }

  static async answerCard(ease: number) {
    return this.request('guiAnswerCard', {ease})
  }
}
