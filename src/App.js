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
  progress: 0,
  status: 'loading'
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'dataReceived':
      newState = { ...state, questions: action.payload, status: "ready" }
      break;
    case 'dataError':
      newState = { ...state, status: 'error' }
      break;
    case 'quizzStarted':
      newState = { ...state, status: 'started' }
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


      dispatch({ type: 'dataReceived', payload: questions })

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

  return (
    <div className="app">
      <Header />
      <Main>
        {quizzState.status === "loading" && <Loader />}
        {quizzState.status === "error" && <Error />}
        {quizzState.status === "ready" && <StartScreen startQuizz={startQuizzHandler} nbQuestions={nbQuestions} />}
        {quizzState.status === "started" && (
          <>
            <ProgressBar />
            <Question {...quizzState.questions[quizzState.progress]} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
