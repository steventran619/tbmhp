import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function createSecretToken(payload, expireTime) {
  return jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: expireTime,
  });
};