<template>
  <q-layout view="lHh Lpr lFf" class="full-height bg-blue-grey-10 text-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          size="md"
          flat
          round
          dense
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Financial Sense</q-toolbar-title>

        <EquityPicker @input="equityChange" />

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
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Startup</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/equity/AAPL">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Equity Analysis</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/portfolio">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Portfolio Summary</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/palette">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Themes</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EquityPicker from 'components/pickers/EquityPicker'

export default {
  name: 'MyLayout',
  components: { EquityPicker },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    equityChange (ticker) {
      this.$router.push(`/equity/${ticker}`)
    }
  }
}
</script>
