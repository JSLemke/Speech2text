document.addEventListener('DOMContentLoaded', function () {
    var startRecordingButton = document.getElementById('start_recording');
    var stopRecordingButton = document.getElementById('stop_recording');
    var convertText = document.getElementById('convert_text');
    var recognition;
    var isRecording = false;

    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!window.SpeechRecognition) {
        alert("Ihr Browser unterstützt die Spracherkennung nicht.");
        return;
    }

    startRecordingButton.addEventListener('click', function () {
        recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', function (e) {
            var transcript = Array.from(e.results)
                .map(function (result) {
                    return result[0];
                })
                .map(function (result) {
                    return result.transcript;
                });

            convertText.innerHTML = transcript;
        });

        recognition.start();
        isRecording = true;
    });

    stopRecordingButton.addEventListener('click', function () {
        if (isRecording) {
            recognition.stop();
            isRecording = false;
        }
    });
});
