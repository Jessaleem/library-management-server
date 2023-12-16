export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(options: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = options;

    if (!email) {
      return ['Email is required', undefined];
    }
    if (!password) {
      return ['Password is required', undefined];
    }

    return [undefined, new LoginUserDto(email, password)];
  }
}
