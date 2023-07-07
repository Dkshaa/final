import React from 'react'
import { Questions } from "../Questions/Questions";
import { useNavigate, useLocation } from "react-router-dom"
import "../Questions/Questions.css"

export const Results = () => {
  let { state } = useLocation();
  const { questions, selectedAnswers, submitted } = state;
  console.log(questions, selectedAnswers, submitted, "submitted")

  const navigate = useNavigate();

  if (!submitted) {
    navigate("/final")
  }

  const calculateScore = () => {
    const rightAnswers = questions.map(question => question.correct_answer);
    let finalScore = 0;
    for (let i = 0; i < 5; i++) {
      if (selectedAnswers[i] === rightAnswers[i]){
        finalScore += 1;
      }
    }

    navigate("/final/result")

    return finalScore;
  }

  const finalScore = calculateScore(); 

  return (
  <div className="quiz">
  {
    questions.map((question,i) => 
      <div key={i} className='questions'>
        <Questions
        key={i} 
        question={question.question}
        correctAnswer={question.correct_answer}
        all_answers={question.all_answers}
        idx={i}
        selectedAnswers={selectedAnswers}
        incorrect_answers={question.incorrect_answers}
        submitted={submitted}
      />  
      </div>        
    )
  }
  { submitted && <div className='score' style={{ backgroundColor: finalScore <= 1 ? "red" : finalScore <= 3 ? "yellow": "green" }}>You scored {finalScore} out of 5</div> }
  <button className="play-another-game" onClick={() => navigate("/final")} >
    Play Another Quiz
  </button>
</div>
  )
}