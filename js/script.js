var char;
var mode = "LETTERS";
var voiceOFF = "VOICE: OFF";
var soundOFF = "SOUND: ON";
var i = 0;
var wordsCount = 0;
var lettersCount = 0;
var lettersScore = 0;
var wordsScore = 0;
const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const words = ['monitor', 'program', 'javascript', 'compiler', 'keyboard', 'application', 'gaming',
    'network', 'database', 'robot', 'comic', 'television', 'music', 'pencil', 'location', 'map', 'toogle',
    'keys', 'tape', 'paint', 'shirt', 'picture', 'old', 'flame', 'change', 'uprising', 'night', 'flower', 'iron',
    'mood', 'power', 'black', 'white', 'gold', 'highway', 'psycho', 'enemy', 'mars', 'moon', 'weekend', 'place',
    'blue', 'good', 'bad', 'numb', 'inside', 'wicked', 'game', 'boy', 'mouse', 'house', 'dinner', 'song',
    'lyrics', 'letter', 'sunshine', 'dance', 'desert', 'sun', 'food', 'castle', 'global', 'name', 'cheap', 'shift',
    'arrow', 'command', 'statement', 'window', 'slave', 'walk', 'abnormal', 'reactor', 'achieve', 'king', 'energy', 'load', 'bind']



function change(el) {
    mode = "LETTERS";
    if (el.value === "LETTERS") {
        el.value = "WORDS";
        mode = el.value;
    }
    else {
        el.value = "LETTERS";
        mode = el.value;
    }
}

function say(m) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[22];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = m;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}

function toggleVoice() {
    let text = document.getElementById("voice-on-off").innerHTML;
    if (text === "VOICE: OFF") {
        document.getElementById("voice-on-off").innerHTML = "VOICE: ON";
        voiceOFF = 'VOICE: ON';
    }
    else if (text === "VOICE: ON") {
        document.getElementById("voice-on-off").innerHTML = "VOICE: OFF";
        voiceOFF = 'VOICE: OFF';
    }
}

function toogleSound(){
    let text = document.getElementById("sound-on-off").innerHTML;
    if (text === "SOUND: ON") {
        document.getElementById("sound-on-off").innerHTML = "SOUND: OFF";
        soundOFF = 'SOUND: OFF';
    }
    else {
        document.getElementById("sound-on-off").innerHTML = "SOUND: ON";
        soundOFF = 'SOUND: ON';
    }
}

function toggleText() {
    if (document.getElementById("btnVoice").innerHTML === "START") {
        document.getElementById("btnVoice").innerHTML = "RESTART";
    }

    i = 0;
    document.getElementById("textArea").focus();
    if (mode == "LETTERS") {
        document.getElementById("letter").innerHTML = keys[Math.floor(Math.random() * keys.length)];
        char = document.getElementById("letter").innerHTML;
        if (voiceOFF === "VOICE: ON") {
            say(char);
        }
        let text = document.getElementById("letter");
        if (text.style.display === "none") {
            text.style.display = "block";
        }
    }
    else if (mode == "WORDS") {
        document.getElementById("letter").innerHTML = words[Math.floor(Math.random() * words.length)];
        char = document.getElementById("letter").innerHTML;
        text = document.getElementById("letter");
        if (voiceOFF === "VOICE: ON") {
            say(char);
        }
        if (text.style.display === "none") {
            text.style.display = "block";
        }
    }
}

function compare(e) {
    var keynum;
    if (mode == "LETTERS") {
        var charcompare = char;
        var charUpper = charcompare.toUpperCase();
        var charKey = charcompare.charCodeAt(0);
        var charKeyUpper = charUpper.charCodeAt(0);
        keynum = e.keyCode;
        if (charKey == keynum) {
            ++lettersCount;
            ++lettersScore;
            document.getElementById("score").innerHTML = lettersScore;
            toggleText();
            if (soundOFF === "SOUND: ON") {
                if (soundOFF === "SOUND: ON") {
                document.getElementById("soundCorrect").play();
            }
            }
        }
        else if (charKeyUpper == keynum) {
            ++lettersCount;
            ++lettersScore;
            document.getElementById("score").innerHTML = lettersScore;
            toggleText();
            if (soundOFF === "SOUND: ON") {
                document.getElementById("soundCorrect").play();
            }
        }
        else{
            --lettersScore;
            document.getElementById("score").innerHTML = lettersScore;
            if (soundOFF === "SOUND: ON") {
                document.getElementById("soundWrong").play();
            }
        }
    }
    else if (mode == "WORDS") {
        var charcompare = char;
        var length = charcompare.length;
        console.log(length);
        var x = document.getElementById("letter");
        txt = x.textContent, newText = "";
        for (var k = 0; k <= i; k++) {
            newText += txt.charAt(k).fontcolor("green");
        }
        var oldText = '';

        for (var j = i + 1; j < length; j++) {
            oldText += txt.charAt(j).fontcolor("black");
        }
        console.log(oldText);
        var charUpper = charcompare.toUpperCase();
        var charKey = charcompare.charCodeAt(i);
        var charKeyUpper = charUpper.charCodeAt(i);
        keynum = e.keyCode;
        if (charKey == keynum) {
            x.innerHTML = newText
            x.innerHTML += oldText;
            ++i;
        }
        else if (charKeyUpper == keynum) {
            x.innerHTML = newText;
            x.innerHTML += oldText;
            ++i;
        }
        else{
            --wordsScore;
            document.getElementById("score").innerHTML = wordsScore;
            if (soundOFF === "SOUND: ON") {
                document.getElementById("soundWrong").play();
            }
        }
        if (i == length) {
            ++wordsCount;
            wordsScore+=i;
            document.getElementById("score").innerHTML = wordsScore;
            toggleText();
            if (soundOFF === "SOUND: ON") {
                document.getElementById("soundCorrect").play();
            }
        }
    }

}