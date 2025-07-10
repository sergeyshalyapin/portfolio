document.getElementById('btn').addEventListener('click', function() {
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('result').innerText = JSON.stringify(data);
    });
})