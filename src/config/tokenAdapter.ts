import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
  constructor() {}

  static generateToken(
    payload: any,
    duration: string = '2h'
  ): Promise<string | null | undefined> {
    return new Promise((resolve, _) => {
      jwt.sign(
        payload,
        envs.JWTSECRET,
        { expiresIn: duration },
        (error, token) => {
          if (error) {
            console.log(error);
            return resolve(null);
          }
          return resolve(token);
        }
      );
    });
  }
  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve, _) => {
      jwt.verify(token, envs.JWTSECRET, (error, decoded) => {
        if (error) {
          console.log(error);
          return resolve(null);
        }
        return resolve(decoded as T);
      });
    });
  }
}
