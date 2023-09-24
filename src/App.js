import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Progress from './components/Progress';
import Results from './components/Results';

const initialState = {
  questions: [],
  totalPoints: 0,
  progress: 0,
  score: 0,
  highScore: 0,
  status: 'loading'
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload.questions, status: "ready", totalPoints: action.payload.points };
    case 'dataError':
      return { ...state, status: 'error' };
    case 'quizzStarted':
      return { ...state, status: 'started' };
    case 'quizzFinished':
      return {
        ...state, status: 'finished', highScore: state.score > state.highScore ? state.score : state.highScore
      };
    case 'correctAnswer':
      return { ...state, score: state.score + action.payload };
    case 'quizzRestarted':
      return { ...state, score: 0, progress: 0, status: "started" };
    case 'nextQuestion':
      return { ...state, progress: state.progress++ };
    default:
      break;
  }
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

  const nexQuestionHandler = (proceed) => {
    proceed && dispatch({ type: 'nextQuestion' })
    !proceed && dispatch({ type: 'quizzFinished' })
  }

  const correctAnswerHandler = (nbOfPoints) => {
    dispatch({ type: 'correctAnswer', payload: nbOfPoints })
  }

  const restartQuizzHandler = () => {
    dispatch({ type: 'quizzRestarted' })
  }

  const statusComponents = {
    loading: <Loader />,
    error: <Error />,
    ready: <StartScreen startQuizz={startQuizzHandler} nbQuestions={nbQuestions} />,
    started: (
      <>
        <Progress {...quizzState} nbQuestions={nbQuestions} />
        <Question nbQuestions={nbQuestions} addPoints={correctAnswerHandler} nextQuestion={nexQuestionHandler} {...quizzState} />
      </>
    ),
    finished: (
      <>
        <Results {...quizzState} />
        <button className="btn btn-ui" onClick={restartQuizzHandler}>
          Restart
        </button>
      </>
    ),
  };

  return (
    <div className="app">
      <Header />
      <Main>{statusComponents[quizzState.status]}</Main>
    </div>
  );
}

export default App;
