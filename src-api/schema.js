const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
    node(id: ID!): Node
}

type Mutation {
  checkNode: String
}

interface Node {
  id: ID!
}

`;

module.exports = typeDefs;