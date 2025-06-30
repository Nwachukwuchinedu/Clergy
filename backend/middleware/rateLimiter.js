// import { RateLimiterMongo } from "rate-limiter-flexible";

// const opts = {
//   storeClient: mongoose.connection.db,
//   dbName: "ratelimiter",
//   points: 10, // 10 requests
//   duration: 60, // per minute
// };

// const rateLimiter = new RateLimiterMongo(opts);

// export const rateLimitMiddleware = (req, res, next) =>
//   rateLimiter
//     .consume(req.ip)
//     .then(() => next())
//     .catch(() => res.status(429).send("Too Many Requests"));
