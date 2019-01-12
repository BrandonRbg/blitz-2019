import { Queue, Node } from './queue';
import Heap = require('heap');

export class Dijkstra {
    private nodes: { [key: number]: { weight: number; neighbors: { [key: number]: number } } };
    private startingNodes: number[];

    constructor(private graph: number[][]) {
        this.init();
    }

    public findPath() {
        const begin = this.startingNodes[0];
        const end = this.startingNodes[1];

        const queue = new Heap((a: Node, b: Node) => a.weight - b.weight);
        const distance = {};
        const previous = {};
        let path = 0;

        for (const key in this.nodes) {
            if (+key === begin) {
                distance[key] = 0;
                queue.push(new Node(+key, 0));
            } else {
                distance[key] = Infinity;
                queue.push(new Node(+key, Infinity));
            }
        }

        while (!queue.empty()) {
            const smallest = queue.pop();

            // Find the path
            if (smallest.node === +end) {
                let i = smallest;
                while (previous[+i.node]) {
                    path += this.nodes[+i.node].weight;
                    i = previous[+i.node];
                }
                break;
            }

            // Need distance!
            if (!smallest || distance[+smallest.node] === Infinity) {
                continue;
            }

            for (const neighbor in this.nodes[smallest.node].neighbors) {
                const dist = distance[+smallest.node] + this.nodes[smallest.node].neighbors[neighbor];

                if (dist < distance[+neighbor]) {
                    distance[+neighbor] = dist;
                    previous[+neighbor] = smallest;
                    queue.push(new Node(+neighbor, dist));
                }
            }
        }

        return path;
    }

    private init() {
        this.nodes = {};
        this.startingNodes = [];

        for (let i = 0; i < this.graph.length; i++) {
            for (let j = 0; j < this.graph[i].length; j++) {
                this.nodes[j + i * this.graph.length] = { weight: this.graph[i][j], neighbors: this.findNeighbors(i, j) };
                if (!this.graph[i][j]) {
                    this.startingNodes.push(j + i * this.graph.length);
                }
            }
        }
    }

    private findNeighbors(x: number, y: number) {
        const neighbor: { [key: number]: number } = {};

        if (y > 0) {
            neighbor[(y - 1) + this.graph.length * x] = this.graph[x][y - 1];
        }
        if (y < this.graph[x].length - 1) {
            neighbor[(y + 1) + this.graph.length * x] = this.graph[x][y + 1];
        }
        if (x > 0) {
            neighbor[y + this.graph.length * (x - 1)] = this.graph[x - 1][y];
        }

        if (x < this.graph.length - 1) {
            neighbor[y + this.graph.length * (x + 1)] = this.graph[x + 1][y];
        }

        return neighbor;
    }
}
