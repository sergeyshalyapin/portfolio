import { createServer } from 'http';
// node processDemo.js import -v
console.log(process.argv);
console.log(process.argv[3]); // -v

// process
console.log(process.pid);
console.log(process.cwd());
console.log(process.title);
console.log(process.memoryUsage());
console.log(process.uptime());

process.on('exit', (code) => {
  console.log(`About to exit with code ${code}`);
});

// exit()
process.exit(0);
