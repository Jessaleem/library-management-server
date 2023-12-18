# LIBRARY MANAGEMENT SERVER

## For execute this project follow the next steps:

### 1. Clone this repository

### 2. Install the dependencies, run the comand `npm install`

### 3. Ensure to have running Docker in your machine

### 4. Execute the command `docker compose up -d` to up the Database

### 5. Replace the .env.expamle file with .env and add a value to environment variables, this is the database link `"postgresql://user:password@localhost:5432"`

### 6. Configure Prisma with the following command `npx prisma migrate dev` and `npx prisma generate`

### 7. To seed the information of users and books run the following command `npx prisma db seed`

### 8. run the command npm run dev


