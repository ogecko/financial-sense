const { RESTDataSource } = require('apollo-datasource-rest')
const { videoFieldsMovie } = require('./metadata')
const { movieReducer } = require('./reducers')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

class Kodi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://raven-pc:80/';
    if (! this.httpCache) {
        this.initialize({})
    }
  }

  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('Authorization', 'Basic RGF2aWQ6aWg0a3U2');
  }

  async getMovieList(start = 0, limit = 25) {
      const end = start + limit - 1
      const requestbody = {
          "jsonrpc": "2.0",
          "id": "GetMovies",
          "method": "VideoLibrary.GetMovies",
          "params": {
            "properties" : videoFieldsMovie,
            "sort": { "order": "descending", "method": "rating", "ignorearticle": true },
            "limits": { start, end }
          }
        }
    const response = await this.post('jsonrpc', requestbody);
    return response.result.movies.map(m => movieReducer(m))
  }
  
  async getMovie(movieid) {
    const requestbody = {
        "jsonrpc": "2.0",
        "id": "GetMovieDetails",
        "method": "VideoLibrary.GetMovieDetails",
        "params": {
          "movieid" : movieid,
          "properties" : videoFieldsMovie,
        }
      }
    const response = await this.post('jsonrpc', requestbody);
    return movieReducer(response.result.moviedetails)
  }

}

module.exports = {
  ds: Kodi,
  typeDefs,
  resolvers,
}