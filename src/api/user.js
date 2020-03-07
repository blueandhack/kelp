import gql from 'graphql-tag';

export const USER_LOGIN = gql`
  mutation Login($email: String, $password: String) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

export const USER_REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

export const USER_SIGN_UP = gql`
  mutation($email: String!, $password: String!) {
    userCreateOne(email: $email, password: $password) {
      email
    }
  }
`;

export const USER_CURRENT = gql`
  query {
    userCurrent {
      _id
      email
      createdAt
    }
  }
`;

export const USER_FIND_ONE = gql`
  query($filter: FilterFindOneUserInput) {
    userOne(filter: $filter) {
      _id
      email
      createdAt
    }
  }
`;
