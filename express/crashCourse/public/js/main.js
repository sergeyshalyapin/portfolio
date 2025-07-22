const output = document.getElementById('output');
const button= document.getElementById('get-posts-btn');
const addPostForm = document.getElementById('add-post-form');

async function showPosts() {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts: ' + response.statusText);
    }
    const posts = await response.json();
    output.innerHTML = posts.map(post => `<p>${post.title}: ${post.content}</p>`).join('');
  } catch (error) {
    output.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Event listener for button click
button.addEventListener('click', showPosts);

async function createPost(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      throw new Error('Failed to create post: ' + response.statusText);
    }
    const newPost = await response.json();
    output.innerHTML += `<p>New Post Created: ${newPost.title}</p>`;
  } catch (error) {
    output.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

addPostForm.addEventListener('submit', createPost);
