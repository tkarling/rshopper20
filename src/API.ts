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
  isBougt?: boolean | null,
};

export type ModelIngridientConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  aisle?: ModelStringInput | null,
  count?: ModelIntInput | null,
  isOnList?: ModelBooleanInput | null,
  isBougt?: ModelBooleanInput | null,
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
  isBougt?: boolean | null,
};

export type DeleteIngridientInput = {
  id?: string | null,
};

export type ModelIngridientFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  aisle?: ModelStringInput | null,
  count?: ModelIntInput | null,
  isOnList?: ModelBooleanInput | null,
  isBougt?: ModelBooleanInput | null,
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
    isBougt: boolean | null,
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
    isBougt: boolean | null,
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
    isBougt: boolean | null,
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
    isBougt: boolean | null,
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
      isBougt: boolean | null,
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
    isBougt: boolean | null,
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
    isBougt: boolean | null,
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
    isBougt: boolean | null,
  } | null,
};
