import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';

const initialState = {
  questions: [],
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


  return (
    <div className="app">
      <Header />
      <Main>
        {quizzState.status === "loading" && <Loader />}
        {quizzState.status === "error" && <Error />}
        {quizzState.status === "ready" && <StartScreen nbQuestions={nbQuestions} />}
      </Main>
    </div>
  );
}

export default App;
