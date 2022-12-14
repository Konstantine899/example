import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import { FigureNames } from "./FigureNames";
import blackLogo from "./logo/black-queen.png";
import whiteLogo from "./logo/white-queen.png";

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }
  //логика движения фигуры
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    if (this.cell.isEmptyVertical(target)) return true; // если диагональ пустая
    if (this.cell.isEmptyHorizontal(target)) return true; // если горизонталь пустая
    if (this.cell.isEmptyDiagonal(target)) return true; // если диагональ пустая
    return false;
  }
}
