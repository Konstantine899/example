import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import blackLogo from "./logo/black-bishop.png";
import whiteLogo from "./logo/white-bishop.png";
import { FigureNames } from "./FigureNames";

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    //для каждой из фигур нужно переопределить соответствующие поля
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  //логика движения фигуры
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    if (this.cell.isEmptyDiagonal(target)) return true; //движение слона только по диагонали
    return false;
  }
}
