import { gql } from "@apollo/client";

export const FIND_COMPONENTS = gql`
  query FIND_COMPONENTS($Id: Int!) {
    collectionFindOne(id: $Id) {
      collectionName
      components {
        id
        type
        name
      }
    }
  }
`;

export const GET_ENUM = gql`
  query GET_ENUM {
    __type(name: "HTMLInputType") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const FIND_COLLECTIONS = gql`
  query FIND_COLLECTIONS {
    FindAllCollection {
      id
      collectionName
    }
  }
`;

export const GET_COLLECTIONDATA = gql`
  query getCollectionData($id: Int!) {
    GetCollectionData(id: $id) {
      id
      data
    }
  }
`;

export const GET_ALL_COMPONENTS_BY_COLLECTION_ID = gql`
  query getAllComponentsByCollection($id: Int!) {
    findAllComponentsByCollectionId(collectionID: $id) {
      id
      name
    }
  }
`;

export const GET_COLLECTION_FINDONE = gql`
  query collectionFindOne($id: Int) {
    collectionFindOne(id: $id) {
      id
      data
    }
  }
`;

export const findAllComponentsByCollectionId = gql`
  query findAllComponentsByCollectionId($collectionID: Int!) {
    findAllComponentsByCollectionId(collectionID: $collectionID) {
      id
      htmlInputType
      name
      label
      dataType
    }
  }
`;
