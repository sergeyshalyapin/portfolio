function buildInvertedIndex(docs) {
  const index = {};

  docs.forEach((text, docId) => {
    const words = text.toLowerCase().match(/\w+/g); // tokenize

    const uniqueWords = new Set(words); // avoid duplicates in same doc
    uniqueWords.forEach(word => {
      if (!index[word]) {
        index[word] = [];
      }
      index[word].push(docId + 1); // +1 for human-friendly doc IDs
    });
  });

  return index;
}

const documents = [
  "the sky is blue",
  "the sun is bright",
  "the sun in the blue sky"
];

const invertedIndex = buildInvertedIndex(documents);
console.log(invertedIndex);
