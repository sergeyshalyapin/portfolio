class NaiveBayes {
  constructor() {
    this.labelCounts = {};   // Count of each label
    this.featureCounts = {}; // Count of feature values given a label
    this.vocabulary = new Set();
    this.totalExamples = 0;
  }

  // Train with data: { features: [...], label: "..." }
  train(data) {
    for (const { features, label } of data) {
      this.totalExamples++;
      this.labelCounts[label] = (this.labelCounts[label] || 0) + 1;

      features.forEach(feature => {
        this.vocabulary.add(feature);

        const key = `${label}|${feature}`;
        this.featureCounts[key] = (this.featureCounts[key] || 0) + 1;
      });
    }
  }

  // Predict label based on features
  predict(features) {
    const labels = Object.keys(this.labelCounts);
    let bestLabel = null;
    let maxProb = -Infinity;

    for (const label of labels) {
      const logProb = Math.log(this.labelCounts[label] / this.totalExamples);

      let totalLogProb = logProb;
      for (const feature of features) {
        const key = `${label}|${feature}`;
        const count = this.featureCounts[key] || 0;

        // Laplace smoothing
        const smoothedProb =
          (count + 1) /
          (this.labelCounts[label] + this.vocabulary.size);

        totalLogProb += Math.log(smoothedProb);
      }

      if (totalLogProb > maxProb) {
        maxProb = totalLogProb;
        bestLabel = label;
      }
    }

    return bestLabel;
  }
}

const classifier = new NaiveBayes();

classifier.train([
  { features: ["rain", "cold"], label: "stay_in" },
  { features: ["sunny", "warm"], label: "go_out" },
  { features: ["sunny", "cold"], label: "go_out" },
  { features: ["rain", "warm"], label: "stay_in" }
]);

const test = ["sunny", "cold"];
console.log("Predicted:", classifier.predict(test)); // Likely: "go_out"
