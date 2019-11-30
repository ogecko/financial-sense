<template>
  <div>
    <q-btn :label="color.name" icon="color_lens" :style="{ background: this.color.hex, color: this.color.textColors[3] }">
      <q-popup-proxy transition-show="scale" transition-hide="scale" >
        <q-card bordered :style="{ maxWidth: '660px', background: this.color.hex, color: this.color.textColors[4] }">
          <q-card-section >
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
              v-model="needle"
              :style="{ color: this.color.textColors[4] }"
              debounce="500"
              filled dense
              placeholder="Search for named colors">
              <template v-slot:before>
                <q-icon name="search" />
              </template>
              <template v-slot:append>
                <q-icon v-if="needle !== ''" name="close" @click="needle = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section v-if="needle">
              <div class="row q-col-gutter-xs">
                <div v-for="c in colors" :key="c.hex" @click="localvalue=c.hex" class="col-1">
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
          <div v-else>
            <ColorPaletteSection label="Darker" :basecolor="color" :colors="color.darkerColors" @change="localvalue=$event" class="q-pb-xs" />
            <ColorPaletteSection label="Lighter" :basecolor="color" :colors="color.lighterColors" @change="localvalue=$event" />
            <ColorPaletteSection label="Stronger" :basecolor="color" :colors="color.strongerColors" @change="localvalue=$event" class="q-pb-xs" />
            <ColorPaletteSection label="Weaker" :basecolor="color" :colors="color.weakerColors" @change="localvalue=$event" />
            <ColorPaletteSection label="Similar" :basecolor="color" :colors="color.analogousColors" @change="localvalue=$event" />
            <ColorPaletteSection label="Tetradic" :basecolor="color" :colors="color.tetradicColors" @change="localvalue=$event" />
            <ColorPaletteSection label="Triadic" :basecolor="color" :colors="color.triadicColors" @change="localvalue=$event" />
          </div>
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
    value: { type: String }
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
            analogousColors { hex name textColors }
            triadicColors { hex name textColors }
            tetradicColors { hex name textColors }
          }
        }
      `,
      variables () {
        return {
          hex: this.localvalue
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
          needle: this.needle,
          limit: 300
        }
      },
      update: data => layoutColors(data.findColor)
    }
  },
  data () {
    return {
      localvalue: this.value,
      needle: '',
      color: { textColors: [] },
      colors: []
    }
  },
  watch: {
    localvalue: function (val) { this.$emit('input', val) }

  }
}
</script>
