import url from 'url';

const urlString = 'https://www.google.com/search?q=node.js';

// URL Object
const urlObj = new URL(urlString);

console.log(urlObj);

// format()
console.log(url.format(urlObj));

// import.meta.url
console.log(import.meta.url);

// fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));

const params = new URLSearchParams(urlObj.search);
console.log(params.get('q'));

params.append('limit', '5');
console.log(params);

params.delete('q');
console.log(params);

urlObj.searchParams.append('limit', '5');
urlObj.searchParams.delete('q');
console.log(url.format(urlObj));
