module.exports = {
    Query: {
        movie: (_, { movieid }, { dataSources }) => dataSources.kodi.getMovie(movieid),
        movies: (_, { start, limit }, { dataSources }) => dataSources.kodi.getMovieList(start, limit),
    },
    Mutation: {
        playMovie: (_, { movieid }, { dataSources }) => dataSources.kodi.playMovie(movieid),
    }
};