const rateLimit = require('express-rate-limit');

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'Too many requests, please try again later' },
});

// Stricter limiter for AI endpoint — Gemini costs money per call
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { message: 'AI analysis limit reached. Try again in an hour.' },
});

module.exports = { apiLimiter, aiLimiter };
