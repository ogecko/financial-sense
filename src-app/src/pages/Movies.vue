<template>
  <div class="q-pa-xs">
      {{movie.title}}
    <div class="row justify-center q-col-gutter-xs">
      <div v-for="movie in movies" :key="movie.movieid" class="col-1">
        <q-card class="q-ma-sm" @click="id = movie.movieid">
          <img :src="movie.thumbnail" />
          <q-card-section hidden class="bg-blue-grey-10">
            <div class="text-h6">{{ movie.title }}</div>
            <div class="text-subtitle2">Rating: {{ movie.rating |fmt_n1d }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'movies',
  apollo: {
    movie: {
      query: gql`
        query movie($movieid: Int!) {
          movie(movieid: $movieid) {
            movieid
            title
            label
            thumbnail
            plot
            genre
            dateadded
            lastplayed
            studio
            director
            writer
            country
            file
            runtime
            tagline
            year
            mpaa
            rating
            userrating
            votes
            set
            setid
            imdbnumber
          }
        }
      `,
      variables () {
        return {
          movieid: this.id
        }
      }
    },
    movies: {
      query: gql`
        query movies($start: Int, $limit: Int) {
          movies(start: $start, limit: $limit) {
            movieid
            title
            thumbnail
            plot
            rating
          }
        }
      `,
      variables () {
        return {
          start: 0,
          limit: 300
        }
      }
    }
  },

  data () {
    return {
      movies: [],
      movie: {},
      id: 3001
    }
  }
}
</script>
