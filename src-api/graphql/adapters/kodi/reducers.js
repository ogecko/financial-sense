function movieReducer(movie) {
    const uri = s => decodeURIComponent(s)
                      .replace(/^image:\/\/(.*)\//,'$1')
                      .replace(/^video.*/,'img/quasar-logo-full.svg')
                      .replace(/^smb:.*/,'img/quasar-logo-full.svg')

    // Break up movie.file string
    // eg Y:\TV0 Movies\Toy Story 3 (2010)\Toy Story 3 (2010)_9HD Sydney_2019-06-29_19-00.ts
    // eg smb://DISKSTATION/Media1/TV1 Movies/Titanic (1997)/Titanic (1997) (Includes Sneak Peek - YOU'RE BACK IN THE ROOM at 1045 PM) (Incl_Nine Digital_2016-03-22_20-47.ts
    const [path, channel, daterec] = movie.file.replace(/_(\d\d)-(\d\d)\.ts$/,'T$1:$2').split('_')
    const [drive, media, dirname, filename] = /^smb:/.test(path) ? path.slice(18).split('/') : path.split('\\')
    const channelurl = `statics/kodi/${channel}.png`
    return {
      ...movie,
      thumbnail: uri(movie.thumbnail),
      ratingadj: movie.rating - 2.33*0.871609/(Math.sqrt((movie.votes > 1) ? movie.votes : 1)),    // 98% Lower Confidence of avg - Z*sd/sqrt(n)
      channel, channelurl, daterec, path, drive, media, dirname, filename
    };
}

module.exports = {
  movieReducer
}