const posts = [
  {id: 1, title: 'Post One', body: 'This is post one'},
  {id: 2, title: 'Post Two', body: 'This is post two'},
  {id: 3, title: 'Post Three', body: 'This is post three'},
  {id: 4, title: 'Post Four', body: 'This is post four'},
];

const getPosts = () => posts;

// const getPosts = (req, res) => {
//   res.status(200).json(posts);
// }

export const getPostLength = () => posts.length;

export default getPosts;