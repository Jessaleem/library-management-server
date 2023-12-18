import { BorrowService } from './service';
import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/customErrors';
import { Roles } from '../../domain/dtos/user/registerUser.dto';
import { CreateBorrowDto } from '../../domain/dtos/borrows/createBorrow.dto';
import { UpdateBookDto } from '../../domain/dtos/books/updateBook';
import { UpdateBorrowDto } from '../../domain/dtos/borrows/updateBorrow.dto';

export class BorrowController {
  constructor(public readonly borrowService: BorrowService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  public createBorrow = async (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.MEMBER) {
      return res.status(400).json({ message: 'Only members can borrow books' });
    }
    const userId = req.body.userId;
    const bookId = req.body.bookId;

    const [error, createBorrow] = CreateBorrowDto.create({ userId, bookId });

    if (error) {
      throw CustomError.badRequest(error);
    }

    this.borrowService
      .create(createBorrow!)
      .then((borrow) => {
        return res
          .status(201)
          .json({ message: 'Book sucessfully borrowed', data: borrow });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public updateBorrow = async (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.LIBRARIAN) {
      return res
        .status(400)
        .json({ message: 'Only librarians can update borrows' });
    }

    const borrowId = req.params.id;
    const isReturned = req.body.isReturned;

    const [error, updateBorrow] = UpdateBorrowDto.create({
      borrowId,
      isReturned,
    });

    if (error) {
      throw CustomError.badRequest(error);
    }

    this.borrowService
      .updateBorrow(updateBorrow!)
      .then((borrow) => {
        return res
          .status(201)
          .json({ message: 'Book sucessfully returned', data: borrow });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public getBorrowById = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    this.borrowService
      .getAllBorrowByUser(userId)
      .then((borrows) => {
        return res
          .status(200)
          .json({ message: 'Books borrowed', data: borrows });
      })
      .catch((error) => {
        return this.handleError(error, res);
      });
  };

  public getAllBorrows = async (req: Request, res: Response) => {
    if (req.body.userRole !== Roles.LIBRARIAN) {
      return res
        .status(400)
        .json({ message: 'Only librarians have access to all borrows' });
    }
    this.borrowService.getAllBorrows().then((borrows) => {
      return res.status(200).json({ message: 'Books borrowed', data: borrows });
    });
  };
}
