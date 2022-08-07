import { Board } from "./Board";
import { Player } from "../Player/Player";

export interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void; // функция с помощью которой доску можно изменить, подсветка ячеек и т.д.
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

/*Для того что бы пропсом передать получившуюся доску в компонент BoardComponent создаю interface для props*/
