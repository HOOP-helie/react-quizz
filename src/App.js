import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';

const initialState = {
  questions: [],
  isLoading: false,
  error: false
}
function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'setQuestions':
      newState = { ...state, questions: action.payload }
      break;
    case 'setIsLoading':
      newState = { ...state, isLoading: action.payload }
      break;
    case 'setError':
      newState = { ...state, error: action.payload }
      break;
    default:
      break;
  }
  return newState
}

function App() {
  const [quizzState, dispatch] = useReducer(reducer, initialState);

  const fetchQuestions = async () => {
    try {
      dispatch({ type: "setIsLoading", payload: true })
      dispatch({ type: 'setError', payload: false })

      const response = await fetch('http://localhost:8000/questions');

      if (!response.ok) {
        throw new Error("Data could not be fetched")
      }

      const questions = await response.json();

      dispatch({ type: 'setQuestions', payload: questions })

    } catch (error) {
      dispatch({ type: 'setError', payload: true })

    } finally {
      dispatch({ type: "setIsLoading", payload: false })
    }

  }

  useEffect(() => {
    fetchQuestions()
  }, []);


  return (
    <div className="app">
      <Header />
      <Main>
        {quizzState.isLoading && <Loader />}
        {quizzState.error && <Error />}
        {quizzState.questions && <p>Questions available</p>}
      </Main>
    </div>
  );
}

export default App;
