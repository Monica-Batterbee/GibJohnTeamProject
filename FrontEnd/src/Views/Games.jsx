import React, { useState, useEffect } from 'react';

const Games = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const [isActive, setIsActive] = useState(false);
  const [question, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');

  const generateQuestion = () => {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    let answer;
    let questionText;

    switch (operator) {
      case '+':
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
      case '-':
        if (num1 < num2) {
            answer = num2 - num1;
            questionText = `${num2} - ${num1}`;
        } else {
            answer = num1 - num2;
            questionText = `${num1} - ${num2}`;
        }
        break;
      case '*':
        answer = num1 * num2;
        questionText = `${num1} × ${num2}`;
        break;
      case '/':
        const dividend = num1 * num2;
        answer = num2;
        questionText = `${dividend} ÷ ${num1}`;
        break;
      default:
        answer = 0;
        questionText = '';
    }

    setQuestion({ text: questionText, answer });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(120); // Reset to 2 minutes
    setIsActive(true);
    setMessage('');
    setUserAnswer('');
    generateQuestion();
  };

  const stopGame = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isActive) return;

    if (parseInt(userAnswer) === question.answer) {
      setScore((prevScore) => prevScore + 10);
      setMessage('Correct! +10 points');
      generateQuestion();
      setUserAnswer('');
    } else {
      setMessage('Incorrect, try again.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Maths Game</h1>
        
        {!isActive && timeLeft === 120 && (
           <button 
             onClick={startGame}
             className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-4 rounded transition duration-300"
           >
             Start Game
           </button>
        )}

        {!isActive && timeLeft === 0 && (
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Game Over!</h2>
                <p className="text-xl">Final Score: {score}</p>
                <button 
                    onClick={startGame}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Play Again
                </button>
            </div>
        )}

        {isActive && (
            <div>
                <div className="flex justify-between mb-6 text-lg font-semibold">
                    <div className="text-gray-700">Time: <span className={timeLeft < 30 ? "text-red-500" : "text-green-600"}>{formatTime(timeLeft)}</span></div>
                    <div className="text-gray-700">Score: <span className="text-blue-600">{score}</span></div>
                </div>

                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{question.text} = ?</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="border-2 border-gray-300 rounded px-4 py-2 text-xl w-32 text-center mb-4 focus:outline-none focus:border-blue-500"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 font-medium ${message.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                    <button 
                        onClick={stopGame}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">Stop Game
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Games;