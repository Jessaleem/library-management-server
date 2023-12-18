import { CreateBookDto } from '../../domain/dtos/books/createBook.dto';
import { prisma } from '../../data/mysql';
import { BookEntity } from '../../domain/entities/bookEntity';
// import { error } from 'console';
import { CustomError } from '../../domain/errors/customErrors';
import { UpdateBookDto } from '../../domain/dtos/books/updateBook';

export class BookService {
  constructor() {}

  public async create(book: CreateBookDto) {
    const existingBook = await prisma.book.findFirst({
      where: { isbn: book.isbn },
    });

    if (existingBook) {
      const updatedBook = await prisma.book.update({
        where: { id: existingBook.id },
        data: {
          quantity: existingBook.quantity + 1,
          availableCopies: existingBook.availableCopies + 1,
        },
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

  public async update(bookId: string, updateBookDto: UpdateBookDto) {
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: updateBookDto,
    });

    const bookEntity = BookEntity.fromObject(updatedBook);
    return bookEntity;
  }

  public async delete(bookId: string) {
    const deletedBook = await prisma.book.delete({ where: { id: bookId } });

    const bookEntity = BookEntity.fromObject(deletedBook);
    return bookEntity;
  }

  public async deleteCopy(bookId: string) {
    const book = await prisma.book.findFirst({ where: { id: bookId } });

    if (!book) {
      throw CustomError.badRequest('Book not found');
    }

    if (book.quantity === 1) {
      const deletedBook = await prisma.book.delete({ where: { id: bookId } });
      const bookEntity = BookEntity.fromObject(deletedBook);
      return bookEntity;
    }

    const updateCopy = await prisma.book.update({
      where: { id: bookId },
      data: {
        quantity: book.quantity - 1,
        availableCopies: book.availableCopies - 1,
      },
    });
    const bookEntity = BookEntity.fromObject(updateCopy);
    return bookEntity;
  }

  public async getByQuery(query: string) {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              search: query,
            },
          },
          {
            author: {
              search: query,
            },
          },
          {
            genre: {
              search: query,
            },
          },
        ],
      },
    });

    return { books: books.map(BookEntity.fromObject) };
  }
}
