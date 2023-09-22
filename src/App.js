import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import ProgressBar from './components/ProgressBar';

const initialState = {
  questions: [],
  totalPoints: 0,
  progress: 0,
  score: 0,
  highScore: 0,
  status: 'loading'
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'dataReceived':
      newState = { ...state, questions: action.payload.questions, status: "ready", totalPoints: action.payload.points }
      break;
    case 'dataError':
      newState = { ...state, status: 'error' }
      break;
    case 'quizzStarted':
      newState = { ...state, status: 'started' }
      break;
    case 'correctAnswer':
      newState = { ...state, score: state.score + action.payload };
      break;
    case 'nextQuestion':
      newState = { ...state, progress: state.progress++ }
      break;
    default:
      break;
  }
  return newState
}

function App() {
  const [quizzState, dispatch] = useReducer(reducer, initialState);
  const nbQuestions = quizzState.questions.length;

  const fetchQuestions = async () => {
    try {

      const response = await fetch('http://localhost:8000/questions');

      if (!response.ok) {
        throw new Error("Data could not be fetched")
      }

      const questions = await response.json();
      const totalPoints = questions.reduce((acc, question) => { return acc + question.points }, 0)

      dispatch({ type: 'dataReceived', payload: { questions: questions, points: totalPoints } })

    } catch (error) {
      dispatch({ type: 'dataError', payload: true })
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, []);

  const startQuizzHandler = () => {
    dispatch({ type: 'quizzStarted' })
  }

  const nexQuestionHandler = () => {
    dispatch({ type: 'nextQuestion' })
  }
  const correctAnswerHandler = (nbOfPoints) => {
    dispatch({ type: 'correctAnswer', payload: nbOfPoints })
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {quizzState.status === "loading" && <Loader />}
        {quizzState.status === "error" && <Error />}
        {quizzState.status === "ready" && <StartScreen startQuizz={startQuizzHandler} nbQuestions={nbQuestions} />}
        {quizzState.status === "started" && (
          <>
            <ProgressBar {...quizzState} />
            <Question addPoints={correctAnswerHandler} nextQuestion={nexQuestionHandler} {...quizzState.questions[quizzState.progress]} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
