import Redis from "ioredis";

const redis = new Redis({
  host: "redis-18474.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 18474,
  password: "YKIrlL09TrL7QBirut40f73rHB2u1qXA",
});
// const redis = new Redis(
//   "rediss://default:AWKlAAIjcDFmMjQ5YWRjODEwOWQ0NWYzODRkYzEyZWM4OTI1ZDI4NHAxMA@ready-fox-25253.upstash.io:6379"
// );

// const redis = new Redis({
//   host: "redis-11050.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
//   port: 11050,
//   password: "9x1soWtdn8J6teHOGGZAvVfCrJUgtfpy",
// });

redis.on("connect", () => {
  console.log(`Connected to Redis!`.bgMagenta.bgBlue);
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
