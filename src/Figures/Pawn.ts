import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import blackLogo from "./logo/black-pawn.png";
import whiteLogo from "./logo/white-pawn.png";
import { FigureNames } from "./FigureNames";

export class Pawn extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }
}
