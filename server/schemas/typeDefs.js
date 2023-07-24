const { gql } = require('apollo-server-express');

const typeDefs = gql`

 type Product {
    name: String
    price: Int
    quantity: Int
    image: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type ContactFormResponse {
    message: String!
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(name: String!, price: Int!, quantity: Int!, image: String!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    login(email: String!, password: String!): Auth
    sendContactForm(name: String!, email: String!, message: String!): ContactFormResponse
  }
`;

module.exports = typeDefs;
