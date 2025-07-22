const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ msg: err.message || 'Internal Server Error' });
}

export default errorHandler;
