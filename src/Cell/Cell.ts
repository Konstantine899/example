import { Colors } from "../models/Colors";
import { Figure } from "../Figures/Figure";
import { Board } from "../Board/Board";

export class Cell {
  readonly x: number; // readonly только для чтения
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // true - фигура может ходить на эту ячейку, false - нет
  id: number; // для React ключей

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
  //Диагональ самая сложная
  isEmptyDiagonal(target: Cell): boolean {
    /*Разница между диагональными клетками всегда равна
     * 1.1
     * 2.2
     * 3.3
     * Смотри систему координат доски Board.ts
     * В данном примере между координатами, и по x и по y, разница всегда равна 1
     * Таким образом по модулю всегда разница будет одинаковой как по x, так и по y.
     * С помощью функции Math.abs() мы берем модуль.
     * Модуль важен поскольку двигаться мы можем в разных направлениях
     * */
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) return false; // Если не совпадает, то это не диагональ
    // Проверка диагонали на пустоту
    /* Если координата по y текущей проверки меньше чем координата точки в которую мы хотим попасть,
     то присваиваем 1, в обратном случае -1 */
    const directionY = this.y < target.y ? 1 : -1;
    const directionX = this.x < target.x ? 1 : -1;
    //Теперь на полученное значение диагонали буду умножать
    //Теперь двигаюсь в цикле на столько ячеек на сколько получил в модуле разницы
    for (let i = 1; i < absY; i++) {
      if (
        !this.board
          .getCell(this.x + directionX * i, this.y + directionY * i)
          .isEmpty()
      ) {
        /* this.x + diractionX * i
         * Мы к текущей координате прибавляем произведение направления
         * directionY умноженное на index
         * Таким образом мы получаем направление движения
         * Если в отрицательную сторону, то мы * -1(index),
         * в обратном случае * +1.
         */
        return false;
      }
    }
    return true;
  }
}
