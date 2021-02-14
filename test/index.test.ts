import { PrismaError, CommonError, MigrationError, QueryError } from '../src'

describe('PrismaError', () => {
  test('PrismaError should contain CommonError, MigrationError and QueryError', () => {
    expect(PrismaError).toMatchObject({
      ...CommonError,
      ...MigrationError,
      ...QueryError,
    })
  })

  test('PrismaError should not eliminate any errors', () => {
    const record: Record<string, string> = {}
    const check = (name: string) => (key: string) => {
      if (record[key]) {
        throw new Error(
          `Both ${record[key]} and ${name} have an error called ${key}. This is a problem for PrismaError`,
        )
      }

      record[key] = name
    }
    Object.keys(CommonError).forEach(check('CommonError'))
    Object.keys(MigrationError).forEach(check('MigrationError'))
    Object.keys(QueryError).forEach(check('QueryError'))
  })
})
