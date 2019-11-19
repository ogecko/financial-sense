<template>
  <q-select
    filled
    v-model="model"
    :options="visibleOptions"
    @filter="filterFn"
    @input="onSelect"
    transition-show="jump-up"
    transition-hide="jump-up"
    use-input
    dense
    clearable
    hide-selected
    fill-input
    input-debounce="0"
  >
    <template v-slot:append>
      <q-icon name="search" @click.stop />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
// style="width: 250px; padding-bottom: 32px"

import gql from 'graphql-tag'
const extractString = e => `${e.ticker} - ${e.name}`.slice(0, 30)
const extractOption = e => ({ label: extractString(e), ticker: e.ticker })
const sortOptions = (a, b) => a.ticker > b.ticker ? 1 : a.ticker < b.ticker ? -1 : 0
const isOptionMatch = (e, needle) => extractString(e).toLowerCase().indexOf(needle.toLowerCase()) > -1

export default {
  name: 'picker',
  apollo: {
    equityList: gql`query { equityList { name ticker }}`
  },
  data () {
    return {
      equityList: [],
      visibleOptions: [],
      model: null
    }
  },
  methods: {
    onSelect () {
      if (this.model) this.$emit('input', this.model.ticker)
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.visibleOptions = this.equityList.map(extractOption).sort(sortOptions)
        })
      } else {
        update(() => {
          this.visibleOptions = this.equityList.filter(e => isOptionMatch(e, val)).map(extractOption).sort(sortOptions)
        })
      }
    }
  }
}
</script>
