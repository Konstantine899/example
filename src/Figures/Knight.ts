import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import blackLogo from "./logo/black-knight.png";
import whiteLogo from "./logo/white-knight.png";
import { FigureNames } from "./FigureNames";

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  /*Закономерность того как ходит конь
   * когда конь ходит по вертикали координата x всегда меняется на 1-цу,
   * а y меняется на 2.
   * Если ходит по горизонтали то с точностью наоборот x меняется на 2
   * а y меняется на 1
   *
   *     3.2   5.2
   *  2.3        6.3
   *        4.4
   *  2.5         6.5
   *     3.6   5.6
   *  */
  //логика движения фигуры
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    return true;
  }
}
