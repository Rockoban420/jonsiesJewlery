import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
mutation AddOrder($name: String!, $price: Int!, $quantity: Int!, $image: String!) {
  addOrder(name: $name, price: $price, quantity: $quantity, image: $image) {
    _id
    purchaseDate
    products {
      name
      image
      quantity
      price
    }
  }
}

`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;
