module.exports = {
    Query: {
        movie: (_, { movieid }, { dataSources }) => dataSources.kodi.getMovie(movieid),
        movies: (_, { start, limit }, { dataSources }) => dataSources.kodi.getMovieList(start, limit),
    },
};