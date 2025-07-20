import fs from 'fs/promises';

const readFile = async () => {
  try {
    const data = await fs.readFile('./text.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

// writeFile()
const writeFile = async () => {
  try {
    await fs.writeFile('./text.txt', 'New line from server');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

// appendFile()
const appendFile = async () => {
  try {
    await fs.appendFile('./text.txt', `\nAppended line from server`);
    console.log('Text appended to file successfully');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}

await writeFile();
await appendFile();
await appendFile();
await readFile();
