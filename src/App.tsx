import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./Board/BoardComponent";
import { Board } from "./Board/Board";

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  //Новая партия игры
  function restart() {
    const newBoard = new Board();
    newBoard.initCells(); // инициализирую новые ячейки
    newBoard.addFigures(); // Добавляю фигуры
    setBoard(newBoard); // сохраняю в состояние
  }
  return (
    <div className="app">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;
