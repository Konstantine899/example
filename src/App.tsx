import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./Board/BoardComponent";
import { Board } from "./Board/Board";
import { Player } from "./Player/Player";
import { Colors } from "./models/Colors";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  //Новая партия игры
  function restart() {
    const newBoard = new Board();
    newBoard.initCells(); // инициализирую новые ячейки
    newBoard.addFigures(); // Добавляю фигуры
    setBoard(newBoard); // сохраняю в состояние
  }

  //Функция переключения текущего игрока
  //Эту функцию мы будем вызывать в момент хода игрока
  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
    </div>
  );
}

export default App;
