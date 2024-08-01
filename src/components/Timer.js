import React, { useEffect } from 'react'

export default function Timer({dispatch}) {

    useEffect(function(){
        setInterval(function(){
            // console.log('tick');
            dispatch({type: "tick"})
        }, 1000)
        
    }, [dispatch])

  return (
    <div className='timer'>05:00</div>
  )
}
