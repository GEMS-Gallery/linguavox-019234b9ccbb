import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const languageSelect = document.getElementById('languageSelect');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');
const speakBtn = document.getElementById('speakBtn');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

translateBtn.addEventListener('click', translateText);
speakBtn.addEventListener('click', speakText);
clearHistoryBtn.addEventListener('click', clearHistory);

async function translateText() {
    const text = inputText.value;
    const targetLang = languageSelect.value;
    const sourceLang = 'en';

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
        const data = await response.json();

        if (data.responseStatus === 200) {
            const translatedText = data.responseData.translatedText;
            outputText.textContent = translatedText;

            // Add translation to history
            await backend.addTranslation(text, translatedText, targetLang);
            updateHistory();
        } else {
            outputText.textContent = 'Translation error. Please try again.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'Translation error. Please try again.';
    }
}

function speakText() {
    const text = outputText.textContent;
    const lang = languageSelect.value;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

async function updateHistory() {
    const translations = await backend.getTranslations();
    historyList.innerHTML = '';
    translations.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.original} -> ${entry.translated} (${entry.language})`;
        historyList.appendChild(li);
    });
}

async function clearHistory() {
    await backend.clearTranslations();
    updateHistory();
}

// Initial history update
updateHistory();
