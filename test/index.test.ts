import {
  PrismaError,
  PrismaErrorKey,
  PrismaErrorGroup,
  PrismaErrorGroupKey,
  PrismaCommonError,
  PrismaMigrationError,
  PrismaQueryError,
  PrismaIntrospectionError,
  PrismaDataProxyError,
  CommonError,
  MigrationError,
  QueryError,
} from '../src'

/** Typed Object.keys() */
const keys = <T extends {}>(o: T) => Object.keys(o) as (keyof T)[]

describe('PrismaError', () => {
  test('PrismaError should contain PrismaCommonError, PrismaMigrationError, PrismaQueryError, PrismaIntrospectionError and PrismaDataProxyError', () => {
    expect(PrismaError).toMatchObject({
      ...PrismaCommonError,
      ...PrismaMigrationError,
      ...PrismaQueryError,
      ...PrismaIntrospectionError,
      ...PrismaDataProxyError,
    })
  })

  test('PrismaError should not eliminate any errors', () => {
    const record: Partial<Record<PrismaErrorKey, PrismaErrorGroup>> = {}
    const check = <T extends PrismaErrorGroup>(name: T) => (
      key: PrismaErrorGroupKey<T>,
    ) => {
      if (record[key]) {
        throw new Error(
          `Both ${record[key]} and ${name} have an error called ${key}. This is a problem for PrismaError`,
        )
      }

      record[key] = name
    }

    keys(PrismaCommonError).forEach(check('PrismaCommonError'))
    keys(PrismaMigrationError).forEach(check('PrismaMigrationError'))
    keys(PrismaQueryError).forEach(check('PrismaQueryError'))
    keys(PrismaIntrospectionError).forEach(check('PrismaIntrospectionError'))
    keys(PrismaDataProxyError).forEach(check('PrismaDataProxyError'))
  })

  test('Should be backward compatible with old variables CommonError, MigrationError and QueryError', () => {
    expect(CommonError).toMatchObject(PrismaCommonError)
    expect(MigrationError).toMatchObject(PrismaMigrationError)
    expect(QueryError).toMatchObject(PrismaQueryError)
    expect(PrismaError).toMatchObject({
      ...CommonError,
      ...MigrationError,
      ...QueryError,
      ...PrismaIntrospectionError,
      ...PrismaDataProxyError,
    })
  })
})
