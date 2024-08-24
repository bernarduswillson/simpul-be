require('dotenv').config()

const apiKey = process.env.API_KEY;

const authenticateApiKey = (req, res, next) => {
  const requestApiKey = req.headers['x-api-key'];

  if (requestApiKey === apiKey) {
    next();
  } else {
    res.status(403).json({ status: 'error', message: 'Forbidden: Unauthorized' });
  }
};

module.exports = authenticateApiKey;
