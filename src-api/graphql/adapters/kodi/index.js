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
    return response.result.movies.map(m => movieReducer(m)).sort((a,b)=> b.ratingadj - a.ratingadj)
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

  async playMovie(movieid) {
    const requestbody = {
        "jsonrpc": "2.0",
        "id": "PlayMovie",
        "method": "Player.Open",
        "params": {
          "item" : { "movieid": movieid },
        }
      }
    const response = await this.post('jsonrpc', requestbody);
    return response.result
  }

  async getList (app, num) {
    const playlists = app.service('playlists')
    const res = await playlists.find({ query: { num } })
    return (res.total > 0) ? res.data[0].list : []
  }

  async toggleList (app, num, title) {
    const playlists = app.service('playlists')
    const res = await playlists.find({ query: { num } })
    const doc = (res.total > 0) ? res.data[0] : await playlists.create({ num, list: [] })
    if (title) {
      const index = doc.list.indexOf(title)
      if (index < 0) doc.list.push(title); else doc.list.splice(index, 1)
      playlists.update(doc._id, doc)
    }
    return doc.list
  }
}

module.exports = {
  ds: Kodi,
  typeDefs,
  resolvers,
}