export class BorrowEntity {
  constructor(
    public readonly id: string,
    public readonly initialDate: Date,
    public readonly dueDate: Date,
    public readonly isReturned: boolean,
    public readonly userId: string,
    public readonly bookId: string
  ) {}

  public static fromObject(object: { [key: string]: any }): BorrowEntity {
    const { id, initialDate, dueDate, isReturned, userId, bookId } = object;
    return new BorrowEntity(
      id,
      initialDate,
      dueDate,
      isReturned,
      userId,
      bookId
    );
  }
}
