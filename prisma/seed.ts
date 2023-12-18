import { PrismaClient, UserRole } from '@prisma/client';
import { users, books } from '../src/data/seedData';
import { BcryptAdapter } from '../src/config/bcryptAdapter';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  users.forEach(async (user) => {
    const userCreated = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: BcryptAdapter.hash(user.password),
        role: user.role as UserRole,
      },
    });
    console.log('userCreated: ', userCreated);
  });

  await prisma.book.deleteMany({});
  books.forEach(async (book) => {
    const bookCreated = await prisma.book.create({
      data: {
        title: book.title,
        genre: book.genre,
        author: book.author,
        isbn: book.isbn,
        quantity: 1,
        availableCopies: 1,
      },
    });
    console.log('Book Created: ', bookCreated);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
