import { gql } from "@apollo/client";

export const CREATE_COLLECTION = gql`
  mutation createCollection($collectionName: String!) {
    createCollection(createCollectionInput: { collectionName: $collectionName }) {
      id
      collectionName
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation DELETE_COLLECTIOn($id: Int!) {
    removeCollection(id: $id) {
      id
    }
  }
`;

export const DELETE_COMPONENT = gql`
  mutation DELETE_COMPONENT($id: Int!) {
    removeComponent(id: $id) {
      id
    }
  }
`;

export const CREATE_COMPONET_VALVE = gql`
  mutation createComponentValve($componentId: Int!, $data: JSON!) {
    createComponentsValue(createComponentsValueInput: { collectionId: $componentId, data: $data }) {
      id
      data
    }
  }
`;

export const createComponentInput = gql`
  mutation createComponent($htmlInputType: HTMLInputType, $dataType: DataType, $name: String!, $collectionId: Int!) {
    createComponent(createComponentInput: { htmlInputType: $htmlInputType, dataType: $dataType, name: $name, collectionId: $collectionId }) {
      id
      htmlInputType
      dataType
    }
  }
`;
