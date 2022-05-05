import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // GET -------------------------------------------
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => setQuestions(questions));
  }, []);

// DELETE -------------------------------------------
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestionList = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestionList);
        });
  }

  // PATCH -------------------------------------------
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((changeCorrectAnswer) => {
        const updatedQuestionList = questions.map((question) => {
          if (question.id ===  changeCorrectAnswer.id) {
            return changeCorrectAnswer;
          }
            return question
        });
        setQuestions(updatedQuestionList);
        });
  }

  const questionList = questions.map((question) => (
    <QuestionItem 
    key={question.id}
    question={question}
    handleDelete={handleDelete}
    handleAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
