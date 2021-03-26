import { createConnection, DefaultNamingStrategy, getConnectionOptions } from 'typeorm'
import snakeCase from 'lodash.snakecase'
import pluralize from 'pluralize'
import 'reflect-metadata'

/**
 * As TypeORM depends on the values stored on environment
 * variables, the function below already runs a "dotenv"-like
 * job and make ".env" values available  globally in Node
 * "process.env". Therefore, there's no need to run "dotenv"
 * package explicitly.
 */
getConnectionOptions().then((connectionOptions) => {
  const namingStrategy = new DefaultNamingStrategy()

  // Default table name becomes the plural of model name
  namingStrategy.tableName = (targetName, userSpecifiedName) => {
    if (userSpecifiedName) {
      return userSpecifiedName
    }

    const nameParts = snakeCase(targetName).split('_')
    const [lastName] = nameParts.splice(-1)
    const pluralName = pluralize(lastName)

    return [...nameParts, pluralName].join('_')
  }

  // Transform pascal-cased properties to snake-cased columns names
  namingStrategy.columnName = (propertyName, customName, embeddedPrefixes) => {
    const prefix = snakeCase(embeddedPrefixes.concat('').join('_'))
    const columnName = customName ?? snakeCase(propertyName)

    return prefix + columnName
  }

  return createConnection({ ...connectionOptions, namingStrategy })
})
