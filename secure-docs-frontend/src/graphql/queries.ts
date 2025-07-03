import { gql } from '@apollo/client';

export const GET_DOCUMENTS_BY_USER = gql`
  query GetDocumentsByUser($userId: String!) {
    getDocumentsByUser(userId: $userId) {
      id
      title
      description
      fileUrl
    }
  }
`;

export const CREATE_DOCUMENT = gql`
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      id
      title
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: String!) {
    deleteDocument(id: $id)
  }
`;
