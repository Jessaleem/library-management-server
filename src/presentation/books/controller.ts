import { BookService } from './service';
import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/customErrors';
import { CreateBookDto } from '../../domain/dtos/books/createBook.dto';
import { Roles } from '../../domain/dtos/user/registerUser.dto';

export class BookController {
  constructor(public readonly bookService: BookService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  public createBook = (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.LIBRARIAN) {
      return res
        .status(400)
        .json({ message: 'Only Librarians can create books' });
    }

    const [error, createBookDto] = CreateBookDto.create(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    this.bookService
      .create(createBookDto!)
      .then((book) => {
        return res.status(201).json({ message: 'Book created', data: book });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };
}
