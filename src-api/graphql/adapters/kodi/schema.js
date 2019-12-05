const { gql } = require('apollo-server-express');

const typeDefs = gql`

extend type Query {
  movie(movieid: Int!): Movie
  movies(start: Int, limit: Int): [Movie]
}

extend type Mutation {
  playMovie(movieid: Int!): String
}

type Movie {
  id: ID!
  movieid: Int
  title: String
  label: String
  plot: String
  genre: [String]
  dateadded: String
  daterec: String
  channel: String
  channelurl: String
  path: String
  drive: String
  media: String
  dirname: String
  filename: String
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
  ratingadj: Float
  userrating: Float
  votes: String
  set: String
  setid: Int
  imdbnumber: String
}

`;

module.exports = typeDefs;