import { Player } from "../Player/Player";

export interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}
