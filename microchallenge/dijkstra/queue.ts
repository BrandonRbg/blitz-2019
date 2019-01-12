export class Node {
    public node: number;
    public weight: number;

    constructor(node: number, weight: number) {
        this.node = node;
        this.weight = weight;
    }
}

export class Queue {
    public nodes: Node[] = [];

    public add(node: Node) {
        this.nodes.push(node);
        this.nodes.sort((a, b) => {
            if (a.weight > b.weight) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    public remove(node: Node) {
        this.nodes.splice(this.nodes.indexOf(node), 1);
    }

    public dequeue() {
        const res = this.nodes[0];
        this.nodes.splice(0, 1);
        return res;
    }
}
