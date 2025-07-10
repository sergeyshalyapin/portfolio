I/O stands for Input/Output. It means any operation where your program communicates with the “outside world.”

Examples of I/O:
✅ Reading/Writing Files (e.g., loading a JSON file from disk)
✅ Network Requests (e.g., fetching data from an API)
✅ Database Queries (e.g., retrieving rows from PostgreSQL)
✅ User Input (e.g., typing in a form)
✅ Printing to Console (e.g., console.log)

These operations often take time, because they rely on disk speed, network latency, or user actions.

In JavaScript, I/O is typically asynchronous and non-blocking, so you can start the operation and keep running other code while you wait.
<br>

#### 🌐 Browser I/O Examples

✅ Network request (fetching data from a server)
```
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log("Got data:", data));
```
(I/O: network)

✅ User input
```
document.querySelector("button").addEventListener("click", () => {
  console.log("Button clicked!");
});
```
(I/O: waiting for user to click)

✅ Writing to console
```
console.log("Hello, world!");
```
(I/O: output to console)

✅ Reading a file via File API (e.g., user uploads a file)
```
const input = document.querySelector("input[type='file']");
input.addEventListener("change", () => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => console.log("File content:", reader.result);
  reader.readAsText(file);
});
```
(I/O: reading file data)
<br>

#### 🖥️ Node.js I/O Examples

✅ Reading a file from disk
```
const fs = require("fs");
fs.readFile("myfile.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});
```
(I/O: disk read)

✅ Writing a file to disk
```
fs.writeFile("output.txt", "Hello, file!", (err) => {
  if (err) throw err;
  console.log("File written!");
});
```
(I/O: disk write)

✅ Making an HTTP request
```
const https = require("https");
https.get("https://example.com", (res) => {
  res.on("data", (chunk) => {
    console.log("Received chunk:", chunk.toString());
  });
});
```
(I/O: network)

✅ Listening for incoming HTTP requests (server)
```
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello, world!");
});
server.listen(3000, () => console.log("Server running on port 3000"));
```
(I/O: network, accepting connections)