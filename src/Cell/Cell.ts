import { Colors } from "../models/Colors";
import { Figure } from "../Figures/Figure";
import { Board } from "../Board/Board";

export class Cell {
  readonly x: number; // readonly только для чтения
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // true - фигура может ходит на эту ячейку, false - нет
  id: number; // для рект ключей

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  /*Так как кольцевая зависимость,
   ячейки знают про фигуры, а фигуры про ячейки,
    необходимо для самой фигуры ячейку поменять*/
  setFigure(figure: Figure) {
    this.figure = figure; //для текущей ячейки меняю фигуру
    this.figure.cell = this; // и у ячейки на которой стоит фигура меняю ссылку
  }
  //Выбор фигуры
  moveFigure(target: Cell) {
    //target это ячейка на которую мы хотим фигуру переместить
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure); //перемещаю фигуру на целевую ячейку
      this.figure = null; // удаляем фигуру с текущей позиции иначе она будет копироваться
    }
  }

  // Проверка ячейки на пустоту
  isEmpty() {
    if (this.figure === null) return true; // Если ячейка пустая
    return false;
  }
  //Методы проверки на пустоту горизонтали, вертикали, диагонали
  //Аргументом эти методы принимают ячейку на которую мы хотим походить
  isEmptyVertical(target: Cell): boolean {
    /*Если координата текущей ячейки и координата целевой ячейки не совпадают*/
    /*т.е. запрещаю ходить по горизонтали*/
    /* систему координат доски в Board.ts*/
    if (this.x !== target.x) return false;
    //Получаю max и min координату по y потому что двигаемся мы по вертикали
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) return false;
      //блока else ни в коем случае быть не должно, true возвращает только сама isEmptyVertical
    }
    return true;
  }
  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) return false;
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) return false;
    }
    return true;
  }
  isEmptyDiagonal(target: Cell): boolean {
    return true;
  }
}
