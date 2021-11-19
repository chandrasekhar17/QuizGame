const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who won Orange Cap in IPL-14?',
    answers: [
      { text: 'Sanju Samson', correct: false },
      { text: 'Faf Du Plessis', correct: false },
      { text: 'Ruturaj Gaikwad', correct: true},
      { text: 'KL Rahul', correct: false}
    ]
  },
  {
    question: 'Which of the following teams is now Cristiano Ronaldo Playing for?',
    answers: [
      { text: 'Manchester City', correct: false},
      { text: 'Manchester United', correct: true },
      { text: 'Juventus', correct: false },
      { text: 'Real Madrid', correct: false }
    ]
  },
  {
    question: 'Which of the following is not a Marvel movie?',
    answers: [
      { text: 'Doctor Strange', correct: false },
      { text: 'Guardians Galaxy', correct: false },
      { text: 'Black Widow', correct: false },
      { text: 'Injustice', correct: true }
    ]
  },
  {
    question: 'Who has More 50s in IPL?',
    answers: [
      { text: 'Warner', correct: true },
      { text: 'Gambhir', correct: false },
      { text: 'Kohli', correct: false},
      { text: 'Dhawan', correct: false}
    ]
  },
  {
      question: 'In which country, we cannot find even a single mosquito?',
      answers: [
          {text: 'Germany', correct: false},
          {text: 'Italy', correct: false},
          {text: 'France', correct: true},
          {text: 'Tokyo', correct: false}
      ]
  }
]