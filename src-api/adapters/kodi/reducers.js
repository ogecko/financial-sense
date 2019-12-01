function movieReducer(movie) {
    const uri = s => decodeURIComponent(s.replace(/^image:\/\/(.*)\//,'$1'))
    return {
      ...movie,
      thumbnail: uri(movie.thumbnail)
    };
}

module.exports = {
  movieReducer
}