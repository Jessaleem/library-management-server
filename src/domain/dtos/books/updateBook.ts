export class UpdateBookDto {
  constructor(
    public readonly title?: string,
    public readonly author?: string,
    public readonly genre?: string,
    public readonly availableCopies?: number,
    public readonly quantity?: number
  ) {}

  static update(options: { [key: string]: any }): [string?, UpdateBookDto?] {
    const { title, author, genre, availableCopies, quantity } = options;

    if (quantity && availableCopies) {
      return [
        undefined,
        new UpdateBookDto(title, author, genre, availableCopies, quantity),
      ];
    }

    return [undefined, new UpdateBookDto(title, author, genre)];
  }
}
