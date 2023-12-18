export class UpdateBorrowDto {
  constructor(
    public readonly borrowId: string,
    public readonly isReturned: boolean
  ) {}

  static create(options: { [key: string]: any }): [string?, UpdateBorrowDto?] {
    const { borrowId, isReturned } = options;

    if (!borrowId) {
      return ['borrowId is missing', undefined];
    }
    if (isReturned === undefined) {
      return ['isReturned is missing', undefined];
    }

    return [undefined, new UpdateBorrowDto(borrowId, isReturned)];
  }
}
