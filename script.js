// Load Alphabet Cards Dynamically
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const alphabetGrid = document.getElementById("alphabetGrid");

alphabet.forEach(letter => {
    const card = document.createElement("div");
    card.className = "letter-card";
    card.innerText = letter;
    card.onclick = () => speakText(letter);
    alphabetGrid.appendChild(card);
});

// Text to Speech Function (Browser Feature)
function speakText(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Animal Sound Simulation using Speech Synthesis
function playSound(animal) {
    let text = "";
    if (animal === 'lion') text = "Roar! I am a Lion.";
    if (animal === 'elephant') text = "Trumpet! I am an Elephant.";
    if (animal === 'dog') text = "Woof Woof! I am a Dog.";
    if (animal === 'cat') text = "Meow Meow! I am a Cat.";
    
    speakText(text);
}

// Simple Math Quiz Logic
let currentScore = 0;
let correctAnswer = 5;

function checkAnswer(selectedOption) {
    const feedback = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score");

    if (selectedOption === correctAnswer) {
        feedback.innerText = "🎈 නිවැරදියි! ගොඩක් හොඳයි!";
        feedback.style.color = "green";
        currentScore += 10;
        scoreDisplay.innerText = currentScore;
        setTimeout(generateNewQuestion, 1500);
    } else {
        feedback.innerText = "❌ වැරදියි! නැවත උත්සාහ කරන්න.";
        feedback.style.color = "red";
    }
}

function generateNewQuestion() {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    correctAnswer = num1 + num2;

    document.getElementById("question").innerText = `${num1} + ${num2} = ?`;
    document.getElementById("feedback").innerText = "";

    const optionsContainer = document.querySelector(".options");
    optionsContainer.innerHTML = "";

    let answers = [correctAnswer, correctAnswer + 1, Math.max(1, correctAnswer - 1)];
    answers = answers.sort(() => Math.random() - 0.5);

    answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.innerText = ans;
        btn.onclick = () => checkAnswer(ans);
        optionsContainer.appendChild(btn);
    });
}

// Canvas Drawing Feature
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const color = document.getElementById("colorPicker").value;
    const size = document.getElementById("brushSize").value;

    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}