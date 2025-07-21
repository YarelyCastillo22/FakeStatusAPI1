export default function errorHandler(err, req, res, next) {
  console.error(err.message);
  const status = err.response?.status || 500;
  const message = err.response?.data?.message || err.message;
  res.status(status).json({ error: message });
}
