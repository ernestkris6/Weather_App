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



function App() {

  const {status} = useQuiz();

  
  return (
    <div className='app'>
      <Header />
      <Main>
        <Progress />

          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen />}
          {status === 'active' && ( 
          <>
          <Question />
          <Footer>
            <Timer />
            <NextButton />
          </Footer>
          </>)}

          {status === 'finished' && (
          <FinishedScreen />            
          )}
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

My Errors
Forgot to call questions under value
Did not set questions at index in questions and Options components
Forgot to add the the dependency array to useEffect
Made a silly mistake in state.status i.e "at tick"

*/


