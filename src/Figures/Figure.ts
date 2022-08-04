import logo from "./logo/black-knight.png";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import { FigureNames } from "./FigureNames";

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell; // кольцевая зависимость фигура знает про ячейку, а ячейка знает про фигуру
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this; // сразу добавляем фигуру в качестве текущего объекта
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  //может двигаться
  canMove(target: Cell): boolean {
    return true;
  }

  //Переместить фигуру
  moveFigure(target: Cell) {}
}
