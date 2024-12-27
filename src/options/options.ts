import {AnkiClient} from '../utils/ankiClient'

async function initOptions() {
  const deckSelect = document.getElementById('deckName') as HTMLSelectElement
  const saveBtn = document.getElementById('save') as HTMLButtonElement

  const decks = await AnkiClient.getDeckNames()
  if (decks) {
    for (const deck of decks) {
      const option = document.createElement('option')
      option.value = deck
      option.textContent = deck
      deckSelect.appendChild(option)
    }
  }

  const stored = await browser.storage.local.get('deckName')
  if (stored.deckName && decks?.includes(stored.deckName)) {
    deckSelect.value = stored.deckName
  }

  saveBtn.onclick = async () => {
    await browser.storage.local.set({deckName: deckSelect.value})
    alert('Settings saved!')
  }
}

document.addEventListener('DOMContentLoaded', initOptions)
