import { UserRole } from '@prisma/client';
import { prisma } from '../../data/mysql';
import { CustomError } from '../../domain/errors/customErrors';
import { RegisterUserDto } from '../../domain/user/registerUser.dto';
import { BcryptAdapter } from '../../config/bcryptAdapter';
import { JwtAdapter } from '../../config/tokenAdapter';
import { UserEntity } from '../../domain/entities/userEntities';

const mysqlRole = { LIBRARIAN: UserRole.LIBRARIAN, MEMBER: UserRole.MEMBER };

export class UserServices {
  constructor() {}

  public async create(user: RegisterUserDto) {
    try {
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
    } catch (error) {
      throw CustomError.internalServerError(`Error in user register: ${error}`);
    }
  }
}
