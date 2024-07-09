import jwt from 'jsonwebtoken';

const secretKey = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

console.log("Secret Key:", secretKey);

export const createToken = (payload, expiresIn = '1h') => {
  console.log('oi')
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
