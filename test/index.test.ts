import {
  PrismaError,
  PrismaCommonError,
  PrismaMigrationError,
  PrismaQueryError,
  PrismaIntrospectionError,
  PrismaDataProxyError,
} from '../src'

describe('PrismaError', () => {
  test('PrismaError should contain PrismaCommonError, PrismaMigrationError, PrismaQueryError, PrismaIntrospectionError and PrismaDataProxyError,', () => {
    expect(PrismaError).toMatchObject({
      ...PrismaCommonError,
      ...PrismaMigrationError,
      ...PrismaQueryError,
      ...PrismaIntrospectionError,
      ...PrismaDataProxyError,
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
    Object.keys(PrismaCommonError).forEach(check('PrismaCommonError'))
    Object.keys(PrismaMigrationError).forEach(check('PrismaMigrationError'))
    Object.keys(PrismaQueryError).forEach(check('PrismaQueryError'))
    Object.keys(PrismaIntrospectionError).forEach(
      check('PrismaIntrospectionError'),
      Object.keys(PrismaDataProxyError).forEach(check('PrismaDataProxyError')),
    )
  })
})
