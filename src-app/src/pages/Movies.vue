<template>
  <q-layout view="lHh Lpr lFf" class="full-height bg-blue-grey-10 text-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn size="md" flat round dense icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Kodi Movies</q-toolbar-title>
        <q-btn size="md" flat round icon="local_movies"><q-tooltip>Filter by Genre</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="filter_1"><q-tooltip>Filter using List 1</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="filter_2"><q-tooltip>Filter using List 2</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="filter_3"><q-tooltip>Filter using List 3</q-tooltip></q-btn>

        <q-btn
          size="md"
          flat
          round
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        >
          <q-tooltip>{{$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'}}</q-tooltip>
        </q-btn>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above elevated content-class="bg-grey-10">
      <q-card class="q-ma-xs">
          <img :src="movie.thumbnail" />
          <q-card-section class="bg-blue-grey-9">
            <div class="text-h6">{{ movie.title }} ({{movie.year}})</div>
            <div class="text-caption q-pb-md">{{ movie.tagline }}</div>
            <div class="text-subtitle2">Rating: {{ movie.ratingadj |fmt_n1d }} ({{movie.votes | fmt_n0d }} votes)</div>
          <q-separator />
            <div class="text-caption q-pb-md">{{ movie.plot }}</div>
            <div class="text-weight-light">MPAA: {{ movie.mpaa }}</div>
            <div class="text-weight-light">Country: {{ movie.country.join(',') }}</div>
            <div class="text-weight-light">Studio: {{ movie.studio.join(',') }}</div>
            <div class="text-weight-light">Director: {{ movie.director.join(',') }}</div>
            <div class="text-weight-light q-pb-md">Writer: {{ movie.writer.join(',') }}</div>
            <div class="text-caption text-weight-light">Runtime: {{ movie.runtime/60 | fmt_n0d }} min</div>
            <div class="text-caption text-weight-light">{{ movie.file }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="bg-blue-grey-10">
            <q-btn flat>Play</q-btn>
            <q-btn flat>List 1</q-btn>
            <q-btn flat>List 2</q-btn>
            <q-btn flat>List 3</q-btn>
          </q-card-actions>
      </q-card>
    </q-drawer>

    <q-page-container>
        <div class="q-pa-xs">
            <div class="row justify-center q-col-gutter-xs">
            <div v-for="movie in movies" :key="movie.movieid" class="col-1">
                <q-card :class="tileClass(movie.movieid)" @click="selectMovie(movie.movieid)">
                <img :src="movie.thumbnail" />
                <q-card-section hidden class="bg-blue-grey-10">
                    <div class="text-h6">{{ movie.title }}</div>
                    <div class="text-subtitle2">Rating: {{ movie.rating |fmt_n1d }}</div>
                </q-card-section>
                </q-card>
            </div>
            </div>
        </div>
    </q-page-container>
  </q-layout>
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
            ratingadj
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
            rating
          }
        }
      `,
      variables () {
        return {
          start: 0,
          limit: 2300
        }
      }
    }
  },
  methods: {
    selectMovie (id) {
      this.id = id
      this.leftDrawerOpen = true
    },
    toggleList (num) {
    },
    tileClass (id) {
      return (id === this.movie.movieid) ? 'q-pa-xs bg-primary' : 'q-ma-xs bg-blue-grey-10'
    }
  },
  data () {
    return {
      leftDrawerOpen: true,
      movies: [],
      movie: {},
      id: 3001,
      list1: [],
      list2: [],
      list3: []
    }
  }
}
</script>
