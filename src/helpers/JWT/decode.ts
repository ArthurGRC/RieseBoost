import jwt, { JwtPayload } from 'jsonwebtoken';

export function generateTokenForData(data: any) {
  return jwt.sign(data, process.env.SALT_SECRET as string, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.SALT_SECRET as string, (err, data) => ({
    err,
    data,
  }));

  return decoded as unknown as JwtPayload;
}