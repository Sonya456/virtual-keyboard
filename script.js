let inputField = document.getElementById("input-field");
let virtualKeyboard = document.getElementById("virtual-keyboard");
let selectedLanguage = localStorage.getItem("selectedLanguage") || "English";
let isCapsLockEnabled = false;


const virtualKeyboardLayout = {
    "English": [        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\" ],
        ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
        ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "/\\"],
        ["Ctrl", "Alt", "Space", "Alt", "Ctrl", "<-", "\\/", "->"]
    ],
    "AnotherLanguage": [        ["@", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\" ],
        ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
        ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "/", "Shift", "/\\"],
        ["Ctrl", "Alt", "Space", "Alt", "Ctrl", "<-", "\\/", "->"]
    ]
};


function createVirtualKeyboard(language) {
    virtualKeyboard.innerHTML = "";
    virtualKeyboardLayout[language].forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        row.forEach(button => {
            let buttonDiv = document.createElement("div");
            buttonDiv.classList.add("button");
            buttonDiv.innerText = button;
            buttonDiv.addEventListener("click", () => {
                handleButtonClick(button);
            });
            if (button === "Backspace") {
                buttonDiv.classList.add("backspace-button");
            }
            if (button === "CapsLock") {
                buttonDiv.classList.add("capsLock-button");
            }
            if (button === "Space") {
                buttonDiv.classList.add("space-button");
            }
            rowDiv.appendChild(buttonDiv);
        });
        virtualKeyboard.appendChild(rowDiv);
    });
    localStorage.setItem("selectedLanguage", language);
}


function handleButtonClick(button) {
    switch(button) {
        case "Backspace":
            inputField.value = inputField.value.slice(0, -1);
            break;
        case "CapsLock":
            isCapsLockEnabled = !isCapsLockEnabled;
            toggleCapsLock();
            break;
        case "Enter":
            inputField.value += "\n";
            break;
        case "Shift":
            toggleShiftMode();
            break;
        case "Ctrl":
            isCtrlKeyPressed = true;
            break;
        case "Alt":
            isAltKeyPressed = true;
            break;
        case "Space":
            inputField.value += " ";
            break;
        case "Tab":
            inputField.value += "   ";
            break;
        default:
            inputField.value += isCapsLockEnabled
                ? button.toUpperCase() : button;
            break;
    }
}



function toggleCapsLock() {
    let buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
    if (button.innerText.length === 1) {
    if (isCapsLockEnabled) {
        button.innerText = button.innerText.toUpperCase();
    } else {
        button.innerText = button.innerText.toLowerCase();
    }
}
});
}


createVirtualKeyboard(selectedLanguage);


document.addEventListener("keydown", event => {
    let pressedKey = event.key;
    let buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        if (button.innerText === pressedKey) {
            button.classList.add("active");
        }
    });

    if (event.altKey && event.shiftKey) {
        selectedLanguage = selectedLanguage === "English" ? "AnotherLanguage" : "English";
        createVirtualKeyboard(selectedLanguage);
    }
});

document.addEventListener("keyup", event => {
    let pressedKey = event.key;
    let buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        if (button.innerText === pressedKey) {
            button.classList.remove("active");
        }
    });
});



let languageButton = document.getElementById("language-button");
if (languageButton) {
    languageButton.addEventListener("click", () => {
    if (selectedLanguage === "English") {
        selectedLanguage = "AnotherLanguage";
    } else {
        selectedLanguage = "English";
    }
    localStorage.setItem("selectedLanguage", selectedLanguage);
    createVirtualKeyboard(selectedLanguage);
})};





let languageDisplay = document.getElementById("language-display");
languageDisplay.innerText = selectedLanguage;


