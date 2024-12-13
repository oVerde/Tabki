export class AnkiClient {
    static endpoint = "http://localhost:8765";
    static async request(action, params) {
        const body = {
            action,
            version: 6,
            params: params ?? {},
        };
        try {
            const response = await fetch(this.endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (data.error) {
                console.error(`Anki error: ${data.error}`);
                return null;
            }
            return data.result ?? null;
        }
        catch (err) {
            console.error(`Network or other error: ${err}`);
            return null;
        }
    }
    static getDeckNames() {
        return this.request("deckNames");
    }
    static async setReviewMode(deckName) {
        return this.request("guiDeckReview", { name: deckName });
    }
    static async getModelStyling(modelName) {
        const result = await this.request("modelStyling", {
            modelName,
        });
        return result ? result.css : null;
    }
    static async getCurrentCard() {
        const result = await this.request("guiCurrentCard");
        return result;
    }
    static async getCardInfo(cardId) {
        const result = await this.request("cardsInfo", {
            cards: [cardId],
        });
        return result ? result[0] : null;
    }
    static async answerCard(ease) {
        return this.request("guiAnswerCard", { ease });
    }
}
//# sourceMappingURL=ankiClient.js.map