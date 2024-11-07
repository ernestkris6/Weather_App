import { createContext, useContext } from "react";

const QuizContext = createContext();


function QuizProvider({children}){

    return <QuizContext.Provider>
        {children}
    </QuizContext.Provider>
}




function useQuiz(){
    const context = useContext(QuizContext);
    if(context === undefined) throw new Error('Context was used outside context components.')
        return context;

}

export {useQuiz, QuizProvider}