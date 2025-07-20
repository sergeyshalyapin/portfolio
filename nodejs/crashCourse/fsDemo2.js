import fs from 'fs/promises';

// readFile() - async/await
const readFileAsync = async () => {
  try {
    const data = await fs.readFile('./text.txt', 'utf8');
    console.log('async', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFileAsync();

fs.readFile('./text.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error('Error reading file:', err);
  });