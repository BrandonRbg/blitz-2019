import * as _ from 'lodash';
import { Coords } from './Coords';
import { Action } from './Action';
import placeholder = require('lodash/fp/placeholder');

export class Board {
    constructor(
        public pawns: Coords[],
        public goals: Coords[],
        public nbWalls: number[],
        public horizontalWalls: Coords[],
        public verticalWalls: Coords[],
        public rows: number,
        public cols: number,
        public size: number
    ) {
    }

    canMoveHere(action: Action): boolean {
        const isInBound = 0 <= action.coord.i
            && action.coord.i < this.size
            && 0 <= action.coord.j && action.coord.j < this.size;
        const isOnAnotherPlayer = _.some(this.pawns, (coords) => _.isEqual(action.coord, coords));

        return isInBound && !isOnAnotherPlayer;
    }

    isInBound(coord: Coords) {
        return 0 <= coord.i
            && coord.i < this.size
            && 0 <= coord.j && coord.j < this.size;
    }

    hasWallBlockingRight(coord: Coords): boolean {
        return this.verticalWalls.filter(w => w.j === coord.j && (w.i === coord.i || w.i === coord.i - 1)).length > 0;
    }

    hasWallBlockingLeft(coord: Coords): boolean {
        return this.verticalWalls.filter(w => w.j === coord.j - 1 && (w.i === coord.i || w.i === coord.i - 1)).length > 0;
    }

    hasWallBlockingUp(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => w.i === coord.i - 1 && (w.j === coord.j || w.j === coord.j - 1)).length > 0;
    }

    hasWallBlockingDown(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => w.i === coord.i && (w.j === coord.j || w.j === coord.j - 1)).length > 0;
    }

    hasWallBlockingJumpRight(coord: Coords): boolean {
        return this.verticalWalls.filter(w => (w.i === coord.i - 1 && w.j === coord.j + 1) || (w.i === coord.i && w.j === coord.j + 1)).length > 0;
    }

    hasWallBlockingJumpLeft(coord: Coords): boolean {
        return this.verticalWalls.filter(w => (w.i === coord.i - 1 && w.j === coord.j - 2) || (w.i === coord.i && w.j === coord.j - 2)).length > 0;
    }

    hasWallBlockingJumpUp(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => (w.i === coord.i - 2 && w.j === coord.j - 1) || (w.i === coord.i - 2 && w.j === coord.j)).length > 0;
    }

    hasWallBlockingJumpDown(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => (w.i === coord.i + 1 && w.j === coord.j - 1) || (w.i === coord.i + 1 && w.j === coord.j)).length > 0;
    }

    hasDiagonalWallRightUpHorizontal(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => w.i === coord.i - 1 && w.j === coord.j).length > 0;
    }

    hasDiagonalWallRightDownHorizontal(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => w.i === coord.i && w.j === coord.j).length > 0;
    }

    hasDiagonalWallLeftUpHorizontal(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => w.i === coord.i - 1 && w.j === coord.j - 1).length > 0;
    }

    hasDiagonalWallLeftDownHorizontal(coord: Coords): boolean {
        return this.horizontalWalls.filter(w => w.i === coord.i && w.j === coord.j - 1).length > 0;
    }

    hasDiagonalWallUpRightVertical(coord: Coords): boolean {
        return this.verticalWalls.filter(w => w.i === coord.i - 1 && w.j === coord.j).length > 0;
    }

    hasDiagonalWallUpLeftVertical(coord: Coords): boolean {
        return this.verticalWalls.filter(w => w.i === coord.i - 1 && w.j === coord.j - 1).length > 0;
    }

    hasDiagonalWallDownRightVertical(coord: Coords): boolean {
        return this.verticalWalls.filter(w => w.i === coord.i && w.j === coord.j).length > 0;
    }

    hasDiagonalWallDownLeftVertical(coord: Coords): boolean {
        return this.verticalWalls.filter(w => w.i === coord.i && w.j === coord.j - 1).length > 0;
    }

    hasPlayerRight(coord: Coords): boolean {
        return this.pawns.filter(p => p.j === coord.j + 1 && p.i === coord.i).length > 0;
    }

    hasPlayerLeft(coord: Coords): boolean {
        return this.pawns.filter(p => p.j === coord.j - 1 && p.i === coord.i).length > 0;
    }

    hasPlayerUp(coord: Coords): boolean {
        return this.pawns.filter(p => p.i === coord.i - 1 && p.j === coord.j).length > 0;
    }

    hasPlayerDown(coord: Coords): boolean {
        return this.pawns.filter(p => p.i === coord.i + 1 && p.j === coord.j).length > 0;
    }

    hasPlayerRightUp(coord: Coords): boolean {
        return this.pawns.filter(p => p.j === coord.j + 1 && p.i === coord.i - 1).length > 0;
    }

    hasPlayerRightDown(coord: Coords): boolean {
        return this.pawns.filter(p => p.j === coord.j + 1 && p.i === coord.i + 1).length > 0;
    }

    hasPlayerLeftUp(coord: Coords): boolean {
        return this.pawns.filter(p => p.i === coord.i - 1 && p.j === coord.j - 1).length > 0;
    }

    hasPlayerLeftDown(coord: Coords): boolean {
        return this.pawns.filter(p => p.i === coord.i + 1 && p.j === coord.j - 1).length > 0;
    }

    hasPlayerDoubleRight(coord: Coords): boolean {
        return this.pawns.filter(p => p.j === coord.j + 2 && p.i === coord.i).length > 0;
    }

    hasPlayerDoubleLeft(coord: Coords): boolean {
        return this.pawns.filter(p => p.j === coord.j - 2 && p.i === coord.i).length > 0;
    }

    hasPlayerDoubleUp(coord: Coords): boolean {
        return this.pawns.filter(p => p.i === coord.i - 2 && p.j === coord.j).length > 0;
    }

    hasPlayerDoubleDown(coord: Coords): boolean {
        return this.pawns.filter(p => p.i === coord.i + 2 && p.j === coord.j).length > 0;
    }

    canMoveRight(coord: Coords): boolean {
        return !this.hasPlayerRight(coord) && !this.hasWallBlockingRight(coord);
    }

    canMoveLeft(coord: Coords): boolean {
        return !this.hasPlayerLeft(coord) && !this.hasWallBlockingLeft(coord);
    }

    canMoveUp(coord: Coords): boolean {
        return !this.hasPlayerUp(coord) && !this.hasWallBlockingUp(coord);
    }

    canMoveDown(coord: Coords): boolean {
        return !this.hasPlayerDown(coord) && !this.hasWallBlockingDown(coord);
    }

    getSimpleMoves(coord: Coords): Coords[] {
        let moves: Coords[] = [];
        if (this.canMoveRight(coord)) {
            moves.push(new Coords(coord.i, coord.j + 1));
        }
        if (this.canMoveLeft(coord)) {
            moves.push(new Coords(coord.i, coord.j - 1));
        }
        if (this.canMoveUp(coord)) {
            moves.push(new Coords(coord.i - 1, coord.j));
        }
        if (this.canMoveDown(coord)) {
            moves.push(new Coords(coord.i + 1, coord.j));
        }
        moves = moves.filter(this.isInBound.bind(this));
        return moves;
    }

    getJumpMoves(coord: Coords): Coords[] {
        let moves = [];

        if (!this.hasWallBlockingRight(coord) && this.hasPlayerRight(coord) && !this.hasWallBlockingJumpRight(coord) && !this.hasPlayerDoubleRight(coord)) {
            moves.push(new Coords(coord.i, coord.j + 2));
        }
        if (!this.hasWallBlockingLeft(coord) && this.hasPlayerLeft(coord) && !this.hasWallBlockingJumpLeft(coord) && !this.hasPlayerDoubleLeft(coord)) {
            moves.push(new Coords(coord.i, coord.j - 2));
        }
        if (!this.hasWallBlockingUp(coord) && this.hasPlayerUp(coord) && !this.hasWallBlockingJumpUp(coord) && !this.hasPlayerDoubleUp(coord)) {
            moves.push(new Coords(coord.i - 2, coord.j));
        }
        if (!this.hasWallBlockingDown(coord) && this.hasPlayerDown(coord) && !this.hasWallBlockingJumpDown(coord) && !this.hasPlayerDoubleDown(coord)) {
            moves.push(new Coords(coord.i + 2, coord.j));
        }
        moves = moves.filter(this.isInBound.bind(this));
        return moves;
    }

    getDiagonalMoves(coord: Coords): Coords[] {
        let moves = [];
        if (!this.hasWallBlockingRight(coord) && this.hasPlayerRight(coord) && this.hasWallBlockingJumpRight(coord)) {
            if (!this.hasDiagonalWallRightUpHorizontal(coord) && !this.hasPlayerRightUp(coord)) {
                moves.push(new Coords(coord.i - 1, coord.j + 1));
            }
            if (!this.hasDiagonalWallRightDownHorizontal(coord) && !this.hasPlayerRightDown(coord)) {
                moves.push(new Coords(coord.i + 1, coord.j + 1));
            }
        }
        if (!this.hasWallBlockingLeft(coord) && this.hasPlayerLeft(coord) && this.hasWallBlockingJumpLeft(coord)) {
            if (!this.hasDiagonalWallLeftUpHorizontal(coord) && !this.hasPlayerLeftUp(coord)) {
                moves.push(new Coords(coord.i - 1, coord.j - 1));
            }
            if (!this.hasDiagonalWallLeftDownHorizontal(coord) && !this.hasPlayerLeftDown(coord)) {
                moves.push(new Coords(coord.i + 1, coord.j - 1));
            }
        }
        if (!this.hasWallBlockingUp(coord) && this.hasPlayerUp(coord) && this.hasWallBlockingJumpUp(coord)) {
            if (!this.hasDiagonalWallUpRightVertical(coord) && !this.hasPlayerRightUp(coord)) {
                moves.push(new Coords(coord.i - 1, coord.j - 1));
            }
            if (!this.hasDiagonalWallUpLeftVertical(coord) && !this.hasPlayerLeftUp(coord)) {
                moves.push(new Coords(coord.i - 1, coord.j + 1));
            }
        }
        if (!this.hasWallBlockingDown(coord) && this.hasPlayerDown(coord) && this.hasWallBlockingJumpDown(coord)) {
            if (!this.hasDiagonalWallDownRightVertical(coord) && !this.hasPlayerRightDown(coord)) {
                moves.push(new Coords(coord.i + 1, coord.j + 1));
            }
            if (!this.hasDiagonalWallDownLeftVertical(coord) && !this.hasPlayerLeftDown(coord)) {
                moves.push(new Coords(coord.i + 1, coord.j - 1));
            }
        }
        moves = moves.filter(this.isInBound.bind(this));
        return moves;
    }

    getMove(coord: Coords, goal: Coords): Coords {
        const queue: Coords[] = [];
        const visited: Coords[] = [];
        queue.unshift(coord);
        let first = true;
        let dest: Coords;
        while (queue.length !== 0) {
            const element = queue.pop();
            if (visited.find(v => v.i === element.i && v.j === element.j)) {
                continue;
            }
            visited.push(element);
            if ((goal.i != null && element.i === goal.i) || (goal.j != null && element.j === goal.j)) {
                dest = element;
                break;
            }
            const possibleMoves = [];
            const goingHorizontal = goal.j != null;
            const simpleMoves = this.getSimpleMoves(element);
            if (first) {
                const orderedMoves: Coords[] = [];
                for (const move of simpleMoves) {
                    if (goingHorizontal) {
                        if (move.j === element.j) {
                            orderedMoves.unshift(move);
                        } else {
                            orderedMoves.push(move);
                        }
                    } else {
                        if (move.i === element.i) {
                            orderedMoves.unshift(move);
                        } else {
                            orderedMoves.push(move);
                        }
                    }
                }
                possibleMoves.push(...orderedMoves);
                possibleMoves.push(...this.getDiagonalMoves(element));
                possibleMoves.push(...this.getJumpMoves(element));
            } else {
                possibleMoves.push(...simpleMoves);
            }

            possibleMoves.forEach(m => m.previous = element);
            queue.unshift(...possibleMoves);
            first = false;
        }
        let nextMove = dest;
        while (nextMove.previous.i !== coord.i || nextMove.previous.j !== coord.j) {
            nextMove = nextMove.previous;
        }
        return nextMove;
    }

    canOtherPlayerGoTowardsGoal(player: number) {
        const coord = this.pawns[player];
        const goal = this.goals[player];
    }

    getAction(player: number): Action {
        const coord = this.pawns[player];
        const goal = this.goals[player];
        // switch (this.pawns.length) {
        //     case 4:
        //         return new Action('P', this.getMove(coord, goal));
        //     case 2:
        //
        // }
        return new Action('P', this.getMove(coord, goal));
    };

    private static convertRawCoords([i, j]: number[]): Coords {
        return new Coords(i, j);
    }

    static fromPercepts(percepts): Board {
        const pawns = percepts.pawns.map(Board.convertRawCoords);
        const goals = percepts.goals.map(Board.convertRawCoords);
        const horizontalWalls = percepts.horiz_walls.map(Board.convertRawCoords);
        const verticalWalls = percepts.verti_walls.map(Board.convertRawCoords);
        const {nb_walls, rows, cols, size} = percepts;

        return new Board(pawns, goals, nb_walls, horizontalWalls, verticalWalls, rows, cols, size);
    }
}
