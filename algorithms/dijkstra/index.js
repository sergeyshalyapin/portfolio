class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.values.shift();
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2, weight) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight }); // undirected
  }

  dijkstra(start, end) {
    const distances = {};
    const prev = {};
    const pq = new PriorityQueue();

    // Init distances
    for (let vertex in this.adjacencyList) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      pq.enqueue(vertex, distances[vertex]);
      prev[vertex] = null;
    }

    while (!pq.isEmpty()) {
      const { val: current } = pq.dequeue();

      if (current === end) {
        // Found the shortest path
        const path = [];
        let temp = current;
        while (temp) {
          path.push(temp);
          temp = prev[temp];
        }
        return path.reverse(); // shortest path from start to end
      }

      for (let neighbor of this.adjacencyList[current]) {
        const alt = distances[current] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = current;
          pq.enqueue(neighbor.node, alt);
        }
      }
    }

    return null; // No path
  }
}

const g = new WeightedGraph();

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "C", 1);
g.addEdge("B", "D", 5);
g.addEdge("C", "D", 8);
g.addEdge("C", "E", 10);
g.addEdge("D", "E", 2);
g.addEdge("D", "Z", 6);
g.addEdge("E", "Z", 3);

console.log(g.dijkstra("A", "Z"));
// Output: [ 'A', 'C', 'B', 'D', 'E', 'Z' ] (shortest path with total weight 14)
