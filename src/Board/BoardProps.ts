import { Board } from "./Board";

export interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void; // функция с помощью которой доску можно изменить, подсветка ячеек и т.д.
}

/*Для того что бы пропсом передать получившуюся доску в компонент BoardComponent создаю interface для props*/
