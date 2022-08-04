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
}
