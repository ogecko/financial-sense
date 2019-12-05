<template>
  <q-layout view="lHh Lpr lFf" class="full-height bg-blue-grey-10 text-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn size="md" flat round dense icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>Kodi Movies {{moviesCountDisplay}}</q-toolbar-title>
          <q-input
            v-model="needle"
            debounce="500"
            filled dense
            placeholder="Search for movies">
            <template v-slot:before>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon v-if="needle !== ''" name="close" @click="needle = ''" class="cursor-pointer" />
            </template>
          </q-input>

        <q-btn size="md" flat round icon="update" @click="setLastNDays()"><q-tooltip>Filter by Latest</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="favorite" @click="needle='Romance'"><q-tooltip>Filter by Romance</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="eco" @click="needle='France'"><q-tooltip>Filter by France</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="android" @click="needle='Sci'"><q-tooltip>Filter by Science Fiction</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="filter_1" @click="needle='List 1'"><q-tooltip>Filter using List 1</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="filter_2" @click="needle='List 2'"><q-tooltip>Filter using List 2</q-tooltip></q-btn>
        <q-btn size="md" flat round icon="filter_3" @click="needle='List 3'"><q-tooltip>Filter using List 3</q-tooltip></q-btn>

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

    <q-drawer v-model="leftDrawerOpen" :width="400" show-if-above elevated content-class="bg-grey-10">
      <q-card class="q-ma-xs bg-blue-grey-9">
          <div class="q-pa-lg"></div>
          <img class="q-pa-sm bg-blue-grey-8" :src="movie.thumbnail" />
          <q-card-section class="bg-blue-grey-9">
            <div class="text-h6">{{ movie.title }} ({{movie.year}})</div>
            <div class="text-caption q-pb-md">{{ movie.tagline }}</div>
            <div class="text-subtitle2"><span>Rating: {{ movie.ratingadj |fmt_n1d }} ({{movie.votes | fmt_n0d }} votes)</span>
            </div>
          <q-separator />
            <div class="text-caption q-pb-md">{{ movie.plot }}</div>
            <div class="text-weight-light">MPAA: {{ movie.mpaa }}</div>
            <div class="text-weight-light">Genre: {{ movie.genre | fmt_arr }}</div>
            <div class="text-weight-light">Country: {{ movie.country | fmt_arr }}</div>
            <div class="text-weight-light">Studio: {{ movie.studio | fmt_arr }}</div>
            <div class="text-weight-light">Director: {{ movie.director | fmt_arr }}</div>
            <div class="text-weight-light q-pb-md">Writer: {{ movie.writer | fmt_arr }}</div>
            <q-img class="q-pa-sm float-right bg-blue-grey-2 rounded-borders" :src="movie.channelurl" style="max-width: 80px"/>
            <div class="text-caption text-weight-light">Runtime: {{ movie.runtime/60 | fmt_n0d }} min</div>
            <div class="text-caption text-weight-light">Recorded: {{ movie.daterec | fmt_ago }}</div>
            <div class="text-caption text-weight-light">On Channel: {{ movie.channel }}</div>
            <div class="text-caption q-pb-md text-weight-light">Directory: {{ movie.media }}/{{ movie.dirname }}</div>
            <div class="text-caption text-weight-light">{{ movie.file }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="fixed-top bg-blue-grey-10">
            <q-btn flat @click="playMovie(movie.movieid)">Play</q-btn>
            <q-btn flat :class="{ 'bg-primary': isOnList(1) }" @click="toggleList(1)">List 1</q-btn>
            <q-btn flat :class="{ 'bg-primary': isOnList(2) }" @click="toggleList(2)">List 2</q-btn>
            <q-btn flat :class="{ 'bg-primary': isOnList(3) }" @click="toggleList(3)">List 3</q-btn>
            <q-btn flat type="a" :href="`http://imdb.com/title/${movie.imdbnumber}/parentalguide`" target="_blank" />
          </q-card-actions>
      </q-card>
    </q-drawer>

    <q-page-container>
        <div class="q-pa-xs">
            <div class="row justify-center q-col-gutter-xs">
            <div v-for="movie in moviesFiltered" :key="movie.movieid" class="col-1">
                <q-card :class="tileClass(movie.movieid)" @click="selectMovie(movie.movieid)" @dblclick="playMovie(movie.movieid)">
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
import { date } from 'quasar'
const lc = s => s.toLowerCase(s)
const jc = a => Array.isArray(a) ? a.join() : a

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
            channel
            channelurl
            daterec
            media
            dirname
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
            tagline
            plot
            genre
            thumbnail
            rating
            country
            director
            dateadded
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
    list (num) {
      return [null, this.list1, this.list2, this.list3][num]
    },
    isOnList (num, title = this.movie.title) {
      return this.list(num).includes(title)
    },
    getNDays (needle) {
      return /^Last \d+ days$/.test(needle) ? Number(needle.slice(5, -4)) : -1
    },
    isWithinLastNDays (needle, dateadded) {
      const n = this.getNDays(needle)
      return (n > 0) ? (date.getDateDiff(Date.now(), Date.parse(dateadded), 'days') < n + 1) : false
    },
    setLastNDays () {
      const n = this.getNDays(this.needle)
      const m = (n > 0) ? Math.ceil(n * 1.3) : 2
      this.needle = `Last ${m} days`
    },
    toggleList (num, title = this.movie.title) {
      const index = this.list(num).indexOf(title)
      if (index < 0) {
        this.list(num).push(title)
      } else {
        this.list(num).splice(index, 1)
      }
    },
    playMovie (id) {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: Int!) { playMovie( movieid: $id) }`,
        variables: { id }
      })
    },
    tileClass (id) {
      return (id === this.movie.movieid) ? 'q-pa-xs bg-primary' : 'q-ma-xs bg-blue-grey-10'
    },
    searchableContent (m) {
      return lc(m.title + m.tagline + m.plot + jc(m.genre) + jc(m.country) + jc(m.director))
    }
  },
  computed: {
    moviesFiltered: vm => {
      return (vm.needle === 'List 1') ? vm.movies.filter(m => vm.isOnList(1, m.title))
        : (vm.needle === 'List 2') ? vm.movies.filter(m => vm.isOnList(2, m.title))
          : (vm.needle === 'List 3') ? vm.movies.filter(m => vm.isOnList(3, m.title))
            : (vm.getNDays(vm.needle) > 0) ? vm.movies.filter(m => vm.isWithinLastNDays(vm.needle, m.dateadded))
              : (vm.needle.length > 2) ? vm.movies.filter(m => vm.searchableContent(m).indexOf(lc(vm.needle)) > -1)
                : vm.movies
    },
    moviesCountDisplay: vm => {
      return (vm.movies.length === vm.moviesFiltered.length) ? `(${vm.movies.length})`
        : `(${vm.moviesFiltered.length} of ${vm.movies.length})`
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      needle: '',
      list1: ['Whiplash', 'Shutter Island', 'Walt Disney', 'The Truman Show', 'Free Solo', 'Her', '12 Years a Slave', 'Gone with the Wind', 'Spotlight', 'The Straight Story', 'Going Clear: Scientology and the Prison of Belief', 'All Three of Us', 'Black Narcissus', 'The Big Blue', 'Remi Nobody\'s Boy', 'Boyhood', 'Gandhi', 'Breathe', 'Woman in Gold', 'Brooklyn', 'The Secret Scripture', 'The Man Who Knew Infinity', 'Borg vs McEnroe', 'Calvary', 'Fierce Creatures'],
      list2: ['Ragnarok', 'How to See a Black Hole: The Universe\'s Greatest Mystery', 'The Bridge on the River Kwai', 'Wings of Desire', 'The Hateful Eight', 'Children of Men', 'I Origins', 'Thor: Ragnarok', 'The Revenant', 'Rogue One: A Star Wars Story', 'Star Wars: The Force Awakens', 'Blade Runner 2049', 'Apocalypto', 'The Thin Red Line', 'The 12th Man', 'Wonder Woman', 'Frozen', 'Taken', 'The Big Short', 'Army of Darkness', 'John Wick', 'Rise of the Planet of the Apes', 'What Happened to Monday', 'Enron: The Smartest Guys in the Room', 'Star Wars: The Last Jedi', 'Sunshine', 'Passengers', 'The Walk', 'Kundun', 'The Killing of a Sacred Deer', 'Highlander', 'The Hunger Games: Mockingjay - Part 1', 'The Hunger Games: Mockingjay - Part 2', 'Independence Day', 'Into the White', 'World War Z', 'Chappie', 'Star Trek Beyond', 'Underworld', 'Deepwater Horizon', '9', 'Conan the Barbarian', 'The X Files', 'RED', 'In the Heart of the Sea', 'Oblivion', 'Cloverfield', 'Prometheus', 'Elysium', 'Green Zone'],
      list3: ['Spirited Away', 'Howl\'s Moving Castle', 'My Neighbor Totoro', 'Castle in the Sky', 'Kiki\'s Delivery Service', 'The Wind Rises', 'Ponyo', 'Lupin the Third: The Castle of Cagliostro', 'Coco', 'Song of the Sea', 'The Tale of the Princess Kaguya', 'The Boy and the Beast', 'Mulan', 'When Marnie Was There', 'Finding Nemo', 'Big Hero 6', 'Kubo and the Two Strings', 'Ernest & Celestine', 'The Secret World of Arrietty', 'Mary and the Witch\'s Flower', 'From Up on Poppy Hill', 'The Red Turtle', 'Moana', 'Tangled', 'Summer Wars', 'Long Way North', 'Finding Dory', 'Brave', 'Ramen Shop'],
      id: 3001,
      movie: {},
      movies: []
    }
  }
}
</script>
