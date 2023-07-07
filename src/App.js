import { React,  useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import "./Home/Home.css"
import { Quiz } from "./Quiz/Quiz";
import { Results } from "./Results/Results";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [fetching, setFetching] = useState(false);

  const fetchQuestions = async (category = "", difficulty = "") => {
    setFetching(true);

    console.log(`https://opentdb.com/api.php?amount=5${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=5${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    console.log(data.results)
    for (let i = 0; i < 5; i++){
      data.results[i].all_answers = shuffleArray([data.results[i].correct_answer, ...data.results[i].incorrect_answers])
    }

    setQuestions(JSON.parse(JSON.stringify(data.results)));
    setFetching(false);
  };

  return (
    <div>
      <h1 className="quiz-header-wrapper">Quiz Maker</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/final"
            element={<Home fetchQuestions={fetchQuestions} />}
          ></Route>

          <Route
            path="/final/quiz"
            element={
              <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                fetching={fetching}
              />
            }
          ></Route>

          <Route path="/final/result" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
