import { Cell } from "../Cell/Cell";
import { Colors } from "../models/Colors";
import { Pawn } from "../Figures/Pawn";
import { King } from "../Figures/King";
import { Knight } from "../Figures/Knight";
import { Queen } from "../Figures/Queen";
import { Bishop } from "../Figures/Bishop";
import { Rook } from "../Figures/Rook";

export class Board {
  cells: Cell[][] = []; // доска содержит ячейки, ячейки это двумерный массив: строки в которых содержаться столбцы (Матрица)

  //Инициализация ячеек
  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []; // строка с одномерным массивом ячеек
      for (let j = 0; j < 8; j++) {
        //прохожусь по столбцам и добавляю ячейки определенного цвета
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); //добавляем черные ячейки, this - это доска, j - это x координата, i - y координата
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // добавляем белые ячейки, this - это доска, j - это x координата, i - y координата
        }
      }
      this.cells.push(row); // после формирования строки в цикле добаляю ее в двумерный массив cells
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells; // переносим текущие ячейки в новый объект
    return newBoard;
  }

  //логика подсветки ячеек на которые можно походить
  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j]; //По индексу получаем ячейку, target потому что туда потенциально может походить фигура
        //изменяем поле available что бы определить доступна она для хода или нет.
        //Мы получаем фигуру, на выбранной ячейке и вызываем метод canMove() возвражает true если фигура может походить
        // В качестве ячейки на которую мы хотим походить в canMove мы передаем target
        //ВНИКНИ ЭТО ВАЖНЫЙ МОМЕНТ!!!!
        // !! Преобразуем к Boolean
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  //для того что бы было удобно точечно расставлять фигуры на ячейки
  public getCell(x: number, y: number) {
    return this.cells[y][x]; // обратите внимание, что y координата идет первой
    /*Система координат доски*/
    /* X.Y
     * 0.0 1.0 2.0 3.0 4.0 5.0 6.0 7.0
     * 0.1 1.1 2.1 3.1 4.1 5.1 6.1 7.1
     * 0.2 1.2 2.2 3.2 4.2 5.2 6.2 7.2
     * 0.3 1.3 2.3 3.3 4.3 5.3 6.3 7.3
     * 0.4 1.4 2.4 3.4 4.4 5.4 6.4 7.4
     * 0.5 1.5 2.5 3.5 4.5 5.5 6.5 7.5
     * 0.6 1.6 2.6 3.6 4.6 5.6 6.6 7.6
     * 0.7 1.7 2.7 3.7 4.7 5.7 6.7 7.7
     * */
  }
  //Методы добавления каждого типа фигур
  private addBishop() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }
  private addKing() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addQueen() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addKnight() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }
  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addRook() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  //Добавление фигур
  public addFigures() {
    this.addBishop();
    this.addKing();
    this.addKnight();
    this.addPawn();
    this.addQueen();
    this.addRook();
  }
}

/*Во внутреннем цикле я формирую строку. Итерация за итерацией я добалвяю ячейки пока их не станет в строке восемь штук*/
/*Во внешнем цикле я получаю заполненную строку. И уже их этих строк мы формируем доску*/
//Таким образом я получаю двумерный массив ячеек
