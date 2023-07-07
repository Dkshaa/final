import React, { useState } from "react";
import "./Home.css";
import Categories from "../Data/Categories";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const Home = (props) => {
  const [category, setCat] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");
  const [error, setError] = useState(false);

  const difficulty_list = ["easy", "medium", "hard"];

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      props.fetchQuestions(category, difficulty);
      navigate("/final/quiz");
      
    }
  };
  return (
    <div className="loadingContainer">
      <label className="loadingContainer">
        {error && (
          <ErrorMessage>
            Please Fill out the Difficulty and Category
          </ErrorMessage>
        )}
        
        <div className="row">
          <div>Difficulty</div>
          <div>
            <select
              id="difficultySelect"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              {difficulty_list.map((item) => {
                return (
                  <option
                  
                    placeholder="easy"
                    key={item}
                    value={item}
                    
                  >
                    {item.charAt(0).toUpperCase() + item.substring(1,)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </label>
      <label className="loadingContainer">
        <div className="row">
          <div>Category</div>
          <div>
            <select
            id="categorySelect"
              value={category}
              onChange={(e) => setCat(e.target.value)}
              className="form-select "
              aria-label="Default select example"
            >
              {Categories.map((level, idx) => {
                return (
                  <option
                    value={level.value}
                    placeholder="General knowledge"
                    key={idx}
                  >
                    {level.category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </label>
      <div>
        <button
        id="createBtn" 
          className=" btn btn-primary"
          size="small"
          onClick={handleSubmit}
          variant="contained"
          type="submit"
        >
          Create
        </button>
      </div>
    </div>
  );
};