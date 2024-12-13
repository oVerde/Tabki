import { AnkiClient } from "../utils/ankiClient";

async function displayNextCard() {
  const questionEl = document.getElementById("question") as HTMLDivElement;
  const answerEl = document.getElementById("answer") as HTMLDivElement;
  const showAnswerBtn = document.getElementById(
    "show-answer",
  ) as HTMLButtonElement;
  const againBtn = document.getElementById("again") as HTMLButtonElement;
  const goodBtn = document.getElementById("good") as HTMLButtonElement;
  const easyBtn = document.getElementById("easy") as HTMLButtonElement;

  questionEl.textContent = "Loading card...";
  answerEl.style.display = "none";
  againBtn.style.display = "none";
  goodBtn.style.display = "none";
  easyBtn.style.display = "none";
  showAnswerBtn.style.display = "inline-block";

  // Retrieve the selected deck name from storage
  const { deckName } = await browser.storage.local.get("deckName");

  if (!deckName) {
    questionEl.textContent = "Please select a deck in Tabki Options.";
    return;
  }

  // Set the review mode to the selected deck
  await AnkiClient.setReviewMode(deckName);

  const card = await AnkiClient.getCurrentCard();
  if (!card) {
    questionEl.textContent = "No cards available or could not connect to Anki.";
    return;
  }

  // Fetch card info to get modelName
  const cardInfo = await AnkiClient.getCardInfo(card.cardId);
  if (cardInfo && cardInfo.modelName) {
    console.log(`cardInfo`, cardInfo);
    console.log(`cardInfo.modelName`, cardInfo.modelName);
    const modelStyling = await AnkiClient.getModelStyling(cardInfo.modelName);
    if (modelStyling) {
      const styleEl = document.createElement("style");
      styleEl.textContent = modelStyling;
      document.head.appendChild(styleEl);
    }
  }

  questionEl.innerHTML = card.question;
  answerEl.innerHTML = card.answer;

  // Execute scripts within questionEl
  const scripts = questionEl.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const scriptContent = oldScript.textContent || "";
    const newScript = document.createElement("script");
    newScript.textContent = scriptContent;
    document.head.appendChild(newScript);
    oldScript.remove();
  });

  showAnswerBtn.onclick = () => {
    answerEl.style.display = "block";
    showAnswerBtn.style.display = "none";
    againBtn.style.display = "inline-block";
    goodBtn.style.display = "inline-block";
    easyBtn.style.display = "inline-block";
  };

  againBtn.onclick = async () => {
    await AnkiClient.answerCard(1);
    displayNextCard();
  };
  easyBtn.onclick = async () => {
    await AnkiClient.answerCard(4);
    displayNextCard();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Use requestAnimationFrame to ensure rendering is complete before fetching card.
  requestAnimationFrame(() => {
    displayNextCard();
  });
});
