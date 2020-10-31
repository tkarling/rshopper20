/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIngridientInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  aisle?: string | null,
  count?: number | null,
  isOnList?: boolean | null,
  isBought?: boolean | null,
  recipe?: string | null,
};

export type ModelIngridientConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  aisle?: ModelStringInput | null,
  count?: ModelIntInput | null,
  isOnList?: ModelBooleanInput | null,
  isBought?: ModelBooleanInput | null,
  recipe?: ModelStringInput | null,
  and?: Array< ModelIngridientConditionInput | null > | null,
  or?: Array< ModelIngridientConditionInput | null > | null,
  not?: ModelIngridientConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateIngridientInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  aisle?: string | null,
  count?: number | null,
  isOnList?: boolean | null,
  isBought?: boolean | null,
  recipe?: string | null,
};

export type DeleteIngridientInput = {
  id?: string | null,
};

export type CreateRecipeInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  tag?: string | null,
  isOnList?: boolean | null,
  url?: string | null,
  picUrl?: string | null,
};

export type ModelRecipeConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tag?: ModelStringInput | null,
  isOnList?: ModelBooleanInput | null,
  url?: ModelStringInput | null,
  picUrl?: ModelStringInput | null,
  and?: Array< ModelRecipeConditionInput | null > | null,
  or?: Array< ModelRecipeConditionInput | null > | null,
  not?: ModelRecipeConditionInput | null,
};

export type UpdateRecipeInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  tag?: string | null,
  isOnList?: boolean | null,
  url?: string | null,
  picUrl?: string | null,
};

export type DeleteRecipeInput = {
  id?: string | null,
};

export type ModelIngridientFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  aisle?: ModelStringInput | null,
  count?: ModelIntInput | null,
  isOnList?: ModelBooleanInput | null,
  isBought?: ModelBooleanInput | null,
  recipe?: ModelStringInput | null,
  and?: Array< ModelIngridientFilterInput | null > | null,
  or?: Array< ModelIngridientFilterInput | null > | null,
  not?: ModelIngridientFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRecipeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tag?: ModelStringInput | null,
  isOnList?: ModelBooleanInput | null,
  url?: ModelStringInput | null,
  picUrl?: ModelStringInput | null,
  and?: Array< ModelRecipeFilterInput | null > | null,
  or?: Array< ModelRecipeFilterInput | null > | null,
  not?: ModelRecipeFilterInput | null,
};

export type CreateIngridientMutationVariables = {
  input: CreateIngridientInput,
  condition?: ModelIngridientConditionInput | null,
};

export type CreateIngridientMutation = {
  createIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type UpdateIngridientMutationVariables = {
  input: UpdateIngridientInput,
  condition?: ModelIngridientConditionInput | null,
};

export type UpdateIngridientMutation = {
  updateIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type DeleteIngridientMutationVariables = {
  input: DeleteIngridientInput,
  condition?: ModelIngridientConditionInput | null,
};

export type DeleteIngridientMutation = {
  deleteIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type CreateRecipeMutationVariables = {
  input: CreateRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type CreateRecipeMutation = {
  createRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};

export type UpdateRecipeMutationVariables = {
  input: UpdateRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type UpdateRecipeMutation = {
  updateRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};

export type DeleteRecipeMutationVariables = {
  input: DeleteRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type DeleteRecipeMutation = {
  deleteRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};

export type GetIngridientQueryVariables = {
  id: string,
};

export type GetIngridientQuery = {
  getIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type ListIngridientsQueryVariables = {
  filter?: ModelIngridientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIngridientsQuery = {
  listIngridients:  {
    __typename: "ModelIngridientConnection",
    items:  Array< {
      __typename: "Ingridient",
      id: string,
      name: string,
      description: string | null,
      aisle: string | null,
      count: number | null,
      isOnList: boolean | null,
      isBought: boolean | null,
      recipe: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetRecipeQueryVariables = {
  id: string,
};

export type GetRecipeQuery = {
  getRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};

export type ListRecipesQueryVariables = {
  filter?: ModelRecipeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecipesQuery = {
  listRecipes:  {
    __typename: "ModelRecipeConnection",
    items:  Array< {
      __typename: "Recipe",
      id: string,
      name: string,
      description: string | null,
      tag: string | null,
      isOnList: boolean | null,
      url: string | null,
      picUrl: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateIngridientSubscription = {
  onCreateIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type OnUpdateIngridientSubscription = {
  onUpdateIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type OnDeleteIngridientSubscription = {
  onDeleteIngridient:  {
    __typename: "Ingridient",
    id: string,
    name: string,
    description: string | null,
    aisle: string | null,
    count: number | null,
    isOnList: boolean | null,
    isBought: boolean | null,
    recipe: string | null,
  } | null,
};

export type OnCreateRecipeSubscription = {
  onCreateRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};

export type OnUpdateRecipeSubscription = {
  onUpdateRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};

export type OnDeleteRecipeSubscription = {
  onDeleteRecipe:  {
    __typename: "Recipe",
    id: string,
    name: string,
    description: string | null,
    tag: string | null,
    isOnList: boolean | null,
    url: string | null,
    picUrl: string | null,
  } | null,
};
