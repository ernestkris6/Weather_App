import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';
import { useQuiz } from '../Context/QuizContext';

/* const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finish'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,

}

function reducer(state, action){

  switch(action.type){
    case 'dataReceived': 
    return{
      ...state,
      questions: action.payload,
      status: "ready",
    };
    case 'dataFailed':
      return{
        ...state,
        status: "error",

      };
    case 'start': 
    return{
      ...state, 
      status: "active",
      secondsRemaining: state.questions.length * SECS_PER_QUESTION,
    }
    case 'newAnswer':
      const question = state.questions.at(state.index)
    return{
      ...state,
      answer: action.payload,
      points: action.payload === question.correctOption ? state.points + question.points : state.points,
    }

    case "nextQuestion": 
    return{
      ...state,
      index: state.index + 1, answer: null
    }
    case 'finish': 
    return{
      ...state,
      status: "finish",
      highscore: state.points > state.highscore ? state.points : state.highscore
    }
    // case 'restart': 
    // return {
    //   ...state,
    //   points: 0,
    //   highscore: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",

    // }

    case "tick": 
    return{
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining === 0 ? "finish" : state.status,
    }
    default: throw new Error('Unknown action')
  } 
}

*/

function App() {

  /*const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
  
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur)=> prev + cur.points, 0)*/

  const {questions, status, index, answer, points, highscore, secondsRemaining} = useQuiz();
 

  // useEffect(function() {
  //   fetch('http://localhost:9000/questions')
  //   .then((res)=> res.json())
  //   .then((data)=> dispatch({type: "dataReceived", payload: data}))
  //   .catch((err)=> dispatch({type: "dataFailed"}))
  // }, [])
  
  
  return (
    <div className='app'>
      <Header />
      <Main>
        <Progress 
        index={index} 
        numQuestions={numQuestions} 
        points={points}
        maxPossiblePoints={maxPossiblePoints}
        answer={answer}
        />

          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && 
          <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
          {status === 'active' && ( 
          <>
          <Question 
          question={questions[index]} 
          dispatch={dispatch} 
          answer={answer} />

          <Footer>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          <NextButton 
          dispatch={dispatch} 
          answer={answer}
          index={index}
          numQuestions={numQuestions}
          />
          </Footer>
          </>)}

          {status === 'finish' && (
          <FinishedScreen 
          maxPossiblePoints={maxPossiblePoints} 
          points={points}
          highscore={highscore}
          dispatch={dispatch} />)}
      </Main>
    </div>
  )
}

export default App;



/** 
Challenge: Create advanced state mgt system with useReducer and the Context API;


You have been tasked by your project mgr to refactor this app using the context api

Your Tasks:

Duplicate src folder to src-no-contexts
Review data flow and passed props
Identify props drilling problem
Use the context api to fix the very small prop drilling problem
Create a new context quiz context with the reducer we created earlier
Create a custom provider component quiz provider and provide all the state to the app
Create a custom hook to consume state all over the application
Delete all unnecessary props
IMPORTANT: Note how you actually need state right in app component. This means you need to
wrap the whole app into the context. (Hint: try in index.js) 

*/