### AJAX stands for Asynchronous JavaScript and XML.

It’s a technique that lets web pages communicate with a server in the background without reloading the whole page.

Key points:
- Uses JavaScript to send HTTP requests (often via XMLHttpRequest or fetch)
- Can send and receive data (JSON, XML, plain text)
- Makes web applications faster and more dynamic

Example flow:
- User clicks a button.
- JavaScript sends a request to the server.
- Server responds with data.
- JavaScript updates part of the page without a full reload.

Example with fetch:
```
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Update the page here
  });
```