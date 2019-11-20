<template>
  <div class="q-pa-xs bg-blue-grey-10 text-white">
    <q-btn-group>
      <ColorPicker hex="Dark Crypt" />
      <ColorPicker hex="Allura Red" />
      <ColorPicker hex="Pale Ale" />
      <ColorPicker hex="#245878" />
      <ColorPicker hex="#de7e5d" />
      <ColorPicker hex="#532934" />
    </q-btn-group>
  </div>
</template>

<script>
import Color from 'color'
import ColorPicker from 'components/pickers/ColorPicker'

export default {
  name: 'palette',
  components: { ColorPicker },
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
      hexa: '#0000FF',
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
