# prisma-error-enum

A more descriptive way to detect Prisma Errors. Reference: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes

## Installation
```shell
yarn add prisma-error-enum
```

## Usage
```typescript
import { PrismaError } from 'prisma-error-enum'

const createUser = () => {
  try {
    return await prisma.user.create({
      data: {
        email,
      },
    })
  } catch (error) {
    if (
      error.code === PrismaError.UniqueConstraintViolation &&
      error.meta.target[0] === 'email'
    ) {
      throw new BetterError(
        'unique_email',
        'This email is already registered by another user',
        'email',
      )
    }

    throw error
  }
}
```
