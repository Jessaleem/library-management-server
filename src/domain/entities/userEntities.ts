import { CustomError } from '../errors/customErrors';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: string
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, firstName, lastName, email, role } = object;
    if (!id) {
      throw CustomError.badRequest('Id is required');
    }
    if (!firstName) {
      throw CustomError.badRequest('First name is required');
    }
    if (!lastName) {
      throw CustomError.badRequest('Last name is required');
    }
    if (!email) {
      throw CustomError.badRequest('Email is required');
    }
    if (!role) {
      throw CustomError.badRequest('Role name is required');
    }
    return new UserEntity(id, firstName, lastName, email, role);
  }
}
