import fs from 'fs';

// readdFile() - callback
fs.readFile('./text.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

const data = fs.readFileSync('./text.txt', 'utf8'); // synchronous read
console.log(data);
