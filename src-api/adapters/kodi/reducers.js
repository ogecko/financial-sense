function movieReducer(movie) {
    const uri = s => decodeURIComponent(s)
                      .replace(/^image:\/\/(.*)\//,'$1')
                      .replace(/^video.*/,'img/quasar-logo-full.svg')
                      .replace(/^smb:.*/,'img/quasar-logo-full.svg')
    return {
      ...movie,
      thumbnail: uri(movie.thumbnail),
      ratingadj: movie.rating - 2.33*0.871609/(Math.sqrt((movie.votes > 1) ? movie.votes : 1))    // 98% Lower Confidence of avg - Z*sd/sqrt(n)
    };
}

module.exports = {
  movieReducer
}