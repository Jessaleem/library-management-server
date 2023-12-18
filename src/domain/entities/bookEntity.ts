import { CustomError } from '../errors/customErrors';

export class BookEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly genre: string,
    public readonly isbn: string,
    public readonly quantity: number,
    public readonly availableCopies: number
  ) {}

  public static fromObject(object: { [key: string]: any }): BookEntity {
    const { id, title, author, genre, isbn, quantity, availableCopies } =
      object;
    if (!id) {
      throw CustomError.badRequest('Id is required');
    }
    if (!title) {
      throw CustomError.badRequest('Title is required');
    }
    if (!author) {
      throw CustomError.badRequest('Id is required');
    }
    if (!genre) {
      throw CustomError.badRequest('Genre is required');
    }
    if (!isbn) {
      throw CustomError.badRequest('Isbn is required');
    }
    if (!quantity) {
      throw CustomError.badRequest('Copies is required');
    }
    if (!availableCopies) {
      throw CustomError.badRequest('Is Available is required');
    }
    return new BookEntity(
      id,
      title,
      author,
      genre,
      isbn,
      quantity,
      availableCopies
    );
  }
}
