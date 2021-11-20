import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const opts = {
  // Basic options
  storeClient: redisClient,
  points: 10, // Number of points
  duration: 5, // Per second(s)

  // Custom
  execEvenly: false, // Do not delay actions evenly
  blockDuration: 0, // Do not block if consumed more than points
  keyPrefix: "rateLimiter", // must be unique for limiters with different purpose
};

const limiterRedis = new RateLimiterRedis(opts);

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiterRedis.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError("Too many requests", 429);
  }
}
