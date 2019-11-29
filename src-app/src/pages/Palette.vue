<template>
  <div class="q-pa-xs bg-blue-grey-10 text-white">
    <q-btn-group>
      <ColorPicker v-for="(c, index) in palettes[3]" :key="index" :value="c" />
      <ColorPicker value="Allura Red" />
      <ColorPicker value="Pale Ale" />
      <ColorPicker value="#245878" />
      <ColorPicker value="#de7e5d" />
      <ColorPicker value="#532934" />
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
    lighter: vm => [0.4, 0.3, 0.2, 0.1, 0].map(x => Color(vm.hexa).lighten(x).hex())
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
