import { Request, Response } from 'express';
import { UserService } from './service';
import { RegisterUserDto } from '../../domain/dtos/user/registerUser.dto';
import { CustomError } from '../../domain/errors/customErrors';
import { LoginUserDto } from '../../domain/dtos/user/loginUser.dto';

export class UserController {
  constructor(public readonly userService: UserService) {}

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

  public login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    this.userService
      .login(loginUserDto!)
      .then((user) => {
        return res.status(200).json({ message: 'Logged User', data: user });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };
}
