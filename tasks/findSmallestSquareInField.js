const field = [1680, 640];

const findSmallestSquare = (field) => {
  const [width, height] = field;

  if (width < height) {
    return findSmallestSquare([width, height - width]);
  } else if (width > height) {
    return findSmallestSquare([width - height, height]);
  } else {
    return [width, height]; // or height, since they are equal
  }
};

console.log(findSmallestSquare(field));
