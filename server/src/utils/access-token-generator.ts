import jwt from 'jsonwebtoken';

export function generateAccessToken(role: string = 'user') {
  const payload = {
    role
  };
  return jwt.sign(payload, 'secret', {
    expiresIn: '1h'
  });
}
