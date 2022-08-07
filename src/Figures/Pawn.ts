import { Figure } from "./Figure";
import { Colors } from "../models/Colors";
import { Cell } from "../Cell/Cell";
import blackLogo from "./logo/black-pawn.png";
import whiteLogo from "./logo/white-pawn.png";
import { FigureNames } from "./FigureNames";

export class Pawn extends Figure {
  //Условие для первого хода
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  //логика движения фигуры
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false; // Проверка на условия родительского canMove
    //Определение направления движения пешки
    //Белые двигаются вперед
    //Черные двигаются вниз
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    //Условия для хода пешки
    /*Проверяем смещение по y на 1-цу или на 2-ку если это первый шаг,
     *так же проверяем что смещение у нас идет только по оси x,
     * и так же убеждаемся в том что целевая ячейка пустая */
    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    //Условие для атаки по диагонали
    //Мы проверяем что мы двигаемся на одну ячейку либо вниз, либо вверх, в зависимости от цвета
    // и так же смещаемся по x по диагонали на одну ячейку
    //И финальная проверка это то что на этой ячейке стоит враг
    if (target.y === this.cell.y + direction
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target))
     {
      return true;
    }
    return false;
  }

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.isFirstStep = false; // после первого передвижения фигуры делаю значение этого поля false
  }
}
