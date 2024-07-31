# Steps to get a sqlite database up with Prisma & start using Prisma methods

##### Add prisma to project with a database provider (sqlite)

1. `npx prisma init --datasource-provider sqlite`

## This will generate:

    1. A prisma folder in the root with a schema.prisma file.
    2. A DATABASE_URL="file:./dev.db" in your .env file.

2. Go to the prisma folder and add a Model to schema.prisma

```
model Customer {
  id String @id
  firstName String
  lastName String
  email String @unique
}
```

3.  `npx prisma migrate dev --name init`
    a.) This will run a migration to sync your database with your schema

4.  Create a client folder and file prisma.ts file
    a.) `import { PrismaClient } from "@prisma/client"`
    b.) `export const prisma = new PrismaClient()`
5.  Now import prisma into a controller
    a.) `import prisma from "..client/prisma"`

### # Start running Prisma methods on your schema 🎉

###### # To view the database run:

> `npx prisma studio` to open the database at http://localhost:5555
