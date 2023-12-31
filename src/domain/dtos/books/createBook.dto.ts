export class CreateBookDto {
  constructor(
    public readonly title: string,
    public readonly author: string,
    public readonly genre: string,
    public readonly isbn: string,
    public readonly quantity: number = 1,
    public readonly availableCopies: number = 1
  ) {}

  static create(options: { [key: string]: any }): [string?, CreateBookDto?] {
    const { title, author, genre, isbn, quantity, availableCopies } = options;

    if (!title) {
      return ['Title is required', undefined];
    }
    if (!author) {
      return ['Author is required', undefined];
    }
    if (!genre) {
      return ['Genre is required', undefined];
    }
    if (!isbn) {
      return ['ISBN is required', undefined];
    }

    return [
      undefined,
      new CreateBookDto(title, author, genre, isbn, quantity, availableCopies),
    ];
  }
}
