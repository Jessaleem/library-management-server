import { UserRole } from '@prisma/client';
import { prisma } from '../../data/mysql';
import { CustomError } from '../../domain/errors/customErrors';
import { RegisterUserDto } from '../../domain/dtos/user/registerUser.dto';
import { BcryptAdapter } from '../../config/bcryptAdapter';
import { JwtAdapter } from '../../config/tokenAdapter';
import { UserEntity } from '../../domain/entities/userEntities';
import { LoginUserDto } from '../../domain/dtos/user/loginUser.dto';

const mysqlRole = { LIBRARIAN: UserRole.LIBRARIAN, MEMBER: UserRole.MEMBER };

export class UserServices {
  constructor() {}

  public async create(user: RegisterUserDto) {
    const existingUser = await prisma.user.findFirst({
      where: { email: user.email },
    });

    if (existingUser) {
      throw CustomError.badRequest('User already exists');
    }

    const passwordHashed = BcryptAdapter.hash(user.password);

    const roleToSave = mysqlRole[user.role];
    const newUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: passwordHashed,
        role: roleToSave,
      },
    });

    const token = await JwtAdapter.generateToken({ id: newUser.id });
    if (!token) {
      throw CustomError.internalServerError('Error generating token');
    }
    const userEntity = UserEntity.fromObject(newUser);
    return {
      user: userEntity,
      token,
    };
  }

  public async login(credentials: LoginUserDto) {
    const authUser = await prisma.user.findFirst({
      where: { email: credentials.email },
    });
    if (!authUser) {
      throw CustomError.badRequest('Invalid credentials');
    }

    const passwordMatch = BcryptAdapter.compare(
      credentials.password,
      authUser.password
    );

    if (!passwordMatch) {
      throw CustomError.badRequest('Invalid credentials');
    }

    const token = await JwtAdapter.generateToken({ id: authUser.id });
    if (!token) {
      throw CustomError.internalServerError('Error generating token');
    }
    const userEntity = UserEntity.fromObject(authUser);

    return {
      user: userEntity,
      token,
    };
  }
}
