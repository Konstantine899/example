import React, { FC, useEffect, useState } from "react";
import { BoardProps } from "./BoardProps";
import CellComponent from "../Cell/CellComponent";
import { Cell } from "../Cell/Cell";

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      //Если у нас есть выбранная ячейка на которой стоит фигура
      //И эта ячейка не равняется той на которую мы хотим нажать
      //И при этом canMove возвращает true т.е. на эту ячейка мы можем походить
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
    } else {
      setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  //Ячейки для которых возможен ход
  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard(); // для того что бы подсветить все необходимые ячейки, для того что бы компонент перересовался
  }

  //Обновление состояния
  function updateBoard() {
    const newBoard = board.getCopyBoard(); // копия доски, новая ссылка,
    setBoard(newBoard); // перересовываем компонент
  }

  return (
    <div className="board">
      {/*Проходимся по двумерному массиву. Использую индекс потому что сами строки у нас измнятся не будут. для этого я использовал readonly*/}
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              click={click}
              cell={cell}
              key={cell.id}
              selected={
                //Усливие для выбора ячейки, если координаты совпадают
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
