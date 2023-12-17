import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/tokenAdapter';
import { prisma } from '../../data/mysql';

interface Decoded {
  id: string;
}

export class AuthMiddleware {
  constructor() {}

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');

    if (!authorization) {
      return res.status(401).json({ message: 'UnAuthorized' });
    }
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'UnAuthorized' });
    }

    const token = authorization.split(' ').at(1) || '';

    try {
      const decoded = await JwtAdapter.verifyToken<Decoded>(token);
      if (!decoded) {
        return res.status(401).json({ message: 'UnAuthorized' });
      }
      const user = await prisma.user.findFirst({ where: { id: decoded.id } });

      if (!user) {
        return res.status(401).json({ message: 'UnAuthorized' });
      }

      req.body.userId = user.id;
      req.body.userRole = user.role;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
