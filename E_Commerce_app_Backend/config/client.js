import Redis from "ioredis";

const redis = new Redis({
  host: "redis-11050.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 11050,
  password: "9x1soWtdn8J6teHOGGZAvVfCrJUgtfpy",
});

redis.on("connect", () => {
  console.log(`Connected to Redis!`.bgMagenta.bgBlue);
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
