const catchAll = (req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
}

export default catchAll;
