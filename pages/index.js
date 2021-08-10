import Head from "next/head";
import { useState, useRef, useEffect } from "react";

import Snake from "./snake";
import Food from "./food";

export default function Game() {
  // GAME SETUP
  const startGame = () => {
    setIsPlaying(true);
  };

  const randomPosition = () => {
    let min = 1;
    let max = 98;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [snakeSpeed, setSnakeSpeed] = useState(200);
  const [snakeDirection, setSnakeDirection] = useState("RIGHT");
  const [foodPositions, setFoodPosition] = useState(randomPosition());
  const [snakePosition, setSnakePositon] = useState([
    [0, 0],
    [2, 0],
    [4, 0],
  ]);

  // GAME RULES
  const checkOutOfBounds = () => {
    let head = snakePosition[snakePosition.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    alert(`Game over! Snake length is ${snakePosition.length}`);
    setIsPlaying(false);
    setSnakeSpeed(300);
    setSnakeDirection("RIGHT");
    setSnakePositon([
      [0, 0],
      [2, 0],
      [4, 0],
    ]);
  };

  const checkIfCollapased = () => {
    let snake = [...snakePosition];
    let head = snakePosition[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        handleGameOver();
      }
    });
  };

  const enlargeSnake = () => {
    let newSnake = [...snakePosition];
    newSnake.unshift([]);
    setSnakePositon(newSnake);
    speedUp();
  };

  const speedUp = () => {
    if (snakeSpeed > 10) {
      setSnakeSpeed(snakeSpeed - 10);
    }
  }

  const handleEatFood = () => {
    let head = snakePosition[snakePosition.length - 1];
    let food = foodPositions;
    if (head[0] == food[0] && head[1] == food[1]) {
      setFoodPosition(randomPosition());
      enlargeSnake();
      speedUp();
    }
  };

  // SNAKE MOVEMENT
  useEffect(() => {
    const handleDirection = (e) => {
      console.log("Direction Change...", e);
      e = e || window.event;

      if (e) {
        switch (e.keyCode) {
          case 87:
            setSnakeDirection("UP");
            break;
          case 83:
            setSnakeDirection("DOWN");
            break;
          case 65:
            setSnakeDirection("LEFT");
            break;
          case 68:
            setSnakeDirection("RIGHT");
            break;
        }
      }

      console.log("New snake direction: ", snakeDirection);
    };

    window.addEventListener("keydown", handleDirection);

    const interval = setInterval(() => {
      let dots = [...snakePosition];
      let head = dots[dots.length - 1];
      console.log(snakeDirection);

      switch (snakeDirection) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }

      if (isPlaying) {
        dots.push(head);
        dots.shift();
        setSnakePositon(dots);
        checkIfCollapased();
        checkOutOfBounds();
        handleEatFood();
      }
    }, snakeSpeed);

    return () => clearInterval(interval);
  }, [snakePosition, snakeDirection, isPlaying]);

  return (
    <div className="">
      <Head>
        <title>Snake App</title>
        <meta name="description" content="Snake Game" />
      </Head>

      <main className="snake">
        {!isPlaying && (
          <div className="welcome">
            <h1>Wlcome to SNAKE</h1>
            <h2>--- Rules ---</h2>
            <p>1: Collect as many fruit as you can.</p>
            <p>2: Don't touch the walls.</p>
            <p>3: Don't touch your tail.</p>
            <button className="btn" onClick={startGame}>
              Play
            </button>
          </div>
        )}

        <Snake snakeDots={snakePosition} />
        {isPlaying && <Food dot={foodPositions} />}
      </main>
    </div>
  );
}
