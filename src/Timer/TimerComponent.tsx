import React, { FC, useEffect, useRef, useState } from "react";
import { TimerProps } from "./TimerProps";
import { Colors } from "../models/Colors";

const TimerComponent: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(7200);
  const [whiteTime, setWhiteTime] = useState(7200);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }
  function decrementBlackTimer() {
    setBlackTime((previous) => previous - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime((previous) => previous - 1);
  }

  const handleRestart = () => {
    setWhiteTime(7200);
    setBlackTime(7200);
    restart();
  };

  return (
    <div>
      <button onClick={handleRestart}>Restart Game</button>
      <h2>Игрок черными - {blackTime}</h2>
      <h2>Игрок белыми - {whiteTime}</h2>
    </div>
  );
};

export default TimerComponent;
