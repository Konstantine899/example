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
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    return true;
  }
}
