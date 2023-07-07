import { CircularProgress } from '@mui/material'
import React, {  useState, useEffect } from 'react'
import "./Quiz.css"
import "../Questions/Questions.css";
import { Questions } from '../Questions/Questions'

import { useNavigate } from "react-router-dom";

export const Quiz = ({questions, fetching}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (questions === undefined && fetching === false) {
      navigate("/final")
    }
  }, [])

  const [ selectedAnswers, setSelectedAnswers ] = useState(["", "", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    for (let i = 0; i < selectedAnswers.length; i++){
      if (selectedAnswers[i] === "") {
        
        alert(' Please select all answers')
        return
       }
    }
   
    navigate("/final/result", {
      state: {
        questions: questions, 
        selectedAnswers: selectedAnswers, 
        submitted: true,
      }
    })
  }

  if (fetching) {
    return <div style={{ display:"flex", justifyContent: "center", alignItems:"center", height: "50vh", width:"100%"}}>
        < CircularProgress />
      </div>
  }
  
  return (
    <div className="quiz">
      {
        questions !== undefined &&
        questions.map((question,i) => 
            <Questions
            key={i} 
            question={question.question}
            correctAnswer={question.correct_answer}
            idx={i}
            setSelectedAnswers={setSelectedAnswers}
            selectedAnswers={selectedAnswers}
            all_answers={question.all_answers}
            submitted={submitted}
          />  
        )
      }
      
      <button className="submit-btn" onClick={handleSubmit} >
        Submit
      </button> 
     
    </div>
  )
}