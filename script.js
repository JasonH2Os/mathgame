// Grabbing elements from the DOM to be used later
const questionElement = document.getElementById('question');
const feedback = document.getElementById('feedback');
const characterElement = document.getElementById('character');


// Global variable to store the correct answer for the current question
let correctAnswer = 0;

// Function to generate a random math question
function generateQuestion() {
    // Generate two random numbers between 0 and 10
    const num1 = Math.floor(Math.random() * 11);
    const num2 = Math.floor(Math.random() * 11);
    
    // Randomly choose between addition and subtraction
    let operation = ['+', '-'][Math.floor(Math.random() * 2)];

    // Calculate the correct answer based on the operation
    if (operation === '+') {
        correctAnswer = num1 + num2;
    } else {
        // Making sure we don't get negative answers by switching numbers if necessary
        if (num1 < num2) {
            [num1, num2] = [num2, num1];
        }
        correctAnswer = num1 - num2;
    }

    // Display the question on the page
    questionElement.textContent = `${num1} ${operation} ${num2} = ?`;
}


function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Great job! That's correct!";
        feedback.style.color = "green";
        characterElement.textContent = "🙂"; // Happy face
        
        // GSAP animation for jump
        gsap.to(characterElement, { y: -20, duration: 0.25, yoyo: true, repeat: 1 });

        setTimeout(() => {
            generateQuestion();
            document.getElementById('answer').value = '';
            feedback.textContent = '';
        }, 2000);
    } else {
        feedback.textContent = "Oops! Try again!";
        feedback.style.color = "red";
        characterElement.textContent = "😟"; // Sad face

        // GSAP animation for drop
        gsap.to(characterElement, { y: 20, duration: 0.5, onComplete: () => {
            gsap.to(characterElement, { y: 0, duration: 0.5 }); // Return character to original position
        }});
    }
}

// Generate the first question when the game loads
generateQuestion();
