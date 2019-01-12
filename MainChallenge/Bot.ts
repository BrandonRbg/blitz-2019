import { Action } from './Action';
import { Board } from './Board';

export class Bot {
    initialize(board: any, players: number[], timeLeft: number | null) {
        console.log(board);
    }

    play(percepts: any, player: number, step: number, timeLeft: number | null) {
        console.log("Player " + player);
        console.log("Step " + step);

        const board: Board = Board.fromPercepts(percepts);
        return board.getAction(player);
    };
}
