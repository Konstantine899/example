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
    //Условие на проверку цвета. Свои фигуры сбивать нельзя
    // Если цвет выбранной фигуры и цвет и цвет целевой фигуры совпадают, то походить нельзя
    if (target.figure?.color === this.color) return false;
    //Проверка на короля. Короля сбивать нельзя. Она не должна подсвечиваться при варианте хода
    if (target.figure?.name === FigureNames.KING) return false;
    return true;
  }

  //Переместить фигуру
  moveFigure(target: Cell) {}
}
