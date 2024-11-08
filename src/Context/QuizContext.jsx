import { type } from "@testing-library/user-event/dist/type";
import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finish'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,

}

const BASE_URL = 'http://localhost:9000'
const SECS_PER_QUESTION = 20;


function reducer(state, action){
    switch(action.type){
        case 'dataReceived': 
           return{
            ...state, 
            questions: action.payload,
            status: "ready",
           }
        
        case 'dataFailed':
            return{
                ...state,
                status: "error"
            }
        
        case 'start':
            return{
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,

            }
        
        case 'newAnswer': 
            const question = state.question.at(state.index)
            return{
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        
        case 'nextQuestion':
            return{
                ...state,
                index: state.index + 1,
                answer: null,
            }
        
        case 'finish':
            return{
                ...state,
                status: 'finish',
                //returning points gained : 0
                highScore: state.points > state.highScore ? state.points : state.highScore
            }

        case 'tick': 
            return{
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finish' : "state.status",
        }

        default: throw new Error("Unknown action...")
    }

        
}


function QuizProvider({children}){


const [{status, index, answer, points, highScore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

    useEffect(function(){
        fetch(`${BASE_URL}/questions`)
        .then((res) => res.json())
        .then((data) => dispatch({type: 'dataReceived', payload: data}))
        .catch((err) => dispatch({type: 'dataFailed'}))
    })


    const value={status, 
        index, 
        answer, 
        points, 
        highScore, 
        secondsRemaining, 
        dispatch}


    return <QuizContext.Provider value={value}>
        {children}
    </QuizContext.Provider>
}




function useQuiz(){
    const context = useContext(QuizContext);
    if(context === undefined) throw new Error('Context was used outside quizcontext components.')
        return context;

}

export {useQuiz, QuizProvider}