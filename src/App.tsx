import React, { useEffect, useState } from 'react';
import './App.css';
import QuestionComponent from './QuestionComponent';

interface QuestionDataProps {
  [question: string]: string[];
}

function App(): JSX.Element {
  const [questionData, setQuestionData] = useState<QuestionDataProps>({});
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([])

  // fetch question data from JSON file

    useEffect(() => {
       fetch("./data.json")
        .then(response => {
          if (!response.ok) {
            throw new Error('Invalid response received');
          }
          return response.json();
        })
        .then(response => {
          setQuestionData(response.questions);
          setCorrectAnswers(response.correctAnswers)
        });
    }, []);

  // update state with selected answers

  function handleInputChange(selectedOption: string): void {
      setSelectedAnswers(prevAnswers => [...prevAnswers, selectedOption])
    }  

  useEffect(() => {
  }, [selectedAnswers]);

  // mock function to send the selected answers and receive the response (correct or not) for each question

  async function submitAnswers(e: { preventDefault: () => void; }): Promise<void>  {
    e.preventDefault();
    
     function sendData(data: Object) {
      return new Promise((resolve, reject) => {
          const isSuccess = Math.random() > 0.01; // 99% chance of data sending successfully
          if (isSuccess && data) {
            resolve("Data sent successfully");
          } else {
            reject("Failed to send data: Network Error");
          }
      });
    }

    try {
        let response: any = await sendData(selectedAnswers);
        response = correctAnswers.map((value, index) => value === selectedAnswers[index] ? "Correct" : "Incorrect");
        setStatus(response);
    } catch {
        throw new Error("Failed to receive response: Network Error")
    }
  }
  
  // question component that renders the data

  return (
    <div className="App">
      <form onSubmit={submitAnswers}>
        {Object.entries(questionData).map(([question, options], index) => (
          <QuestionComponent
            key={index}
            question={question}
            answers={options}
            onSelect={handleInputChange} 
            status={status[index]}
          />
        ))}
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default App;
