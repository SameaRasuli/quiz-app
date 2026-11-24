// Quiz State
type QuizState = {
  currentQuestion: number;
  score: number;
  finished: boolean;
};

// Quiz Actions
type QuizAction =
  | { type: "ANSWER"; correct: boolean }
  | { type: "NEXT_QUESTION" }
  | { type: "RESTART" };

// Initial State
const initialState: QuizState = {
  currentQuestion: 0,
  score: 0,
  finished: false
};

// Total Questions
const TOTAL_QUESTIONS = 5;

// Quiz Reducer
function quizReducer(
  state: QuizState,
  action: QuizAction
): QuizState {

  switch (action.type) {

    case "ANSWER": {
  return {
    ...state,
    score: action.correct
      ? state.score + 1
      : state.score
  };
}
    case "NEXT_QUESTION": {
      if (state.currentQuestion === TOTAL_QUESTIONS - 1) {
        return {
          ...state,
          finished: true
        };
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      };
    }

    case "RESTART": {
      return initialState;
    }

    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export {
  quizReducer,
  initialState,
  TOTAL_QUESTIONS
};

export type {
  QuizState,
  QuizAction
};