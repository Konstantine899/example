import React, { FC } from "react";
import { BoardProps } from "./BoardProps";
import CellComponent from "../Cell/CellComponent";

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  return (
    <div className="board">
      {/*Проходимся по двумерному массиву. Использую индекс потому что сами строки у нас измнятся не будут. для этого я использовал readonly*/}
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent cell={cell} key={cell.id} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
