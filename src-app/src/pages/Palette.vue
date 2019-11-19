<template>
  <div class="q-pa-xs bg-blue-grey-10 text-white">
    <div v-for="palette in palettes" :key="palette" class="row q-col-gutter-xs">
      <div v-for="color in palette" :key="color">
        <div class="q-pa-sm" :style="{ background: color, height: '40px', width: '40px' }"></div>
      </div>
    </div>

    <q-btn label="Color" icon="color_lens" :style="{ background: this.hexa }">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-color v-model="hexa" :palette="palette"/>
      </q-popup-proxy>
    </q-btn>
    <div class="row q-col-gutter-xs">
      <div v-for="color in lighter" :key="color">
        <div class="q-pa-sm" :style="{ background: color, height: '40px', width: '40px' }"></div>
      </div>
    </div>
    <ColorChart name="age" class="bg-blue-grey-9 q-pa-sm full-height" />
  </div>
</template>

<script>
import Color from 'color'
import ColorChart from 'components/cards/ColorChart'

export default {
  name: 'palette',
  components: { ColorChart },
  computed: {
    lighter: vm => [0.4, 0.3, 0.2, 0.1, 0].map(x => Color(vm.hexa).lighten(x).hex()),
    darker: vm => [0.0, 0.2, 0.4, 0.6, 0.8].map(x => Color(vm.hexa).darken(x).hex()),
    stronger: vm => [0.8, 0.6, 0.4, 0.2, 0].map(x => Color(vm.hexa).desaturate(x).hex()),
    weaker: vm => [0.0, 0.1, 0.2, 0.3, 0.4].map(x => Color(vm.hexa).saturate(x).hex()),
    analogous1: vm => [-20, -20, -10, -10, 0, 0, 10, 10, 20, 20].map(x => Color(vm.hexa).rotate(x).lighten(0.1).hex()),
    analogous2: vm => [-20, -20, -10, -10, 0, 0, 10, 10, 20, 20].map(x => Color(vm.hexa).rotate(x).hex()),
    analogous3: vm => [-20, -20, -10, -10, 0, 0, 10, 10, 20, 20].map(x => Color(vm.hexa).rotate(x).darken(0.1).hex()),
    triad: vm => [-120, -120, -120, 0, 0, 0, 0, 120, 120, 120].map(x => Color(vm.hexa).rotate(x).hex()),
    complement: vm => [0, 0, 0, 0, 0, -180, -180, -180, -180, -180].map(x => Color(vm.hexa).rotate(x).hex()),
    palette: vm => [ ...vm.lighter, ...vm.darker, ...vm.stronger, ...vm.weaker, ...vm.analogous1, ...vm.analogous2, ...vm.analogous3, ...vm.triad, ...vm.complement ]
  },
  data () {
    return {
      hexa: '#FF00FFCC',
      palettes: [
        this.$color.clrsPalette,
        this.$color.clraPalette,
        this.$color.clrbPalette,
        this.$color.defaultPalette
      ]
    }
  }
}
</script>
