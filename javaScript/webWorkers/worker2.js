self.onmessage = (event) => {
  console.log('Worker 2 received:', event.data);

  setTimeout(() => {
    const trippled = event.data * 3;
    Promise.resolve(trippled).then((result) => {
      self.postMessage({
        message: `Trippled to ${result}`,
        result,
      });
      self.close(); // Close the worker after sending the message
    })
  }, 1000);
}