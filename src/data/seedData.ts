export interface UserSeed {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export const users: UserSeed[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@test.com',
    password: '12345678',
    role: 'LIBRARIAN',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@test.com',
    password: '12345678',
    role: 'LIBRARIAN',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'johnsmith@test.com',
    password: '12345678',
    role: 'MEMBER',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@test.com',
    password: '12345678',
    role: 'MEMBER',
  },
];

export const books = [
  {
    title: 'Book 1',
    author: 'Author 1',
    isbn: '978000ASGSY5546',
    genre: 'Genre 1',
  },
  {
    title: 'Book 2',
    author: 'Author 2',
    isbn: '978ASDFDY5546',
    genre: 'Genre 2',
  },
  {
    title: 'Book 3',
    author: 'Author 3',
    isbn: '978ASDHN$%FG546',
    genre: 'Genre 3',
  },
  {
    title: 'Book 4',
    author: 'Author 4',
    isbn: '973434346Y5546',
    genre: 'Genre 4',
  },
  {
    title: 'Book 5',
    author: 'Author 5',
    isbn: '978ASDFsrthsd546',
    genre: 'Genre 5',
  },
  {
    title: 'Book 6',
    author: 'Author 6',
    isbn: '97drfghfgdG546',
    genre: 'Genre 6',
  },
];
