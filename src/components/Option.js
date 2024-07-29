import React from 'react'

export default function Option({question, dispatch, answer}) {

  const hasAnswered = answer !== null;

  return (
    <div> 
        <div className='options'>
    {question.options.map(((option, index)=> 
      <button 
      className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? 
        index === question.correctOption 
        ? "correct" 
        : "wrong" : ""}`} 
      disabled={hasAnswered}
      key={option} 
      onClick={()=> dispatch({type: 'newAnswer', payload: index})}>{option}
      </button>
    ))}
  </div></div>
  )
}
