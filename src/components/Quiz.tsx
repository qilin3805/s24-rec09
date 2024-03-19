import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';

// interface QuizState {
//   questions: QuizQuestion[]
//   currentQuestionIndex: number
//   selectedAnswer: string | null
//   score: number
// }
interface QuizState {
  currentQuestion: QuizQuestion | null
  selectedAnswer: string | null
  score: number
  quizCompleted: boolean
}

const Quiz: React.FC = () => {
  // const initialQuestions: QuizQuestion[] = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['London', 'Berlin', 'Paris', 'Madrid'],
  //     correctAnswer: 'Paris',
  //   },
  // ];
  // const quizCore = new QuizCore();
  const [quizCore, _] = useState<QuizCore>(new QuizCore());

  // const [state, setState] = useState<QuizState>({
    // questions: initialQuestions,
    // currentQuestionIndex: 0,  // Initialize the current question index.
    // selectedAnswer: null,  // Initialize the selected answer.
    // score: 0,  // Initialize the score.
  const [state, setState] = useState<QuizState>({
    currentQuestion: quizCore.getCurrentQuestion(),
    selectedAnswer: null,
    score: 0,  // Initialize the score.
    quizCompleted: false // Initizlize quiz complete flag
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    const { currentQuestion, selectedAnswer } = state;
    if (selectedAnswer != null) {
      quizCore.answerQuestion(selectedAnswer);

      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setState({
          currentQuestion: quizCore.getCurrentQuestion(),
          selectedAnswer: null,
          score: quizCore.getScore(),
          quizCompleted: false
        });
      } else {
        setState({
          ...state,
          quizCompleted: true,
          score: quizCore.getScore()
        });
      } 
    }
  }

  // const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  // const currentQuestion = questions[currentQuestionIndex];
  const { currentQuestion, selectedAnswer, score, quizCompleted } = state;

  // if (!currentQuestion) {
  // <p>Final Score: {score} out of {questions.length}</p>
  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;