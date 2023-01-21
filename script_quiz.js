const quizData = [
  {
      question: "Which of the following is a commonly used front-end web development framework?",
      a: "Ruby on Rails",
      b: "AngularJS",
      c: "Django",
      d: "ReactJS",
      correct: "d",
  },
  {
      question: "What is the purpose of a CSS preprocessor?",
      a: "To minify CSS code",
      b: "To add variables and functions to CSS",
      c: "To convert HTML code into CSS",
      d: "To optimize images for web use",
      correct: "b",
  },
  {
      question: "Which of the following is a commonly used version control system for web development?",
      a: "Git",
      b: "Subversion",
      c: "Mercurial",
      d: "Bazaar",
      correct: "a",
  },
  {
      question: "What does a web developer use to ensure that their website is responsive and looks good on different devices?",
      a: "JavaScript",
      b: "AJAX",
      c: "CSS media queries",
      d: "Ruby on Rails",
      correct: "c",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
          answer = answerEl.id;
      }
  });

  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
      answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  // check to see the answer
  const answer = getSelected();

  if (answer) {
      if (answer === quizData[currentQuiz].correct) {
          score++;
      }

      currentQuiz++;
      if (currentQuiz < quizData.length) {
          loadQuiz();
      } else {
          quiz.innerHTML = `
              <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
              
              <button onclick="location.reload()">Reload</button>
          `;
      }
  }
});
