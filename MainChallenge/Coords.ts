export class Coords {
    constructor(
        public i: number,
        public j: number,
        public visited = false,
        public previous: Coords = null
    ) {
    }
}
