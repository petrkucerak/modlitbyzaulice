"use client";

import { useState, useEffect } from "react";
import { streets } from "@/data/streets_with_coordinates";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const startLives = 5;

export default function StreetQuiz() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(startLives);
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentStreet, setCurrentStreet] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledDistricts, setShuffledDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [correctDistrict, setCorrectDistrict] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("highScore");
      if (savedHighScore) setHighScore(parseInt(savedHighScore));
      const firstTimePlayed = localStorage.getItem("firstTimePlayed");
      if (firstTimePlayed) {
        setFirstTime(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!gameOver && !firstTime && !showHelp) {
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
  }, [gameOver, firstTime, showHelp]);

  function getDistricts(count, not_used) {
    const districts = new Set();
    streets.forEach((street) => {
      if (street.district_name && street.district_name !== not_used) {
        districts.add(street.district_name);
      }
    });
    const districtArray = Array.from(districts);
    let tmp = shuffleArray(districtArray).slice(0, count);
    tmp.push(not_used);
    return shuffleArray(tmp);
  }

  function nextQuestion() {
    setTimeLeft(20);
    setSelectedDistrict(null);
    setCorrectDistrict(null);
    setShowCorrect(false);
    let newStreet;
    do {
      newStreet = streets[Math.floor(Math.random() * streets.length)];
    } while (
      newStreet.district_name === undefined ||
      newStreet.district_name === ""
    );

    setCurrentStreet(newStreet);
    setCorrectDistrict(newStreet.district_name);
    setShuffledDistricts(getDistricts(5, newStreet.district_name));
  }

  function handleAnswer(selectedDistrict) {
    setSelectedDistrict(selectedDistrict);
    setTimeout(() => {
      setShowCorrect(true);
      setTimeout(() => {
        if (selectedDistrict === currentStreet.district_name) {
          setScore((prev) => {
            const newScore = prev + 1;
            if (typeof window !== "undefined" && newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("highScore", newScore);
            }
            return newScore;
          });
        } else {
          handleWrongAnswer();
        }
        nextQuestion();
      }, 2000);
    }, 500);
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
  }

  function startGame() {
    restartGame();
    setFirstTime(false);
    setShowHelp(false);
    localStorage.setItem("firstTimePlayed", "true");
    nextQuestion();
  }

  function restartGame() {
    setScore(0);
    setLives(startLives);
    setGameOver(false);
    nextQuestion();
  }

  return (
    <div className="flex flex-col items-center justify-between mb-12 min-h-[60vh] w-[90vw] max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px]">
      {firstTime || showHelp ? (
        <div className="text-center text-wine">
          <h1 className="text-2xl font-bold">Vítej ve hře!</h1>
          <p className="text-lg mt-6 mb-12">
            Přiřadit správnou čtvrť nebo vesnici k&nbsp;ulici nebo místu
            a&nbsp;získej, co nejvíce&nbsp;🪙&nbsp;penízků. Na odpověď máš
            omezený&nbsp;⏳&nbsp;čas a&nbsp;omezený počet&nbsp;❤️&nbsp;životů!
          </p>
          <button
            onClick={startGame}
            className="mt-4 px-6 py-2 bg-wine text-white rounded-sm"
          >
            Začít hru
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center text-wine">
          <h1 className="text-2xl font-bold">Konec hry!</h1>
          <p className="text-lg mt-6">🪙 Tvé skóre: {score}</p>
          <p className="text-lg mb-10">👑 Nejvyšší skóre: {highScore}</p>
          <button
            onClick={restartGame}
            className="mt-4 px-6 py-2 bg-wine text-white rounded-sm"
          >
            Hrát znovu
          </button>
        </div>
      ) : (
        <div className="w-full text-center flex flex-col items-center justify-between">
          <div className="my-4 w-full text-lg flex flex-row justify-around">
            <span className="w-16">
              ❤️ {lives}/{startLives}
            </span>
            <span className="w-16">🪙 {score}</span>
            <span className="w-16">👑 {highScore}</span>
            <span className="w-16">⏳ {timeLeft}s</span>
          </div>
          <h2 className="text-xl mt-6 font-semibold text-wine">
            Kam patří ulice či místo?
          </h2>
          <h1 className="text-2xl font-semibold text-wine my-4">
            {currentStreet?.street_name}
          </h1>
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            {shuffledDistricts.map((district) => (
              <button
                key={district}
                onClick={() => handleAnswer(district)}
                className={`px-4 py-2 rounded-sm min-h-20 lg:hover:bg-stone-400 transition ${
                  selectedDistrict === district
                    ? district === currentStreet.district_name
                      ? "bg-olive scale-105 lg:hover:!bg-olive"
                      : "bg-red scale-105 lg:hover:!bg-red"
                    : showCorrect && correctDistrict === district
                    ? "bg-olive scale-105 lg:hover:!bg-olive"
                    : "bg-gray-300"
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setShowHelp(true)}
        className={`mb-4 px-4 py-2 bg-gray-500 text-white rounded-sm mt-16 ${
          showHelp ? "hidden" : ""
        }`}
      >
        Zobrazit pravidla
      </button>
    </div>
  );
}
