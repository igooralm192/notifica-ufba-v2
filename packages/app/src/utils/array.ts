import _ from 'lodash'

export const joinData = <T>(
  oldData: T[],
  newData: T[],
  predicate: (a: T, b: T) => boolean,
  sortBy?: keyof T,
  orderBy?: 'asc' | 'desc',
) => {
  const unitedData = _.unionWith(oldData, newData, predicate)

  if (sortBy) {
    return _.orderBy(unitedData, sortBy, orderBy ?? 'asc')
  }

  return unitedData
}
