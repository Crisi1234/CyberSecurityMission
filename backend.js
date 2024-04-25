window.onload = function() {
    startTimer();
    // Das Formular abhören und die Funktion checkPassword aufrufen, wenn es abgeschickt wird
    document.getElementById("passwordForm").addEventListener("submit", checkPassword);
};

var passwordChecked = false; // Variable, um zu überprüfen, ob das Passwort bereits überprüft wurde
var attemptsLeft = 3; // Anzahl der Versuche, die der Benutzer hat

function checkPassword(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    var password = document.getElementById("passwordInput").value;
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{12,}$/;
    if (regex.test(password)) {
        document.getElementById("result").innerHTML = "Passwort akzeptiert!";
        window.location.href = 'erfolgreichabgewehrt.html';
        passwordChecked = true;
    } else {
        attemptsLeft--;
        document.getElementById("attemptsLeft").innerHTML = attemptsLeft;
        if (attemptsLeft === 0) {
            document.getElementById("result").innerHTML = "You've been hacked";
            document.getElementById("result").classList.add("hacked-text");
            document.body.style.backgroundColor = "black";
            document.getElementById("container").classList.add("hacked-background");
            createHackedNumbers(); // Zahlenregen anzeigen
            document.getElementById("passwordText").style.display = "none";
            document.getElementById("passwordForm").style.display = "none";
            document.getElementById("checkPasswordBtn").style.display = "none"; // Den Button ausblenden
            document.getElementById("nextMissionBtn").style.display = "block";
        } else {
            document.getElementById("error").innerHTML = "Passwort entspricht nicht den Mindestanforderungen. Versuche es erneut.";
            document.getElementById("error").style.display = "block"; // Fehlermeldung anzeigen
        }
    }
    return false; // Verhindert zusätzlich das Standardverhalten des Formulars
}

function startTimer() {
    var time = 10;
    var timer;

    function countdown() {
        time--;
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.getElementById("timer").innerHTML = "0" + minutes + ":" + seconds;

        if (time <= 5) {
            document.getElementById("timer").classList.add("red");
        }

        if (time <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "00:00";
            if (!passwordChecked) {
                document.getElementById("result").innerHTML = "You've been hacked";
                document.getElementById("result").classList.add("hacked-text");
                document.body.style.backgroundColor = "black";
                document.getElementById("container").classList.add("hacked-background");
                createHackedNumbers(); // Zahlenregen anzeigen
                document.getElementById("passwordText").style.display = "none";
                document.getElementById("passwordForm").style.display = "none";
                document.getElementById("checkPasswordBtn").style.display = "none"; // Den Button ausblenden
                document.getElementById("nextMissionBtn").style.display = "block";
            }
        }
    }

    timer = setInterval(countdown, 1000);
}

function createHackedNumbers() {
    var hackedNumbersContainer = document.createElement("div");
    hackedNumbersContainer.className = "hacked-numbers-container";
    document.body.appendChild(hackedNumbersContainer);

    var height = window.innerHeight;

    setInterval(function() {
        var hackedNumber = document.createElement("div");
        hackedNumber.className = "hacked-text";
        hackedNumber.textContent = Math.floor(Math.random() * 10); // Zufällige Zahl von 0 bis 9
        hackedNumber.style.left = Math.random() * 100 + "vw"; // Zufällige horizontale Position zwischen 0 und 100% der Bildschirmbreite
        hackedNumber.style.top = "0"; // Startposition oben auf der Seite
        hackedNumbersContainer.appendChild(hackedNumber);

        // Animation für das Fallen der Zahlen
        setTimeout(function() {
            hackedNumber.style.top = height + "px";
        }, 100);
    }, 200);

    // Nachricht "You've been hacked" einfügen
    var hackedMessage = document.createElement("div");
    hackedMessage.textContent = "You've been hacked";
    hackedMessage.className = "hacked-text";
    hackedMessage.style.left = "calc(50% - 150px)"; // Zentriert die Nachricht horizontal
    hackedMessage.style.top = "20px"; // Fest oben positionieren
    hackedNumbersContainer.appendChild(hackedMessage);
}

function continueToNextMission() {
    window.location.href = 'mission2.html';
}
