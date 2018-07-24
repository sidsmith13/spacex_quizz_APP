'use strict';

// Questions and answers, question starts at number 1

const questionSet = [
  { 
    number: 1,
    text: `Which rocket is the first commercial spacecraft to deliver cargo to the International Space Station and safely return cargo to Earth?`,
    ans1: `Dragon`,
    ans2: `Falcon 9`, 
    ans3: `Falcon Heavy`,
    ans4: `Apollo`
  }, 

  {
    number: 2,
    text: `Which rocket was the first orbital class rocket capable of re-fight?`,
    ans1: `Falcon Heavy`,
    ans2: `Apollo`,
    ans3:  `Falcon 9`, 
    ans4: `Dragon`
  }, 

  {
    number: 3,
    text: `Which is the world’s most powerful rocket?`,
    ans1: `Space Shuttle`,
    ans2: `Falcon 9`,
    ans3: `Falcon Heavy`,
    ans4: `Mercury`
  }, 
  {
    number: 4, 
    text: 'What is SpaceX’s ultimate goal?',
    ans1: 'Build commercial rockets',
    ans2: 'Build electric vehicles',
    ans3: 'Enabling people to live on other planets',
    ans4:  'Build nuclear bombs'
  }, 
  {
    number: 5,
    text: 'Which state has SpaceX not launched from?',
    ans1: 'California',
    ans2: 'Texas',
    ans3: 'Louisiana',
    ans4: 'Florida'
  }, 
  {
    number: 6,
    text: 'Which SpaceX spacecraft was designed to carry humans?',
    ans1: 'Lunar Launcher',
    ans2:  'Falcon 9',
    ans3:  'Falcon Heavy',
    ans4:  'Dragon'
  }, 
  {
    number: 7,
    text: 'How many engines are in the first stage of the Falcon Heavy?',
    ans1: '90',
    ans2: '5',
    ans3: '8',
    ans4: '27'
  }, 
  {
    number: 8,
    text: 'How many metric tons can the Falcon Heavy lift at takeoff?',
    ans1: '45 metric tons',
    ans2: '213 metric tons',
    ans3: '25 metric tons',
    ans4: '64 metric tons'
  }, 
  {
    number: 9,
    text: 'The Dragon capsule uses how many Draco thrusters to maneuver in space?',
    ans1: '3',
    ans2: '18',
    ans3: '12',
    ans4: '23'
  }, 
  {
    number: 10,
    text: 'What is the total launch payload mass of the Dragon capsule?',
    ans1: '25,345 pounds',
    ans2: '10,000 pounds',
    ans3: '90,345 pounds',
    ans4: '13,228 pounds'
  }
];

const ANSWERS = [ 
  'Dragon',
  'Falcon 9',
  'Falcon Heavy',
  'Enabling people to live on other planets',
  'Louisiana',  
  'Dragon',
  '27',
  '64',
  '18',
  '13,228 pounds'
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>

    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://media.giphy.com/media/144IBNXQTvDG00/giphy.gif" alt="Correct Elon Musk Dancing">
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Nope! It was ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://media.giphy.com/media/13W4OBuYpzAYh2/giphy.gif" alt="Wrong Elon Musk falling off of playground ride">
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
