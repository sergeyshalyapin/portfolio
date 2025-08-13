const dfsRecursive = (graph, start, visited = new Set()) => {
  if (visited.has(start)) return;

  console.log(start); // visit node
  visited.add(start);

  for (const neighbor of graph[start]) {
    dfsRecursive(graph, neighbor, visited);
  }
}

const dfsIterative = (graph, start) => {
  const stack = [start];
  const visited = new Set();

  while (stack.length) {
    const node = stack.pop();
    if (!visited.has(node)) {
      console.log(node);
      visited.add(node);

      // Push neighbors in reverse to visit in correct order
      for (let i = graph[node].length - 1; i >= 0; i--) {
        stack.push(graph[node][i]);
      }
    }
  }
}

const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: []
};

console.log("--- Recursive DFS ---");

dfsRecursive(graph, "A");
// Output: A B D E F C

console.log("--- Iterative DFS ---");

dfsIterative(graph, "A");
// Output: A C F B E D (depends on stack order)
