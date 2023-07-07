import React from "react";
import "./Questions.css";
//import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

export const Questions = ({
  question,
  all_answers,
  correctAnswer,
  setSelectedAnswers,
  selectedAnswers,
  idx,
  submitted,
}) => {

  const handleCheck = (answer) => {
    if (submitted) {
      return;
    }

    setSelectedAnswers((selectedAnswer) => {
      let newAnswers = [...selectedAnswer];
      newAnswers[idx] = answer;
      return newAnswers;
    });
  };

  return (
    <div>
      <div>
        <h2 className="questions">
          {" "}
          {question
            .normalize("NFKC")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/&#039;/g, "'")
            .replace(/&quot;/g, '"')}
        </h2>
      </div>

      <div className="options">
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
        {all_answers.map((answer, i) => (
          <button
            onClick={() => handleCheck(answer)}
            className="singleOption"
            key={i}
            style={{
              borderRadius: "5%",
              borderColor:
                submitted === true && answer === correctAnswer
                  ? "#a0e7a8"
                  : submitted === true && selectedAnswers[idx] === answer
                  ? "#d76d6d"
                  : selectedAnswers[idx] === answer
                  ? "#1DA1F2"
                  : "black",
              color:
                submitted === true && answer === correctAnswer
                  ? "white"
                  : submitted === true && selectedAnswers[idx] === answer
                  ? "white"
                  : selectedAnswers[idx] === answer
                  ? "white"
                  : "black",
              backgroundColor:
                submitted === true && answer === correctAnswer
                  ? "#a0e7a8"
                  : submitted === true && selectedAnswers[idx] === answer
                  ? "#d76d6d"
                  : selectedAnswers[idx] === answer
                  ? "#1DA1F2"
                  : "transparent",
            }}
          >
            {answer
              .normalize("NFKC")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/&#039;/g, "'")
              .replace(/&quot;/g, '"')}
          </button>
        ))}
      </div>
      <hr />
    </div>
  );
};
