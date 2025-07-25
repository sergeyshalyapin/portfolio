let a = 1;
let b = 2;
let c = 3;
let d = 4;

console.log("original values: a = ", a, ", b = ", b, ", c = ", c, ", d = ", d);

[a, b, c, d] = [d, c, b, a];
console.log("destructuring assignment is made: [a, b, c, d] = [d, c, b, a]");
console.log("swapped values: a = ", a, ", b = ", b, ", c = ", c, ", d = ", d);