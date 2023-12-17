import { CreateBookDto } from '../../domain/dtos/books/createBook.dto';
import { prisma } from '../../data/mysql';
import { BookEntity } from '../../domain/entities/bookEntity';

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
}
