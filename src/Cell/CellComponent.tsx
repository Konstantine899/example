import React, { FC } from "react";
import { CellProps } from "./CellProps";

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={["cell", cell.color, selected ? "selected" : ""].join(" ")}
      onClick={() => click(cell)}
      /*Если available true т.е фигура может ходить, и в ячейке есть фигуры !cell.figure */
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {/*Если available true т.е фигура может ходить, и нет в ячейке фигуры !cell.figure */}
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};

export default CellComponent;
