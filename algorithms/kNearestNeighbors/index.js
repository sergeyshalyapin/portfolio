const euclideanDistance = (p1, p2) => {
  return Math.sqrt(
    p1.reduce((sum, val, i) => sum + Math.pow(val - p2[i], 2), 0)
  );
}

function kNearestNeighbors(data, queryPoint, k = 3) {
  // Step 1: Calculate distances from query point to all training points
  const distances = data.map(({ point, label }) => ({
    label,
    distance: euclideanDistance(point, queryPoint)
  }));

  // Step 2: Sort by distance
  distances.sort((a, b) => a.distance - b.distance);

  // Step 3: Take top k neighbors
  const kNearest = distances.slice(0, k);

  // Step 4: Count labels
  const frequency = {};
  for (const neighbor of kNearest) {
    frequency[neighbor.label] = (frequency[neighbor.label] || 0) + 1;
  }

  // Step 5: Return label with highest frequency
  return Object.entries(frequency).sort((a, b) => b[1] - a[1])[0][0];
}

const trainingData = [
  { point: [1, 2], label: "A" },
  { point: [2, 3], label: "A" },
  { point: [3, 3], label: "B" },
  { point: [6, 5], label: "B" },
  { point: [7, 7], label: "B" }
];

const testPoint = [3, 2];
const k = 3;

const result = kNearestNeighbors(trainingData, testPoint, k);
console.log(`Predicted label: ${result}`); // Likely "A"
