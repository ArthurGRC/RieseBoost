import { log } from '@logtail/next';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_TOKEN_ERRORS, UNEXPECTED_ERROR } from '@/helpers/constants/errors';

export function generateTokenForData(data: any) {
  return jwt.sign(data, process.env.SALT_SECRET as string, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.SALT_SECRET as string, (err, data) => ({
      err,
      data,
    }));

    return decoded as unknown as JwtPayload;
  } catch (error: any) {
    const { name } = error;

    if (JWT_TOKEN_ERRORS[name]) return { data: undefined, error };

    log.error('Error - decode jwt token');

    return { data: undefined, error: UNEXPECTED_ERROR };
  }
}
