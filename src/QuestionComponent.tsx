import React from 'react';

export interface QuestionComponentProps {
  question: string;
  answers: string[];
  status?: string;
  onSelect: (selectedOption: string) => void;
}

function QuestionComponent({ question, answers, status, onSelect }: QuestionComponentProps) {
  return (
    <div>
      <h3 className="questionTitles">{question}</h3>
      {answers.map((answer, index) => (
     <>
        <label className='label'>
              {answer}
              <input key={index} type="radio" name={question} value={answer} onChange={(e) => onSelect(e.target.value)}
/>
          </label><br />
          </>
      ))}
      <p className={`status ${status === "Correct" ? 'green': 'red'}`}>{status}</p>
    </div>
  );
}

export default QuestionComponent;
