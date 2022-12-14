import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import { FigureNames } from "./FigureNames";
import blackLogo from "./logo/black-rook.png";
import whiteLogo from "./logo/white-rook.png";

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }
  //логика движения фигуры
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    if (this.cell.isEmptyVertical(target)) return true; // ладья двигается только по горизонтали и вертикали
    if (this.cell.isEmptyHorizontal(target)) return true;
    return false;
  }
}
