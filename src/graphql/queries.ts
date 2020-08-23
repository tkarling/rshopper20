// tslint:disable
// this is an auto generated file. This will be overwritten

export const getIngridient = /* GraphQL */ `
  query GetIngridient($id: ID!) {
    getIngridient(id: $id) {
      id
      name
      description
      aisle
      count
      isOnList
      isBought
      recipe
    }
  }
`;
export const listIngridients = /* GraphQL */ `
  query ListIngridients(
    $filter: ModelIngridientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIngridients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        aisle
        count
        isOnList
        isBought
        recipe
      }
      nextToken
    }
  }
`;
