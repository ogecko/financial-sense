module.exports = {
    Query: {
        movie: (_, { movieid }, { dataSources }) => dataSources.kodi.getMovie(movieid),
        movies: (_, { start, limit }, { dataSources }) => dataSources.kodi.getMovieList(start, limit),
        getList: (_, { num }, { app, dataSources }) => dataSources.kodi.getList(app, num),
    },
    Mutation: {
        playMovie: (_, { movieid }, { dataSources }) => dataSources.kodi.playMovie(movieid),
        toggleList: (_, { num, title }, { app, dataSources }) => dataSources.kodi.toggleList(app, num, title),
    }
};