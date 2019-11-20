<template>
  <div>
    <q-btn :label="color.name" icon="color_lens" :style="{ background: this.color.hex, color: this.color.textColors[3] }">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <div class="row" :style="{ background: this.color.hex, color: this.color.textColors[1] }">
            <h2>{{color.name}}</h2>
            <p :style="{ background: this.color.hex, color: this.color.textColors[4] }">
                {{color.hex}}
            </p>
        </div>
        <div class="row">
            <div class="col q-pa-xs" v-for="t in color.textColors" :key="t">
                {{t}}
            </div>
        </div>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'colorPicker',
  props: {
    hex: { type: String }
  },
  apollo: {
    color: {
      query: gql`
        query color($hex: String!) {
          color(hex: $hex) {
            name
            hex
            J
            Q
            M
            h
            C
            s
            textColors
          }
        }
      `,
      variables () {
        return {
          hex: this.hex
        }
      }
    },
    colors: {
      query: gql`
        query findColor($needle: String!, $limit: Float) {
          findColor(needle: $needle, limit: $limit) {
            name
            hex
            J
            Q
            M
            h
            C
            s
          }
        }
      `,
      variables () {
        return {
          needle: this.search,
          limit: 300
        }
      },
      update: data => data.findColor
    }
  },
  data () {
    return {
      search: '',
      color: { textColors: [] },
      colors: []
    }
  }
}
</script>
