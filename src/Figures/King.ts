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
}
