import React, { useState } from "react";
import questions from "./FAQ.json";
import "./styles/faq.css";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-header">F.A.Q</h1>
      {questions.map((question, index) => (
        <div key={index} className="faq-item">
          <div className="question-header" onClick={() => toggleAnswer(index)}>
            <p
              className={`question-text ${
                activeIndex === index ? "active" : ""
              }`}
            >
              {question.question}
            </p>
            <p className={`arrow-icon ${activeIndex === index ? "active" : ""}`}>
              ▼
            </p>
          </div>
          <p className={`answer-text ${activeIndex === index ? "active" : ""}`}>
            {question.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Faq;