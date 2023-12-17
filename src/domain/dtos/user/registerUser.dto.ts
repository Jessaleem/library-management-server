import { regularExps } from '../../../config/regularExp';

export enum Roles {
  LIBRARIAN = 'LIBRARIAN',
  MEMBER = 'MEMBER',
}

export class RegisterUserDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Roles
  ) {}

  static create(options: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { firstName, lastName, email, password, role } = options;

    if (!firstName) {
      return ['First name is required', undefined];
    }
    if (!lastName) {
      return ['Last name is required', undefined];
    }
    if (!email) {
      return ['Email is required', undefined];
    }
    if (!regularExps.email.test(email)) {
      return ['Invalid email', undefined];
    }
    if (!password) {
      return ['Password is required', undefined];
    }
    if (password.length < 6) {
      return ['Password must be greater than 6 characters'];
    }
    if (!role) {
      return ['Role is required', undefined];
    }

    return [
      undefined,
      new RegisterUserDto(firstName, lastName, email, password, role),
    ];
  }
}
