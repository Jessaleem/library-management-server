import { prisma } from '../../data/mysql';
import { CreateBorrowDto } from '../../domain/dtos/borrows/createBorrow.dto';
import { UpdateBorrowDto } from '../../domain/dtos/borrows/updateBorrow.dto';
import { BorrowEntity } from '../../domain/entities/BorrowEntity';
import { CustomError } from '../../domain/errors/customErrors';

export class BorrowService {
  constructor() {}

  public async create(createBorrowDto: CreateBorrowDto) {
    const { userId, bookId } = createBorrowDto;

    const bookFound = await prisma.book.findUnique({ where: { id: bookId } });

    if (!bookFound) {
      throw CustomError.badRequest('Book is not available for borrowing');
    }

    if (!(bookFound.availableCopies >= 1)) {
      throw CustomError.badRequest('Book has no copies available');
    }

    const existingBorrow = await prisma.borrow.findFirst({
      where: { userId, bookId, isReturned: false },
    });

    if (existingBorrow) {
      throw CustomError.badRequest('You have already borrowed this book');
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 20);

    const newBorrow = await prisma.borrow.create({
      data: {
        dueDate,
        isReturned: false,
        userId,
        bookId,
      },
    });

    const borrowEntity = BorrowEntity.fromObject(newBorrow);
    return borrowEntity;
  }

  public async updateBorrow(updateBorrow: UpdateBorrowDto) {
    const { borrowId, isReturned } = updateBorrow;

    const borrowFound = await prisma.borrow.findUnique({
      where: { id: borrowId, isReturned: false },
    });

    if (!borrowFound) {
      throw CustomError.badRequest('Borrow not found');
    }

    const book = await prisma.book.findFirst({
      where: { id: borrowFound.bookId },
    });

    if (!book) {
      throw CustomError.badRequest('Book not found');
    }

    await prisma.book.update({
      where: { id: borrowFound.bookId },
      data: { availableCopies: book.availableCopies + 1 },
    });

    const borrowUpdated = await prisma.borrow.update({
      where: { id: borrowId },
      data: { isReturned },
    });

    const borrowEntity = BorrowEntity.fromObject(borrowUpdated);
    return borrowEntity;
  }

  public async getAllBorrowByUser(userId: string) {
    const borrows = await prisma.borrow.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    return { borrows: borrows.map(BorrowEntity.fromObject) };
  }

  public async getAllBorrows() {
    const borrows = await prisma.borrow.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return { borrows: borrows.map(BorrowEntity.fromObject) };
  }
}
