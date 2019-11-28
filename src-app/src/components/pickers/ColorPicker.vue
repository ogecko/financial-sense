<template>
  <div>
    <q-btn :label="color.name" icon="color_lens" :style="{ background: this.color.hex, color: this.color.textColors[3] }">
      <q-popup-proxy transition-show="scale" transition-hide="scale" >
        <q-card bordered :style="{ maxWidth: '660px', background: this.color.hex, color: this.color.textColors[4] }">
          <q-card-section>
              <div class="row q-col-gutter-xs">
                <div class="col-10 text-h2 text-weight-bold">{{color.name}}</div>
                <div class="col-2 text-subtitle2 text-right"
                  :style="{ color: this.color.textColors[5] }">
                  Hex: {{color.hex}}<br>
                  Hue: {{color.h | fmt_n1d}}<br>
                  Lightness: {{color.J | fmt_n1d}}<br>
                  Colorful: {{color.M | fmt_n1d}}<br>

                </div>
              </div>
            <q-input
              v-model="search"
              :style="{ color: this.color.textColors[4] }"
              debounce="500"
              filled
              placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
                <q-icon name="style" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
              <div class="row q-col-gutter-xs">
                <div v-for="c in colors" :key="c.hex" @click="value=c.hex" class="col-1">
                  <div
                    class="q-pa-xs shadow-1 text-weight-light"
                    :class="{ 'inset-shadow': (c.hex===color.hex) }"
                    :style="{ background: c.hex, color: c.textColors[2] }"
                    style="font-size: 0.65rem; height: 2.4rem; overflow: hidden; line-height: 1.2">
                    {{c.name}}
                  </div>
                </div>
              </div>
          </q-card-section>
          <ColorPaletteSection label="Darker" :basecolor="color" :colors="color.darkerColors" @change="value=$event" class="q-pb-xs" />
          <ColorPaletteSection label="Lighter" :basecolor="color" :colors="color.lighterColors" @change="value=$event" />
          <ColorPaletteSection label="Stronger" :basecolor="color" :colors="color.strongerColors" @change="value=$event" class="q-pb-xs" />
          <ColorPaletteSection label="Weaker" :basecolor="color" :colors="color.weakerColors" @change="value=$event" />
          <ColorPaletteSection label="Warmer" :basecolor="color" :colors="color.warmerColors" @change="value=$event" class="q-pb-xs" />
          <ColorPaletteSection label="Cooler" :basecolor="color" :colors="color.coolerColors" @change="value=$event" />
          <ColorPaletteSection label="Triadic" :basecolor="color" :colors="color.triadicColors" @change="value=$event" />
          <ColorPaletteSection label="Tetradic" :basecolor="color" :colors="color.tetradicColors" @change="value=$event" />
        </q-card>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { layoutColors } from '../cards/colorCalcs'
import ColorPaletteSection from '../cardsections/ColorPaletteSection'

export default {
  name: 'colorPicker',
  props: {
    hex: { type: String }
  },
  components: { ColorPaletteSection },
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
            lighterColors { hex name textColors }
            darkerColors { hex name textColors }
            strongerColors { hex name textColors }
            weakerColors { hex name textColors }
            warmerColors { hex name textColors }
            coolerColors { hex name textColors }
            triadicColors { hex name textColors }
            tetradicColors { hex name textColors }
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
