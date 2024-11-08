import React from 'react';
import Option from './Option';
import { useQuiz } from '../Context/QuizContext';

export default function Question() {

  const {question, dispatch, answer} = useQuiz();
  console.log(question);
  
  return (
    <div>
      <h4>{question.question}</h4>
     <Option 
     question={question} 
     dispatch={dispatch} 
     answer={answer} />
    </div>
  )
}
