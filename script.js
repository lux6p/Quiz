// Configuration
const BLOG_URL = 'https://yourblog.com'; // Update this with your blog URL

let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// DOM Elements
const questionText = document.getElementById('questionText');
const codeSnippetContainer = document.getElementById('codeSnippetContainer');
const answersContainer = document.getElementById('answersContainer');
const feedback = document.getElementById('feedback');
const explanationContainer = document.getElementById('explanationContainer');
const blogLinkContainer = document.getElementById('blogLinkContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quizContainer');
const resultsContainer = document.getElementById('resultsContainer');
const questionCounter = document.getElementById('questionCounter');
const progressFill = document.getElementById('progressFill');
const scoreValue = document.getElementById('scoreValue');
const scorePercentage = document.getElementById('scorePercentage');
const totalQuestions = document.getElementById('totalQuestions');
const resultsDetails = document.getElementById('resultsDetails');
const restartBtn = document.getElementById('restartBtn');
const themeToggle = document.getElementById('themeToggle');
const blogHeaderLink = document.getElementById('blogHeaderLink');

// Set blog URL
if (blogHeaderLink) {
    blogHeaderLink.href = BLOG_URL;
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const allQuestions = await response.json();
        
        // Randomly select 5 questions from all available questions
        questions = selectRandomQuestions(allQuestions, 5);
        
        userAnswers = new Array(questions.length).fill(null);
        totalQuestions.textContent = questions.length;
        displayQuestion();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Error loading questions. Please check if questions.json exists.');
    }
}

// Function to randomly select N questions from the array using Fisher-Yates shuffle
function selectRandomQuestions(allQuestions, count) {
    const shuffled = [...allQuestions];
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Display code snippet if present
    if (question.codeSnippet) {
        // Handle both array format (new) and string format (old) for backward compatibility
        let codeText;
        if (Array.isArray(question.codeSnippet)) {
            codeText = question.codeSnippet.join('\n');
        } else {
            codeText = question.codeSnippet;
        }
        codeSnippetContainer.innerHTML = `<pre><code>${escapeHtml(codeText)}</code></pre>`;
        codeSnippetContainer.style.display = 'block';
    } else {
        codeSnippetContainer.innerHTML = '';
        codeSnippetContainer.style.display = 'none';
    }
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Scroll to top of question section
    const questionSection = document.querySelector('.question-section');
    if (questionSection) {
        questionSection.scrollTop = 0;
    }
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    feedback.classList.remove('show', 'correct', 'incorrect');
    feedback.textContent = '';
    explanationContainer.classList.remove('show');
    explanationContainer.innerHTML = '';
    blogLinkContainer.classList.remove('show');
    blogLinkContainer.innerHTML = '';
    
    // Show explanation if question was already answered
    if (userAnswers[currentQuestionIndex] !== null && question.explanation) {
        explanationContainer.innerHTML = `
            <div class="explanation-text">
                ${escapeHtml(question.explanation)}
            </div>
        `;
        explanationContainer.classList.add('show');
    }
    
    // Create answer options
    question.answers.forEach((answer, index) => {
        const answerOption = document.createElement('div');
        answerOption.className = 'answer-option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        radio.id = `answer-${index}`;
        
        // Check if this answer was previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            radio.checked = true;
            answerOption.classList.add('selected');
            showFeedback(index);
        }
        
        // Disable radio if question already answered
        if (userAnswers[currentQuestionIndex] !== null) {
            radio.disabled = true;
        }
        
        radio.addEventListener('change', () => {
            selectAnswer(index);
        });
        
        // Make entire div clickable
        answerOption.addEventListener('click', (e) => {
            // Don't trigger if clicking on the radio itself (to avoid double trigger)
            if (e.target !== radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });
        
        const label = document.createElement('label');
        label.htmlFor = `answer-${index}`;
        label.textContent = answer;
        
        answerOption.appendChild(radio);
        answerOption.appendChild(label);
        answersContainer.appendChild(answerOption);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
    } else {
        nextBtn.textContent = 'Next';
    }
    
    // Disable next button if current question not answered
    nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
}

// Handle answer selection
function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    showFeedback(answerIndex);
    nextBtn.disabled = false;
}

// Show feedback for selected answer
function showFeedback(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Update answer option styling
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach((option, index) => {
        option.classList.remove('selected', 'correct', 'incorrect');
        if (index === selectedIndex) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (index === question.correct && !isCorrect) {
            option.classList.add('correct');
        }
    });
    
    // Show feedback message
    feedback.textContent = isCorrect 
        ? '✓ Correct! Well done!' 
        : '✗ Incorrect. The correct answer is highlighted in green.';
    feedback.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
    
    // Show explanation if available
    if (question.explanation) {
        explanationContainer.innerHTML = `
            <div class="explanation-text">
                ${escapeHtml(question.explanation)}
            </div>
        `;
        explanationContainer.classList.add('show');
    }
    
    // Show blog link
    blogLinkContainer.innerHTML = `
        <a href="${question.blogLink}" target="_blank" class="blog-link">
            Learn more about this topic
        </a>
    `;
    blogLinkContainer.classList.add('show');
}

// Navigate to previous question
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

// Navigate to next question or finish quiz
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        finishQuiz();
    }
});

// Finish quiz and show results
function finishQuiz() {
    // Calculate score
    score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // Update score display
    scoreValue.textContent = score;
    const percentage = Math.round((score / questions.length) * 100);
    scorePercentage.textContent = percentage + '%';
    
    // Hide results details
    resultsDetails.innerHTML = '';
    resultsDetails.style.display = 'none';
    
    // Hide quiz container and show results
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Restart quiz
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    displayQuestion();
});

// Theme management
const themes = ['blue', 'light', 'dark'];
let currentThemeIndex = 0;

function initTheme() {
    const savedTheme = localStorage.getItem('quizTheme');
    if (savedTheme && themes.includes(savedTheme)) {
        currentThemeIndex = themes.indexOf(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', themes[0]);
    }
}

function switchTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('quizTheme', newTheme);
}

themeToggle.addEventListener('click', switchTheme);

// Initialize quiz
initTheme();
loadQuestions();