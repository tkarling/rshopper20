// tslint:disable
// this is an auto generated file. This will be overwritten

export const createIngridient = /* GraphQL */ `
  mutation CreateIngridient(
    $input: CreateIngridientInput!
    $condition: ModelIngridientConditionInput
  ) {
    createIngridient(input: $input, condition: $condition) {
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
export const updateIngridient = /* GraphQL */ `
  mutation UpdateIngridient(
    $input: UpdateIngridientInput!
    $condition: ModelIngridientConditionInput
  ) {
    updateIngridient(input: $input, condition: $condition) {
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
export const deleteIngridient = /* GraphQL */ `
  mutation DeleteIngridient(
    $input: DeleteIngridientInput!
    $condition: ModelIngridientConditionInput
  ) {
    deleteIngridient(input: $input, condition: $condition) {
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
