self.onmessage = (event) => {
  console.log('Worker 1 received:', event.data);

  setTimeout(() => {
    const doubled = event.data * 2;
    Promise.resolve(doubled).then((result) => {
      self.postMessage(`Doubled to ${result}`);
      self.close(); // Close the worker after sending the message
    })
  }, 500);
}