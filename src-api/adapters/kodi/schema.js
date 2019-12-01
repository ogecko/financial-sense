const { gql } = require('apollo-server');

const typeDefs = gql`

extend type Query {
  movie(movieid: Int!): Movie
  movies(start: Int, limit: Int): [Movie]
}

type Movie {
  id: ID!
  movieid: Int
  title: String
  label: String
  plot: String
  genre: [String]
  dateadded: String
  lastplayed: String
  studio: [String]
  director: [String]
  writer: [String]
  country: [String]
  file: String
  runtime: Int
  thumbnail: String
  tagline: String
  year: Int
  mpaa: String
  rating: Float
  userrating: Float
  votes: String
  set: String
  setid: Int
  imdbnumber: String
}

`;

module.exports = typeDefs;