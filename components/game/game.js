"use client";

import { useState, useEffect } from "react";

const streets = [
  { name: "Jungmannova", district: "Polabiny" },
  { name: "Bělehradská", district: "Zelené Předměstí" },
  { name: "Dašická", district: "Studánka" },
  { name: "Štefánikova", district: "Karlovina" },
  { name: "Husova", district: "Centrum" },
  { name: "Javorová", district: "Dubina" },
];

const districts = [
  "Polabiny",
  "Zelené Předměstí",
  "Studánka",
  "Karlovina",
  "Centrum",
  "Dubina",
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function StreetQuiz() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentStreet, setCurrentStreet] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledDistricts, setShuffledDistricts] = useState([]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
    nextQuestion();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleWrongAnswer();
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver]);

  function nextQuestion() {
    setTimeLeft(20);
    const newStreet = streets[Math.floor(Math.random() * streets.length)];
    setCurrentStreet(newStreet);
    setShuffledDistricts(shuffleArray([...districts]));
  }

  function handleAnswer(selectedDistrict) {
    if (selectedDistrict === currentStreet.district) {
      setScore((prev) => prev + 1);
    } else {
      handleWrongAnswer();
    }
    nextQuestion();
  }

  function handleWrongAnswer() {
    setLives((prev) => {
      if (prev === 1) {
        endGame();
        return 0;
      }
      return prev - 1;
    });
  }

  function endGame() {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  }

  function restartGame() {
    setScore(0);
    setLives(3);
    setGameOver(false);
    nextQuestion();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {gameOver ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Game Over!</h1>
          <p className="text-lg">Tvé skóre: {score}</p>
          <p className="text-lg">Nejvyšší skóre: {highScore}</p>
          <button
            onClick={restartGame}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Hrát znovu
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold">Do jaké čtvrti patří?</h2>
          <h1 className="text-2xl font-bold text-blue-600 my-4">
            {currentStreet?.name}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {shuffledDistricts.map((district) => (
              <button
                key={district}
                onClick={() => handleAnswer(district)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {district}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <p>Životy: ❤️ {lives}</p>
            <p>Skóre: {score}</p>
            <p>Nejvyšší skóre: {highScore}</p>
            <p>Čas: ⏳ {timeLeft}s</p>
          </div>
        </div>
      )}
    </div>
  );
}
