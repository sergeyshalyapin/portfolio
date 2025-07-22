let posts = [
  { id: 1, title: 'Post One', content: 'This is the first post.' },
  { id: 2, title: 'Post Two', content: 'This is the second post.' },
  { id: 3, title: 'Post Three ', content: 'This is the third post.' },
  { id: 4, title: 'Post Four', content: 'This is the fourth post.' },
];

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit) || posts.length;
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  return res.status(200).json(posts);
}

// @desc Get single post by ID
// @route GET /api/posts/:id
export const getPostById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    const error = new Error('Post not found');
    error.status = 404;
    return next(error);
  }
  return res.status(200).json(post);
}

// @desc Create a new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    const error = new Error('Title and content are required');
    error.status = 400;
    return next(error);
  }
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  return res.status(201).json(newPost);
}

// @desc Update a post by ID
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    const error = new Error('Post to update not found');
    error.status = 404;
    return next(error);
  }
  const { title, content } = req.body;
  if (!title || !content) {
    const error = new Error('Title and content are required');
    error.status = 400;
    return next(error);
  }
  post.title = title;
  post.content = content;
  return res.status(200).json(posts);
}

// @desc Delete a post by ID
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    const error = new Error('Post to delete not found');
    error.status = 404;
    return next(error);
  }
  posts.splice(postIndex, 1);
  return res.status(200).json(posts);
}