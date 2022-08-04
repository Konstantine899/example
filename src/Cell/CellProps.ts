import { Cell } from "./Cell";

export interface CellProps {
  cell: Cell; // ожидаем на вход объект ячейки
  selected: boolean; // Выбрана ячейка или нет
  click: (cell: Cell) => void;
}
