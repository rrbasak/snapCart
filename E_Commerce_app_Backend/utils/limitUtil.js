import { rateLimit } from "express-rate-limit";

// Rate limiter function
const createRateLimiter = ({ windowMs, limit, message }) => {
  return rateLimit({
    windowMs: windowMs ,
    limit: limit ,
    standardHeaders: "draft-7",
    message: message || "Too many requests, please try again later",
    // legacyHeaders: false, // Disable `X-RateLimit-*` headers
  });
};

export default createRateLimiter;
