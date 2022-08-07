import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import blackLogo from "./logo/black-king.png";
import whiteLogo from "./logo/white-king.png";
import { FigureNames } from "./FigureNames";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }
  //логика движения фигуры
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    //Расчет направления движения
    const deltaX = Math.abs(this.cell.x - target.x);
    const deltaY = Math.abs(this.cell.y - target.y);
    // По диагонали фигура всегда смещается по x и y на 1-цу
    // по вертикали смещение по x не происходит т.е. 0, а по y на единицу
    // по горизонтали смещение по x на единицу, а по y не происходит т.е. 0
    return (
      (deltaX === 1 && deltaY === 1) ||
      (deltaX === 1 && deltaY === 1) ||
      (deltaX === 0 && deltaY === 1) ||
      (deltaX === 1 && deltaY === 0)
    );
  }
}
