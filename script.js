const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');

const updateDisplay = (seconds) => {
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    if (timerDisplay) {
        timerDisplay.textContent = formatTime(seconds);
    }
}

const sendMessage = (type) => {
    chrome.runtime.sendMessage({ type });
}

startButton?.addEventListener('click', () => sendMessage('START'));
stopButton?.addEventListener('click', () => sendMessage('STOP'));
resetButton?.addEventListener('click', () => sendMessage('RESET'));

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'UPDATE_TIME') {
        updateDisplay(message.seconds);
    }
});
