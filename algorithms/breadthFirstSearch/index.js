class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1); // undirected
  }

  // Breadth-First Search from a starting node
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    while (queue.length > 0) {
      const vertex = queue.shift(); // remove from front
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);

        for (let neighbor of this.adjacencyList[vertex]) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }

    return result;
  }

  // Find shortest path from start to end
  findShortestPath(start, end) {
    const queue = [start];
    const visited = new Set([start]);
    const prev = {}; // keep track of the previous node

    while (queue.length > 0) {
      const node = queue.shift();

      if (node === end) break;

      for (const neighbor of this.adjacencyList[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          prev[neighbor] = node;
          queue.push(neighbor);
        }
      }
    }

    // Reconstruct path from `end` to `start`
    const path = [];
    let current = end;

    while (current !== undefined) {
      path.push(current);
      current = prev[current];
    }

    path.reverse();

    // If start is not in path, there's no path
    return path[0] === start ? path : null;
  }
}

const g = new Graph();

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

console.log(g.bfs("A")); 
// Output: [ 'A', 'B', 'C', 'D', 'E', 'F' ]

console.log(g.findShortestPath("A", "F"));
// Output: [ 'A', 'C', 'E', 'F' ] OR [ 'A', 'B', 'D', 'F' ]
