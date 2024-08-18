let isRunning = false;
let seconds = 0;
let timer = null;

const startTimer = () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds += 1;
            chrome.runtime.sendMessage({ type: 'UPDATE_TIME', seconds });
        }, 1000);
    }
};

const stopTimer = () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
};

const resetTimer = () => {
    stopTimer();
    seconds = 0;
    chrome.runtime.sendMessage({ type: 'UPDATE_TIME', seconds });
};

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'START') {
        startTimer();
    } else if (message.type === 'STOP') {
        stopTimer();
    } else if (message.type === 'RESET') {
        resetTimer();
    }
});
