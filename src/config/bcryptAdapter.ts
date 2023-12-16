import bcrypt from 'bcryptjs';

export class BcryptAdapter {
  constructor() {}

  static hash(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
