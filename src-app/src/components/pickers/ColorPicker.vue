<template>
  <div>
    <q-btn :label="color.name" icon="color_lens" :style="{ background: this.color.hex, color: this.color.textColors[3] }">
      <q-popup-proxy transition-show="scale" transition-hide="scale" >
        <q-card bordered :style="{ maxWidth: '660px', background: this.color.hex, color: this.color.textColors[4] }">
          <q-card-section>
              <div class="col-12 text-h2 text-weight-bold">{{color.name}}</div>
              <div class="col-12 text-subtitle2 text-right" :style="{ color: this.color.textColors[5] }">
                  {{color.hex}}
              </div>
            <q-input
              v-model="search" :style="{ color: this.color.textColors[4] }"
              debounce="500"
              filled
              placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
              <div class="row">
                <div v-for="c in colors" :key="c.hex" @click="value=c.hex"
                class="col-1 text-weight-thin q-pa-xs shadow-1"
                :style="{  background: c.hex, color: c.textColors[0] }">
                  <div style="font-size: 0.65rem; height: 2.4rem; overflow: hidden; line-height: 1.2">{{c.name}}</div>
                </div>
              </div>
          </q-card-section>

        </q-card>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { layoutColors } from '../cards/colorCalcs'

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
          hex: this.value
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
            textColors
          }
        }
      `,
      variables () {
        return {
          needle: this.search,
          limit: 300
        }
      },
      update: data => layoutColors(data.findColor)
    }
  },
  data () {
    return {
      search: 'rose',
      value: this.hex,
      color: { textColors: [] },
      colors: []
    }
  }
}
</script>
