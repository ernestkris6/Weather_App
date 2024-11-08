import React from 'react';
import Option from './Option';
import { useQuiz } from '../Context/QuizContext';



export default function Question() {

  const {questions, index} = useQuiz();
  const question = questions.at(index);

  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
     <Option question={question} />
    </div>
  )
}
