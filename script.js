const surveyData = [
    { question: "How satisfied are you with our service?", options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"] },
    { question: "How often do you use our service?", options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"] },
    { question: "How would you rate our customer support?", options: ["Excellent", "Good", "Average", "Poor", "Terrible"] },
    { question: "How likely are you to recommend us?", options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"] },
    { question: "What would you like to see improved?", options: ["More features", "Better support", "Performance", "User interface", "Other"] }
];

const surveyContainer = document.getElementById("survey-container");
const progressBar = document.getElementById("progress");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let responses = [];

function loadQuestion() {
    surveyContainer.innerHTML = ""; // Clear previous question

    const questionData = surveyData[currentQuestionIndex];
    const questionElement = document.createElement("h5");
    questionElement.innerText = `${currentQuestionIndex + 1}. ${questionData.question}`;
    surveyContainer.appendChild(questionElement);

    questionData.options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("form-check");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question${currentQuestionIndex}`;
        input.value = option;
        input.classList.add("form-check-input");

        input.addEventListener("click", () => handleAnswer(option)); // Save response on click

        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.innerText = option;

        optionElement.appendChild(input);
        optionElement.appendChild(label);
        surveyContainer.appendChild(optionElement);
    });

    updateProgress();
}

function handleAnswer(answer) {
    responses[currentQuestionIndex] = answer; // Save the answer
    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < surveyData.length) {
        loadQuestion(); // Load the next question
    } else {
        showSubmitButton(); // Show submit button if survey is complete
    }
}

function updateProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / surveyData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function showSubmitButton() {
    submitBtn.style.display = "block";
    surveyContainer.innerHTML = "<h5>Thank you! All questions completed. Ready to submit your responses?</h5>";
}

function displayResults() {
    surveyContainer.innerHTML = ""; // Clear survey content
    let resultText = "";

    if (responses.includes("Very Satisfied") || responses.includes("Very Likely")) {
        resultText = "Thank you for your positive feedback! We’re glad you're enjoying our service!";
    } else if (responses.includes("Very Dissatisfied") || responses.includes("Very Unlikely")) {
        resultText = "We appreciate your feedback and will work to improve our service.";
    } else {
        resultText = "Thank you for completing the survey. Your feedback helps us improve!";
    }

    resultContainer.innerHTML = `<p class="result-text">${resultText}</p>`;
}

loadQuestion();

submitBtn.addEventListener("click", displayResults);
