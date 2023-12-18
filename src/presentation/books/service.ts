import { CreateBookDto } from '../../domain/dtos/books/createBook.dto';
import { prisma } from '../../data/mysql';
import { BookEntity } from '../../domain/entities/bookEntity';
import { error } from 'console';
import { CustomError } from '../../domain/errors/customErrors';

export class BookService {
  constructor() {}

  public async create(book: CreateBookDto) {
    const existingBook = await prisma.book.findFirst({
      where: { isbn: book.isbn },
    });

    if (existingBook) {
      const updatedBook = await prisma.book.update({
        where: { id: existingBook.id },
        data: { copies: existingBook.copies + 1 },
      });

      const bookEntity = BookEntity.fromObject(updatedBook);

      return bookEntity;
    }

    const newBook = await prisma.book.create({
      data: book,
    });

    const bookEntity = BookEntity.fromObject(newBook);
    return bookEntity;
  }

  public async getAll() {
    const books = await prisma.book.findMany({});

    return {
      books: books.map((book) => BookEntity.fromObject(book)),
    };
  }

  public async getOne(bookId: string) {
    const book = await prisma.book.findFirst({ where: { id: bookId } });

    if (!book) {
      throw CustomError.badRequest('Book not found');
    }
    const bookEntity = BookEntity.fromObject(book);

    return bookEntity;
  }
}
