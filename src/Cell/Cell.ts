import { Colors } from "../models/Colors";
import { Figure } from "../Figures/Figure";
import { Board } from "../Board/Board";

export class Cell {
  readonly x: number; // readonly только для чтения
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // true - фигура может ходит на эту ячейку, false - нет
  id: number; // для рект ключей

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  //Выбор фигуры
  moveFigure(target: Cell) {
    //target это ячейка на которую мы хотим фигуру переместить
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      target.figure = this.figure; // перемещаем фигуру
      this.figure = null; // удаляем фигуру
    }
  }
}
