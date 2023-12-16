import { Request, Response } from 'express';
import { UserServices } from './service';
import { RegisterUserDto } from '../../domain/user/registerUser.dto';
import { CustomError } from '../../domain/errors/customErrors';

export class UserController {
  constructor(public readonly userService: UserServices) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  public signup = (req: Request, res: Response) => {
    const [error, registeUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    this.userService
      .create(registeUserDto!)
      .then((user) => {
        return res.status(201).json({ message: 'User Created', data: user });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };
}
