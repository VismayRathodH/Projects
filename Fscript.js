document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const transcriptDiv = document.getElementById('transcript');

    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        transcriptDiv.textContent = 'Speech Recognition is not supported by your browser.';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // You can set this to any language code you need
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // Start listening on button click
    startButton.addEventListener('click', () => {
        recognition.start();
    });

    // Handle the speech result
    recognition.addEventListener('result', (event) => {
        let transcript = '';
        for (const result of event.results) {
            transcript += result[0].transcript;
        }
        transcriptDiv.textContent = transcript;
    });

    // Handle errors
    recognition.addEventListener('error', (event) => {
        transcriptDiv.textContent = 'Error occurred: ' + event.error;
    });

    // Handle end of speech recognition
    recognition.addEventListener('end', () => {
        // You can choose to restart listening automatically or not
        // recognition.start();
    });
});