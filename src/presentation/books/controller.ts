import { BookService } from './service';
import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/customErrors';
import { CreateBookDto } from '../../domain/dtos/books/createBook.dto';
import { Roles } from '../../domain/dtos/user/registerUser.dto';
import { UpdateBookDto } from '../../domain/dtos/books/updateBook';

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

  public getAllBooks = (req: Request, res: Response) => {
    this.bookService
      .getAll()
      .then((books) => {
        return res.status(200).json({ message: 'Books found', data: books });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public getById = (req: Request, res: Response) => {
    const bookId = req.params.id;

    this.bookService
      .getOne(bookId)
      .then((book) => {
        return res.status(200).json({ message: 'Book found', data: book });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public updateBook = async (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.LIBRARIAN) {
      return res
        .status(400)
        .json({ message: 'Only Librarians can create books' });
    }
    const bookId = req.params.id;
    const [_, updateBookDto] = UpdateBookDto.update(req.body);

    this.bookService
      .update(bookId, updateBookDto!)
      .then((updatedBook) => {
        return res
          .status(200)
          .json({ message: 'Book succesfully updated', data: updatedBook });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public deleteBook = async (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.LIBRARIAN) {
      return res
        .status(400)
        .json({ message: 'Only Librarians can create books' });
    }
    const bookId = req.params.id;

    this.bookService
      .delete(bookId)
      .then((deletedBook) => {
        return res
          .status(200)
          .json({ message: 'Book succesfully deleted', data: deletedBook });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public deleteCopy = async (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.LIBRARIAN) {
      return res
        .status(400)
        .json({ message: 'Only Librarians can create books' });
    }
    const bookId = req.params.id;

    this.bookService
      .deleteCopy(bookId)
      .then((deletedCopy) => {
        return res
          .status(200)
          .json({ message: 'Copy succesfully deleted', data: deletedCopy });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public getByQuery = async (req: Request, res: Response) => {
    const query = req.query.q;

    this.bookService
      .getByQuery(query as string)
      .then((books) => {
        return res.status(200).json({ message: 'Books found', data: books });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };
}
