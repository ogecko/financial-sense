<template>
  <div class="q-pa-xs bg-blue-grey-10 text-white">
    <div v-for="palette in palettes" :key="palette" class="row q-col-gutter-xs">
      <div v-for="color in palette" :key="color">
        <div class="q-pa-sm" :style="{ background: color, height: '40px', width: '40px' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'palette',
  data () {
    return {
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
