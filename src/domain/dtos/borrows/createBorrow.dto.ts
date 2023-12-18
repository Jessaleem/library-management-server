export class CreateBorrowDto {
  constructor(public readonly userId: string, public readonly bookId: string) {}

  static create(options: { [key: string]: any }): [string?, CreateBorrowDto?] {
    const { userId, bookId } = options;

    if (!userId) {
      return ['userId is missing', undefined];
    }
    if (!bookId) {
      return ['bookId is missing', undefined];
    }

    return [undefined, new CreateBorrowDto(userId, bookId)];
  }
}
