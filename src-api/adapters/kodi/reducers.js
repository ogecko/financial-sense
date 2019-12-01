function movieReducer(movie) {
    const uri = s => decodeURIComponent(s)
                      .replace(/^image:\/\/(.*)\//,'$1')
                      .replace(/^video.*/,'img/quasar-logo-full.svg')
                      .replace(/^smb:.*/,'img/quasar-logo-full.svg')
    return {
      ...movie,
      thumbnail: uri(movie.thumbnail)
    };
}

module.exports = {
  movieReducer
}