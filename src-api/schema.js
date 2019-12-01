const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    node(id: ID!): Node
}

interface Node {
  id: ID!
}

`;

module.exports = typeDefs;