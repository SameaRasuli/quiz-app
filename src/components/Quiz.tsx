import { useReducer, useState } from "react";
import {
  quizReducer,
  initialState,
  TOTAL_QUESTIONS
} from "../quizReducer";

const questions = [
  {
    question: "What is HTML used for?",
    options: [
      "Styling web pages",
      "Creating web page structure",
      "Managing databases",
      "Building servers"
    ],
    correctAnswer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: [
      "background",
      "font-size",
      "color",
      "border"
    ],
    correctAnswer: 2
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    options: [
      "variable",
      "let",
      "define",
      "value"
    ],
    correctAnswer: 1
  },
  {
    question: "What does TypeScript add to JavaScript?",
    options: [
      "Static typing",
      "HTML elements",
      "CSS styles",
      "Database storage"
    ],
    correctAnswer: 0
  },
  {
    question: "What is useState used for in React?",
    options: [
      "Styling components",
      "Managing component state",
      "Creating HTML files",
      "Connecting databases"
    ],
    correctAnswer: 1
  }
];

function Quiz() {
  const [state, dispatch] = useReducer(
    quizReducer,
    initialState
  );

  const [answered, setAnswered] = useState(false);

  const current = questions[state.currentQuestion];

  function handleAnswer(index: number) {
    if (answered) return;

    const correct = index === current.correctAnswer;

    dispatch({
      type: "ANSWER",
      correct
    });

    setAnswered(true);
  }

  function handleNext() {
    dispatch({ type: "NEXT_QUESTION" });
    setAnswered(false);
  }

  function handleRestart() {
    dispatch({ type: "RESTART" });
    setAnswered(false);
  }

  if (state.finished) {
    return (
      <div className="quiz-container">
        <h1>Quiz Completed!</h1>

        <h2>
          Your Score: {state.score} / {TOTAL_QUESTIONS}
        </h2>

        <button onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">

      <h1>CodeQuiz</h1>

      <p>
        Question {state.currentQuestion + 1} of {TOTAL_QUESTIONS}
      </p>

      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${((state.currentQuestion + 1) / TOTAL_QUESTIONS) * 100}%`
          }}
        />
      </div>

      <h2>{current.question}</h2>

      <div className="options">
        {current.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <button onClick={handleNext}>
          Next Question
        </button>
      )}

      <p>Score: {state.score}</p>

    </div>
  );
}

export default Quiz;